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

/* Categories used by the nav and as a filter for the product grid */
var CATEGORIES = [
  { label: 'All gifts', slug: '' },
  { label: 'Birthday', slug: 'birthday' },
  { label: 'Anniversary', slug: 'anniversary' },
  { label: 'Holidays', slug: 'holiday' },
  { label: 'Personalized', slug: 'personalized' },
  { label: 'Jewelry', slug: 'jewelry' },
  { label: 'Home & decor', slug: 'home' }
];

var TAG_LABELS = {
  personalized: 'personalized',
  jewelry: 'jewelry',
  home: 'home',
  birthday: 'birthday',
  anniversary: 'anniversary',
  holiday: 'holiday'
};

var PRODUCTS = [
  { id: 'classic-denim', name: 'Classic Denim Collection', desc: 'Curated stack of premium washed denim jeans in various tones', rating: 4.8, price: 89.99, tag: 'personalized', photo: true },
  { id: 'distressed-wide-leg', name: 'Distressed Wide Leg Jeans', desc: 'Textured wide-leg denim with embroidered details, light wash', rating: 4.9, price: 119.99, tag: 'jewelry', photo: true },
  { id: 'flare-jean', name: 'The Flare Jean', desc: 'Distinctive flare cut in soft light-blue wash, elegant and effortless', rating: 4.7, price: 99.99, tag: 'home', photo: false },
  { id: 'wide-leg-edit', name: 'Wide Leg Edit', desc: 'Dark indigo wide-leg jeans with a clean, structured silhouette', rating: 4.5, price: 109.99, tag: 'birthday', photo: true },
  { id: 'denim-midi-skirt', name: 'Denim Midi Skirt', desc: 'High-waisted midi skirt in light wash denim with a front slit', rating: 4.9, price: 79.99, tag: 'anniversary', photo: false },
  { id: 'distressed-shorts', name: 'Distressed Denim Shorts', desc: 'Acid-wash shorts with a raw hem and ripped details', rating: 4.6, price: 59.99, tag: 'holiday', photo: false },
  { id: 'custom-necklace', name: 'Custom Name Necklace', desc: 'Gold-plated necklace with a personalized name', rating: 4.8, price: 79.99, tag: 'jewelry', photo: true },
  { id: 'succulent-kit', name: 'Succulent Garden Kit', desc: 'Complete kit to grow your own succulent garden', rating: 4.7, price: 34.99, tag: 'home', photo: true }
];

function findProductById(id) {
  for (var i = 0; i < PRODUCTS.length; i++) {
    if (PRODUCTS[i].id === id) return PRODUCTS[i];
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
