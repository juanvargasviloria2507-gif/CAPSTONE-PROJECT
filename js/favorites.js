/* favorites.js
   Per-user favorites/wishlist store. Favorites are tied to whichever
   account is logged in (via AuthStore) and persisted to localStorage,
   keyed by user email, so each account keeps its own list. There's no
   concept of favorites for a guest — you need to be logged in to save
   one, same spirit as the review form requiring a name.
*/

var FavoritesStore = (function () {
  var STORAGE_KEY = 'gifthub_favorites';
  var listeners = [];

  function loadAll() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveAll(all) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); } catch (e) {}
  }

  function currentKey() {
    var user = AuthStore.getCurrentUser();
    return user ? user.email : null;
  }

  function notify() {
    listeners.forEach(function (fn) { fn(); });
  }

  function getIds() {
    var key = currentKey();
    if (!key) return [];
    var all = loadAll();
    return all[key] || [];
  }

  function isFavorite(productId) {
    return getIds().indexOf(productId) !== -1;
  }

  /* Returns false when there's no logged-in user (nothing changed),
     true otherwise. Callers use the return value to know whether the
     toggle actually happened. */
  function toggle(productId) {
    var key = currentKey();
    if (!key) return false;

    var all = loadAll();
    var ids = all[key] || [];
    var index = ids.indexOf(productId);
    if (index === -1) {
      ids.push(productId);
    } else {
      ids.splice(index, 1);
    }
    all[key] = ids;
    saveAll(all);
    notify();
    return true;
  }

  function getFavorites() {
    return getIds()
      .map(function (id) { return findProductById(id); })
      .filter(Boolean);
  }

  function getCount() {
    return getIds().length;
  }

  function subscribe(fn) {
    listeners.push(fn);
  }

  /* The favorites list depends on who's logged in, so re-notify
     subscribers whenever the active account changes (login/logout). */
  AuthStore.subscribe(function () { notify(); });

  return {
    isFavorite: isFavorite,
    toggle: toggle,
    getFavorites: getFavorites,
    getIds: getIds,
    getCount: getCount,
    subscribe: subscribe
  };
})();
