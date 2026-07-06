# Vercel Deployment Setup

This repo is ready to deploy to Vercel with zero build steps. The learner app is a static HTML/React export that runs in the browser.

## Quick Start

1. **Connect your repo to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" → "Project"
   - Import this GitHub repository
   - Select "Other" as the framework preset (or leave blank)

2. **Configure build settings**
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
   - **Install Command:** (leave empty)
   - Everything else can stay as default

3. **Deploy**
   - Click "Deploy"
   - Vercel will serve the repo root as-is

## How It Works

- [index.html](index.html) redirects to [healthcare-training-center/project/export/src/Learner App.html](healthcare-training-center/project/export/src/Learner%20App.html)
- The learner app is a Figma Make export using React + Babel in-browser
- All assets (CSS, icons, fonts) are served as static files
- No build step needed — Vercel just serves the files as-is

## After Deploy

Once live, test:
- Open the root domain — it should redirect to `/healthcare-training-center/project/export/src/Learner%20App.html`
- The learner app should load with all rooms, courses, and progress tracking
- Verify fonts and icons load from CDN and local assets

## Optional: Add a vercel.json

If you want explicit redirects or cache control, see [vercel.json](vercel.json).

## Maintenance

- To update the learner app, re-export from Figma Make and sync files to `healthcare-training-center/project/export/src/`
- No rebuild needed — Vercel deploys instantly on push to `main`

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Learner app doesn't load | Check that `/healthcare-training-center/project/export/src/Learner App.html` exists |
| Assets 404 | Verify relative paths in the HTML match the folder structure |
| Fonts don't load | Fonts pull from Google Fonts CDN — check network connectivity |
| Progress not persisting | Check browser localStorage is enabled |
