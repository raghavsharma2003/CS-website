
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

# Force UTC for consistency
def get_utc_now():
    return datetime.datetime.now(datetime.timezone.utc)

def get_utc_date_str():
    return get_utc_now().strftime("%Y-%m-%d")

if not API_KEY:
    print("CRITICAL ERROR: ANTHROPIC_API_KEY not found in environment variables.")
    sys.exit(1)

client = anthropic.Anthropic(api_key=API_KEY)

# Topics Pool - Expanded for 8 blogs/day SEO strategy
TOPICS = [
    # Core CBAM Technical Topics
    "Calculation of Embedded Emissions in Steel Imports from India",
    "CBAM Default Values vs Actual Data: Cost Analysis for Exporters",
    "Understanding the CBAM Transitional Registry for Indian Manufacturers",
    "How to Map HS Codes for Steel Fasteners under EU CBAM",
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
    # Steel Production and Manufacturing
    "Electric Arc Furnace vs Blast Furnace: CBAM Emission Factor Comparison",
    "Hot Rolled Coils: Calculating Embedded Carbon for EU Exports",
    "Cold Rolled Steel Products: CBAM Classification and Reporting Guide",
    "Galvanized Steel Under CBAM: Coating Process Emissions Accounting",
    "Wire Rod Manufacturing: Specific CBAM Monitoring Requirements",
    "Steel Tubes and Pipes: CN Code Classification for CBAM Compliance",
    "Alloy Steel Products: Additional Emission Factors Under CBAM",
    "Stainless Steel Exports: Chromium and Nickel Content Impact on CBAM",
    "Rebar and Construction Steel: CBAM Requirements for Building Materials",
    "Steel Plates and Sheets: Emission Intensity Calculation Methods",
    # Compliance and Documentation
    "CBAM Certificate Purchasing: A Step-by-Step Guide for Importers",
    "Document Retention Requirements Under EU Regulation 2023/956",
    "Internal Audit Checklist for CBAM Compliance Readiness",
    "Training Your Team for CBAM: Essential Skills and Knowledge",
    "CBAM Compliance Software: Features to Look For",
    "Managing Multiple Installations Under Single CBAM Declaration",
    "Cross-Border Supply Chain: CBAM Implications for Multi-Country Operations",
    "CBAM and Free Trade Agreements: Understanding the Interactions",
    "Small and Medium Enterprises: Simplified CBAM Compliance Pathways",
    "CBAM Phase-In Timeline: Key Dates for Indian Exporters",
    # Emissions Monitoring and Measurement
    "Installing Carbon Monitoring Systems for CBAM Compliance",
    "Continuous Emissions Monitoring vs Periodic Measurement Under CBAM",
    "Fuel Analysis Requirements for Accurate CBAM Reporting",
    "Electricity Consumption Tracking for Indirect Emission Calculations",
    "Heat Recovery Systems: Impact on CBAM Emission Calculations",
    "Process Emissions vs Combustion Emissions: CBAM Classification",
    "Calibration Requirements for CBAM Monitoring Equipment",
    "Data Quality Assurance in CBAM Emission Reporting",
    "Uncertainty Analysis in CBAM Emission Calculations",
    "Benchmark Emission Factors: When to Use Default Values",
    # Industry-Specific Guidance
    "Automotive Steel Components: CBAM Implications for Tier 1 Suppliers",
    "Construction Industry Supply Chain: CBAM Impact Assessment",
    "Machinery Manufacturing: Steel Input CBAM Considerations",
    "Shipbuilding Industry: Managing CBAM for Heavy Steel Plates",
    "Wind Turbine Components: CBAM and Green Energy Infrastructure",
    "Railway Infrastructure: CBAM Compliance for Rail Steel Products",
    "Oil and Gas Pipelines: CBAM Requirements for Pipe Manufacturers",
    "Pressure Vessels: Special CBAM Considerations for High-Grade Steel",
    "Agricultural Equipment: CBAM Implications for Farm Machinery Steel",
    "Aerospace Grade Steel: Premium Products Under CBAM Scope",
    # Financial and Strategic Topics
    "Carbon Cost Pass-Through: Negotiating with EU Customers Post-CBAM",
    "CBAM Certificate Price Forecasting: Factors Influencing EU Carbon Prices",
    "Hedging Strategies for CBAM Certificate Cost Volatility",
    "Investment Planning for CBAM Compliance Infrastructure",
    "Return on Investment: CBAM Compliance System Implementation",
    "Insurance Considerations for CBAM Non-Compliance Risk",
    "Banking and Finance: CBAM Impact on Steel Export Financing",
    "Competitive Analysis: How CBAM Affects Indian Steel Market Position",
    "Cost Allocation Strategies for CBAM Across Product Lines",
    "Budget Planning for CBAM: Annual Compliance Cost Estimation",
    # Regulatory and Legal Topics
    "EU Member State Competent Authorities: Roles and Responsibilities",
    "Appeal Procedures for CBAM Penalty Decisions",
    "Legal Liability: Who Bears CBAM Compliance Risk",
    "Contractual Clauses for CBAM Cost Allocation in Supply Agreements",
    "CBAM and WTO Rules: Trade Law Implications",
    "Confidentiality of CBAM Data: Protection and Disclosure Rules",
    "Joint Ventures and CBAM: Allocation Between Partners",
    "Mergers and Acquisitions: CBAM Due Diligence Considerations",
    "Intellectual Property in CBAM: Protecting Emission Calculation Methods",
    "Whistleblower Protections in CBAM Enforcement",
    # Environmental and Sustainability
    "Science-Based Targets and CBAM: Aligning Corporate Climate Goals",
    "Life Cycle Assessment vs CBAM Methodology: Key Differences",
    "Carbon Neutrality Claims: CBAM Implications for Green Steel Marketing",
    "Renewable Energy Certificates and CBAM Indirect Emissions",
    "Carbon Capture and Storage: Future Impact on CBAM Calculations",
    "Hydrogen-Based Steel Production: CBAM Treatment of Green Steel",
    "Circular Economy and CBAM: Scrap Recycling Benefits",
    "Environmental Product Declarations and CBAM Data Alignment",
    "Sustainability Reporting: Integrating CBAM Data into ESG Disclosures",
    "Climate Risk Assessment: CBAM as a Transition Risk Factor",
    # Technology and Digital Solutions
    "Blockchain for CBAM: Traceability and Verification Applications",
    "AI and Machine Learning in CBAM Emission Estimation",
    "Digital Twins for Steel Production: CBAM Monitoring Benefits",
    "Cloud-Based CBAM Compliance Platforms: Security Considerations",
    "API Integration for Automated CBAM Data Collection",
    "Mobile Solutions for CBAM Data Capture at Production Sites",
    "Cybersecurity for CBAM Systems: Protecting Emission Data",
    "Data Analytics for CBAM Optimization Opportunities",
    "ERP System Integration for CBAM Compliance Automation",
    "IoT Sensors for Real-Time CBAM Emission Monitoring",
]

