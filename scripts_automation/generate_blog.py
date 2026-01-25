
import os
import sys
import datetime
import random
import anthropic
import glob
import json
import re
import time

# Configuration
BLOG_DIR = "src/content/blog"
STATE_FILE = ".automation_state.json"
API_KEY = os.environ.get("ANTHROPIC_API_KEY")
START_DATE_STR = "2026-01-26" # Launch Date (Fixed)

if not API_KEY:
    print("Error: ANTHROPIC_API_KEY not found in environment variables.")
    sys.exit(1)

client = anthropic.Anthropic(api_key=API_KEY)

# Topics Pool
TOPICS = [
    "Calculation of Embedded Emissions in Steel Imports from India",
    "CBAM Default Values vs Actual Data: Cost Analysis for Exporters",
    "Understanding the CBAM Transitional Registry for Indian Manufacturers",
    "How to Map HS Codes for Steel Fasteters under EU CBAM",
    "Scope 1 vs Scope 2 Emissions: A Guide for Indian Steel Plants",
    "The Risk of Non-Compliance: Penalties under EU Regulation 2023/956",
    "ISO 14064-1 vs CBAM Methodology: Key Differences Explained",
    "Preparing for Third-Party Verification of CBAM Reports by 2026",
    "Pickling and Drawing Processes: Specific CBAM Monitoring Rules",
    "Indirect Emissions Calculation for Induction Furnace Steel Production",
    "EU Customs Delays: The Link Between Improper Documentation and Hold-ups",
    "How to format the CBAM Communication XML for the Transitional Registry",
    "Scrap Steel Usage: Impact on Embedded Emission Intensity",
    "The role of the Authorised Declarant in CBAM Reporting",
    "Why Excel Spreadsheets are Insufficient for Forensic CBAM Compliance",
    "Traceability in the Supply Chain: From Iron Ore to Finished Bolt",
    "Energy Intensity Multipliers for Indian Grid Electricity in CBAM",
    "Strategies to Reduce Carbon Liability for High-Carbon Goods Remediation",
    "Quarterly Reporting Deadlines: A Checklist for Compliance Officers",
    "Data Gaps in Indian Factory Logs: How to Reconstruct Forensic History",
]

def load_state():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, 'r') as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_state(state):
    with open(STATE_FILE, 'w') as f:
        json.dump(state, f, indent=2)

def get_daily_limit(start_date):
    today = datetime.date.today()
    days_passed = (today - start_date).days
    return 4 if days_passed < 7 else 3

def check_throttling():
    state = load_state()
    today_str = datetime.date.today().isoformat()
    
    # Initialize state if needed
    if "first_run_date" not in state:
        state["first_run_date"] = today_str
        
    start_date = datetime.datetime.strptime(state["first_run_date"], "%Y-%m-%d").date()
    daily_limit = get_daily_limit(start_date)
    
    # Reset counter if new day
    if state.get("last_run_date") != today_str:
        state["posts_generated_today"] = 0
        state["last_run_date"] = today_str
        
    current_count = state.get("posts_generated_today", 0)
    
    print(f"Throttling Check: Day { (datetime.date.today() - start_date).days + 1 }")
    print(f"Generated Today: {current_count} / {daily_limit}")
    
    if current_count >= daily_limit:
        print("Daily limit reached. Exiting gracefully.")
        save_state(state) # Ensure date update is saved
        return False, state
        
    return True, state

def get_existing_titles():
    files = glob.glob(os.path.join(BLOG_DIR, "*.mdx"))
    titles = set()
    for f in files:
        try:
            with open(f, 'r', encoding='utf-8') as file:
                content = file.read()
                match = re.search(r'^title:\s*(.+)$', content, re.MULTILINE)
                if match:
                    titles.add(match.group(1).strip().lower())
        except:
            pass
    return titles

def check_duplicate(topic, existing_titles):
    topic_clean = topic.lower().strip()
    if topic_clean in existing_titles:
        return True
    
    topic_tokens = set(topic_clean.split())
    for title in existing_titles:
        title_tokens = set(title.split())
        if len(title_tokens) > 0:
            intersection = topic_tokens.intersection(title_tokens)
            if len(intersection) / len(topic_tokens) > 0.8: 
                return True
    return False

