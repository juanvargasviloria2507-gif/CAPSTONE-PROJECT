/* auth-api.js
   -----------------------------------------------------------------
   Autor: Jaider B
   HU1: "Diseñar la página de registro"          -> Tarea: "Consumir la API de registro"
   HU2: "Diseñar la página de inicio de sesión"  -> Tarea: "Consumir la API de inicio de sesión"
   "Recuperar contraseña"                   -> Tarea: "Consumir la API de recuperación"
   -----------------------------------------------------------------
   Capa de acceso al API de autenticación.

   *** MOCK TEMPORAL ***
   Mientras el equipo de backend no exponga los endpoints reales
   (POST /api/users/register, POST /api/users/login y
   POST /api/users/forgot-password), este archivo simula las tres
   respuestas guardando los usuarios "registrados" en memoria
   (array REGISTERED_USERS).

   Se deja seedeado un usuario de prueba para poder probar los
   escenarios sin necesidad de registrarte primero:
     email:    test@gifthub.com
     password: Test1234

   Cuando el back esté listo, estas son las ÚNICAS tres funciones que
   hay que reemplazar (registerUser, loginUser, requestPasswordReset).
   Las vistas no deberían tocarse: solo necesitan que cada una siga
   devolviendo una Promise con la misma forma.
*/

var REGISTERED_USERS = [
  { name: 'Usuario de prueba', email: 'test@gifthub.com', password: 'Test1234' }
];

function findRegisteredUser(email) {
  var emailNormalized = email.trim().toLowerCase();
  for (var i = 0; i < REGISTERED_USERS.length; i++) {
    if (REGISTERED_USERS[i].email === emailNormalized) return REGISTERED_USERS[i];
  }
  return null;
}

// Jaider B — función que consume la API de registro (mock hasta que el back exponga el endpoint real)
function registerUser(payload) {
  // TODO(backend-ready): reemplazar todo el cuerpo de esta función por:
  //
  // return fetch('/api/users/register', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload)
  // }).then(function (res) {
  //   if (res.status === 409) {
  //     return Promise.reject({ ok: false, field: 'email', message: 'Este correo ya está registrado.' });
  //   }
  //   if (!res.ok) {
  //     return Promise.reject({ ok: false, field: null, message: 'No pudimos crear tu cuenta. Intenta de nuevo.' });
  //   }
  //   return { ok: true };
  // });

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var emailNormalized = payload.email.trim().toLowerCase();

      if (findRegisteredUser(emailNormalized)) {
        reject({
          ok: false,
          field: 'email',
          message: 'Este correo ya está registrado. Intenta iniciar sesión.'
        });
        return;
      }

      REGISTERED_USERS.push({ name: payload.name, email: emailNormalized, password: payload.password });
      resolve({ ok: true });
    }, 500); // pequeño delay simulado, como una llamada de red real
  });
}

// Jaider B — función que consume la API de "olvidé mi contraseña" (mock hasta que el back exponga el endpoint real)
function requestPasswordReset(email) {
  // TODO(backend-ready): reemplazar todo el cuerpo de esta función por:
  //
  // return fetch('/api/users/forgot-password', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email: email })
  // }).then(function (res) {
  //   if (!res.ok) {
  //     return Promise.reject({ ok: false, message: 'No pudimos procesar tu solicitud. Intenta de nuevo.' });
  //   }
  //   return { ok: true };
  // });

  return new Promise(function (resolve) {
    setTimeout(function () {
      // Nota de seguridad: se resuelve como éxito exista o no el email en
      // REGISTERED_USERS, para no revelar qué correos están registrados
      // (misma práctica que se espera del backend real).
      resolve({ ok: true });
    }, 500);
  });
}
// Jaider B — función que consume la API de inicio de sesión (mock hasta que el back exponga el endpoint real)
function loginUser(payload) {
  // TODO(backend-ready): reemplazar todo el cuerpo de esta función por:
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(payload)
  // }).then(function (res) {
  //   if (res.status === 401) {
  //     return Promise.reject({ ok: false, message: 'Correo o contraseña incorrectos.' });
  //   }
  //   if (!res.ok) {
  //     return Promise.reject({ ok: false, message: 'No pudimos iniciar sesión. Intenta de nuevo.' });
  //   }
  //   return res.json(); // se espera { ok: true, token: '...', user: { name, email } }
  // });

  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      var user = findRegisteredUser(payload.email);

      if (!user || user.password !== payload.password) {
        reject({
          ok: false,
          message: 'Correo o contraseña incorrectos.'
        });
        return;
      }

      // token simulado: en un API real esto vendría firmado desde el backend (JWT, etc.)
      var fakeToken = btoa(user.email + ':' + Date.now());

      resolve({
        ok: true,
        token: fakeToken,
        user: { name: user.name, email: user.email }
      });
    }, 500);
  });
}
