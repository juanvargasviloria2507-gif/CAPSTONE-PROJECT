/* reviews.js
   Per-product review state, connected to the real backend. Keeps a
   local cache per product id so getReviews/getAverage can stay
   synchronous for rendering, refreshed via fetchReviews.
*/

var ReviewStore = (function () {
  var API_URL = 'http://localhost:3000';
  var cache = {}; // productId -> array of reviews

  function authHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + AuthStore.getToken()
    };
  }

  async function fetchReviews(productId) {
    try {
      var response = await fetch(API_URL + '/products/' + productId + '/reviews');
      var data = await response.json();
      cache[productId] = response.ok ? data : [];
    } catch (e) {
      cache[productId] = [];
    }
    return cache[productId];
  }

  function getReviews(productId) {
    return (cache[productId] || []).slice();
  }

  function getAverage(productId) {
    var reviews = getReviews(productId);
    if (!reviews.length) return 0;
    var sum = reviews.reduce(function (s, r) { return s + r.rating; }, 0);
    return sum / reviews.length;
  }

  /* review: { rating, comment }. Requires a logged-in user — the
     backend derives the reviewer's name from the auth token. */
  async function addReview(productId, review) {
    try {
      var response = await fetch(API_URL + '/products/' + productId + '/reviews', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ rating: review.rating, comment: review.comment })
      });
      var data = await response.json();

      if (!response.ok) {
        return { ok: false, error: data.error || 'Could not post the review.' };
      }
      await fetchReviews(productId);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Could not connect to the server.' };
    }
  }

  return {
    fetchReviews: fetchReviews,
    getReviews: getReviews,
    getAverage: getAverage,
    addReview: addReview
  };
})();