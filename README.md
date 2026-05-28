# RB-AM

Red Beacon Asset Management — one-page marketing website.

Built with HTML5, CSS3, and vanilla JavaScript. Form handling via [FormSubmit.co](https://formsubmit.co/) (no backend required).

## Files

| File | Purpose |
|------|---------|
| `index.html` | All markup — nav, hero, USP cards, testimonials carousel, enquiry form, footer |
| `styles.css` | Full design system — CSS variables, responsive layout, animations |
| `script.js` | Smooth scroll, carousel, counter animation, form validation + async submit |
| `logo.svg` | Standalone beacon mark + wordmark for external use |

## Setup

Open `index.html` directly in a browser — no build step needed.

Before the enquiry form will deliver emails, replace `your-email@example.com` in two places:
1. `index.html` line 136 — `<form action>`
2. `script.js` line 306 — `fetch()` URL

On first submission FormSubmit will send a one-time activation email — click the link to activate the endpoint.
