import re
import glob

pages_data = {
    'learn/dept-cooperation.html': {
        'name': 'System Integrations',
        'serviceType': 'Integrations',
        'description': "Your apps don't have to fight each other. Integrations connect your booking system, POS, CRM, email, and accounting so data moves without you touching it."
    },
    'learn/design-bureau.html': {
        'name': 'Website & Graphic Design',
        'serviceType': 'Design & Brand',
        'description': "How color, typography, layout, and performance decisions shape whether your brand earns trust or loses it. Plain-talk design principles."
    },
    'learn/self-governing-bureau.html': {
        'name': 'Business Automation',
        'serviceType': 'Automation',
        'description': "Repetitive tasks are for machines. Automation handles appointment reminders, invoice follow-ups, social posts, and data entry while you focus on the work that actually needs you."
    },
    'learn/ada-compliance.html': {
        'name': 'ADA Compliance & Web Accessibility',
        'serviceType': 'Accessibility',
        'description': "Website accessibility isn't just the right thing to do — it's a legal requirement and a business advantage. WCAG 2.1 AA and ADA compliance."
    },
    'learn/bilingual-web.html': {
        'name': 'Bilingual Web Design',
        'serviceType': 'Web Design',
        'description': "Bilingual web design for businesses. Don't leave the Hispanic market to competitors who showed up."
    }
}

for filepath, data in pages_data.items():
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if '<script type="application/ld+json">' in content:
        continue # Already has schema

    schema_json = f"""
    <script type="application/ld+json">
    {{
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "{data['name']}",
        "serviceType": "{data['serviceType']}",
        "description": "{data['description']}",
        "provider": {{
            "@type": "LocalBusiness",
            "@id": "https://digitalallies.net/#business",
            "name": "Digital Allies",
            "url": "https://digitalallies.net",
            "telephone": "+1-928-228-5769",
            "sameAs": [
                "https://www.instagram.com/digitalallies__",
                "https://www.facebook.com/digitalallies",
                "https://maps.app.goo.gl/a9uGv4JSVHWEUZhQ6"
            ]
        }},
        "areaServed": {{
            "@type": "Country",
            "name": "United States"
        }},
        "url": "https://digitalallies.net/{filepath.replace('.html', '')}"
    }}
    </script>
"""
    # Insert schema before </head>
    content = content.replace('</head>', schema_json + '</head>')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Injected Service JSON-LD schemas into learn pages.")
