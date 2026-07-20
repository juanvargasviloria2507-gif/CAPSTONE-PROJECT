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
      '<div>' + ICONS.search + '<input type="text" id="search-input" placeholder="Search Jeans..."></div>' +
    '</div>' +
    '<div class="header-actions">' +
      '<div class="account-area" id="account-area"></div>' +
      '<div class="fav-nav-btn" id="fav-nav-btn">' + ICONS.heart + '<span class="cart-badge" id="fav-badge" style="display:none">0</span></div>' +
      '<div class="cart-btn" id="cart-btn">' + ICONS.cart + '<span class="cart-badge" id="cart-badge" style="display:none">0</span></div>' +
    '</div>';

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

  var favBadge = header.querySelector('#fav-badge');
  function updateFavBadge() {
    var count = FavoritesStore.getCount();
    favBadge.textContent = count;
    favBadge.style.display = count > 0 ? 'flex' : 'none';
  }
  FavoritesStore.subscribe(updateFavBadge);
  updateFavBadge();

  header.querySelector('#fav-nav-btn').addEventListener('click', function () {
    Router.navigate('/favorites');
  });

  renderAccountArea(header);
  AuthStore.subscribe(function () {
    renderAccountArea(header);
    updateFavBadge();
  });
}

function renderAccountArea(header) {
  var area = header.querySelector('#account-area');
  var user = AuthStore.getCurrentUser();

  if (user) {
    area.innerHTML =
      '<div class="account-chip">' +
        '<span class="account-chip-name">' + ICONS.user + escapeHtml(user.name) + '</span>' +
        '<button type="button" id="logout-btn" class="account-logout">Log out</button>' +
      '</div>';
    area.querySelector('#logout-btn').addEventListener('click', function () {
      AuthStore.logout();
      showToast('Logged out');
      Router.navigate('/');
    });
  } else {
    area.innerHTML = '<button type="button" class="btn btn-secondary account-login-btn" id="login-nav-btn">Log in</button>';
    area.querySelector('#login-nav-btn').addEventListener('click', function () {
      Router.navigate('/login');
    });
  }
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
  Router.register('/favorites', renderFavorites);
  Router.register('/login', renderLogin);
  Router.register('/quiz', renderQuiz);

  Router.init(document.getElementById('app'));
});
