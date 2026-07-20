/* ======================================================
   LOGIN VIEW
   The Ideal Option
====================================================== */

function renderLogin(container) {

  container.innerHTML =

    '<div class="auth-page">' +

      '<div class="auth-card">' +

        '<h1>Welcome Back</h1>' +

        '<p class="auth-subtitle">' +
          'Sign in to continue shopping at <strong>The Ideal Option</strong>.' +
        '</p>' +

        '<form id="login-form" novalidate>' +

          '<div class="form-group">' +

            '<label for="login-email">Email Address</label>' +

            '<div class="input-icon-wrap">' +

              ICONS.mail +

              '<input ' +
                'type="email" ' +
                'id="login-email" ' +
                'name="email" ' +
                'autocomplete="email" ' +
                'placeholder="Enter your email">' +

            '</div>' +

            '<span class="form-error" id="err-login-email"></span>' +

          '</div>' +


          '<div class="form-group">' +

            '<label for="login-password">Password</label>' +

            '<div class="input-icon-wrap">' +

              ICONS.lock +

              '<input ' +
                'type="password" ' +
                'id="login-password" ' +
                'name="password" ' +
                'autocomplete="current-password" ' +
                'placeholder="Enter your password">' +

              '<button ' +
                'type="button" ' +
                'class="input-icon-toggle" ' +
                'data-toggle-for="login-password" ' +
                'aria-label="Show password">' +

                ICONS.eye +

              '</button>' +

            '</div>' +

            '<span class="form-error" id="err-login-password"></span>' +

            '<a class="auth-forgot" id="go-to-forgot">' +
              'Forgot your password?' +
            '</a>' +

          '</div>' +

          '<span class="form-error form-error-general" id="err-login-general"></span>' +

          '<button ' +
            'type="submit" ' +
            'class="btn btn-primary auth-submit" ' +
            'id="login-submit">' +

            'Sign In' +

          '</button>' +

        '</form>' +


        '<div class="auth-divider">' +

          '<span>Or continue with</span>' +

        '</div>' +


        '<div class="auth-social">' +

          '<button ' +
            'type="button" ' +
            'class="auth-social-btn" ' +
            'data-help-link ' +
            'aria-label="Google">' +

            ICONS.google +

          '</button>' +

          '<button ' +
            'type="button" ' +
            'class="auth-social-btn" ' +
            'data-help-link ' +
            'aria-label="Apple">' +

            ICONS.apple +

          '</button>' +

          '<button ' +
            'type="button" ' +
            'class="auth-social-btn" ' +
            'data-help-link ' +
            'aria-label="Facebook">' +

            ICONS.facebook +

          '</button>' +

        '</div>' +


        '<p class="auth-switch">' +

          'Don\'t have an account? ' +

          '<a id="go-to-register">Create Account</a>' +

        '</p>' +

      '</div>' +

    '</div>';



  var form = container.querySelector('#login-form');
  var submitBtn = container.querySelector('#login-submit');



  form.addEventListener('submit', function (e) {

    e.preventDefault();

    handleLoginSubmit(container, form, submitBtn);

  });



  container.querySelector('#go-to-register').addEventListener('click', function () {

    Router.navigate('/register');

  });



  container.querySelector('#go-to-forgot').addEventListener('click', function () {

    Router.navigate('/forgot-password');

  });



  container.querySelectorAll('.input-icon-toggle').forEach(function (btn) {

    btn.addEventListener('click', function () {

      var input = container.querySelector('#' + btn.getAttribute('data-toggle-for'));

      var hidden = input.type === 'password';

      input.type = hidden ? 'text' : 'password';

      btn.innerHTML = hidden ? ICONS.eyeOff : ICONS.eye;

    });

  });



  container.querySelectorAll('[data-help-link]').forEach(function (el) {

    el.addEventListener('click', function () {

      showToast('Coming Soon');

    });

  });

}


/* ======================================================
   LOGIN SUBMIT
====================================================== */

function handleLoginSubmit(container, form, submitBtn) {

  clearLoginErrors(container);

  var email = form.email.value.trim();

  var password = form.password.value;

  var errors = validateLoginForm({

    email: email,

    password: password

  });

  if (Object.keys(errors).length > 0) {

    showLoginErrors(container, errors);

    return;

  }

  submitBtn.disabled = true;

  submitBtn.textContent = 'Signing In...';

  loginUser({

    email: email,

    password: password

  })

  .then(function (result) {

    AuthStore.setSession(result.token, result.user);

    showToast('Welcome back, ' + result.user.name + '!');

    setTimeout(function () {

      Router.navigate('/');

    }, 500);

  })

  .catch(function (err) {

    submitBtn.disabled = false;

    submitBtn.textContent = 'Sign In';

    showLoginErrors(container, {

      general: (err && err.message) ||

      'Unable to sign in. Please try again.'

    });

  });

}

/* ======================================================
   LOGIN VALIDATION
====================================================== */

function validateLoginForm(data) {

  var errors = {};

  if (!data.email) {

    errors.email = 'Please enter your email address.';

  } else if (!EMAIL_REGEX.test(data.email)) {

    errors.email = 'Please enter a valid email address.';

  }

  if (!data.password) {

    errors.password = 'Please enter your password.';

  }

  return errors;

}


/* ======================================================
   SHOW LOGIN ERRORS
====================================================== */

function showLoginErrors(container, errors) {

  Object.keys(errors).forEach(function (field) {

    var errEl = container.querySelector('#err-login-' + field);

    var inputEl = container.querySelector('#login-' + field);

    if (errEl) {

      errEl.textContent = errors[field];

    }

    if (inputEl) {

      inputEl.classList.add('input-error');

      var wrap = inputEl.closest('.input-icon-wrap');

      if (wrap) {

        wrap.classList.add('input-icon-wrap-error');

      }

    }

  });

}


/* ======================================================
   CLEAR LOGIN ERRORS
====================================================== */

function clearLoginErrors(container) {

  container
    .querySelectorAll('.form-error')
    .forEach(function (el) {

      el.textContent = '';

    });

  container
    .querySelectorAll('.input-error')
    .forEach(function (el) {

      el.classList.remove('input-error');

    });

  container
    .querySelectorAll('.input-icon-wrap-error')
    .forEach(function (el) {

      el.classList.remove('input-icon-wrap-error');

    });

};