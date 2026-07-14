/* main.js
   Punto de entrada de la SPA. Construye el header y el nav (chrome
   persistente que no cambia entre rutas), conecta el carrito y el
   buscador, registra las rutas y arranca el router.
*/

function showToast(message) {
  var toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function () {
    toast.classList.remove('show');
  }, 1800);
}

function renderHeader() {
  var header = document.getElementById('site-header');
  header.innerHTML =
    '<div class="logo" id="logo-home">' + ICONS.gift + ' GiftHub</div>' +
    '<div class="search-bar">' +
      '<div>' + ICONS.search + '<input type="text" id="search-input" placeholder="Buscar regalos..."></div>' +
    '</div>' +
    '<div class="auth-area" id="auth-area"></div>' +
    '<div class="cart-btn" id="cart-btn">' + ICONS.cart + '<span class="cart-badge" id="cart-badge" style="display:none">0</span></div>';

  header.querySelector('#logo-home').addEventListener('click', function () {
    Router.navigate('/');
  });

  header.querySelector('#search-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && e.target.value.trim()) {
      Router.navigate('/');
    }
  });

  var badge = header.querySelector('#cart-badge');
  CartStore.subscribe(function () {
    var count = CartStore.getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });

  // Jaider B — el área de cuenta refleja el estado de la sesión guardada por AuthStore (HU2)
  renderAuthArea(header);
  AuthStore.subscribe(function () { renderAuthArea(header); });
}

// Jaider B — HU2 "Diseñar la página de inicio de sesión": pinta el estado de
// sesión en el header (saludo + salir si hay token, o Regístrate si no lo hay)
function renderAuthArea(header) {
  var authArea = header.querySelector('#auth-area');
  var user = AuthStore.getUser();

  if (AuthStore.isAuthenticated() && user) {
    authArea.innerHTML =
      '<span class="auth-area-greeting">Hola, ' + user.name.split(' ')[0] + '</span>' +
      '<a class="signup-link" id="logout-link">Salir</a>';

    // Jaider B — cierre de sesión: limpia el token guardado por AuthStore
    authArea.querySelector('#logout-link').addEventListener('click', function () {
      AuthStore.clearSession();
      showToast('Sesión cerrada');
      Router.navigate('/');
    });
  } else {
    authArea.innerHTML = '<a class="signup-link" id="signup-link">Regístrate</a>';

    authArea.querySelector('#signup-link').addEventListener('click', function () {
      Router.navigate('/register');
    });
  }
}

function renderFooter() {
  var footer = document.getElementById('site-footer');

  var categoryLinks = CATEGORIES.filter(function (c) { return c.slug; }).map(function (c) {
    return '<li><a data-goto-category="' + c.slug + '">' + c.label + '</a></li>';
  }).join('');

  var helpLinks = ['Preguntas frecuentes', 'Envíos', 'Devoluciones', 'Contacto'].map(function (label) {
    return '<li><a data-help-link>' + label + '</a></li>';
  }).join('');

  footer.innerHTML =
    '<div class="footer-top">' +

      '<div class="footer-col footer-brand">' +
        '<div class="logo" id="footer-logo">' + ICONS.gift + ' GiftHub</div>' +
        '<p>Regalos únicos y pensados con cariño para cada ocasión especial.</p>' +
        '<div class="footer-social">' +
          '<a class="footer-social-icon" data-help-link aria-label="Instagram">' + ICONS.instagram + '</a>' +
          '<a class="footer-social-icon" data-help-link aria-label="Facebook">' + ICONS.facebook + '</a>' +
          '<a class="footer-social-icon" data-help-link aria-label="X">' + ICONS.x + '</a>' +
        '</div>' +
      '</div>' +

      '<div class="footer-col">' +
        '<h4>Comprar</h4>' +
        '<ul>' + categoryLinks + '</ul>' +
      '</div>' +

      '<div class="footer-col">' +
        '<h4>Ayuda</h4>' +
        '<ul>' + helpLinks + '</ul>' +
      '</div>' +

      '<div class="footer-col footer-newsletter">' +
        '<h4>Mantente al tanto</h4>' +
        '<p>Ofertas y novedades directo a tu correo.</p>' +
        '<form id="newsletter-form">' +
          '<div class="footer-newsletter-input">' +
            ICONS.mail +
            '<input type="email" id="newsletter-email" placeholder="tu@correo.com" required>' +
          '</div>' +
          '<button type="submit" class="btn btn-primary">Suscribirme</button>' +
        '</form>' +
      '</div>' +

    '</div>' +

    '<div class="footer-bottom">' +
      '<span>© ' + new Date().getFullYear() + ' GiftHub. Todos los derechos reservados.</span>' +
      '<div class="footer-legal-links">' +
        '<a data-help-link>Términos</a>' +
        '<a data-help-link>Privacidad</a>' +
      '</div>' +
    '</div>';

  footer.querySelector('#footer-logo').addEventListener('click', function () {
    Router.navigate('/');
  });

  footer.querySelectorAll('[data-goto-category]').forEach(function (el) {
    el.addEventListener('click', function () {
      Router.navigate('/category/' + el.getAttribute('data-goto-category'));
    });
  });

  // Enlaces sin vista propia todavía (FAQ, envíos, redes, legales, etc.)
  footer.querySelectorAll('[data-help-link]').forEach(function (el) {
    el.addEventListener('click', function () {
      showToast('Muy pronto disponible');
    });
  });

  footer.querySelector('#newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = footer.querySelector('#newsletter-email');
    if (input.value.trim()) {
      showToast('¡Gracias por suscribirte!');
      input.value = '';
    }
  });
}

function renderNav(activeSlug) {
  var nav = document.getElementById('site-nav');
  nav.innerHTML = CATEGORIES.map(function (c) {
    var isActive = (activeSlug || '') === c.slug;
    var href = c.slug ? '#/category/' + c.slug : '#/';
    return '<a class="' + (isActive ? 'active' : '') + '" href="' + href + '">' + c.label + '</a>';
  }).join('');
}

function updateActiveNavFromHash() {
  var path = (window.location.hash || '#/').replace(/^#/, '');
  var match = path.match(/^\/category\/([^/]+)$/);
  renderNav(match ? match[1] : '');
}

document.addEventListener('DOMContentLoaded', function () {
  renderHeader();
  renderFooter();
  updateActiveNavFromHash();
  window.addEventListener('hashchange', updateActiveNavFromHash);

  Router.register('/', renderHome);
  Router.register('/category/:category', renderHome);
  Router.register('/product/:id', renderProduct);
  Router.register('/register', renderRegister);
  Router.register('/login', renderLogin); // Jaider B — HU2: ruta de inicio de sesión
  Router.register('/forgot-password', renderForgotPassword); // Jaider B — HU3: recuperar contraseña

  Router.init(document.getElementById('app'));
});
