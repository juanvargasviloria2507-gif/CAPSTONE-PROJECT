/* cart.js
   Simple global shopping cart state, using a pub/sub pattern so any
   part of the UI (e.g. the header badge) can update whenever the
   cart contents change.
*/

var CartStore = (function () {
  var items = [];
  var listeners = [];

  function notify() {
    listeners.forEach(function (fn) { fn(items); });
  }

  function addItem(product) {
    items.push(product);
    notify();
  }

  function removeItem(index) {
    items.splice(index, 1);
    notify();
  }

  function clear() {
    items = [];
    notify();
  }

  function getItems() {
    return items.slice();
  }

  function getCount() {
    return items.length;
  }

  function getTotal() {
    return items.reduce(function (sum, p) { return sum + p.price; }, 0);
  }

  function subscribe(fn) {
    listeners.push(fn);
  }

  return {
    addItem: addItem,
    removeItem: removeItem,
    clear: clear,
    getItems: getItems,
    getCount: getCount,
    getTotal: getTotal,
    subscribe: subscribe
  };
})();
