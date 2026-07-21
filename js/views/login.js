/* views/login.js
   Login / create-account view. There's no backend, so "accounts" are
   just entries in localStorage (see js/auth.js) — good enough for a
   demo, not meant for real users or real passwords.
*/

function renderLogin(container) {
  if (AuthStore.isLoggedIn()) {
    Router.navigate('/');
    return;
  }

  var mode = 'login'; // or 'register'

  function draw() {
    container.innerHTML =
      '<div class="auth-view">' +
        '<div class="auth-card">' +
          '<h1>' + (mode === 'login' ? 'Log in' : 'Create your account') + '</h1>' +
          '<p class="auth-sub">' + (mode === 'login'
            ? 'Welcome back — log in to see your favorites.'
            : 'Create a free account to start saving gifts to your favorites.') + '</p>' +
          '<div class="auth-error" id="auth-error" style="display:none"></div>' +
          '<form id="auth-form" novalidate>' +
            (mode === 'register'
              ? '<div class="review-form-row"><label for="auth-name">Name</label><input type="text" id="auth-name" placeholder="Your name" autocomplete="name"></div>'
              : '') +
            '<div class="review-form-row"><label for="auth-email">Email</label><input type="email" id="auth-email" placeholder="you@example.com" autocomplete="email"></div>' +
            '<div class="review-form-row"><label for="auth-password">Password</label><input type="password" id="auth-password" placeholder="' + (mode === 'register' ? 'At least 6 characters' : 'Your password') + '" autocomplete="' + (mode === 'login' ? 'current-password' : 'new-password') + '"></div>' +
            '<button type="submit" class="btn btn-primary auth-submit">' + (mode === 'login' ? 'Log in' : 'Create account') + '</button>' +
          '</form>' +
          '<div class="auth-switch">' +
            (mode === 'login'
              ? 'New here? <a href="javascript:void(0)" id="auth-switch-link">Create an account</a>'
              : 'Already have an account? <a href="javascript:void(0)" id="auth-switch-link">Log in</a>') +
          '</div>' +
        '</div>' +
      '</div>';

    container.querySelector('#auth-switch-link').addEventListener('click', function () {
      mode = mode === 'login' ? 'register' : 'login';
      draw();
    });

    container.querySelector('#auth-form').addEventListener('submit', async function (e) {
      e.preventDefault();
      var errorEl = container.querySelector('#auth-error');
      errorEl.style.display = 'none';

      var email = container.querySelector('#auth-email').value;
      var password = container.querySelector('#auth-password').value;
      var result;

      if (mode === 'register') {
        var name = container.querySelector('#auth-name').value;
        result = await AuthStore.register(name, email, password);
      } else {
        result = AuthStore.login(email, password);
      }

      if (!result.ok) {
        errorEl.textContent = result.error;
        errorEl.style.display = 'block';
        return;
      }

      showToast(mode === 'register' ? 'Account created — welcome!' : 'Welcome back!');
      Router.navigate('/');
    });
  }

  draw();
}
