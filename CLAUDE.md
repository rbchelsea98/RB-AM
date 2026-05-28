# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

One-page marketing website for **Red Beacon Asset Management**. Pure static site — HTML, CSS, vanilla JS. No build step, no package manager, no framework.

## Running the site

Open `index.html` directly in a browser, or serve it with any static file server:

```bash
# Python (if available)
python -m http.server 8080

# VS Code: use the Live Server extension (right-click index.html → Open with Live Server)
```

No compilation, transpilation, or install step is needed.

## Architecture

Three files, flat structure:

| File | Responsibility |
|------|---------------|
| `index.html` | All markup and content. Sections in DOM order: `#navbar`, `#home` (hero), `#why-us` (USP), `#testimonials`, `#contact` (form), `#footer`. |
| `styles.css` | All styling. Design tokens at the top in `:root` CSS custom properties. Component styles follow DOM order. Responsive overrides at the bottom (`@media max-width: 768px`, then `769px–1024px`). |
| `script.js` | All interactivity in a single `DOMContentLoaded` handler, split into 8 numbered sections: smooth scroll, nav scroll effect, hamburger menu, fade-in observer, counter animation, carousel, form validation/submit, footer year. |

## Logo

The beacon mark is defined once as an SVG `<symbol id="beacon-mark">` at the top of `<body>` in `index.html` and referenced via `<use href="#beacon-mark">` in both the nav and footer. The mark inherits `color: var(--color-accent)` from `.logo-mark` so re-theming the accent colour automatically updates the icon.

Three shared CSS classes govern the lockup: `.logo-mark` (the SVG icon), `.logo-text` (column-flex text wrapper), `.logo-sub` ("Asset Management" sub-label). These appear once in `styles.css` just after `.nav-logo`.

A standalone horizontal lockup (mark + wordmark, embedded colours) lives in `logo.svg` — use this for external assets, email signatures, etc.

## Design tokens

All brand values live in `:root` in `styles.css` — edit there to retheme:

- `--color-primary: #0a2540` (navy)
- `--color-accent: #e05a8a` (rose-pink)
- `--font-heading`: Playfair Display (loaded from Google Fonts in `<head>`)
- `--font-body`: Inter (loaded from Google Fonts in `<head>`)
- `--nav-height: 72px` — used in both CSS and JS scroll offset calculations; keep in sync if changed.

## Key wiring

**JS ↔ CSS state classes** — script.js toggles classes that must exist in styles.css. If you rename one, rename the other:

| JS toggles | CSS defines |
|------------|-------------|
| `.nav-scrolled` on `#navbar` | `#navbar.nav-scrolled` |
| `.open` on `.nav-links` / `.hamburger` | `.nav-links.open`, `.hamburger.open` |
| `.visible` on `.fade-in` elements | `.fade-in.visible` |
| `.loading` on `#submitBtn` | `.btn-submit.loading` |
| `.error` on form inputs | `input.error` etc. |
| `.form-response.success` / `.form-response.error` | both classes in styles.css |
| `.active` on `.dot` | `.dot.active` |

**Counter data attributes** — each `.counter-value` element drives its own animation via `data-target`, `data-prefix`, `data-suffix`, `data-decimals`. The JS reads exactly those four attributes.

**Carousel** — index-based (`translateX(-N * 100%)`). Slide count is inferred at runtime from `.testimonial-card` children of `#carouselTrack`. Adding/removing a slide requires a matching `.dot` button in `#carouselDots` with the correct `data-index`.

## FormSubmit integration

The enquiry form uses [FormSubmit.co](https://formsubmit.co/) AJAX mode — no backend required.

**Two places require the real email address** (currently `your-email@example.com`):
1. `index.html` — `<form action="https://formsubmit.co/ajax/YOUR_EMAIL">`
2. `script.js` — `fetch('https://formsubmit.co/ajax/YOUR_EMAIL', ...)`

The AJAX endpoint returns `{ "success": "true" }` on delivery. On the very first submission FormSubmit sends an activation email to the recipient address — that link must be clicked before messages deliver.

## Nav behaviour difference between desktop and mobile

- **Desktop**: `#navbar` is `position: sticky`. It sits in normal document flow, so sections start directly below it.
- **Mobile (≤ 768px)**: `#navbar` switches to `position: fixed` (out of flow). `.hero` gains `padding-top: var(--nav-height)` to compensate. The smooth-scroll function in `script.js` subtracts `navbar.offsetHeight` from every target offset to handle both cases uniformly.
