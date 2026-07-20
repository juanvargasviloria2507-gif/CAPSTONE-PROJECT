/* views/register.js
   -----------------------------------------------------------------
   Autor: Jaider B
   HU: EPIC 1 - HU1 "Diseñar la página de registro"
   -----------------------------------------------------------------

   Tareas de la HU cubiertas en este archivo:
   [x] Crear el formulario
   [x] Validar campos obligatorios
   [x] Validar formato del correo electrónico
   [x] Validar longitud de la contraseña
   [x] Consumir la API de registro        (ver también js/auth-api.js)
   [x] Mostrar mensajes de éxito o error
   [x] Redirigir al inicio de sesión

   Escenarios cubiertos:
   1) Registro exitoso -> se crea la cuenta y se redirige a /login
   2) Email ya registrado -> se muestra un error debajo del campo email

   Validación de formulario (frontend):
   - Nombre: obligatorio, mínimo 2 caracteres
   - Email: obligatorio, formato válido
   - Contraseña: obligatoria, mínimo 8 caracteres, letras y números
   - Confirmar contraseña: debe coincidir con la contraseña
*/

// Jaider B — reglas de validación de email y longitud mínima de contraseña
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var PASSWORD_MIN_LENGTH = 8;

// Jaider B — Tarea: "Crear el formulario"
// Layout inspirado en el mockup de referencia (input con icono + toggle de
// contraseña + login social + link a login), adaptado a la paleta y
// componentes que ya usa el sitio (no se cambia el diseño principal).
function renderRegister(container) {
  container.innerHTML =
    '<div class="auth-page">' +
      '<div class="auth-card">' +
        '<h1>Crea tu cuenta</h1>' +
        '<p class="auth-subtitle">Regístrate para guardar tus favoritos y agilizar tus compras.</p>' +

        '<form id="register-form" novalidate>' +

          '<div class="form-group">' +
            '<label for="reg-name">Nombre completo</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.user +
              '<input type="text" id="reg-name" name="name" autocomplete="name" placeholder="Nombre completo">' +
            '</div>' +
            '<span class="form-error" id="err-name"></span>' +
          '</div>' +

          '<div class="form-group">' +
            '<label for="reg-email">Correo electrónico</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.mail +
              '<input type="email" id="reg-email" name="email" autocomplete="email" placeholder="Usuario o correo electrónico">' +
            '</div>' +
            '<span class="form-error" id="err-email"></span>' +
          '</div>' +

          '<div class="form-group">' +
            '<label for="reg-password">Contraseña</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.lock +
              '<input type="password" id="reg-password" name="password" autocomplete="new-password" placeholder="Contraseña">' +
              '<button type="button" class="input-icon-toggle" data-toggle-for="reg-password" aria-label="Mostrar contraseña">' + ICONS.eye + '</button>' +
            '</div>' +
            '<span class="form-error" id="err-password"></span>' +
          '</div>' +

          '<div class="form-group">' +
            '<label for="reg-confirm">Confirmar contraseña</label>' +
            '<div class="input-icon-wrap">' +
              ICONS.lock +
              '<input type="password" id="reg-confirm" name="confirm" autocomplete="new-password" placeholder="Confirmar contraseña">' +
              '<button type="button" class="input-icon-toggle" data-toggle-for="reg-confirm" aria-label="Mostrar contraseña">' + ICONS.eye + '</button>' +
            '</div>' +
            '<span class="form-error" id="err-confirm"></span>' +
          '</div>' +

          '<span class="form-error form-error-general" id="err-general"></span>' +

          '<p class="auth-terms">Al hacer clic en <strong>Sign Up</strong>, aceptas nuestros <a data-help-link>Términos y condiciones</a>.</p>' +

          '<button type="submit" class="btn btn-primary auth-submit" id="register-submit">Sign Up</button>' +
        '</form>' +

        '<div class="auth-divider"><span>O continúa con</span></div>' +

        '<div class="auth-social">' +
          '<button type="button" class="auth-social-btn" data-help-link aria-label="Continuar con Google">' + ICONS.google + '</button>' +
          '<button type="button" class="auth-social-btn" data-help-link aria-label="Continuar con Apple">' + ICONS.apple + '</button>' +
          '<button type="button" class="auth-social-btn" data-help-link aria-label="Continuar con Facebook">' + ICONS.facebook + '</button>' +
        '</div>' +

        '<p class="auth-switch">¿Ya tienes cuenta? <a id="go-to-login">Inicia sesión</a></p>' +
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

  // Jaider B — toggle de "mostrar/ocultar contraseña" (según el mockup de referencia)
  container.querySelectorAll('.input-icon-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = container.querySelector('#' + btn.getAttribute('data-toggle-for'));
      var isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      btn.innerHTML = isHidden ? ICONS.eyeOff : ICONS.eye;
    });
  });

  // Login social y "Términos" son solo placeholders visuales por ahora (no hay backend para eso)
  container.querySelectorAll('[data-help-link]').forEach(function (el) {
    el.addEventListener('click', function () {
      showToast('Muy pronto disponible');
    });
  });
}

