/* views/favorites.js
   Favorites view: shows the products the logged-in user has saved.
   Reuses renderProductCard / wireProductGrid from views/home.js so
   the cards look and behave exactly like the ones on the home grid.
*/

function renderFavorites(container) {
  if (renderFavorites._unsubscribe) {
    renderFavorites._unsubscribe();
    renderFavorites._unsubscribe = null;
  }
  if (!AuthStore.isLoggedIn()) {
    container.innerHTML =
      '<div class="detail">' +
        '<div class="empty-state">' +
          'Log in to see the jeans you\'ve saved.<br>' +
          '<button class="btn btn-primary" id="fav-login-btn" style="margin-top:16px">Log in</button>' +
        '</div>' +
      '</div>';
    container.querySelector('#fav-login-btn').addEventListener('click', function () {
      Router.navigate('/login');
    });
    return;
  }

  var favorites = FavoritesStore.getFavorites();

  container.innerHTML =
    '<section class="products" id="products-section">' +
      '<div class="products-header">' +
        '<h2>Your favorites</h2>' +
        '<span>' + favorites.length + ' product' + (favorites.length === 1 ? '' : 's') + '</span>' +
      '</div>' +
      '<div class="product-grid" id="product-grid"></div>' +
    '</section>';

  var grid = container.querySelector('#product-grid');
  if (favorites.length === 0) {
    grid.innerHTML = '<div class="empty-state">You haven\'t saved any favorites yet. Tap the heart on a product to save it here.</div>';
    return;
  }

  grid.innerHTML = favorites.map(renderProductCard).join('');
  wireProductGrid(grid);

  // Unlike the home grid, removing a favorite here should make its
  // card disappear immediately, so re-render the whole view whenever
  // a favorite is toggled off from this page.
  renderFavorites._unsubscribe = FavoritesStore.subscribe(function () {
    renderFavorites(container);
  });
};