def load_state():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, 'r') as f:
                return json.load(f)
        except Exception as e:
            print(f"Warning: Could not read state file ({e}). Starting fresh.")
            return {}
    return {}

def save_state(state):
    print(f"Saving state: {json.dumps(state)}")
    with open(STATE_FILE, 'w') as f:
        json.dump(state, f, indent=2)

def get_daily_limit(start_date_str):
    # MANDATED: 8 blogs per day fixed
    print(f"Limit Config: Fixed at 8 posts/day")
    return 8

def check_throttling():
    state = load_state()
    today_str = get_utc_date_str()
    
    print(f"--- Throttling Check [{today_str}] ---")
    
    # Initialize state fields if missing
    if "first_run_date" not in state:
        print("Initializing first_run_date.")
        state["first_run_date"] = today_str
        
    if "total_posts_generated" not in state:
        state["total_posts_generated"] = 0

    # Reset counter if new day
    last_run = state.get("last_run_date", "")
    if last_run != today_str:
        print(f"New day detected (Last: {last_run}, Today: {today_str}). Resetting daily counter.")
        state["posts_generated_today"] = 0
        state["last_run_date"] = today_str
    
    # Get limit
    daily_limit = get_daily_limit(state["first_run_date"])
    current_count = state.get("posts_generated_today", 0)
    
    print(f"Status: Generated {current_count}/{daily_limit} today.")
    
    if current_count >= daily_limit:
        print("Daily limit reached. Exiting gracefully.")
        # Ensure we save the date update even if we exit
        save_state(state)
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
    # prevent div by zero
    if not topic_tokens: 
        return False

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
    
    print(f"Existing titles count: {len(existing_titles)}")
    
    for candidate in TOPICS:
        if not check_duplicate(candidate, existing_titles):
            selected_topic = candidate
            break
            
    if not selected_topic:
        print("No new unique topics found in pool. All topics exhausted.")
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
    3. Metrics: Include at least 2 specific numeric figures.
    4. Citations: Explicitly cite "Regulation (EU) 2023/956" at least once.
    5. Freshness: Include a specific section titled "## 2025-2026 Regulatory Impact".
    
    TONE:
    - Dry, forensic, and operational.
    
    OUTPUT FORMAT:
    - Strict MDX/Markdown.
    - Start immediately with Frontmatter.
    - Include a "## Key Takeaways" section at the start.
    - Include a "## Frequently Asked Questions" section at the end.
    """
    
    user_prompt = f"""
    Write a complete technical article about: "{selected_topic}".
    
    Frontmatter format:
    ---
    title: {selected_topic}
    date: YYYY-MM-DD
    description: [SEO description, max 160 chars]
    category: Technical Compliance
    ---
    
    Ensure the "date" field uses the placeholder YYYY-MM-DD exactly.
    """

    try:
        print("Sending request to Anthropic...")
        response = client.messages.create(
            model="claude-sonnet-4-20250514", # CORRECTED MODEL FROM USER
            max_tokens=6000,
            temperature=0.5,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}]
        )
        
        content = response.content[0].text
        print("Received response from Anthropic.")
        
        # 4. Validation & Normalization
        if len(content.split()) < 800:
             raise ValueError("Generated content too short.")

        today = get_utc_date_str()

        # Robust Frontmatter Date Injection & Cleanup
        match = re.search(r"^---\n(.*?)\n---", content, re.DOTALL)
        if match:
            fm = match.group(1)
            # Remove date line
            fm_clean = re.sub(r"^date:.*$", "", fm, flags=re.MULTILINE)
            # Remove blank lines from frontmatter (critical for YAML parsing)
            fm_lines = [line for line in fm_clean.split('\n') if line.strip()]
            # Quote titles containing colons (YAML special character)
            fm_lines = [
                re.sub(r'^title:\s*([^"\'].+)$', lambda m: f'title: "{m.group(1)}"' if ':' in m.group(1) else m.group(0), line)
                for line in fm_lines
            ]
            fm_clean = '\n'.join(fm_lines)
            new_fm = f"{fm_clean}\ndate: {today}"
            content = content.replace(match.group(1), new_fm)
        else:
             content = f"---\ntitle: \"{selected_topic}\"\ndate: {today}\ndescription: EU CBAM compliance guide.\ncategory: Compliance\n---\n\n{content}"

        # Safe Slug
        safe_slug = selected_topic.lower().replace(" ", "-").replace(":", "").replace("?", "").replace("/", "")[:60]
        filepath = os.path.join(BLOG_DIR, f"{today}-{safe_slug}.mdx")
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
            
        # 5. Update State (INCREMENT ONLY ON SUCCESS)
        state["posts_generated_today"] += 1
        state["total_posts_generated"] = state.get("total_posts_generated", 0) + 1
        save_state(state)
        
        print(f"SUCCESS: Generated {filepath}")
        print(f"New Today Count: {state['posts_generated_today']}")
        
    except Exception as e:
        print(f"FAILURE during generation: {e}")
        # Exit gracefully to avoid workflow failure
        sys.exit(0)

if __name__ == "__main__":
    if not os.path.exists(BLOG_DIR):
        os.makedirs(BLOG_DIR)
    generate_blog_post()
