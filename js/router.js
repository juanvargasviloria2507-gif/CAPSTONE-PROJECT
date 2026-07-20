/* router.js
   Minimal SPA router based on the URL hash.
   Each route is a pattern like "/product/:id" mapped to a render
   function. When the hash changes, the route is resolved and the
   matching view is invoked without reloading the page.
*/

var Router = (function () {
  var routes = [];
  var rootEl = null;

  function register(pattern, handler) {
    var paramNames = [];
    var regexStr = pattern.replace(/:[^/]+/g, function (match) {
      paramNames.push(match.slice(1));
      return '([^/]+)';
    });
    var regex = new RegExp('^' + regexStr + '$');
    routes.push({ regex: regex, paramNames: paramNames, handler: handler });
  }

  function currentPath() {
    var hash = window.location.hash || '#/';
    return hash.replace(/^#/, '') || '/';
  }

  function resolve() {
    var path = currentPath();
    for (var i = 0; i < routes.length; i++) {
      var match = path.match(routes[i].regex);
      if (match) {
        var params = {};
        routes[i].paramNames.forEach(function (name, idx) {
          params[name] = decodeURIComponent(match[idx + 1]);
        });
        rootEl.innerHTML = '';
        routes[i].handler(rootEl, params);
        window.scrollTo(0, 0);
        return;
      }
    }
    rootEl.innerHTML = '<div class="empty-state">Page not found.</div>';
  }

  function navigate(path) {
    window.location.hash = path;
  }

  function init(el) {
    rootEl = el;
    window.addEventListener('hashchange', resolve);
    resolve();
  }

  return {
    register: register,
    navigate: navigate,
    init: init
  };
})();
