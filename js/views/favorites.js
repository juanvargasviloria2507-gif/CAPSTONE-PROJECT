/* ======================================================
   FAVORITES VIEW
   Displays the user's favorite jeans
====================================================== */

function renderFavorites(container) {

    var favorites = FavoritesStore.getItems();

    container.innerHTML =

        '<section class="favorites-page">' +

            '<div class="favorites-header">' +

                '<h1>My Favorites</h1>' +

                '<p>Save your favorite jeans and shop them anytime.</p>' +

                '<span class="favorites-count">' +
                    favorites.length + ' Saved Item' + (favorites.length !== 1 ? 's' : '') +
                '</span>' +

            '</div>' +

            '<div id="favorites-content"></div>' +

        '</section>';

    renderFavoritesContent(container);
}

function renderFavoritesContent(container) {

    var content = container.querySelector("#favorites-content");

    var favorites = FavoritesStore.getItems();

    if (favorites.length === 0) {

        content.innerHTML =

            '<div class="favorites-empty">' +

                '<div class="favorites-empty-heart">' + ICONS.heartFilled + '</div>' +

                '<h2>Your wishlist is empty</h2>' +

                '<p>Save your favorite jeans by clicking the heart icon.</p>' +

                '<button class="btn btn-primary" id="continue-shopping">' +
                    'Continue Shopping' +
                '</button>' +

            '</div>';

        document
            .getElementById("continue-shopping")
            .addEventListener("click", function () {

                Router.navigate("/");

            });

        return;

    }

    content.innerHTML =

        '<div class="favorites-grid">' +

            favorites.map(function(product){

                return renderFavoriteCard(product);

            }).join("") +

        '</div>';

    registerFavoriteEvents(container);
}

/* ======================================================
   FAVORITE CARD
====================================================== */

function renderFavoriteCard(product) {

    return (

        '<div class="product-card">' +

            '<button class="favorite-btn active" data-remove-favorite="' + product.id + '">' +
            ICONS.heartFilled +
            '</button>' +

            '<div class="product-thumb photo" data-goto-product="' + product.id + '">' +

                '<img src="' + product.image + '" alt="' + product.name + '">' +

            '</div>' +

            '<div class="product-name" data-goto-product="' + product.id + '">' +

                product.name +

            '</div>' +

            '<div class="product-desc">' +

                product.desc +

            '</div>' +

            '<div class="product-rating">' +

                '<span class="stars">' +

                    renderStars(product.rating) +

                '</span>' +

                '<span>(' + product.rating + ')</span>' +

            '</div>' +

            '<div class="product-meta">' +

                '<span class="product-price">$' +

                    product.price.toFixed(2) +

                '</span>' +

            '</div>' +

            '<button class="add-to-cart" data-cart="' + product.id + '">' +

                ICONS.cart +

                ' Add to Cart' +

            '</button>' +

        '</div>'

    );

}


/* ======================================================
   EVENTS
====================================================== */

function registerFavoriteEvents(container) {

    container.querySelectorAll("[data-goto-product]").forEach(function(card){

        card.addEventListener("click", function(){

            Router.navigate("/product/" + card.getAttribute("data-goto-product"));

        });

    });



    container.querySelectorAll("[data-cart]").forEach(function(btn){

        btn.addEventListener("click", function(e){

            e.stopPropagation();

            var product = findProductById(

                btn.getAttribute("data-cart")

            );

            if(product){

                CartStore.addItem(product);

                showToast(product.name + " added to cart");

            }

        });

    });

    container.querySelectorAll("[data-remove-favorite]").forEach(function(btn){

        btn.addEventListener("click", function(e){

            e.stopPropagation();

            FavoritesStore.remove(

                btn.getAttribute("data-remove-favorite")

            );

            showToast("Removed from favorites");

            renderFavorites(container);

        });

    });

}


/* ======================================================
   AUTO UPDATE
====================================================== */

FavoritesStore.subscribe(function(){

    if(window.location.hash === "#/favorites"){

        renderFavorites(

            document.getElementById("app")

        );

    }

});