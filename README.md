# Red Beacon Asset Management

A modern, professional one-page marketing website for Red Beacon Asset Management. Built with pure HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step.

**Live site:** https://rbchelsea98.github.io/RB-AM/

---

## Features

- Sticky navigation with smooth scroll and mobile hamburger menu
- Full-viewport hero with animated number counters (AUM, clients, years, retention)
- 4-card USP grid with hover lift effects
- Auto-rotating testimonials carousel with swipe support
- Enquiry form with client-side validation and async submission via FormSubmit.co
- Responsive from 320px to 1920px
- Fade-in animations on scroll using IntersectionObserver
- Custom beacon SVG logo mark

## Tech Stack

| Layer | Choice |
|-------|--------|
| Markup | HTML5 (semantic) |
| Styles | CSS3 — custom properties, flexbox/grid, media queries |
| Scripts | Vanilla JavaScript (ES6+) |
| Forms | [FormSubmit.co](https://formsubmit.co/) AJAX |
| Fonts | Playfair Display + Inter (Google Fonts) |
| Hosting | GitHub Pages |

## Files

```
index.html      All markup and content
styles.css      Design system — tokens, components, responsive
script.js       Interactivity — scroll, carousel, counters, form
logo.svg        Standalone beacon mark + wordmark
CLAUDE.md       Architecture guide for AI-assisted development
```

## Local Development

Open `index.html` directly in any modern browser — no install or build step required.

## Form Setup

The enquiry form uses FormSubmit.co for email delivery. Replace `your-email@example.com` in two places before going live:

1. `index.html` — `<form action="https://formsubmit.co/ajax/YOUR_EMAIL">`
2. `script.js` — `fetch('https://formsubmit.co/ajax/YOUR_EMAIL', ...)`

On first submission, FormSubmit sends a one-time activation email to that address — click the link to start receiving enquiries.

## Colour Palette

| Token | Value | Use |
|-------|-------|-----|
| Primary | `#0a2540` | Navy — backgrounds, text |
| Accent | `#e05a8a` | Rose-pink — highlights, CTAs |
| Background | `#f8f9fa` | Light grey sections |
