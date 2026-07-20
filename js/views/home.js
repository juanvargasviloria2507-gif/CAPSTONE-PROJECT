/* views/home.js
   Main view: hero + product grid, filterable by category via the
   ":category" route parameter (used by the nav).
*/

function renderHome(container, params) {
  var categorySlug = (params && params.category) || '';
  var filtered = categorySlug
    ? PRODUCTS.filter(function (p) { return p.tag === categorySlug; })
    : PRODUCTS;

  var categoryLabel = CATEGORIES.find(function (c) { return c.slug === categorySlug; });
  var heading = categoryLabel ? categoryLabel.label : 'All gifts';

  container.innerHTML =
    '<section class="hero">' +
      '<div class="hero-copy">' +
        '<span class="hero-kicker">Handpicked, since forever</span>' +
        '<h1>Find the perfect pants for every occasion</h1>' +
        '<p>Discover unique, thoughtfully chosen gifts that will make your loved ones smile. From personalized treasures to timeless classics, we have something special for everyone.</p>' +
        '<div class="hero-actions">' +
          '<button class="btn btn-primary" id="shop-now-btn">Shop now</button>' +
          '<button class="btn btn-secondary">Gift guide</button>' +
        '</div>' +
      '</div>' +
      '<div class="hero-visual">' +
        '<div class="art">' +
          '<img src="assets/hero.jpeg" alt="The Flare" class="hero-img" onerror="this.style.display=\'none\'">' +
       
        '</div>' +
      '</div>' +
    '</section>' +
    '<section class="products" id="products-section">' +
      '<div class="products-header">' +
        '<h2>' + heading + '</h2>' +
        '<span>' + filtered.length + ' product' + (filtered.length === 1 ? '' : 's') + '</span>' +
      '</div>' +
      '<div class="product-grid" id="product-grid"></div>' +
    '</section>';

  var grid = container.querySelector('#product-grid');
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-state">No products in this category yet.</div>';
  } else {
    grid.innerHTML = filtered.map(renderProductCard).join('');
  }

  container.querySelector('#shop-now-btn').addEventListener('click', function () {
    container.querySelector('#products-section').scrollIntoView({ behavior: 'smooth' });
  });

  wireProductGrid(grid);
}

function renderProductCard(p) {
  var isFav = FavoritesStore.isFavorite(p.id);
  return (
    '<div class="product-card">' +
      '<div class="product-thumb ' + (p.photo ? 'photo' : '') + '" data-goto-product="' + p.id + '">' +
        (p.photo ? '' : ICONS.placeholder) +
      '</div>' +
      '<button type="button" class="fav-btn ' + (isFav ? 'active' : '') + '" data-fav-toggle="' + p.id + '" aria-label="Toggle favorite">' + ICONS.heart + '</button>' +
      '<div class="product-name" data-goto-product="' + p.id + '">' + p.name + '</div>' +
      '<div class="product-desc">' + p.desc + '</div>' +
      '<div class="product-rating"><span class="stars">' + renderStars(p.rating) + '</span><span>(' + p.rating + ')</span></div>' +
      '<div class="product-meta">' +
        '<span class="product-price">$' + p.price.toFixed(2) + '</span>' +
        '<span class="product-tag">' + TAG_LABELS[p.tag] + '</span>' +
      '</div>' +
      '<button class="add-to-cart" data-add-to-cart="' + p.id + '">' + ICONS.cart + ' Add to cart</button>' +
    '</div>'
  );
}

/* Shared wiring for any grid of product cards produced by
   renderProductCard — used by the home grid and the favorites view. */
function wireProductGrid(grid) {
  grid.querySelectorAll('[data-goto-product]').forEach(function (el) {
    el.addEventListener('click', function () {
      Router.navigate('/product/' + el.getAttribute('data-goto-product'));
    });
  });

  grid.querySelectorAll('[data-add-to-cart]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      var product = findProductById(el.getAttribute('data-add-to-cart'));
      if (product) {
        CartStore.addItem(product);
        showToast(product.name + ' added to cart');
      }
    });
  });

  grid.querySelectorAll('[data-fav-toggle]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.stopPropagation();
      handleFavoriteToggle(el.getAttribute('data-fav-toggle'), el);
    });
  });
}

/* Toggles a product's favorite state. Requires a logged-in user —
   guests are sent to the login page instead. btnEl (optional) gets
   its "active" class flipped immediately so the heart updates without
   a full re-render. */
function handleFavoriteToggle(productId, btnEl) {
  if (!AuthStore.isLoggedIn()) {
    showToast('Log in to save favorites');
    Router.navigate('/login');
    return;
  }
  FavoritesStore.toggle(productId);
  var nowFav = FavoritesStore.isFavorite(productId);
  if (btnEl) btnEl.classList.toggle('active', nowFav);
  showToast(nowFav ? 'Added to favorites' : 'Removed from favorites');
}
