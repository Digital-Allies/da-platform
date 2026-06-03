import re
import os
import glob

# Learn pages to add
pages = [
    'learn/ada-compliance.html',
    'learn/bilingual-web.html',
    'learn/dept-cooperation.html',
    'learn/design-bureau.html',
    'learn/self-governing-bureau.html'
]

# Update sitemap.xml
with open('sitemap.xml', 'r', encoding='utf-8') as f:
    xml_content = f.read()

xml_insert = ""
for page in pages:
    url_path = page.replace('.html', '')
    if url_path not in xml_content:
        xml_insert += f"""
  <url>
       <loc>https://digitalallies.net/{url_path}</loc>
       <lastmod>2026-06-03T00:00:00+00:00</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8000</priority>
  </url>
"""

if xml_insert:
    xml_content = xml_content.replace('</urlset>', xml_insert + '</urlset>')
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(xml_content)


# Update sitemap.html
with open('sitemap.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

html_insert = ""
for page in pages:
    url_path = page.replace('.html', '')
    if url_path not in html_content:
        with open(page, 'r', encoding='utf-8') as f:
            page_content = f.read()
            
        title_match = re.search(r'<title>(.*?)</title>', page_content)
        title = title_match.group(1) if title_match else ""
        
        desc_match = re.search(r'<meta name="description" content="(.*?)">', page_content)
        desc = desc_match.group(1) if desc_match else ""
        
        # En and Es are roughly the same for simplicity since the existing ones use same or translation.
        # We'll just put the english in both data-en and data-es for the sitemap since we don't have the explicit translations for these new pages unless we parse them.
        
        html_insert += f"""
                        <li class="lpage">
                            <a href="https://digitalallies.net/{url_path}"
                                data-en="{title}"
                                data-es="{title}"
                                title="{title}">{title}</a>
                            <br /><small
                                data-en="{desc}"
                                data-es="{desc}">{desc}</small>
                        </li>
"""

if html_insert:
    # Insert right before the last </ul> of the pagelist
    insertion_point = r'                        <li class="lpage">\s*<a href="https://digitalallies.net/cookies.html"'
    match = re.search(insertion_point, html_content)
    if match:
        html_content = html_content[:match.start()] + html_insert + html_content[match.start():]
        # Also need to update the total count of pages in sitemap.html
        count_match = re.search(r'<span class="lcount">(\d+) pages</span>', html_content)
        if count_match:
            current_count = int(count_match.group(1))
            new_count = current_count + len(pages)
            html_content = html_content.replace(f'<span class="lcount">{current_count} pages</span>', f'<span class="lcount">{new_count} pages</span>')
            
        with open('sitemap.html', 'w', encoding='utf-8') as f:
            f.write(html_content)

print("Sitemaps updated successfully.")
