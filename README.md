# Voryzaq Services — Agency Portfolio

A premium, single-page portfolio site for **Voryzaq Services**, a web development agency. Pure black/white (ink & paper) theme, no build step — just static HTML/CSS/JS, ready for GitHub Pages.

## Structure
```
voryzaq/
├── index.html        ← homepage
├── portfolio.html     ← full work page (filterable grid, incl. Graphic Design)
├── privacy.html       ← Privacy Policy
├── terms.html         ← Terms & Conditions
├── cookies.html       ← Cookie Policy
├── assets/
│   ├── logo-icon.png   ← icon mark, transparent bg (used in nav, preloader, footer)
│   ├── logo-full.png   ← full lockup with wordmark + tagline (spare, not wired in yet)
│   └── favicon-*.png
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Before you publish — replace these placeholders

| Where | What to change |
|---|---|
| `portfolio.html` → **each `.portfolio-card`** | Replace `href="https://github.com/voryzaq"` with the real repo/live link, swap the placeholder name (e.g. "Studio Nine") and category label for the real project, and set `data-cat` to match one of: `web`, `ecommerce`, `landing`, `redesign`, `graphic` |
| `portfolio.html` / `index.html` → graphic design cards (`.poster-mock`) | These are CSS-drawn placeholders standing in for real design work — swap the `.pf-preview`/`.work-preview` div for an `<img>` of the actual artwork once you have some to show |
| `index.html` → **Contact** section (`#contact`) | Replace `hello@voryzaq.com` with your real email |
| Both files → **Footer** | Replace the empty `href="#"` LinkedIn/Instagram links with your real profile URLs |
| `contact-form` (`#contactForm`) | Already wired to submit to Formspree — just needs your real form ID. See "Get the contact form sending you real emails" below. |
| `<title>` / meta description in both `<head>`s | Update if you rename the agency |

## Portfolio page notes
- The masonry grid uses CSS multi-column layout (`columns: 3`), so it reflows automatically — no JS masonry library needed.
- Filter buttons (All / Web Design / E‑Commerce / Landing Pages / Redesigns / Graphic Design) crossfade the grid using `data-cat` on each card — add more categories by adding a new filter button with a matching `data-filter` value and giving cards that `data-cat`.
- Graphic design cards use a dark "canvas" tile style (`.poster-mock`) to read as design artifacts rather than website screenshots, mixed in with the browser-style previews for web work.
- **Real, shipped projects** (Wear Drip, Luxora, Aldermere) use a live `<iframe>` embed instead of a drawn wireframe (`.live-embed` — zoomed out via CSS transform so it reads as a thumbnail, grayscale by default and reveals color on hover). This shows the actual live site with zero screenshot maintenance — it always reflects whatever is currently deployed at that URL. When you replace a placeholder with a real project, copy this same `.live-embed`/`<iframe>` pattern instead of the `wp-line`/`wp-blocks` wireframe divs.

## Get the contact form sending you real emails

The form (`index.html` → `#contact`) is wired to submit via [Formspree](https://formspree.io) — a free service that turns a plain HTML form into working email delivery, no backend needed.

1. Go to [formspree.io](https://formspree.io) and sign up (free plan is fine to start — 50 submissions/month).
2. Create a new form and enter the email address you want submissions sent to.
3. Formspree gives you an endpoint that looks like `https://formspree.io/f/abcdwxyz`.
4. In `index.html`, find the line:
   ```html
   <form class="contact-form reveal" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   and replace `YOUR_FORM_ID` with your real ID.
5. Push the change and submit the live form once — Formspree sends a confirmation link to verify your email before it starts forwarding messages.

That's it — every submission now lands in your inbox. Until you swap in your real ID, submitting the form will show a message telling the visitor it isn't connected yet (instead of silently failing), so you'll never accidentally lose a lead without knowing.

A couple of things already built in:
- Submissions go through in the background (no page reload) with a "Sending…" state on the button and a clear success/error message underneath.
- There's a hidden honeypot field (`_gotcha`) that Formspree uses to silently drop spam-bot submissions — real visitors never see it, don't touch it.
- If Formspree ever returns an error (e.g. you hit the free-plan submission limit), the visitor is shown a message pointing them to `hello@voryzaq.com` directly instead of a dead end.

If you'd rather use a different service (Getform, Basin, your own backend, etc.), just swap the `action` URL — the JavaScript in `js/script.js` (`Contact form` section) posts a standard `FormData` object and reads a JSON `{errors: [...]}` shape back, which is the same convention Formspree/Getform both use.

## Deploy on GitHub Pages

1. Create a repo (e.g. `voryzaq-portfolio` or `voryzaq.github.io` for a root domain).
2. Push these files to the repo root (or `/docs` folder).
3. In the repo, go to **Settings → Pages** → set source to your branch (and `/docs` if used).
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Notes on the design
- Fonts (Space Grotesk / Inter / JetBrains Mono) load from Google Fonts via `<link>` tags in `index.html` — no install needed.
- Custom cursor, magnetic buttons, and the blueprint-grid background are disabled automatically on touch devices and for users with reduced-motion preferences.
- Everything is hand-written HTML/CSS/JS — no frameworks, no build tools.

## Legal pages & cookie notice
- `privacy.html`, `terms.html` and `cookies.html` are linked in every page's footer under "Legal". They're written as genuine, usable drafts (not lorem ipsum) but are **general templates, not legal advice** — each page ends with a note flagging that, plus specific things to double-check (e.g. the governing-law clause in `terms.html` assumes Pakistan; update if your business is registered elsewhere).
- Update `hello@voryzaq.com` in all three once you have a real inbox, and revisit `privacy.html`'s note about the contact form once it's wired to a real backend (it currently says the form doesn't transmit data yet).
- A small cookie notice banner (bottom of the screen, dismissible) appears on every page via `js/script.js` and links to `cookies.html`. It only ever sets one thing: a `localStorage` flag remembering it's been dismissed — no tracking or analytics cookies are set by this site currently. If you add analytics later (e.g. Google Analytics), update `cookies.html` and consider whether the banner needs an actual "reject" option to stay compliant, particularly for EU/UK visitors under the ePrivacy Directive.
- Image/asset licensing: this site itself uses no external photography (Google Fonts + hand-drawn CSS graphics only). The **Wear Drip** demo project uses royalty-free Unsplash photos (no attribution required under the Unsplash License) per its own README — if you swap in real client photography for any project, confirm you have the rights to use it before publishing.
