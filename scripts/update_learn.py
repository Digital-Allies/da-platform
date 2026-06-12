import re

def update_file(filepath, title_meta, callout, schema):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update title and meta
    content = re.sub(r'<title>.*?</title>\s*<meta name="description"[^>]*>', title_meta, content, flags=re.DOTALL)
    
    # 2. Update service callout before </article>
    content = content.replace('</article>', callout + '\n\n</article>')
    
    # 3. Update service schema before </head>
    content = content.replace('</head>', schema + '\n</head>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Extracts from da-seo-implementation.html
with open('assets/Design System /da-seo-implementation.html', 'r', encoding='utf-8') as f:
    da_seo = f.read()

# Helper to extract code blocks
def get_code(id):
    match = re.search(f'<pre id="{id}"><button[^>]*>Copy</button>(.*?)</pre>', da_seo, re.DOTALL)
    if match:
        # the html entities might be encoded in the pre tag
        text = match.group(1).replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
        return text
    return ''

# seo-aeo.html updates
title_meta_seo = get_code('code-4a')
callout_seo = get_code('code-4b')
schema_seo = get_code('code-4c')

update_file('learn/seo-aeo.html', title_meta_seo, callout_seo, schema_seo)

# alttext.html updates
title_meta_alt = get_code('code-5a')
callout_alt = get_code('code-5b')
schema_alt = get_code('code-5c')

update_file('learn/alttext.html', title_meta_alt, callout_alt, schema_alt)

print("Updated learn/seo-aeo.html and learn/alttext.html successfully.")
