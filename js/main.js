// Nina et Michelle — shared interactions

(function () {
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mobileNav');
  var close = document.getElementById('navClose');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.add('open');
    });
  }
  if (close && nav) {
    close.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  }

  var newsletter = document.getElementById('newsletterForm');
  if (newsletter) {
    newsletter.addEventListener('submit', function (e) {
      e.preventDefault();
      newsletter.innerHTML = '<p style="font-style:italic;">Merci — you’re on the list.</p>';
    });
  }

  var contact = document.getElementById('contactForm');
  if (contact) {
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      contact.innerHTML = '<p style="font-style:italic;">Merci — your message has been received. We’ll be in touch shortly.</p>';
    });
  }
})();
