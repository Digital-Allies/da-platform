# Publishing the Digital Allies Design System

The system is a **static site** — plain HTML, CSS, JS, fonts, and images with
relative links. That means it runs on any static host with **no build step**.
Open `index.html` and every portal, download, and asset resolves on its own.

## Fastest path to a custom URL

Pick any one of these. All are free for a site this size and all support a
custom domain (e.g. `system.digitalallies.net`).

### Option A — Netlify Drop (no account tools, ~2 min)
1. Download the whole project (the chat download card, or zip this folder).
2. Go to **app.netlify.com/drop** and drag the unzipped folder onto the page.
3. You get a live `*.netlify.app` URL instantly.
4. **Site settings → Domain management → Add custom domain** → enter your domain
   and follow the DNS records it shows you.

### Option B — Cloudflare Pages / Vercel
1. Push this folder to a GitHub repo (or use their drag-drop upload).
2. New project → select the repo → **framework preset: None**, **build command:
   empty**, **output dir: `/`**.
3. Add your custom domain under the project's Domains tab.

### Option C — GitHub Pages
1. Push to a repo, enable **Settings → Pages → deploy from branch → root**.
2. Add your domain in the Pages "Custom domain" field; create a `CNAME` DNS
   record pointing at `<user>.github.io`.

## DNS, in plain English
- For a subdomain (`system.digitalallies.net`): add a **CNAME** record pointing
  to the host's target (they tell you the exact value).
- For the root (`digitalallies.net`): use the host's **A / ALIAS** records.
- HTTPS is automatic on all three hosts once DNS resolves.

## Notes
- Nothing here calls a server or database, so there's nothing to configure.
- The `downloads/*.zip` bundles are real files and will download correctly once
  hosted (the `download` attribute is already set on every button).
- The React/Babel kits (UI kit, social canvas) load their libraries from a CDN,
  so the host just needs to be online — no extra setup.

_I can't push to a host directly from here, but the folder above is the exact
thing you upload — no changes needed._
