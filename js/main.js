/* main.js
   Entry point of the SPA. Builds the header and nav (persistent
   chrome that doesn't change between routes), wires up the cart and
   the search bar, registers the routes, and starts the router.
*/

function showToast(message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function () {
    toast.classList.remove('show');
  }, 1800);
}

function renderHeader() {
  var header = document.getElementById('site-header');
  header.innerHTML =
    '<div class="logo" id="logo-home">' + ICONS.gift + ' The Ideal Option</div>' +
    '<div class="search-bar">' +
      '<div>' + ICONS.search + '<input type="text" id="search-input" placeholder="Search gifts..."></div>' +
    '</div>' +
    '<div class="cart-btn" id="cart-btn">' + ICONS.cart + '<span class="cart-badge" id="cart-badge" style="display:none">0</span></div>';

  header.querySelector('#logo-home').addEventListener('click', function () {
    Router.navigate('/');
  });

  header.querySelector('#search-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.value.trim()) {
      Router.navigate('/');
    }
  });

  var badge = header.querySelector('#cart-badge');
  CartStore.subscribe(function () {
    var count = CartStore.getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });

  header.querySelector('#cart-btn').addEventListener('click', function () {
    Router.navigate('/cart');
  });
}

function renderNav(activeSlug) {
  var nav = document.getElementById('site-nav');
  nav.innerHTML = CATEGORIES.map(function (c) {
    var isActive = (activeSlug || '') === c.slug;
    var href = c.slug ? '#/category/' + c.slug : '#/';
    return '<a class="' + (isActive ? 'active' : '') + '" href="' + href + '">' + c.label + '</a>';
  }).join('');
}

function updateActiveNavFromHash() {
  var path = (window.location.hash || '#/').replace(/^#/, '');
  var match = path.match(/^\/category\/([^/]+)$/);
  renderNav(match ? match[1] : '');
}

document.addEventListener('DOMContentLoaded', function () {
  renderHeader();
  updateActiveNavFromHash();
  window.addEventListener('hashchange', updateActiveNavFromHash);

  Router.register('/', renderHome);
  Router.register('/category/:category', renderHome);
  Router.register('/product/:id', renderProduct);
  Router.register('/cart', renderCart);

  Router.init(document.getElementById('app'));
});
