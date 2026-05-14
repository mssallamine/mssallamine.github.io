# Moussa Allamine — Personal Academic & Consulting Website

A clean, responsive, static website for GitHub Pages.

## Structure

```
Personal_Website/
├── index.html          # All content (single-page layout)
├── style.css           # All styles
├── script.js           # Navigation, animations, smooth scroll
├── .nojekyll           # Disables Jekyll on GitHub Pages
├── README.md           # This file
└── assets/
    ├── cv/
    │   ├── academic_cv.pdf       ← place your PDF here
    │   ├── consulting_cv.pdf     ← place your PDF here
    │   └── one_page_cv.pdf       ← place your PDF here
    ├── img/                      ← profile photo or project images
    └── docs/                     ← papers, presentations, policy briefs
```

## How to Preview Locally

Open `index.html` directly in any modern browser — no server needed.

On Windows you can also run a quick local server with Python:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## How to Push to GitHub

### First time

```bash
git init
git add .
git commit -m "Initial site"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. If you want a project site
instead of a user site, the repository name can be anything (e.g. `portfolio`).

### Subsequent updates

```bash
git add .
git commit -m "Update content"
git push
```

## How to Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Source**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder.
5. Click **Save**.

Your site will be live at `https://YOUR_USERNAME.github.io` (user site)
or `https://YOUR_USERNAME.github.io/REPO_NAME` (project site) within a minute or two.

## Customisation Guide

| What to change | Where |
|---|---|
| Name, headline, intro text | `index.html` — `#home` section |
| About / biography | `index.html` — `#about` section |
| Research chapters | `index.html` — `#research` section |
| Consulting services | `index.html` — `#consulting` section |
| Projects | `index.html` — `#projects` section |
| CV download links | `index.html` — `#cv` section |
| Email / social links | `index.html` — `#contact` section |
| Colors | `style.css` — `:root` variables at the top |
| Fonts | `index.html` — Google Fonts `<link>` tag |

## Adding Your CV Files

Place your PDF files in the `assets/cv/` folder:

```
assets/cv/academic_cv.pdf
assets/cv/consulting_cv.pdf
assets/cv/one_page_cv.pdf
```

The download buttons will work automatically once the files are in place.

## Notes

- The `.nojekyll` file ensures GitHub Pages serves the site as plain HTML
  without trying to process it through Jekyll.
- All fonts are loaded from Google Fonts. The site works offline once the
  fonts have been cached by the browser, or you can download and self-host them.
- No frameworks, no build step, no dependencies — just HTML, CSS, and JavaScript.
