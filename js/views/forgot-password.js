/* views/forgot-password.js
   -----------------------------------------------------------------
   Autor: Jaider B
   HU: "Recuperar contraseña" (link "¿Olvidaste tu contraseña?" del login)
   -----------------------------------------------------------------

   Tareas cubiertas:
   [x] Formulario de recuperación (solo email)
   [x] Validar formato del correo
   [x] Consumir la API de recuperación (mock, ver js/auth-api.js)
   [x] Mostrar mensaje de éxito ("revisa tu correo")
   [x] Volver al login

   Mismo lenguaje visual que register.js / login.js (input con icono,
   auth-card). No se cambia el diseño principal del sitio.
*/

function renderForgotPassword(container) {
  container.innerHTML =
    '<div class="auth-page">' +
      '<div class="auth-card" id="forgot-card">' +
        '<h1>¿Olvidaste tu contraseña?</h1>' +
        '<p class="auth-subtitle">Ingresa tu correo y te enviaremos un mensaje para restablecer tu contraseña.</p>' +

        '<form id="forgot-form" novalidate>' +
          '<div class="form-group">' +
            '<label for="forgot-email">Correo electrónico</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.mail +
              '<input type="email" id="forgot-email" name="email" autocomplete="email" placeholder="Ingresa tu correo electrónico">' +
            '</div>' +
            '<span class="form-error" id="err-forgot-email"></span>' +
          '</div>' +

          '<button type="submit" class="btn btn-primary auth-submit" id="forgot-submit">Enviar</button>' +
        '</form>' +

        '<p class="auth-switch"><a id="back-to-login">' + ICONS.back + ' Volver a inicio de sesión</a></p>' +
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

// Jaider B — Tareas: "Validar formato del correo", "Consumir la API de recuperación", "Mostrar mensaje de éxito"
function handleForgotSubmit(container, form, submitBtn) {
  var errEl = container.querySelector('#err-forgot-email');
  var email = form.email.value.trim();

  errEl.textContent = '';
  form.email.classList.remove('input-error');

  if (!email) {
    errEl.textContent = 'Ingresa tu correo electrónico.';
    form.email.classList.add('input-error');
    return;
  }
  if (!EMAIL_REGEX.test(email)) {
    errEl.textContent = 'Ingresa un correo electrónico válido.';
    form.email.classList.add('input-error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  requestPasswordReset(email).then(function () {
    renderForgotSuccess(container, email);
  });
}

// Jaider B — Tarea: "Mostrar mensaje de éxito" + "Volver al login"
function renderForgotSuccess(container, email) {
  var card = container.querySelector('#forgot-card');
  card.innerHTML =
    '<div class="auth-success-icon">' + ICONS.mail + '</div>' +
    '<h1>Revisa tu correo</h1>' +
    '<p class="auth-subtitle">Si <strong>' + email + '</strong> está registrado, te enviamos un enlace para restablecer tu contraseña.</p>' +
    '<button type="button" class="btn btn-primary auth-submit" id="forgot-back-btn">Volver a inicio de sesión</button>';

  card.querySelector('#forgot-back-btn').addEventListener('click', function () {
    Router.navigate('/login');
  });
}
