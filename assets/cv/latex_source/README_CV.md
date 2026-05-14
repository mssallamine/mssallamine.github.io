# CV Source Files — Allamine Mahamat Moussa

LaTeX source for three professional CVs. Compiled with pdflatex (MiKTeX).

The CVs are minimal pdflatex files without hyperref because MiKTeX package installation was unavailable.

## Files

| Source file | Output PDF | Purpose | Pages |
|---|---|---|---|
| `cv_one_page.tex` | `../one_page_cv.pdf` | One-page profile for quick screening | 1 |
| `cv_consulting.tex` | `../consulting_cv.pdf` | Two-page consulting & policy-evaluation CV | 2 |
| `cv_academic.tex` | `../academic_cv.pdf` | Full academic CV | 6 |

## How to compile (from this directory)

```powershell
cd D:\Personal_Website\assets\cv\latex_source

pdflatex -interaction=nonstopmode cv_one_page.tex
pdflatex -interaction=nonstopmode cv_consulting.tex
pdflatex -interaction=nonstopmode cv_academic.tex

# Copy PDFs to the cv folder
Copy-Item cv_one_page.pdf   ..\one_page_cv.pdf   -Force
Copy-Item cv_consulting.pdf ..\consulting_cv.pdf -Force
Copy-Item cv_academic.pdf   ..\academic_cv.pdf   -Force
```

## Packages used

All packages are standard and ship with MiKTeX base:
- `fontenc`, `inputenc`, `lmodern` — font encoding and typography
- `geometry` — page margins
- `xcolor` — color (navy, gold, mgray)
- `array`, `tabularx`, `booktabs` — tables and column types

**Not used (unavailable during initial setup):** `hyperref`, `enumitem`, `titlesec`, `fancyhdr`, `parskip`

Custom replacements:
- Section headings: `\newcommand{\cvsection}[1]{...}` replaces titlesec
- Page footer: `\makeatletter\def\ps@cvfoot{...}\makeatother` replaces fancyhdr
- List spacing: manual `\setlength{\itemsep}{...}` replaces enumitem
- Bullets in tables: `\textcolor{gold}{\small\textbullet}\enspace` (manual, inside tabular cells)

## Placeholders to fill in before publishing

| Placeholder | Location | Section |
|---|---|---|
| `your.email@example.com` | All three `.tex` files | Header |
| `your-profile` (LinkedIn) | All three `.tex` files | Header |
| `your-username` (GitHub) | All three `.tex` files | Header |

## Color scheme (matches website)

- Navy: `RGB(13,31,60)` — section headings, name
- Gold: `RGB(201,168,76)` — decorative rules, bullet points
- Mid-gray: `RGB(95,105,120)` — dates, secondary text

## Updating

- All content is plain text inside standard LaTeX environments — no custom class file needed.
- Dates, titles, and descriptions can be edited directly in the `.tex` files.
- Re-run `pdflatex` after any change.
