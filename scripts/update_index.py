import re

# Read files
with open('assets/Design System /da-seo-implementation.html', 'r', encoding='utf-8') as f:
    da_seo = f.read()

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# 1. Update JSON-LD
# Extract JSON-LD from da_seo
json_ld_match = re.search(r'<script type="application/ld\+json">.*?</script>', da_seo, re.DOTALL)
if json_ld_match:
    new_json_ld = json_ld_match.group(0)
    # Replace the existing JSON-LD blocks in index.html with the new single block
    # Remove all existing <script type="application/ld+json"> blocks
    index_html = re.sub(r'<script type="application/ld\+json">.*?</script>\s*', '', index_html, flags=re.DOTALL)
    # Append the new json_ld before </body>
    index_html = index_html.replace('</body>', f'    {new_json_ld}\n\n</body>')

# 2. Add FAQs
# Extract the 3 new FAQs from da_seo
faq_items = re.findall(r'<details class="structural-border bg-bone-white group">.*?</details>', da_seo, re.DOTALL)
# Extract only the ones that match the new questions
new_faqs = []
for faq in faq_items:
    if "Do you offer AI consulting for small businesses?" in faq or \
       "What does AI implementation mean for a local business in Kingman?" in faq or \
       "Can you help my business show up in AI search results" in faq:
        new_faqs.append('            ' + faq.replace('\n', '\n            '))

if new_faqs:
    # Insert new FAQs at the end of the #faq list, just before the closing </div> of the space-y-4 container
    faq_end_marker = r'                </div>\s*</details>\s*</div>\s*</section>'
    
    match = re.search(faq_end_marker, index_html, re.DOTALL)
    if match:
        insert_text = '                </div>\n            </details>\n\n' + '\n\n'.join(new_faqs) + '\n\n        </div>\n    </section>'
        index_html = index_html[:match.start()] + insert_text + index_html[match.end():]

# Write back
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Updated index.html successfully.")
