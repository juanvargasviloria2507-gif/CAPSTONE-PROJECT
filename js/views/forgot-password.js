/* ======================================================
   FORGOT PASSWORD VIEW
   The Ideal Option
====================================================== */

function renderForgotPassword(container) {

  container.innerHTML =

    '<div class="auth-page">' +

      '<div class="auth-card" id="forgot-card">' +

        '<h1>Forgot Your Password?</h1>' +

        '<p class="auth-subtitle">' +
          'Enter your email address and we will send you instructions to reset your password.' +
        '</p>' +

        '<form id="forgot-form" novalidate>' +

          '<div class="form-group">' +

            '<label for="forgot-email">Email Address</label>' +

            '<div class="input-icon-wrap">' +

              ICONS.mail +

              '<input ' +
                'type="email" ' +
                'id="forgot-email" ' +
                'name="email" ' +
                'autocomplete="email" ' +
                'placeholder="Enter your email">' +

            '</div>' +

            '<span class="form-error" id="err-forgot-email"></span>' +

          '</div>' +

          '<button ' +
            'type="submit" ' +
            'class="btn btn-primary auth-submit" ' +
            'id="forgot-submit">' +

            'Send Reset Link' +

          '</button>' +

        '</form>' +

        '<p class="auth-switch">' +

          '<a id="back-to-login">' +

            ICONS.back +

            ' Back to Sign In' +

          '</a>' +

        '</p>' +

      '</div>' +

    '</div>';



  var form = container.querySelector('#forgot-form');

  var submitBtn = container.querySelector('#forgot-submit');



  form.addEventListener('submit', function (e) {

    e.preventDefault();

    handleForgotSubmit(container, form, submitBtn);

  });



  container.querySelector('#back-to-login').addEventListener('click', function () {

    Router.navigate('/login');

  });

}



/* ======================================================
   HANDLE RESET REQUEST
====================================================== */

function handleForgotSubmit(container, form, submitBtn) {

  var errEl = container.querySelector('#err-forgot-email');

  var email = form.email.value.trim();

  errEl.textContent = '';

  form.email.classList.remove('input-error');



  if (!email) {

    errEl.textContent = 'Please enter your email address.';

    form.email.classList.add('input-error');

    return;

  }



  if (!EMAIL_REGEX.test(email)) {

    errEl.textContent = 'Please enter a valid email address.';

    form.email.classList.add('input-error');

    return;

  }



  submitBtn.disabled = true;

  submitBtn.textContent = 'Sending...';



  requestPasswordReset(email)

    .then(function () {

      renderForgotSuccess(container, email);

    });

}



/* ======================================================
   SUCCESS SCREEN
====================================================== */

function renderForgotSuccess(container, email) {

  var card = container.querySelector('#forgot-card');



  card.innerHTML =

    '<div class="auth-success-icon">' +

      ICONS.mail +

    '</div>' +

    '<h1>Check Your Email</h1>' +

    '<p class="auth-subtitle">' +

      'If <strong>' + email + '</strong> is registered, you will receive a password reset link shortly.' +

    '</p>' +

    '<button ' +

      'type="button" ' +

      'class="btn btn-primary auth-submit" ' +

      'id="forgot-back-btn">' +

      'Back to Sign In' +

    '</button>';



  card.querySelector('#forgot-back-btn').addEventListener('click', function () {

    Router.navigate('/login');

  });
};