/* ======================================================
   FAVORITES STORE
   Manages the user's favorite jeans using localStorage
====================================================== */

var FavoritesStore = (function () {

    var STORAGE_KEY = "theIdealOptionFavorites";

    var listeners = [];

    function getItems() {

        var data = localStorage.getItem(STORAGE_KEY);

        if (!data) return [];

        try {

            return JSON.parse(data);

        } catch (e) {

            return [];

        }

    }

    function save(items) {

        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

        notify();

    }

    function notify() {

        listeners.forEach(function (listener) {

            listener(getItems());

        });

    }

    function subscribe(listener) {

        listeners.push(listener);

    }

    function isFavorite(productId) {

        return getItems().some(function (item) {

            return item.id === productId;

        });

    }

    function add(product) {

        var items = getItems();

        if (!isFavorite(product.id)) {

            items.push(product);

            save(items);

        }

    }

    function remove(productId) {

        var items = getItems().filter(function (item) {

            return item.id !== productId;

        });

        save(items);

    }

    function toggle(product) {

        if (isFavorite(product.id)) {

            remove(product.id);

        } else {

            add(product);

        }

    }

    function clear() {

        localStorage.removeItem(STORAGE_KEY);

        notify();

    }

    function count() {

        return getItems().length;

    }

    return {

        getItems: getItems,

        add: add,

        remove: remove,

        toggle: toggle,

        clear: clear,

        isFavorite: isFavorite,

        subscribe: subscribe,

        count: count

    };

})();