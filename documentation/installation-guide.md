# Installation Guide

## Requirements
No build tools or server required — this is a static HTML/CSS/JS site.

## Steps
1. Unzip the project. You should see:
   - `pages/` — all HTML pages
   - `assets/` — css, js, images, fonts
   - `documentation/` — this folder
   - `robots.txt`, `sitemap.xml` — at the project root
2. Open `pages/index.html` directly in a browser to preview locally, **or**
3. For best results (so relative links and the map/embed behave correctly), serve the folder with a simple local server:
   ```bash
   cd interior-home-decor
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000/pages/index.html`.
4. To deploy: upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, or a standard web host via FTP). Set `pages/index.html` as your site's home page, or add a root-level redirect to it.

## Folder Structure
```
interior-home-decor/
├── pages/            → every .html page
├── assets/
│   ├── css/          → style.css, dark-mode.css, rtl.css, animation.css
│   ├── js/           → main.js, plugins/
│   ├── images/       → add your own photos here to replace the placeholders
│   └── fonts/        → optional local font files (Google Fonts are loaded via CDN by default)
├── documentation/     → this guide + customization guide, page structure, credits, changelog, support
├── robots.txt
├── sitemap.xml
└── README.md
```
