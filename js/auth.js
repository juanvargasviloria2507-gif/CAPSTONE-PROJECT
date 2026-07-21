/* auth.js
   Client-side authentication store, connected to the real backend.
   login/register call the API; the rest read the cached session
   from localStorage so the UI (header, guards) stays synchronous.
*/

var AuthStore = (function () {
  var API_URL = 'http://localhost:3000';
  var TOKEN_KEY = 'gifthub_token';
  var USER_KEY = 'gifthub_user';
  var listeners = [];

  function notify() {
    var user = getCurrentUser();
    listeners.forEach(function (fn) { fn(user); });
  }

  function saveSession(token, user) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {}
  }

  async function register(name, email, password) {
    name = (name || '').trim();
    email = (email || '').trim().toLowerCase();
    password = password || '';

    if (!name || !email || !password) {
      return { ok: false, error: 'Please fill in every field.' };
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return { ok: false, error: 'Please enter a valid email address.' };
    }
    if (password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' };
    }

    try {
      var response = await fetch(API_URL + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, password: password })
      });
      var data = await response.json();

      if (!response.ok) {
        return { ok: false, error: data.error || 'Could not create the account.' };
      }

      // /register doesn't return a token, so log in right after to start the session
      return await login(email, password);
    } catch (e) {
      return { ok: false, error: 'Could not connect to the server.' };
    }
  }

  async function login(email, password) {
    email = (email || '').trim().toLowerCase();
    password = password || '';

    try {
      var response = await fetch(API_URL + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      });
      var data = await response.json();

      if (!response.ok) {
        return { ok: false, error: data.error || 'Incorrect email or password.' };
      }

      saveSession(data.token, data.user);
      notify();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: 'Could not connect to the server.' };
    }
  }

  function logout() {
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {}
    notify();
  }

  function getCurrentUser() {
    try {
      var raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function getToken() {
    try { return localStorage.getItem(TOKEN_KEY); } catch (e) { return null; }
  }

  function isLoggedIn() {
    return !!getCurrentUser();
  }

  function subscribe(fn) {
    listeners.push(fn);
  }

  return {
    register: register,
    login: login,
    logout: logout,
    getCurrentUser: getCurrentUser,
    getToken: getToken,
    isLoggedIn: isLoggedIn,
    subscribe: subscribe
  };
})();