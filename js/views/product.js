/* ======================================================
   PRODUCT DETAIL VIEW
   The Ideal Option
====================================================== */

function renderProduct(container, params) {

  var product = findProductById(params.id);

  if (!product) {

      container.innerHTML =
          '<div class="empty-state">' +
              '<h2>Product not found</h2>' +
              '<p>The product you are looking for does not exist.</p>' +
          '</div>';

      return;
  }

  container.innerHTML =

      '<section class="detail">' +

          '<div class="back-link" id="back-btn">' +

              ICONS.back +

              '<span>Back to Collection</span>' +

          '</div>' +

          '<div class="detail-grid">' +

              '<div class="detail-image">' +

                  '<img src="' + product.image + '" alt="' + product.name + '">' +

              '</div>' +

              '<div class="detail-info">' +

                  '<span class="detail-category">' +

                      TAG_LABELS[product.tag] +

                  '</span>' +

                  '<h1>' +

                      product.name +

                  '</h1>' +

                  '<div class="product-rating">' +

                      '<span class="stars">' +

                          renderStars(product.rating) +

                      '</span>' +

                      '<span>(' +

                          product.rating +

                      ')</span>' +

                  '</div>' +

                  '<span class="detail-price">$' +

                      product.price.toFixed(2) +

                  '</span>' +

                  '<p class="detail-description">' +

                      product.desc +

                  '</p>' +

                  '<div class="detail-features">' +

                      '<p><strong>Fit:</strong> ' +

                          product.fit +

                      '</p>' +

                      '<p><strong>Color:</strong> ' +

                          product.color +

                      '</p>' +

                  '</div>' +

                  '<h3>Available Sizes</h3>' +

                  '<div class="sizes">' +

                      product.sizes.map(function(size){

                          return '<span class="size">' + size + '</span>';

                      }).join("") +

                  '</div>' +

                  '<button class="add-to-cart detail-cart" id="detail-cart">' +

                      ICONS.cart +

                      ' Add to Cart' +

                  '</button>' +

              '</div>' +

          '</div>' +

      '</section>';

'<button class="favorite-btn" id="favorite-btn">' +
    '♡ Add to Favorites' +
'</button>' +

  document

      .getElementById("back-btn")

      .addEventListener("click", function(){

        Router.navigate("/category/" + product.tag);

      });



  document

      .getElementById("detail-cart")

      .addEventListener("click", function(){

          CartStore.addItem(product);

          showToast(product.name + " added to cart");

      });

}
document
    .getElementById("favorite-btn")
    .addEventListener("click", function () {

        showToast(product.name + " added to favorites");

    });