
import os
import sys
import datetime
import random
import anthropic
import glob
import time

# Configuration
BLOG_DIR = "src/content/blog"
API_KEY = os.environ.get("ANTHROPIC_API_KEY")
START_DATE_STR = "2026-01-26" # Launch Date

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

def get_throttling_limit():
    start_date = datetime.datetime.strptime(START_DATE_STR, "%Y-%m-%d").date()
    today = datetime.date.today()
    days_passed = (today - start_date).days
    
    if days_passed < 5:
        return 1
    elif days_passed < 14:
        return 2
    else:
        return 3

def check_daily_limit_reached(limit):
    today = datetime.date.today().isoformat()
    # Check existing files generated today
    files = glob.glob(os.path.join(BLOG_DIR, f"{today}-*.mdx"))
    count = len(files)
    print(f"Posts generated today ({today}): {count}. Limit: {limit}")
    return count >= limit

def get_existing_slugs_and_titles():
    files = glob.glob(os.path.join(BLOG_DIR, "*.mdx"))
    slugs = set()
    titles = set()
    for f in files:
        filename = os.path.basename(f)
        slug = filename.replace(".mdx", "")
        slugs.add(slug)
        
        # Read title for semantic check
        try:
            with open(f, 'r', encoding='utf-8') as file:
                for line in file:
                    if line.startswith("title:"):
                        first_line_title = line.replace("title:", "").strip().lower()
                        titles.add(first_line_title)
                        break
        except:
            pass
            
    return slugs, titles

def check_duplicate(topic, existing_titles):
    topic_clean = topic.lower().strip()
    # 1. Direct match
    if topic_clean in existing_titles:
        return True
    
    # 2. Simple Keyword Overlap (Jaccard Similarity on tokens)
    topic_tokens = set(topic_clean.split())
    for title in existing_titles:
        title_tokens = set(title.split())
        intersection = topic_tokens.intersection(title_tokens)
        if len(intersection) / len(topic_tokens) > 0.8: # >80% overlap
            return True
            
    return False