// Jaider B — Tarea: "Consumir la API de registro" + "Mostrar mensajes de éxito o error" + "Redirigir al inicio de sesión"
function handleRegisterSubmit(container, form, submitBtn) {
  clearFormErrors(container);

  var name = form.name.value.trim();
  var email = form.email.value.trim();
  var password = form.password.value;
  var confirm = form.confirm.value;

  // Jaider B — Tareas: "Validar campos obligatorios", "Validar formato del correo electrónico",
  // "Validar longitud de la contraseña" (ver validateRegisterForm más abajo)
  var errors = validateRegisterForm({ name: name, email: email, password: password, confirm: confirm });

  if (Object.keys(errors).length > 0) {
    showFormErrors(container, errors);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Creando cuenta...';

  // Jaider B — se consume la API de registro (registerUser vive en js/auth-api.js)
  registerUser({ name: name, email: email, password: password })
    .then(function () {
      // Jaider B — mensaje de éxito + redirección a /login
      showToast('Cuenta creada correctamente');
      setTimeout(function () {
        Router.navigate('/login');
      }, 700);
    })
    .catch(function (err) {
      // Jaider B — mensaje de error (email duplicado u otro error del API)
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign Up';

      if (err && err.field) {
        var fieldErrors = {};
        fieldErrors[err.field] = err.message;
        showFormErrors(container, fieldErrors);
      } else {
        showFormErrors(container, { general: (err && err.message) || 'No pudimos crear tu cuenta. Intenta de nuevo.' });
      }
    });
}

// Jaider B — Tareas: "Validar campos obligatorios", "Validar formato del correo electrónico",
// "Validar longitud de la contraseña"
function validateRegisterForm(data) {
  var errors = {};

  if (!data.name || data.name.length < 2) {
    errors.name = 'Ingresa tu nombre completo.';
  }

  if (!data.email) {
    errors.email = 'Ingresa tu correo electrónico.';
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (!data.password) {
    errors.password = 'Ingresa una contraseña.';
  } else if (data.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = 'La contraseña debe tener al menos ' + PASSWORD_MIN_LENGTH + ' caracteres.';
  } else if (!/[a-zA-Z]/.test(data.password) || !/[0-9]/.test(data.password)) {
    errors.password = 'La contraseña debe incluir letras y números.';
  }

  if (!data.confirm) {
    errors.confirm = 'Confirma tu contraseña.';
  } else if (data.confirm !== data.password) {
    errors.confirm = 'Las contraseñas no coinciden.';
  }

  return errors;
}

function showFormErrors(container, errors) {
  Object.keys(errors).forEach(function (field) {
    var errEl = container.querySelector('#err-' + field);
    var inputEl = container.querySelector('#reg-' + field);
    if (errEl) errEl.textContent = errors[field];
    if (inputEl) {
      inputEl.classList.add('input-error');
      var wrap = inputEl.closest('.input-icon-wrap');
      if (wrap) wrap.classList.add('input-icon-wrap-error');
    }
  });
}

function clearFormErrors(container) {
  container.querySelectorAll('.form-error').forEach(function (el) { el.textContent = ''; });
  container.querySelectorAll('.input-error').forEach(function (el) { el.classList.remove('input-error'); });
  container.querySelectorAll('.input-icon-wrap-error').forEach(function (el) { el.classList.remove('input-icon-wrap-error'); });
}
