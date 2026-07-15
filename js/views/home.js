/* ======================================================
   HOME VIEW
   Shopping page for The Ideal Option
====================================================== */

function renderHome(container, params) {

  var categorySlug = (params && params.category) || "";

  var filtered = categorySlug
      ? PRODUCTS.filter(function (product) {
          return product.tag === categorySlug;
      })
      : PRODUCTS;

  var category = CATEGORIES.find(function (c) {
      return c.slug === categorySlug;
  });

  var heading = category ? category.label : "Our Jeans Collection";

  container.innerHTML =

      '<section class="hero">' +

          '<div class="hero-copy">' +

              '<span class="hero-label">NEW COLLECTION</span>' +

              '<h1>Find Your Perfect Fit</h1>' +

              '<p>Premium denim designed for every body, every style and every occasion.</p>' +

              '<button class="btn btn-primary" id="shop-now-btn">Shop Collection</button>' +

          '</div>' +

          '<div class="hero-visual">' +

              '<img src="assets/hero.jpeg" class="hero-img" alt="Hero Image">' +

          '</div>' +

      '</section>' +

      '<section class="products" id="products-section">' +

          '<div class="products-header">' +

              '<div>' +

                  '<h2>' + heading + '</h2>' +

                  '<p>' + filtered.length + ' Products Available</p>' +

              '</div>' +

          '</div>' +

          '<div class="product-grid" id="product-grid"></div>' +

      '</section>';



  var grid = container.querySelector("#product-grid");



  if (filtered.length === 0) {

      grid.innerHTML =

          '<div class="empty-state">' +

          '<h2>No jeans found</h2>' +

          '<p>Please try another category.</p>' +

          '</div>';

  }

  else {

      grid.innerHTML = filtered.map(renderProductCard).join("");

  }



  document.getElementById("shop-now-btn")

      .addEventListener("click", function () {

          document

              .getElementById("products-section")

              .scrollIntoView({

                  behavior: "smooth"

              });

      });



  grid.querySelectorAll("[data-goto-product]")

      .forEach(function (card) {

          card.addEventListener("click", function () {

              Router.navigate("/product/" + card.dataset.gotoProduct);

          });

      });



  grid.querySelectorAll("[data-add-to-cart]")

      .forEach(function (button) {

          button.addEventListener("click", function (e) {

              e.stopPropagation();

              var product = findProductById(button.dataset.addToCart);

              if (product) {

                  CartStore.addItem(product);

                  showToast(product.name + " added to cart");

              }

          });

      });

}



/* ======================================================
 PRODUCT CARD
====================================================== */

function renderProductCard(product) {

  return (

      '<div class="product-card">' +

          '<div class="product-thumb" data-goto-product="' + product.id + '">' +

              '<img src="' + product.image + '" alt="' + product.name + '">' +

          '</div>' +

          '<div class="product-info">' +

              '<h3 class="product-name">' +

                  product.name +

              '</h3>' +

              '<p class="product-desc">' +

                  product.desc +

              '</p>' +

              '<div class="product-rating">' +

                  '<span class="stars">' +

                      renderStars(product.rating) +

                  '</span>' +

                  '<span>' +

                      product.rating +

                  '</span>' +

              '</div>' +

              '<div class="product-details">' +

                  '<span><strong>Fit:</strong> ' +

                      product.fit +

                  '</span>' +

                  '<span><strong>Color:</strong> ' +

                      product.color +

                  '</span>' +

              '</div>' +

              '<div class="sizes">' +

                  product.sizes.map(function(size){

                      return '<span class="size">' + size + '</span>';

                  }).join("") +

              '</div>' +

              '<div class="product-footer">' +

                  '<span class="product-price">$' +

                      product.price.toFixed(2) +

                  '</span>' +

                  '<button class="add-to-cart" data-add-to-cart="' +

                      product.id +

                  '">' +

                      ICONS.cart +

                      ' Add to Cart' +

                  '</button>' +

              '</div>' +

          '</div>' +

      '</div>'

  );

}