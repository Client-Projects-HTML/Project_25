# Customization Guide

## Colors
All colors are CSS variables in `assets/css/style.css` under `:root`:
```css
--primary: #8B5E3C;
--secondary: #D9B08C;
--accent: #F4E1D2;
--background: #FFF9F5;
--dark-text: #2F2F2F;
```
Change these and the whole site updates. Dark mode overrides live separately in `assets/css/dark-mode.css`.

## Fonts
Headings use **Poppins**, body text uses **Open Sans**, loaded from Google Fonts at the top of `style.css`. To swap fonts, change the `@import` URL and the `font-family` values.

## Replacing Images
All images currently point to Unsplash placeholder URLs so you can preview the design immediately. Replace the `src` attributes with your own photos in `assets/images/` (folders are already set up per category: hero, gallery, projects, painting, wallpaper, furniture, curtains, lighting, team, testimonials, icons, blog).

## Dark / Light Mode
- Toggled by the moon/sun button in the header (`#themeToggle`).
- Defaults to the visitor's OS preference (`prefers-color-scheme`) on first load.
- The choice is kept in memory for the current visit only. To make it persist across visits, store it in `localStorage` inside `initThemeToggle()` in `main.js`.

## RTL (Right-to-Left) Support
- Toggled by the direction button in the header (`#dirToggle`).
- Overrides live in `assets/css/rtl.css`, keyed off `[dir="rtl"]`.
- For a real Arabic/Hebrew version, also translate the page copy and consider a dedicated `/ar/` page set rather than the live toggle (the toggle is a demonstration of RTL-readiness).

## Forms & Integrations
- **Contact form** (`contact.html`): the `<form>` tag already has `action="https://formspree.io/f/YOUR_FORM_ID"` — replace `YOUR_FORM_ID` with your real Formspree (or Netlify Forms) endpoint. Note the current JS intercepts submission to show an in-page success message for the demo; remove `e.preventDefault()` in `initFormValidation()` (main.js) once your real endpoint is wired up, or keep it and use `fetch()` to post in the background.
- **Newsletter** (footer, every page + Coming Soon page): swap the form's submission for your Mailchimp/ConvertKit embed code or API call.
- **Google Map** (`contact.html`): replace the iframe `src` with your business's actual Google Maps embed URL.
- **Calendar/booking** (`consultation.html`): the date field is a plain `<input type="date">` placeholder. Swap in a calendar/availability widget (e.g., Calendly embed) if you need real-time slot booking.
- **Payment buttons** (`pricing.html`): Stripe and PayPal buttons are present but disabled placeholders — connect a real Stripe Payment Link or PayPal button ID to activate them.

## Spacing
A basic 8px-based spacing scale is available as CSS variables (`--space-1` through `--space-8` in `style.css`) if you want to standardize margins/padding as you customize sections.
