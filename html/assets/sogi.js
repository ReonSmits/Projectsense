(function () {
  document.querySelectorAll('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  document.querySelectorAll('.js-mail').forEach(function (a) {
    var adres = a.dataset.u + '@' + a.dataset.d + '.' + a.dataset.t;
    a.href = 'mailto:' + adres;
    a.textContent = adres;
  });
  var h = document.querySelector('.site-header');
  function onScroll() { h.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
