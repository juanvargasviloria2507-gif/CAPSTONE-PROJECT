/* views/cart.js
   Shopping cart view. Reads the current state from CartStore and
   renders it on screen, allowing items to be removed and the total
   to be seen.
*/

function renderCart(container) {
  var items = CartStore.getItems();

  if (items.length === 0) {
    container.innerHTML =
      '<div class="detail">' +
        '<a class="back-link" id="back-link">' + ICONS.back + ' Keep browsing gifts</a>' +
        '<div class="empty-state">Your cart is empty.</div>' +
      '</div>';
    container.querySelector('#back-link').addEventListener('click', function () {
      Router.navigate('/');
    });
    return;
  }

  container.innerHTML =
    '<div class="detail">' +
      '<a class="back-link" id="back-link">' + ICONS.back + ' Keep browsing gifts</a>' +
      '<div class="cart-view">' +
        '<h1>Your cart</h1>' +
        '<div class="cart-list">' +
          items.map(function (product, index) {
            return (
              '<div class="cart-row">' +
                '<div class="cart-row-thumb ' + (product.photo ? 'photo' : '') + '">' +
                  (product.photo ? '' : ICONS.placeholder) +
                '</div>' +
                '<div class="cart-row-info">' +
                  '<div class="cart-row-name">' + product.name + '</div>' +
                  '<div class="cart-row-price">$' + product.price.toFixed(2) + '</div>' +
                '</div>' +
                '<button class="cart-row-remove" data-remove-index="' + index + '" aria-label="Remove">&times;</button>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
        '<div class="cart-summary">' +
          '<span>Total</span>' +
          '<span class="cart-total">$' + CartStore.getTotal().toFixed(2) + '</span>' +
        '</div>' +
      '</div>' +
    '</div>';

  container.querySelector('#back-link').addEventListener('click', function () {
    Router.navigate('/');
  });

  container.querySelectorAll('[data-remove-index]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var index = parseInt(btn.getAttribute('data-remove-index'), 10);
      CartStore.removeItem(index);
      renderCart(container);
    });
  });
}