def generate_blog_post():
    # 1. Throttling
    can_run, state = check_throttling()
    if not can_run:
        sys.exit(0)

    # 2. Topic Selection
    existing_titles = get_existing_titles()
    selected_topic = None
    random.shuffle(TOPICS)
    
    for candidate in TOPICS:
        if not check_duplicate(candidate, existing_titles):
            selected_topic = candidate
            break
            
    if not selected_topic:
        print("No new unique topics found.")
        sys.exit(0)

    print(f"Selected Topic: {selected_topic}")

    # 3. Enhanced System Prompt
    system_prompt = """
    You are a Senior Forensic Carbon Auditor and EU Regulatory Expert.
    
    OBJECTIVE:
    Write a high-authority, technical guidance article for Indian steel exporters dealing with EU CBAM (Regulation 2023/956).
    
    MANDATORY CONTENT REQUIREMENTS:
    1. Length: Minimum 1350 words.
    2. Structure: Minimum 6 H2 sections.
    3. Data: Must include at least 1 Data Table (Markdown format) representing hypothetical but realistic emission factors or cost scenarios.
    4. Metrics: Include at least 2 specific numeric figures (e.g., "€85/tonne CO2", "2026 definitive period", "20% tolerance").
    5. Citations: Explicitly cite "Regulation (EU) 2023/956" at least once.
    6. Freshness: Include a specific section titled "## 2025-2026 Regulatory Impact" or "## Recent Developments".
    
    ANTI-HALLUCINATION RULES:
    - Do NOT invent specific court cases or company fines.
    - Do NOT give legal advice (use "compliance guidance" instead).
    - If a specific default value is unknown, state "refer to the latest EU Implementing Act".
    
    TONE:
    - Dry, forensic, and operational.
    - No fluff ("In the ever-changing landscape...").
    - Focus on "Installation", "Precursors", "Direct/Indirect Emissions", "Aggregated Goods".
    
    OUTPUT FORMAT:
    - Strict MDX/Markdown.
    - Start immediately with Frontmatter.
    - Include a "## Key Takeaways" section at the start.
    - Include a "## Frequently Asked Questions" section at the end (3 Q&A min).
    """
    
    user_prompt = f"""
    Write a complete technical article about: "{selected_topic}".
    
    Frontmatter format:
    ---
    title: {selected_topic}
    date: YYYY-MM-DD
    description: [SEO description, max 160 chars]
    category: Technical Calculation
    ---
    
    Ensure the "date" field uses the placeholder YYYY-MM-DD exactly so I can replace it programmatically.
    """

    try:
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=6000,
            temperature=0.5, # Lower temp for more factual output
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}]
        )
        
        content = response.content[0].text
        
        # 4. Validation & Normalization
        if len(content.split()) < 1000:
             raise ValueError("Generated content too short.")
             
        today = datetime.date.today().isoformat()
        
        # Robust Frontmatter Date Injection
        match = re.search(r"^---\n(.*?)\n---", content, re.DOTALL)
        if match:
            fm = match.group(1)
            # Remove any existing date line to prevent duplicates
            fm_clean = re.sub(r"^date:.*$", "", fm, flags=re.MULTILINE).strip()
            # Reconstruct safe frontmatter
            new_fm = f"{fm_clean}\ndate: {today}"
            content = content.replace(match.group(1), new_fm)
        else:
             # Fallback
             content = f"---\ntitle: {selected_topic}\ndate: {today}\ndescription: Auto-generated CBAM guide.\ncategory: Compliance\n---\n\n{content}"

        # Safe Slug
        safe_slug = selected_topic.lower().replace(" ", "-").replace(":", "").replace("?", "").replace("/", "")[:60]
        filepath = os.path.join(BLOG_DIR, f"{today}-{safe_slug}.mdx")
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
            
        # 5. Update State
        state["posts_generated_today"] += 1
        state["total_posts"] = state.get("total_posts", 0) + 1
        save_state(state)
        
        print(f"SUCCESS: Generated {filepath}")
        
    except Exception as e:
        print(f"FAILURE: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if not os.path.exists(BLOG_DIR):
        os.makedirs(BLOG_DIR)
    generate_blog_post()
