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

/* Categorías usadas por el nav y como filtro de la grilla de productos */
var CATEGORIES = [
  { label: 'Todos los regalos', slug: '' },
  { label: 'Cumpleaños', slug: 'birthday' },
  { label: 'Aniversario', slug: 'anniversary' },
  { label: 'Días festivos', slug: 'holiday' },
  { label: 'Personalizados', slug: 'personalized' },
  { label: 'Joyería', slug: 'jewelry' },
  { label: 'Hogar y decoración', slug: 'home' }
];

var TAG_LABELS = {
  personalized: 'personalizado',
  jewelry: 'joyería',
  home: 'hogar',
  birthday: 'cumpleaños',
  anniversary: 'aniversario',
  holiday: 'festivo'
};

var PRODUCTS = [
  { id: 'classic-denim', name: 'Colección Denim Clásica', desc: 'Pila curada de jeans denim lavados premium en varios tonos', rating: 4.8, price: 89.99, tag: 'personalized', photo: true },
  { id: 'distressed-wide-leg', name: 'Jeans Wide Leg Desgastados', desc: 'Denim wide-leg texturizado con detalles bordados, lavado claro', rating: 4.9, price: 119.99, tag: 'jewelry', photo: true },
  { id: 'flare-jean', name: 'The Flare Jean', desc: 'Corte flare distintivo en lavado azul claro suave, elegante y sin esfuerzo', rating: 4.7, price: 99.99, tag: 'home', photo: false },
  { id: 'wide-leg-edit', name: 'Wide Leg Edit', desc: 'Jeans wide-leg índigo oscuro con silueta limpia y estructurada', rating: 4.5, price: 109.99, tag: 'birthday', photo: true },
  { id: 'denim-midi-skirt', name: 'Falda Midi de Denim', desc: 'Falda midi de talle alto en denim lavado claro con abertura frontal', rating: 4.9, price: 79.99, tag: 'anniversary', photo: false },
  { id: 'distressed-shorts', name: 'Shorts de Denim Desgastados', desc: 'Shorts acid-wash con dobladillo crudo y detalles rasgados', rating: 4.6, price: 59.99, tag: 'holiday', photo: false },
  { id: 'custom-necklace', name: 'Collar con Nombre Personalizado', desc: 'Collar bañado en oro con nombre personalizado', rating: 4.8, price: 79.99, tag: 'jewelry', photo: true },
  { id: 'succulent-kit', name: 'Kit de Jardín de Suculentas', desc: 'Kit completo para cultivar tu propio jardín de suculentas', rating: 4.7, price: 34.99, tag: 'home', photo: true }
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