def generate_blog_post():
    # 1. Check Throttling
    limit = get_throttling_limit()
    if check_daily_limit_reached(limit):
        print("Daily limit reached. Skipping generation.")
        # Ensure script exits successfully (0) so Action doesn't fail, just does nothing
        sys.exit(0)

    # 2. Duplicate Protection
    existing_slugs, existing_titles = get_existing_slugs_and_titles()
    selected_topic = None
    
    # Shuffle to pick random candidate
    random.shuffle(TOPICS)
    
    for candidate in TOPICS:
        if not check_duplicate(candidate, existing_titles):
            selected_topic = candidate
            break
            
    if not selected_topic:
        print("No new unique topics found in pool.")
        sys.exit(0)

    print(f"Selected Topic: {selected_topic}")

    # 3. Hardened System Prompt
    system_prompt = """
    You are a Senior Forensic Carbon Auditor and EU Regulatory Expert. 
    You write technical, authoritative guidance for Indian steel and fastener manufacturers exporting to the EU.
    
    You are writing for CBAM compliance professionals.
    You MUST:
    - Cite Regulation (EU) 2023/956 explicitly when referencing CBAM law
    - Avoid speculation unless clearly labeled
    - Never invent penalties, dates, or percentages
    - Use Indian manufacturing terminology where relevant
    - Assume the reader is operational, not academic
    
    TONE AND STYLE:
    - Authoritative, professional, and dry.
    - Zero marketing fluff. No "In today's fast paced world...".
    - Direct, actionable, and regulatory-focused.
    - Use technical terms: "Embedded Emissions", "CN Code", "Installation", "Precursor", "Aggregated Goods".
    
    FORMAT:
    - Markdown (MDX compatible).
    - H2 and H3 headers.
    - Clear bullet points for regulatory steps.
    - MUST include a "Key Takeaways" section at the top.
    - MUST include a FAQ section at the bottom (valid Schema markup structure not needed, just text).
    
    CRITICAL RULES:
    - Do NOT invent specific legal outcomes for specific companies.
    - Emphasize "Actual Data" over "Default Values".
    - Mention "CarbonSettle" organically as the solution for "Forensic Data Extraction" or "XML Generation" once or twice.
    """
    
    user_prompt = f"""
    Write a complete technical article about: "{selected_topic}".
    
    Requirements:
    - Length: Minimum 1200 words.
    - Structure: At least 5 distinct H2 sections.
    - FAQ: At least 3 detailed Q&A at the end.
    
    Structure:
    1. Title: Create a high-CTR but professional title.
    2. Slug: Create a URL-friendly slug.
    3. Meta Description: SEO optimized (155 chars).
    4. Category: Choose one of [CBAM Basics, Technical Calculation, Compliance Updates, Case Studies].
    5. Body: The full article.
    
    Output NOT JSON. Output raw text where the first few lines are Frontmatter in YAML format between ---.
    Example:
    ---
    title: Actual Title
    date: YYYY-MM-DD
    description: Meta description
    category: Technical Calculation
    ---
    
    [Article Content]
    """

    try:
        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=5000, # Increased for length req
            temperature=0.7,
            system=system_prompt,
            messages=[
                {"role": "user", "content": user_prompt}
            ]
        )
        
        content = message.content[0].text
        
        # 4. Quality Gates & Frontmatter Normalization
        word_count = len(content.split())
        h2_count = content.count("## ")
        
        if word_count < 1000: # Soft buffer for 1200
            raise ValueError(f"Generated content too short: {word_count} words.")
        
        if h2_count < 4: # Soft buffer for 5
             raise ValueError(f"Generated content low complexity: {h2_count} H2 headers.")
             
        if "FAQ" not in content and "Frequently Asked Questions" not in content:
            raise ValueError("Missing FAQ section.")

        # --- Frontmatter Processing ---
        # 1. Extract existing frontmatter
        import re
        today = datetime.date.today().isoformat()
        
        frontmatter_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
        if frontmatter_match:
            fm_text = frontmatter_match.group(1)
            # Check for date in frontmatter
            if re.search(r'^date:', fm_text, re.MULTILINE):
                # Date exists, ensure it's valid or leave it? 
                # User says: Keep the correct publication date, ensure exactly once.
                # If Claude wrote "date: YYYY-MM-DD", we need to fix it.
                if "date: YYYY-MM-DD" in fm_text:
                     new_fm_text = fm_text.replace("date: YYYY-MM-DD", f"date: {today}")
                     content = content.replace(fm_text, new_fm_text)
                else:
                    # Date exists and isn't the placeholder, assume valid. 
                    # Do NOT inject another one.
                    pass
            else:
                # Date missing in FM block, inject it
                new_fm_text = f"{fm_text}\ndate: {today}"
                content = content.replace(fm_text, new_fm_text)
        else:
            # No frontmatter found at all? This is weird given the prompt, but handle it.
            # Prepend fresh frontmatter
            content = f"---\ntitle: {selected_topic}\ndate: {today}\n---\n\n{content}"

        # Double check for duplicate keys just in case
        # (Naive check: count usage of "date:")
        # We assume the regex replacement above was safe. 
        
        # Safe Slug
        safe_slug = selected_topic.lower().replace(" ", "-").replace(":", "").replace("?", "").replace("/", "")[:60] # Truncate long slugs
        filename = f"{today}-{safe_slug}.mdx"
        filepath = os.path.join(BLOG_DIR, filename)
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
            
        print(f"Successfully generated: {filepath} (Words: {word_count}, H2: {h2_count})")
        return True

    except Exception as e:
        print(f"CRITICAL FAILURE: {e}")
        # Exit with error code to alert GitHub Actions
        sys.exit(1) 

if __name__ == "__main__":
    # Ensure directory exists
    if not os.path.exists(BLOG_DIR):
        os.makedirs(BLOG_DIR)
        
    generate_blog_post()
