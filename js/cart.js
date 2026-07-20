/* cart.js
   Estado global simple del carrito de compras, con patrón pub/sub
   para que cualquier parte de la UI (por ejemplo el badge del header)
   se actualice cuando cambia el contenido del carrito.
*/

var CartStore = (function () {
  var items = [];
  var listeners = [];

  function addItem(product) {
    items.push(product);
    listeners.forEach(function (fn) { fn(items); });
  }

  function getCount() {
    return items.length;
  }

  function subscribe(fn) {
    listeners.push(fn);
  }

  return {
    addItem: addItem,
    getCount: getCount,
    subscribe: subscribe
  };
})();
