// ============================================================
// lang.js — PT / EN language toggle
// Add data-en="..." data-pt="..." to any element to translate it.
// The toggle reads/writes localStorage so it persists across pages.
// ============================================================

(function () {
  var STORAGE_KEY = 'rv_lang';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function applyLang(lang) {
    // Translate all elements with data-en / data-pt
    document.querySelectorAll('[data-en]').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text) el.innerHTML = text;
    });

    // Update toggle buttons
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.querySelectorAll('[data-lang]').forEach(function (span) {
        span.classList.toggle('lang-active', span.getAttribute('data-lang') === lang);
      });
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }

  function buildToggle() {
    var toggle = document.createElement('li');
    toggle.className = 'lang-toggle';
    toggle.innerHTML =
      '<span data-lang="en">EN</span>' +
      '<span class="lang-sep">/</span>' +
      '<span data-lang="pt">PT</span>';

    toggle.addEventListener('click', function (e) {
      var clicked = e.target.closest('[data-lang]');
      if (!clicked) return;
      var lang = clicked.getAttribute('data-lang');
      setLang(lang);
      applyLang(lang);
    });

    return toggle;
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Inject toggle into desktop navbar
    var desktopNav = document.querySelector('.custom-navbar ul');
    if (desktopNav) desktopNav.appendChild(buildToggle());

    // Inject toggle into mobile navbar
    var mobileNav = document.querySelector('.navbar-nav');
    if (mobileNav) {
      var mobileToggle = buildToggle();
      mobileToggle.style.padding = '8px 12px';
      mobileNav.appendChild(mobileToggle);
    }

    applyLang(getLang());
  });
})();
