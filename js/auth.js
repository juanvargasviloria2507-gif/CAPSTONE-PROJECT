/* auth.js
   Simple client-side authentication store. There is no backend in
   this project, so "accounts" are just entries persisted to
   localStorage. Passwords are lightly obfuscated (a basic string
   hash, NOT a real cryptographic algorithm) purely so they aren't
   sitting in localStorage as plain readable text — this is demo-only
   and should never be used as-is for a product handling real users
   or real passwords.
*/

var AuthStore = (function () {
  var USERS_KEY = 'gifthub_users';
  var SESSION_KEY = 'gifthub_session';
  var listeners = [];

  function obfuscate(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return 'h' + hash;
  }

  function loadUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveUsers(users) {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch (e) {}
  }

  function notify() {
    var user = getCurrentUser();
    listeners.forEach(function (fn) { fn(user); });
  }

  function register(name, email, password) {
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

    var users = loadUsers();
    if (users[email]) {
      return { ok: false, error: 'An account with that email already exists.' };
    }

    users[email] = { name: name, email: email, passwordHash: obfuscate(password) };
    saveUsers(users);
    try { localStorage.setItem(SESSION_KEY, email); } catch (e) {}
    notify();
    return { ok: true };
  }

  function login(email, password) {
    email = (email || '').trim().toLowerCase();
    password = password || '';

    var users = loadUsers();
    var user = users[email];
    if (!user || user.passwordHash !== obfuscate(password)) {
      return { ok: false, error: 'Incorrect email or password.' };
    }

    try { localStorage.setItem(SESSION_KEY, email); } catch (e) {}
    notify();
    return { ok: true };
  }

  function logout() {
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
    notify();
  }

  function getCurrentUser() {
    var email;
    try { email = localStorage.getItem(SESSION_KEY); } catch (e) { email = null; }
    if (!email) return null;

    var users = loadUsers();
    var user = users[email];
    if (!user) return null;

    return { name: user.name, email: user.email };
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
    isLoggedIn: isLoggedIn,
    subscribe: subscribe
  };
})();
