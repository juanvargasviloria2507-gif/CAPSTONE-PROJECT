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
  { label: "All Jeans", slug: "" },
  { label: "Skinny", slug: "skinny" },
  { label: "Mom Fit", slug: "mom-fit" },
  { label: "Straight", slug: "straight" },
  { label: "Wide Leg", slug: "wide-leg" },
  { label: "Bootcut", slug: "bootcut" },
  { label: "Favorites", slug: "favorites" }
];

var TAG_LABELS = {
  "skinny": "Skinny",
  "mom-fit": "Mom Fit",
  "straight": "Straight",
  "wide-leg": "Wide Leg",
  "bootcut": "Bootcut"
};

var PRODUCTS = [

{
    id: "skinny-black",
    name: "Black Skinny Jeans",
    desc: "Classic high-waisted skinny jeans with stretch fabric.",
    rating: 4.8,
    price: 69.99,
    tag: "skinny",
    color: "black",
    fit: "Skinny",
    sizes: ["XS","S","M","L","XL"],
    image: "assets/products/skinny-black.jpg",
    photo: true,
    style: "trendy"
},

{
    id: "mom-light",
    name: "Light Blue Mom Jeans",
    desc: "Relaxed vintage fit perfect for everyday outfits.",
    rating: 4.9,
    price: 79.99,
    tag: "mom-fit",
    color: "dark",
    fit: "Mom Fit",
    sizes: ["XS","S","M","L"],
    image: "assets/products/mom-light.jpg",
    photo: true,
    style: "trendy"
},

{
    id: "straight-blue",
    name: "Straight Blue Jeans",
    desc: "Timeless straight-leg jeans with premium denim.",
    rating: 4.7,
    price: 74.99,
    tag: "straight",
    color: "ligth",
    fit: "Straight",
    sizes: ["S","M","L","XL"],
    image: "assets/products/straight-blue.jpg",
    photo: true,
    style: "comfort"
},

{
    id: "wide-dark",
    name: "Dark Wide Leg Jeans",
    desc: "Wide leg silhouette with soft premium fabric.",
    rating: 4.9,
    price: 84.99,
    tag: "wide-leg",
    color: "dark",
    fit: "Wide Leg",
    sizes: ["XS","S","M","L"],
    image: "assets/products/wide-dark.jpg",
    photo: true,
    style: "comfort"
},

{
    id: "bootcut-classic",
    name: "Classic Bootcut Jeans",
    desc: "Elegant bootcut jeans designed for every occasion.",
    rating: 4.6,
    price: 72.99,
    tag: "bootcut",
    color: "black",
    fit: "Bootcut",
    sizes: ["S","M","L","XL"],
    image: "assets/products/bootcut.jpg",
    photo: true,
    style: "everyday"
},

{
    id: "skinny-white",
    name: "White Skinny Jeans",
    desc: "Modern skinny jeans with soft stretch denim.",
    rating: 4.8,
    price: 67.99,
    tag: "skinny",
    color: "dark",
    fit: "Skinny",
    sizes: ["XS","S","M","L"],
    image: "assets/products/skinny-white.jpg",
    photo: true,
    style: "everyday"
},

{
    id: "mom-dark",
    name: "Dark Mom Jeans",
    desc: "High-rise mom jeans with vintage wash.",
    rating: 4.7,
    price: 81.99,
    tag: "mom-fit",
    color: "light",
    fit: "Mom Fit",
    sizes: ["XS","S","M","L"],
    image: "assets/products/mom-dark.jpg",
    photo: true,
    style: "premium"
},

{
    id: "straight-black",
    name: "Straight Black Jeans",
    desc: "Minimalist straight-leg jeans for every style.",
    rating: 4.9,
    price: 76.99,
    tag: "straight",
    color: "black",
    fit: "Straight",
    sizes: ["S","M","L","XL"],
    image: "assets/products/straight-black.jpg",
    photo: true,
    style: "premium"
},

{
    id: "wide-light",
    name: "Light Wide Leg Jeans",
    desc: "Loose fit with comfortable premium cotton denim.",
    rating: 4.8,
    price: 86.99,
    tag: "wide-leg",
    color: "light",
    fit: "Wide Leg",
    sizes: ["XS","S","M","L"],
    image: "assets/products/wide-light.jpg",
    photo: true,
    style: "premium"
},

{
    id: "bootcut-dark",
    name: "Dark Bootcut Jeans",
    desc: "Classic bootcut jeans with elegant finish.",
    rating: 4.7,
    price: 75.99,
    tag: "bootcut",
    color: "dark",
    fit: "Bootcut",
    sizes: ["S","M","L","XL"],
    image: "assets/products/bootcut-dark.jpg",
    photo: true,
    style: "everyday"
},

{
    id: "relaxed-fit",
    name: "Relaxed Fit Jeans",
    desc: "Comfortable relaxed fit with modern design.",
    rating: 4.8,
    price: 79.99,
    tag: "straight",
    color: "light",
    fit: "Relaxed",
    sizes: ["S","M","L","XL"],
    image: "assets/products/relaxed.jpg",
    photo: true,
    style: "everyday"
},

{
    id: "vintage-denim",
    name: "Vintage Denim Jeans",
    desc: "Inspired by classic denim styles with premium quality.",
    rating: 5.0,
    price: 89.99,
    tag: "mom-fit",
    color: "black",
    fit: "Vintage",
    sizes: ["XS","S","M","L"],
    image: "assets/products/vintage.jpg",
    photo: true,
    style: "trendy"
}

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
