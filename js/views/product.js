/* views/product.js
   Vista de detalle de un producto individual, resuelta por el router
   a partir del parámetro de ruta ":id".
*/

function renderProduct(container, params) {
  var product = findProductById(params.id);

  if (!product) {
    container.innerHTML = '<div class="detail"><div class="empty-state">Producto no encontrado.</div></div>';
    return;
  }

  container.innerHTML =
    '<div class="detail">' +
      '<a class="back-link" id="back-link">' + ICONS.back + ' Volver a todos los regalos</a>' +
      '<div class="detail-grid">' +
        '<div class="detail-thumb ' + (product.photo ? 'photo' : '') + '">' +
          (product.photo ? '' : ICONS.placeholder) +
        '</div>' +
        '<div class="detail-info">' +
          '<h1>' + product.name + '</h1>' +
          '<div class="product-rating"><span class="stars">' + renderStars(product.rating) + '</span><span>(' + product.rating + ')</span></div>' +
          '<p class="desc">' + product.desc + '</p>' +
          '<span class="product-price">$' + product.price.toFixed(2) + '</span>' +
          '<button class="add-to-cart" id="detail-add-to-cart">' + ICONS.cart + ' Añadir al carrito</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  container.querySelector('#back-link').addEventListener('click', function () {
    Router.navigate('/');
  });

  container.querySelector('#detail-add-to-cart').addEventListener('click', function () {
    CartStore.addItem(product);
    showToast(product.name + ' añadido al carrito');
  });
}
