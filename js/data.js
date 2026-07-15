/* data.js
   Fuente de datos de la aplicación (catálogo de productos) e íconos SVG
   compartidos entre vistas. Se carga como script normal (no module) para
   funcionar también al abrir index.html directamente con file://.
*/

var ICONS = {
  placeholder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="m21 15-5-5L5 21"></path></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"></path></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>',
  gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8"></path><path d="M16.5 8a2.5 2.5 0 0 0 0-5C13 3 12 8 12 8"></path></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="3.6"></circle><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"></circle></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9h3V5.5h-3A4 4 0 0 0 10 9.5V12H7v3.5h3V21h3.5v-5.5H16l.7-3.5h-3.2V9.6c0-.4.3-.6.5-.6z"></path></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l16 16M20 4 4 20"></path></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"></circle><path d="M4.5 20.2a7.5 7.5 0 0 1 15 0"></path></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2"></rect><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"></path></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
  eyeOff: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"></path><path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c6.4 0 10 7 10 7a15.6 15.6 0 0 1-3.4 4.3M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a9.6 9.6 0 0 0 4.4-1"></path><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"></path></svg>',
  google: '<svg viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.9 1.5l2.6-2.5C17 3.1 14.7 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c5.3 0 8.6-3.7 8.6-8.9 0-.6-.06-1-.14-1.4H12Z"></path></svg>',
  apple: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.1 3.5c.1 1-.3 2-.9 2.7-.6.7-1.6 1.3-2.6 1.2-.1-1 .4-2 .9-2.6.6-.7 1.7-1.2 2.6-1.3ZM19.7 17c-.5 1.1-.7 1.6-1.4 2.6-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.7-.9s-2.4.9-3.7.9c-1.6 0-2.8-1.5-3.7-2.9C1 16.8 1.8 12.1 4.5 9.7c1.3-1.2 2.7-1.9 4-1.9 1.4 0 2.3 1 3.6 1s2-.9 3.7-.9c1.2 0 2.5.6 3.4 1.7-3 1.7-2.5 5.9.5 7.4Z"></path></svg>'
};

/* =====================================================
   CATEGORIES
===================================================== */

var CATEGORIES = [
  { label: "All Jeans", slug: "" },
  { label: "Skinny", slug: "skinny" },
  { label: "Mom Fit", slug: "mom-fit" },
  { label: "Straight", slug: "straight" },
  { label: "Wide Leg", slug: "wide-leg" },
  { label: "Bootcut", slug: "bootcut" }
];

var TAG_LABELS = {
  "skinny": "Skinny",
  "mom-fit": "Mom Fit",
  "straight": "Straight",
  "wide-leg": "Wide Leg",
  "bootcut": "Bootcut"
};

/* =====================================================
   PRODUCTS
===================================================== */

