# Ideal option

The ideal Option is a small single-page e-commerce demo for a gift shop. It's built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no bundler. Open `index.html` in a browser (or serve the folder statically) and it just works.

## Features

- **Hash-based SPA routing** — navigate between the home page, category filters, product detail pages, and the cart without a full page reload.
- **Product catalog** with category filtering (birthday, anniversary, holidays, personalized, jewelry, home & decor).
- **Shopping cart** — add items from the home grid or a product page, see a live item count on the header badge, view the full cart with a running total, and remove items one by one.
- **Product reviews** — each product page shows a review summary (average rating + count), the list of existing reviews, and a form to submit a new one (name, star rating, comment). Reviews persist in the browser via `localStorage`.
- **Responsive layout** with breakpoints for tablet and mobile.

## Project structure

```
CAPSTONE-PROJECT/
├── index.html            # App shell: header, nav, and the #app mount point
├── css/
│   └── styles.css        # All styling, including responsive breakpoints
├── js/
│   ├── data.js            # Product catalog, categories, and shared SVG icons
│   ├── cart.js            # CartStore: in-memory cart state (pub/sub)
│   ├── reviews.js          # ReviewStore: per-product reviews, persisted to localStorage
│   ├── router.js          # Minimal hash-based SPA router
│   ├── main.js             # Entry point: builds header/nav, registers routes, boots the router
│   └── views/
│       ├── home.js         # Home view: hero section + filterable product grid
│       ├── product.js      # Product detail view + reviews section
│       └── cart.js         # Cart view: list of items, remove, and total
└── assets/
    ├── hero.jpeg           # Hero image shown on the home page
    └── README.txt          # Notes on replacing the hero image
```

## How it works

### Routing
`router.js` implements a tiny router based on `window.location.hash`. Routes are registered as patterns like `/product/:id`, and on every `hashchange` the matching view function is called with the parsed params. Routes registered in `main.js`:

| Path | View |
|---|---|
| `/` | `renderHome` |
| `/category/:category` | `renderHome` (filtered) |
| `/product/:id` | `renderProduct` |
| `/cart` | `renderCart` |

### Cart
`CartStore` (in `js/cart.js`) is a simple closure-based store holding an array of products in memory. It exposes `addItem`, `removeItem`, `clear`, `getItems`, `getCount`, `getTotal`, and a `subscribe` method so any part of the UI (like the header badge) can react to changes. Cart state is **not** persisted — it resets on page reload.

### Reviews
`ReviewStore` (in `js/reviews.js`) keeps reviews grouped by product ID and persists them to `localStorage` under the key `gifthub_reviews`, so they survive page reloads. The first time the app runs, it seeds a few example reviews for some products purely for demo purposes.

### Views
Each view is a plain function `render<Name>(container, params)` that builds an HTML string and injects it into the container, then wires up event listeners. There's no virtual DOM — views simply re-render themselves (or a sub-section, like the reviews list) when their underlying state changes.

## Running locally

No install or build step is required. Two options:

1. **Open directly**: double-click `index.html` (all scripts are plain `<script>` tags, not ES modules, so this works even over `file://`).
2. **Serve statically** (recommended, needed for some browsers' stricter `file://` policies):
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```
   Then visit `http://localhost:8000`.

## Customizing

- **Products**: edit the `PRODUCTS` array in `js/data.js`.
- **Categories**: edit the `CATEGORIES` array in `js/data.js`.
- **Hero image**: replace `assets/hero.jpeg` (see `assets/README.txt` for sizing notes).
- **Styling**: colors and spacing are controlled by CSS variables at the top of `css/styles.css` (`--ink`, `--muted`, `--bg-soft`, `--border`).

## Known limitations

- Cart contents are in-memory only and reset on refresh (by design, for simplicity).
- There's no backend — reviews and products are all client-side, so multiple visitors don't share the same review data.
- No input validation beyond basic required-field checks on the review form.
