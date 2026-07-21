/* favorites.js
   Per-user favorites/wishlist store, connected to the real backend.
   Keeps a local cache of the logged-in user's favorite products so
   isFavorite/getCount/getFavorites can stay synchronous for the UI,
   and refreshes that cache from the API on login/logout and on toggle.
*/

var FavoritesStore = (function () {
  var API_URL = 'http://localhost:3000';
  var listeners = [];
  var cache = []; // array of mapped product objects

  function notify() {
    listeners.forEach(function (fn) { fn(); });
  }

  function authHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + AuthStore.getToken()
    };
  }

  function mapRow(row) {
    return {
      id: row.id,
      name: row.name,
      desc: row.description,
      price: parseFloat(row.price),
      image: row.image,
      tag: row.fit_tag,
      photo: true
    };
  }

  async function refresh() {
    if (!AuthStore.isLoggedIn()) {
      cache = [];
      notify();
      return;
    }
    try {
      var response = await fetch(API_URL + '/favorites', { headers: authHeaders() });
      var data = await response.json();
      cache = response.ok ? data.favorites.map(mapRow) : [];
    } catch (e) {
      cache = [];
    }
    notify();
  }

  function isFavorite(productId) {
    return cache.some(function (p) { return p.id == productId; });
  }

  function getIds() {
    return cache.map(function (p) { return p.id; });
  }

  function getFavorites() {
    return cache.slice();
  }

  function getCount() {
    return cache.length;
  }

  /* Returns false when there's no logged-in user (nothing changed),
     true otherwise, same contract as before — just async now. */
  async function toggle(productId) {
    if (!AuthStore.isLoggedIn()) return false;

    var already = isFavorite(productId);
    try {
      if (already) {
        await fetch(API_URL + '/favorites/' + productId, {
          method: 'DELETE',
          headers: authHeaders()
        });
      } else {
        await fetch(API_URL + '/favorites', {
          method: 'POST',
          headers: authHeaders(),
          body: JSON.stringify({ productId: productId })
        });
      }
    } catch (e) {}

    await refresh();
    return true;
  }

  function subscribe(fn) {
    listeners.push(fn);
    return function unsubscribe() {
      var idx = listeners.indexOf(fn);
      if (idx !== -1) listeners.splice(idx, 1);
    };
  }

  /* The favorites list depends on who's logged in, so re-fetch
     whenever the active account changes (login/logout). */
  AuthStore.subscribe(function () { refresh(); });

  // Also load once on startup, in case a session already exists
  // (token saved in localStorage from a previous visit).
  refresh();

  return {
    isFavorite: isFavorite,
    toggle: toggle,
    getFavorites: getFavorites,
    getIds: getIds,
    getCount: getCount,
    subscribe: subscribe,
    refresh: refresh
  };
})();