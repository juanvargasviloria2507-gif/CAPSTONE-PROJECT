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

      grid.querySelectorAll("[data-favorite]").forEach(function(btn){

        btn.addEventListener("click", function(e){
    
            e.stopPropagation();
    
            var product = findProductById(
    
                btn.getAttribute("data-favorite")
    
            );
    
            FavoritesStore.toggle(product);
    
            renderHome(container, params);
    
        });
    
    });

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
  grid.querySelectorAll("[data-favorite]").forEach(function (btn) {

    btn.addEventListener("click", function (e) {

        e.stopPropagation();

        var product = findProductById(

            btn.getAttribute("data-favorite")

        );

        FavoritesStore.toggle(product);

        renderHome(container, params);

    });

});


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
    function renderProductCard(p) {

        var favorite = FavoritesStore.isFavorite(p.id);
    
        return (
    
            '<div class="product-card">' +
    
                '<button class="favorite-btn ' + (favorite ? 'active' : '') + '" data-favorite="' + p.id + '">' +
    
                (favorite ? ICONS.heartFilled : ICONS.heart) +
    
                '</button>' +
    
                '<div class="product-thumb photo" data-goto-product="' + p.id + '">' +
    
                    '<img src="' + p.image + '" alt="' + p.name + '">' +
    
                '</div>' +
    
                '<div class="product-name" data-goto-product="' + p.id + '">' +
    
                    p.name +
    
                '</div>' +
    
                '<div class="product-desc">' +
    
                    p.desc +
    
                '</div>' +
    
                '<div class="product-rating">' +
    
                    '<span class="stars">' +
    
                        renderStars(p.rating) +
    
                    '</span>' +
    
                    '<span>(' + p.rating + ')</span>' +
    
                '</div>' +
    
                '<div class="product-meta">' +
    
                    '<span class="product-price">$' +
    
                        p.price.toFixed(2) +
    
                    '</span>' +
    
                '</div>' +
    
                '<button class="add-to-cart" data-add-to-cart="' + p.id + '">' +
    
                    ICONS.cart +
    
                    ' Add to Cart' +
    
                '</button>' +
    
            '</div>'
    
        );
    
    }
}