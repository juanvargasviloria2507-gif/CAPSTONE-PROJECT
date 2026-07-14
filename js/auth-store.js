/* auth-store.js
   -----------------------------------------------------------------
   Autor: Jaider B
   HU2: "Diseñar la página de inicio de sesión" -> Tarea: "Guardar el token de autenticación"
   -----------------------------------------------------------------
   Estado global de sesión, con el mismo patrón pub/sub que ya usa
   cart.js: cualquier parte de la UI (por ejemplo el header) puede
   suscribirse para reaccionar cuando el usuario inicia o cierra sesión.

   El token y los datos básicos del usuario se guardan en localStorage
   para que la sesión sobreviva a un refresh de página.
*/

var AuthStore = (function () {
  var TOKEN_KEY = 'gifthub_auth_token';
  var USER_KEY = 'gifthub_auth_user';
  var listeners = [];

  function notify() {
    var session = { token: getToken(), user: getUser() };
    listeners.forEach(function (fn) { fn(session); });
  }

  // Jaider B — Tarea: "Guardar el token de autenticación"
  function setSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user || {}));
    notify();
  }

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  function getUser() {
    var raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function isAuthenticated() {
    return !!getToken();
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    notify();
  }

  function subscribe(fn) {
    listeners.push(fn);
  }

  return {
    setSession: setSession,
    getToken: getToken,
    getUser: getUser,
    isAuthenticated: isAuthenticated,
    clearSession: clearSession,
    subscribe: subscribe
  };
})();
