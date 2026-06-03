import re
import glob

socials_html_index = """
                <div class="mt-8 flex flex-wrap gap-4 text-xs font-bold tracking-widest uppercase">
                    <a href="https://www.facebook.com/digitalallies" target="_blank" rel="noopener" class="text-white/60 hover:text-white transition">Facebook</a><span class="text-white/20">·</span>
                    <a href="https://www.instagram.com/digitalallies__" target="_blank" rel="noopener" class="text-white/60 hover:text-white transition">Instagram</a><span class="text-white/20">·</span>
                    <a href="https://maps.app.goo.gl/a9uGv4JSVHWEUZhQ6" target="_blank" rel="noopener" class="text-white/60 hover:text-white transition">Google Business</a>
                </div>"""

# 1. Update index.html footer
with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Insert after "I am historically easy to reach..." paragraph
match = re.search(r'(I am historically easy to reach[^>]*</p>)', index_html)
if match and "https://www.facebook.com/digitalallies" not in index_html:
    index_html = index_html[:match.end()] + socials_html_index + index_html[match.end():]

# We already added sameAs to index.html using multi_replace_file_content earlier, let's verify if it's there
if '"sameAs": [' not in index_html:
    print("WARNING: sameAs missing in index.html JSON-LD")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)


# 2. Update learn/seo-aeo.html and learn/alttext.html JSON-LD to include telephone and sameAs
sameAs_jsonld = """
  "telephone": "+1-928-228-5769",
  "sameAs": [
    "https://www.instagram.com/digitalallies__",
    "https://www.facebook.com/digitalallies",
    "https://maps.app.goo.gl/a9uGv4JSVHWEUZhQ6"
  ],"""

for file in ['learn/seo-aeo.html', 'learn/alttext.html', 'assets/Design System /da-seo-implementation.html']:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to inject sameAs in the LocalBusiness schema or the Service schema if it's the Service one
    if '"sameAs":' not in content:
        # In the Service schema, we can inject it inside the provider block or at the root of the Service
        # Wait, the prompt says "add phone and socials". 
        # For the Service schema:
        # "provider": {
        #   "@type": "LocalBusiness",
        #   "@id": "https://digitalallies.net/#business",
        #   "name": "Digital Allies",
        #   "telephone": "+1-928-228-5769",
        #   "sameAs": [ ... ]
        # }
        content = re.sub(
            r'("name": "Digital Allies"\s*)}',
            r'\1,' + sameAs_jsonld + '\n  }',
            content
        )

        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)

print("Socials and phone added successfully.")
