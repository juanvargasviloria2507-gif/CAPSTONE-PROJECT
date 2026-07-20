/* views/login.js
   -----------------------------------------------------------------
   Autor: Jaider B
   HU: EPIC 1 - HU2 "Diseñar la página de inicio de sesión"
   -----------------------------------------------------------------

   Tareas de la HU cubiertas en este archivo:
   [x] Crear formulario de acceso
   [x] Consumir la API de inicio de sesión   (ver también js/auth-api.js)
   [x] Guardar el token de autenticación     (ver también js/auth-store.js)
   [x] Redirigir a la página principal
   [x] Mostrar mensajes de error

   Mismo lenguaje visual que la página de registro (HU1): inputs con
   icono, toggle de mostrar/ocultar contraseña, login social como
   placeholder. No se cambia el diseño principal del sitio.
*/

// Jaider B — Tarea: "Crear formulario de acceso"
function renderLogin(container) {
  container.innerHTML =
    '<div class="auth-page">' +
      '<div class="auth-card">' +
        '<h1>Bienvenido de nuevo</h1>' +
        '<p class="auth-subtitle">Inicia sesión para continuar con tus compras.</p>' +

        '<form id="login-form" novalidate>' +

          '<div class="form-group">' +
            '<label for="login-email">Correo electrónico</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.mail +
              '<input type="email" id="login-email" name="email" autocomplete="email" placeholder="Usuario o correo electrónico">' +
            '</div>' +
            '<span class="form-error" id="err-login-email"></span>' +
          '</div>' +

          '<div class="form-group">' +
            '<label for="login-password">Contraseña</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.lock +
              '<input type="password" id="login-password" name="password" autocomplete="current-password" placeholder="Contraseña">' +
              '<button type="button" class="input-icon-toggle" data-toggle-for="login-password" aria-label="Mostrar contraseña">' + ICONS.eye + '</button>' +
            '</div>' +
            '<span class="form-error" id="err-login-password"></span>' +
            '<a class="auth-forgot" id="go-to-forgot">¿Olvidaste tu contraseña?</a>' +
          '</div>' +

          '<span class="form-error form-error-general" id="err-login-general"></span>' +

          '<button type="submit" class="btn btn-primary auth-submit" id="login-submit">Iniciar sesión</button>' +
        '</form>' +

        '<div class="auth-divider"><span>O continúa con</span></div>' +

        '<div class="auth-social">' +
          '<button type="button" class="auth-social-btn" data-help-link aria-label="Continuar con Google">' + ICONS.google + '</button>' +
          '<button type="button" class="auth-social-btn" data-help-link aria-label="Continuar con Apple">' + ICONS.apple + '</button>' +
          '<button type="button" class="auth-social-btn" data-help-link aria-label="Continuar con Facebook">' + ICONS.facebook + '</button>' +
        '</div>' +

        '<p class="auth-switch">¿No tienes cuenta? <a id="go-to-register">Regístrate</a></p>' +
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

  // Jaider B — HU3 "Recuperar contraseña": ya no es placeholder, navega a /forgot-password
  container.querySelector('#go-to-forgot').addEventListener('click', function () {
    Router.navigate('/forgot-password');
  });

  // toggle de mostrar/ocultar contraseña, igual que en el registro
  container.querySelectorAll('.input-icon-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = container.querySelector('#' + btn.getAttribute('data-toggle-for'));
      var isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.innerHTML = isHidden ? ICONS.eyeOff : ICONS.eye;
    });
  });

  // login social sigue siendo placeholder (no está en el alcance de esta HU)
  container.querySelectorAll('[data-help-link]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      showToast('Muy pronto disponible');
    });
  });
}

// Jaider B — Tareas: "Consumir la API de inicio de sesión", "Guardar el token de autenticación",
// "Redirigir a la página principal", "Mostrar mensajes de error"
function handleLoginSubmit(container, form, submitBtn) {
  clearLoginErrors(container);

  var email = form.email.value.trim();
  var password = form.password.value;

  var errors = validateLoginForm({ email: email, password: password });
  if (Object.keys(errors).length > 0) {
    showLoginErrors(container, errors);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Ingresando...';

  // Jaider B — se consume la API de inicio de sesión (loginUser vive en js/auth-api.js)
  loginUser({ email: email, password: password })
    .then(function (result) {
      // Jaider B — Tarea: "Guardar el token de autenticación"
      AuthStore.setSession(result.token, result.user);

      // Jaider B — Tarea: "Redirigir a la página principal"
      showToast('¡Bienvenido, ' + result.user.name + '!');
      setTimeout(function () {
        Router.navigate('/');
      }, 500);
    })
    .catch(function (err) {
      // Jaider B — Tarea: "Mostrar mensajes de error"
      submitBtn.disabled = false;
      submitBtn.textContent = 'Iniciar sesión';
      showLoginErrors(container, { general: (err && err.message) || 'No pudimos iniciar sesión. Intenta de nuevo.' });
    });
}

// Jaider B — validación mínima de campos obligatorios antes de llamar al API
function validateLoginForm(data) {
  var errors = {};
  if (!data.email) errors.email = 'Ingresa tu correo electrónico.';
  if (!data.password) errors.password = 'Ingresa tu contraseña.';
  return errors;
}

function showLoginErrors(container, errors) {
  Object.keys(errors).forEach(function (field) {
    var errEl = container.querySelector('#err-login-' + field);
    var inputEl = container.querySelector('#login-' + field);
    if (errEl) errEl.textContent = errors[field];
    if (inputEl) {
      inputEl.classList.add('input-error');
      var wrap = inputEl.closest('.input-icon-wrap');
      if (wrap) wrap.classList.add('input-icon-wrap-error');
    }
  });
}

function clearLoginErrors(container) {
  container.querySelectorAll('.form-error').forEach(function (el) { el.textContent = ''; });
  container.querySelectorAll('.input-error').forEach(function (el) { el.classList.remove('input-error'); });
  container.querySelectorAll('.input-icon-wrap-error').forEach(function (el) { el.classList.remove('input-icon-wrap-error'); });
}
