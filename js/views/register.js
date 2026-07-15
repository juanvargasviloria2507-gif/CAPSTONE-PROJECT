/* ======================================================
   REGISTER VIEW
   The Ideal Option
====================================================== */

var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var PASSWORD_MIN_LENGTH = 8;

function renderRegister(container) {

  container.innerHTML =

    '<div class="auth-page">' +

      '<div class="auth-card">' +

        '<h1>Create Your Account</h1>' +

        '<p class="auth-subtitle">' +
          'Join <strong>The Ideal Option</strong> and discover the perfect pair of jeans for your style.' +
        '</p>' +

        '<form id="register-form" novalidate>' +

          '<div class="form-group">' +
            '<label for="reg-name">Full Name</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.user +
              '<input type="text" id="reg-name" name="name" autocomplete="name" placeholder="Enter your full name">' +
            '</div>' +
            '<span class="form-error" id="err-name"></span>' +
          '</div>' +

          '<div class="form-group">' +
            '<label for="reg-email">Email Address</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.mail +
              '<input type="email" id="reg-email" name="email" autocomplete="email" placeholder="Enter your email">' +
            '</div>' +
            '<span class="form-error" id="err-email"></span>' +
          '</div>' +

          '<div class="form-group">' +
            '<label for="reg-password">Password</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.lock +
              '<input type="password" id="reg-password" name="password" autocomplete="new-password" placeholder="Create a password">' +
              '<button type="button" class="input-icon-toggle" data-toggle-for="reg-password" aria-label="Show password">' +
                ICONS.eye +
              '</button>' +
            '</div>' +
            '<span class="form-error" id="err-password"></span>' +
          '</div>' +

          '<div class="form-group">' +
            '<label for="reg-confirm">Confirm Password</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.lock +
              '<input type="password" id="reg-confirm" name="confirm" autocomplete="new-password" placeholder="Confirm your password">' +
              '<button type="button" class="input-icon-toggle" data-toggle-for="reg-confirm" aria-label="Show password">' +
                ICONS.eye +
              '</button>' +
            '</div>' +
            '<span class="form-error" id="err-confirm"></span>' +
          '</div>' +

          '<span class="form-error form-error-general" id="err-general"></span>' +

          '<p class="auth-terms">' +
            'By clicking <strong>Sign Up</strong>, you agree to our ' +
            '<a data-help-link>Terms & Conditions</a>.' +
          '</p>' +

          '<button type="submit" class="btn btn-primary auth-submit" id="register-submit">' +
            'Sign Up' +
          '</button>' +

        '</form>' +

        '<div class="auth-divider">' +
          '<span>Or continue with</span>' +
        '</div>' +

        '<div class="auth-social">' +

          '<button type="button" class="auth-social-btn" data-help-link aria-label="Google">' +
            ICONS.google +
          '</button>' +

          '<button type="button" class="auth-social-btn" data-help-link aria-label="Apple">' +
            ICONS.apple +
          '</button>' +

          '<button type="button" class="auth-social-btn" data-help-link aria-label="Facebook">' +
            ICONS.facebook +
          '</button>' +

        '</div>' +

        '<p class="auth-switch">' +
          'Already have an account? ' +
          '<a id="go-to-login">Sign In</a>' +
        '</p>' +

      '</div>' +

    '</div>';

  var form = container.querySelector('#register-form');
  var submitBtn = container.querySelector('#register-submit');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    handleRegisterSubmit(container, form, submitBtn);
  });

  container.querySelector('#go-to-login').addEventListener('click', function () {
    Router.navigate('/login');
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
   REGISTER SUBMIT
====================================================== */

function handleRegisterSubmit(container, form, submitBtn) {

  clearFormErrors(container);

  var name = form.name.value.trim();
  var email = form.email.value.trim();
  var password = form.password.value;
  var confirm = form.confirm.value;

  var errors = validateRegisterForm({
    name: name,
    email: email,
    password: password,
    confirm: confirm
  });

  if (Object.keys(errors).length > 0) {
    showFormErrors(container, errors);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Creating Account...';

  registerUser({
    name: name,
    email: email,
    password: password
  })

  .then(function () {

    showToast('Account created successfully!');

    setTimeout(function () {

      Router.navigate('/login');

    }, 700);

  })

  .catch(function (err) {

    submitBtn.disabled = false;

    submitBtn.textContent = 'Sign Up';

    if (err && err.field) {

      var fieldErrors = {};

      fieldErrors[err.field] = err.message;

      showFormErrors(container, fieldErrors);

    } else {

      showFormErrors(container, {

        general: (err && err.message) || 'Unable to create your account. Please try again.'

      });

    }

  });

}



/* ======================================================
   FORM VALIDATION
====================================================== */

function validateRegisterForm(data) {

  var errors = {};

  if (!data.name || data.name.length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (!data.email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.password) {

    errors.password = 'Please create a password.';

  } else if (data.password.length < PASSWORD_MIN_LENGTH) {

    errors.password =
      'Password must contain at least ' +
      PASSWORD_MIN_LENGTH +
      ' characters.';

  } else if (
    !/[a-zA-Z]/.test(data.password) ||
    !/[0-9]/.test(data.password)
  ) {

    errors.password =
      'Password must include both letters and numbers.';

  }

  if (!data.confirm) {

    errors.confirm = 'Please confirm your password.';

  } else if (data.password !== data.confirm) {

    errors.confirm = 'Passwords do not match.';

  }

  return errors;

}


/* ======================================================
   SHOW FORM ERRORS
====================================================== */

function showFormErrors(container, errors) {

  Object.keys(errors).forEach(function (field) {

    var errEl = container.querySelector('#err-' + field);

    var inputEl = container.querySelector('#reg-' + field);

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
   CLEAR FORM ERRORS
====================================================== */

function clearFormErrors(container) {

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

}