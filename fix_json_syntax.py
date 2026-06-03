import os
import re

files_to_fix = [
    'learn/seo-aeo.html',
    'learn/alttext.html',
    'assets/Design System /da-seo-implementation.html'
]

for filepath in files_to_fix:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the trailing comma in the sameAs array injection and remove it
    # We injected:
    # "https://maps.app.goo.gl/a9uGv4JSVHWEUZhQ6"
    #   ],
    #   }
    
    # We can replace: `],\n  }` with `]\n  }`
    content = re.sub(r'\],\n\s+\}', r']\n  }', content)
    
    # In one of them it might be `},\n  "areaServed"` but let's check
    # Wait, the injection in add_socials.py was:
    '''
  "telephone": "+1-928-228-5769",
  "sameAs": [
    "https://www.instagram.com/digitalallies__",
    "https://www.facebook.com/digitalallies",
    "https://maps.app.goo.gl/a9uGv4JSVHWEUZhQ6"
  ],
    '''
    # So replacing `],\n  } }` with `]\n  } }`
    content = content.replace('],\n  } }', ']\n  } }')
    content = content.replace('],\n  }', ']\n  }')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed syntax errors in JSON-LD")
