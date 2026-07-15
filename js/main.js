/* ======================================================
   main.js
   The Ideal Option
   Main SPA configuration
====================================================== */

function showToast(message) {
  var toast = document.getElementById("toast");

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(showToast._t);

  showToast._t = setTimeout(function () {
    toast.classList.remove("show");
  }, 1800);
}

/*======================================================
HEADER
======================================================*/

function renderHeader() {

  var header = document.getElementById("site-header");

  header.innerHTML =

    '<div class="logo" id="logo-home">' +

      ICONS.gift +

      ' The Ideal Option' +

    '</div>' +

    '<div class="search-bar">' +

      '<div>' +

        ICONS.search +

        '<input type="text" id="search-input" placeholder="Search your favorite jeans...">' +

      '</div>' +

    '</div>' +

    '<div class="auth-area" id="auth-area"></div>' +

    '<div class="cart-btn" id="cart-btn">' +

      ICONS.cart +

      '<span class="cart-badge" id="cart-badge" style="display:none">0</span>' +

    '</div>';



  header.querySelector("#logo-home").addEventListener("click", function () {

    Router.navigate("/");

  });



  header.querySelector("#search-input").addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

      Router.navigate("/");

    }

  });



  var badge = document.getElementById("cart-badge");



  CartStore.subscribe(function () {

    var count = CartStore.getCount();

    badge.textContent = count;

    badge.style.display = count ? "flex" : "none";

  });



  renderAuthArea(header);

  AuthStore.subscribe(function () {

    renderAuthArea(header);

  });

}

/*======================================================
LOGIN STATUS
======================================================*/

function renderAuthArea(header) {

  var authArea = header.querySelector("#auth-area");

  var user = AuthStore.getUser();



  if (AuthStore.isAuthenticated() && user) {

    authArea.innerHTML =

      '<span class="auth-area-greeting">' +

      "Hi, " +

      user.name.split(" ")[0] +

      "</span>" +

      '<a class="signup-link" id="logout-link">Logout</a>';



    authArea

      .querySelector("#logout-link")

      .addEventListener("click", function () {

        AuthStore.clearSession();

        showToast("Logged out successfully");

        Router.navigate("/");

      });

  }

  else {

    authArea.innerHTML =

      '<a class="signup-link" id="signup-link">Sign Up</a>';



    authArea

      .querySelector("#signup-link")

      .addEventListener("click", function () {

        Router.navigate("/register");

      });

  }

}

/*======================================================
FOOTER
======================================================*/

function renderFooter() {
  var footer = document.getElementById("site-footer");
  var categoryLinks =

    CATEGORIES

      .filter(function (c) {

        return c.slug;

      })

      .map(function (c) {

        return (

          '<li><a data-goto-category="' +

          c.slug +

          '">' +

          c.label +

          "</a></li>"

        );

      })

      .join("");



  var helpLinks =

    [

      "FAQs",

      "Shipping",

      "Returns",

      "Contact Us"

    ]

      .map(function (label) {

        return "<li><a data-help-link>" + label + "</a></li>";

      })

      .join("");



  footer.innerHTML =

    '<div class="footer-top">' +

      '<div class="footer-col footer-brand">' +

        '<div class="logo" id="footer-logo">' +

          ICONS.gift +

          " The Ideal Option" +

        "</div>" +

        "<p>" +

          "Premium denim designed for comfort, confidence and timeless style." +

        "</p>" +

        '<div class="footer-social">' +

          '<a class="footer-social-icon" data-help-link>' +

            ICONS.instagram +

          "</a>" +

          '<a class="footer-social-icon" data-help-link>' +

            ICONS.facebook +

          "</a>" +

          '<a class="footer-social-icon" data-help-link>' +

            ICONS.x +

          "</a>" +

        "</div>" +

      "</div>" +

      '<div class="footer-col">' +

        "<h4>Shop</h4>" +

        "<ul>" +

          categoryLinks +

        "</ul>" +

      "</div>" +

      '<div class="footer-col">' +

        "<h4>Support</h4>" +

        "<ul>" +

          helpLinks +

        "</ul>" +

      "</div>" +

      '<div class="footer-col footer-newsletter">' +

        "<h4>Stay Updated</h4>" +

        "<p>" +

          "Receive exclusive discounts, new arrivals and fashion news." +

        "</p>" +

        '<form id="newsletter-form">' +

          '<div class="footer-newsletter-input">' +

            ICONS.mail +

            '<input type="email" id="newsletter-email" placeholder="Enter your email" required>' +

          "</div>" +

          '<button class="btn btn-primary">Subscribe</button>' +

        "</form>" +

      "</div>" +

    "</div>" +

    '<div class="footer-bottom">' +

      "<span>" +

        "© " +

        new Date().getFullYear() +

        " The Ideal Option. All rights reserved." +

      "</span>" +

      '<div class="footer-legal-links">' +

        "<a data-help-link>Terms</a>" +

        "<a data-help-link>Privacy</a>" +

      "</div>" +

    "</div>";



  footer.querySelector("#footer-logo").addEventListener("click", function () {

    Router.navigate("/");

  });



  footer.querySelectorAll("[data-goto-category]").forEach(function (el) {

    el.addEventListener("click", function () {

      Router.navigate("/category/" + el.getAttribute("data-goto-category"));

    });

  });



  footer.querySelectorAll("[data-help-link]").forEach(function (el) {

    el.addEventListener("click", function () {

      showToast("Coming Soon");

    });

  });



  footer

    .querySelector("#newsletter-form")

    .addEventListener("submit", function (e) {

      e.preventDefault();



      var input = document.getElementById("newsletter-email");



      if (input.value.trim()) {

        showToast("Thanks for subscribing!");

        input.value = "";

      }

    });

}

/*======================================================
NAVIGATION
======================================================*/

function renderNav(activeSlug) {

  var nav = document.getElementById("site-nav");



  nav.innerHTML =

    CATEGORIES.map(function (c) {

      var active = (activeSlug || "") === c.slug;

      var href = c.slug

        ? "#/category/" + c.slug

        : "#/";



      return (

        '<a class="' +

        (active ? "active" : "") +

        '" href="' +

        href +

        '">' +

        c.label +

        "</a>"

      );

    }).join("");

}



function updateActiveNavFromHash() {

  var path =

    (window.location.hash || "#/").replace(/^#/, "");



  var match = path.match(/^\/category\/([^/]+)$/);



  renderNav(match ? match[1] : "");

}

/*======================================================
APP START
======================================================*/

document.addEventListener("DOMContentLoaded", function () {

  renderHeader();

  renderFooter();

  updateActiveNavFromHash();



  window.addEventListener("hashchange", updateActiveNavFromHash);



  Router.register("/", renderHome);

  Router.register("/category/:category", renderHome);

  Router.register("/product/:id", renderProduct);

  Router.register("/register", renderRegister);

  Router.register("/login", renderLogin);

  Router.register("/forgot-password", renderForgotPassword);



  Router.init(document.getElementById("app"));

});