var PRODUCTS = [

{
    id: "skinny-black",
    name: "Black Skinny Jeans",
    desc: "Classic high-waisted skinny jeans with stretch fabric.",
    rating: 4.8,
    price: 69.99,
    tag: "skinny",
    color: "Black",
    fit: "Skinny",
    sizes: ["XS","S","M","L","XL"],
    image: "assets/products/skinny-black.jpg",
    photo: true
},

{
    id: "mom-light",
    name: "Light Blue Mom Jeans",
    desc: "Relaxed vintage fit perfect for everyday outfits.",
    rating: 4.9,
    price: 79.99,
    tag: "mom-fit",
    color: "Light Blue",
    fit: "Mom Fit",
    sizes: ["XS","S","M","L"],
    image: "assets/products/mom-light.jpg",
    photo: true
},

{
    id: "straight-blue",
    name: "Straight Blue Jeans",
    desc: "Timeless straight-leg jeans with premium denim.",
    rating: 4.7,
    price: 74.99,
    tag: "straight",
    color: "Blue",
    fit: "Straight",
    sizes: ["S","M","L","XL"],
    image: "assets/products/straight-blue.jpg",
    photo: true
},

{
    id: "wide-dark",
    name: "Dark Wide Leg Jeans",
    desc: "Wide leg silhouette with soft premium fabric.",
    rating: 4.9,
    price: 84.99,
    tag: "wide-leg",
    color: "Dark Blue",
    fit: "Wide Leg",
    sizes: ["XS","S","M","L"],
    image: "assets/products/wide-dark.jpg",
    photo: true
},

{
    id: "bootcut-classic",
    name: "Classic Bootcut Jeans",
    desc: "Elegant bootcut jeans designed for every occasion.",
    rating: 4.6,
    price: 72.99,
    tag: "bootcut",
    color: "Indigo",
    fit: "Bootcut",
    sizes: ["S","M","L","XL"],
    image: "assets/products/bootcut.jpg",
    photo: true
},

{
    id: "skinny-white",
    name: "White Skinny Jeans",
    desc: "Modern skinny jeans with soft stretch denim.",
    rating: 4.8,
    price: 67.99,
    tag: "skinny",
    color: "White",
    fit: "Skinny",
    sizes: ["XS","S","M","L"],
    image: "assets/products/skinny-white.jpg",
    photo: true
},

{
    id: "mom-dark",
    name: "Dark Mom Jeans",
    desc: "High-rise mom jeans with vintage wash.",
    rating: 4.7,
    price: 81.99,
    tag: "mom-fit",
    color: "Dark Blue",
    fit: "Mom Fit",
    sizes: ["XS","S","M","L"],
    image: "assets/products/mom-dark.jpg",
    photo: true
},

{
    id: "straight-black",
    name: "Straight Black Jeans",
    desc: "Minimalist straight-leg jeans for every style.",
    rating: 4.9,
    price: 76.99,
    tag: "straight",
    color: "Black",
    fit: "Straight",
    sizes: ["S","M","L","XL"],
    image: "assets/products/straight-black.jpg",
    photo: true
},

{
    id: "wide-light",
    name: "Light Wide Leg Jeans",
    desc: "Loose fit with comfortable premium cotton denim.",
    rating: 4.8,
    price: 86.99,
    tag: "wide-leg",
    color: "Light Blue",
    fit: "Wide Leg",
    sizes: ["XS","S","M","L"],
    image: "assets/products/wide-light.jpg",
    photo: true
},

{
    id: "bootcut-dark",
    name: "Dark Bootcut Jeans",
    desc: "Classic bootcut jeans with elegant finish.",
    rating: 4.7,
    price: 75.99,
    tag: "bootcut",
    color: "Dark Blue",
    fit: "Bootcut",
    sizes: ["S","M","L","XL"],
    image: "assets/products/bootcut-dark.jpg",
    photo: true
},

{
    id: "relaxed-fit",
    name: "Relaxed Fit Jeans",
    desc: "Comfortable relaxed fit with modern design.",
    rating: 4.8,
    price: 79.99,
    tag: "straight",
    color: "Medium Blue",
    fit: "Relaxed",
    sizes: ["S","M","L","XL"],
    image: "assets/products/relaxed.jpg",
    photo: true
},

{
    id: "vintage-denim",
    name: "Vintage Denim Jeans",
    desc: "Inspired by classic denim styles with premium quality.",
    rating: 5.0,
    price: 89.99,
    tag: "mom-fit",
    color: "Vintage Blue",
    fit: "Vintage",
    sizes: ["XS","S","M","L"],
    image: "assets/products/vintage.jpg",
    photo: true
}

];

/* =====================================================
   HELPERS
===================================================== */

function findProductById(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
        if (PRODUCTS[i].id === id) {
            return PRODUCTS[i];
        }
    }
    return null;
}

function renderStars(rating) {
    var full = Math.round(rating);
    var stars = "";

    for (var i = 0; i < 5; i++) {
        stars += i < full ? "★" : "☆";
    }

    return stars;
}