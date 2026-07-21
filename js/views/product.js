/* views/product.js
   Detail view for a single product, resolved by the router from the
   ":id" route parameter. Includes the product's reviews section
   (list + form to add a new review).
*/

function renderProduct(container, params) {
  var product = findProductById(params.id);

  if (!product) {
    container.innerHTML = '<div class="detail"><div class="empty-state">Product not found.</div></div>';
    return;
  }

  var isFav = FavoritesStore.isFavorite(product.id);

  container.innerHTML =
    '<div class="detail">' +
      '<a class="back-link" id="back-link">' + ICONS.back + ' Back to all jeans</a>' +
      '<div class="detail-grid">' +
        '<div class="detail-thumb ' + (product.photo ? 'photo' : '') + '">' +
          (product.photo ? '<img src="' + product.image + '" alt="' + product.name + '" class="detail-thumb-img">' : ICONS.placeholder) +
        '</div>' +
        '<div class="detail-info">' +
          '<h1>' + product.name + '</h1>' +
          '<p class="desc">' + product.desc + '</p>' +
          '<span class="product-price">$' + product.price.toFixed(2) + '</span>' +
          '<div class="detail-actions">' +
            '<button class="add-to-cart" id="detail-add-to-cart">' + ICONS.cart + ' Add to cart</button>' +
            '<button type="button" class="fav-btn detail-fav-btn ' + (isFav ? 'active' : '') + '" id="detail-fav-btn" aria-label="Toggle favorite">' + ICONS.heart + '</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="reviews-section" id="reviews-section"></div>' +
    '</div>';

  container.querySelector('#back-link').addEventListener('click', function () {
    Router.navigate('/');
  });

  container.querySelector('#detail-add-to-cart').addEventListener('click', function () {
    CartStore.addItem(product);
    showToast(product.name + ' added to cart');
  });

  container.querySelector('#detail-fav-btn').addEventListener('click', function () {
    handleFavoriteToggle(product.id, this);
  });

  renderReviewsSection(container.querySelector('#reviews-section'), product);
}

async function renderReviewsSection(section, product) {
  section.innerHTML = '<div class="reviews-header"><h2>Customer reviews</h2></div>';

  await ReviewStore.fetchReviews(product.id);
  var reviews = ReviewStore.getReviews(product.id);
  var average = ReviewStore.getAverage(product.id);
  var loggedIn = AuthStore.isLoggedIn();

  section.innerHTML =
    '<div class="reviews-header">' +
      '<h2>Customer reviews</h2>' +
      (reviews.length
        ? '<div class="reviews-summary"><span class="stars">' + renderStars(average) + '</span><span>' + average.toFixed(1) + ' out of 5 · ' + reviews.length + (reviews.length === 1 ? ' review' : ' reviews') + '</span></div>'
        : '<div class="reviews-summary empty">No reviews yet for this product.</div>') +
    '</div>' +
    '<div class="review-list">' +
      reviews.map(function (r) {
        return (
          '<div class="review-item">' +
            '<div class="review-item-head">' +
              '<span class="review-item-name">' + escapeHtml(r.userName) + '</span>' +
              '<span class="stars">' + renderStars(r.rating) + '</span>' +
            '</div>' +
            '<p class="review-item-comment">' + escapeHtml(r.comment) + '</p>' +
          '</div>'
        );
      }).join('') +
    '</div>' +
    (loggedIn
      ? '<div class="review-form">' +
          '<h3>Leave your review</h3>' +
          '<div class="review-form-row">' +
            '<label>Rating</label>' +
            '<div class="star-input" id="star-input">' +
              [1, 2, 3, 4, 5].map(function (n) {
                return '<button type="button" class="star-input-btn" data-star="' + n + '">☆</button>';
              }).join('') +
            '</div>' +
          '</div>' +
          '<div class="review-form-row">' +
            '<label for="review-comment">Comment</label>' +
            '<textarea id="review-comment" rows="3" placeholder="Tell us what you thought about this product..."></textarea>' +
          '</div>' +
          '<button class="btn btn-primary" id="review-submit">Post review</button>' +
        '</div>'
      : '<div class="review-form">' +
          '<p>Log in to leave a review.</p>' +
          '<button type="button" class="btn btn-secondary" id="review-login-btn">Log in</button>' +
        '</div>');

  if (!loggedIn) {
    section.querySelector('#review-login-btn').addEventListener('click', function () {
      Router.navigate('/login');
    });
    return;
  }

  var selectedRating = 0;
  var starButtons = section.querySelectorAll('.star-input-btn');

  function paintStars(rating) {
    starButtons.forEach(function (btn) {
      var n = parseInt(btn.getAttribute('data-star'), 10);
      btn.textContent = n <= rating ? '★' : '☆';
      btn.classList.toggle('active', n <= rating);
    });
  }

  starButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      selectedRating = parseInt(btn.getAttribute('data-star'), 10);
      paintStars(selectedRating);
    });
  });

  section.querySelector('#review-submit').addEventListener('click', async function () {
    var commentInput = section.querySelector('#review-comment');
    var comment = commentInput.value.trim();

    if (!comment || selectedRating === 0) {
      showToast('Please select a rating and write a comment');
      return;
    }

    var result = await ReviewStore.addReview(product.id, { rating: selectedRating, comment: comment });
    if (!result.ok) {
      showToast(result.error);
      return;
    }
    showToast('Thanks for your review!');
    renderReviewsSection(section, product);
  });
}

