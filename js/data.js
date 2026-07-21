/* data.js
   App data source (product catalog) and shared SVG icons used
   across views. Loaded as a plain script (not a module) so it also
   works when opening index.html directly via file://.
*/

var ICONS = {
  placeholder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="m21 15-5-5L5 21"></path></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8"></path><path d="M16.5 8a2.5 2.5 0 0 0 0-5C13 3 12 8 12 8"></path></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"></path></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'
};

/* API URL and product catalog. The catalog is loaded from the backend
   via /products, but we keep a local copy here so the UI can render
   immediately without waiting for the network. */
var API_URL = 'http://localhost:3000';

var CATEGORIES = [
  { label: "All Jeans", slug: "" },
  { label: "Skinny", slug: "skinny" },
  { label: "Wide Leg", slug: "wide" },
  { label: "Flare", slug: "flare" },
  { label: "Shorts", slug: "shorts" },
  { label: "Favorites", slug: "favorites" }
];

var TAG_LABELS = {
  skinny: "Skinny",
  wide: "Wide Leg",
  flare: "Flare",
  shorts: "Shorts"
};

var PRODUCTS = [];

async function loadProducts() {
  try {
    var response = await fetch(API_URL + '/products');
    var data = await response.json();

    PRODUCTS = data.map(function (p) {
      return {
        id: p.id,
        name: p.name,
        desc: p.description,
        price: parseFloat(p.price),
        image: p.image,
        tag: p.fit_tag,
        photo: true
      };
    });
  } catch (e) {
    PRODUCTS = [];
    console.error('Could not load products from the server', e);
  }
}

function findProductById(id) {
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id == id) return PRODUCTS[i];
  }
  return null;
}

function renderStars(rating) {
  var full = Math.round(rating);
  var out = '';
  for (var i = 0; i < 5; i++) out += i < full ? '★' : '☆';
  return out;
}

/* Shared HTML-escaping helper, used anywhere user-provided text
   (review comments, names, emails...) gets injected into markup. */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
