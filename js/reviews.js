/* reviews.js
   Per-product review state. Persists to localStorage so reviews
   survive page reloads. Includes a few seed reviews the first time
   the app loads, for demo purposes only.
*/

var ReviewStore = (function () {
  var STORAGE_KEY = 'gifthub_reviews';

  var SEED_REVIEWS = {
    'classic-denim': [
      { name: 'Ana G.', rating: 5, comment: 'The denim quality exceeded my expectations, looks premium.' },
      { name: 'Marcos R.', rating: 4, comment: 'Great fit and finish, took a few days to arrive.' }
    ],
    'custom-necklace': [
      { name: 'Valentina P.', rating: 5, comment: 'Perfect gift, the name engraving turned out beautiful.' }
    ],
    'succulent-kit': [
      { name: 'Diego M.', rating: 5, comment: 'Arrived well packaged, the succulents were in great condition.' }
    ]
  };

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    // First load: seed with example data and persist it
    var seeded = JSON.parse(JSON.stringify(SEED_REVIEWS));
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded)); } catch (e) {}
    return seeded;
  }

  var data = load();

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function getReviews(productId) {
    return (data[productId] || []).slice();
  }

  function addReview(productId, review) {
    if (!data[productId]) data[productId] = [];
    data[productId].push(review);
    save();
  }

  function getAverage(productId) {
    var reviews = getReviews(productId);
    if (!reviews.length) return 0;
    var sum = reviews.reduce(function (s, r) { return s + r.rating; }, 0);
    return sum / reviews.length;
  }

  return {
    getReviews: getReviews,
    addReview: addReview,
    getAverage: getAverage
  };
})();
