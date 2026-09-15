// Nina et Michelle theme interactions

(function () {
  // Mobile navigation
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mobileNav');
  var close = document.getElementById('navClose');
  if (toggle && nav) toggle.addEventListener('click', function () { nav.classList.add('open'); });
  if (close && nav) close.addEventListener('click', function () { nav.classList.remove('open'); });

  // Quantity steppers (product + cart)
  document.querySelectorAll('[data-qty]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.getElementById('Qty');
      if (!input) return;
      input.value = Math.max(1, (parseInt(input.value, 10) || 1) + parseInt(btn.dataset.qty, 10));
    });
  });
  document.querySelectorAll('[data-change]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = btn.parentElement.querySelector('input[name="updates[]"]');
      if (!input) return;
      input.value = Math.max(0, (parseInt(input.value, 10) || 0) + parseInt(btn.dataset.change, 10));
      var form = btn.closest('form');
      if (form) form.submit();
    });
  });

  // Product option selection -> variant id + price + availability
  var variantData = document.getElementById('VariantData');
  if (variantData) {
    var variants = JSON.parse(variantData.textContent);
    var radios = document.querySelectorAll('input[type="radio"][name^="option-"]');

    function currentOptions() {
      var opts = [];
      var groups = {};
      radios.forEach(function (r) { (groups[r.name] = groups[r.name] || []).push(r); });
      Object.keys(groups).sort().forEach(function (name) {
        var checked = groups[name].find(function (r) { return r.checked; });
        opts.push(checked ? checked.value : null);
      });
      return opts;
    }

    function refresh() {
      var opts = currentOptions();
      var match = variants.find(function (v) {
        return v.options.every(function (o, i) { return o === opts[i]; });
      });
      var idInput = document.getElementById('VariantId');
      var addBtn = document.getElementById('AddToCart');
      var price = document.getElementById('ProductPrice');
      if (match) {
        if (idInput) idInput.value = match.id;
        if (addBtn) {
          addBtn.disabled = !match.available;
          addBtn.textContent = match.available ? 'Add to Cart' : 'Sold Out';
        }
        if (price && typeof match.price === 'number') {
          price.textContent = (match.price / 100).toLocaleString(undefined, { minimumFractionDigits: 2 });
        }
      } else if (addBtn) {
        addBtn.disabled = true;
        addBtn.textContent = 'Unavailable';
      }
      // highlight selected option buttons
      radios.forEach(function (r) {
        var label = r.closest('label');
        if (label) label.classList.toggle('active', r.checked);
      });
    }

    radios.forEach(function (r) { r.addEventListener('change', refresh); });
    refresh();
  }

  // Product gallery thumbnails
  document.querySelectorAll('.thumb-img').forEach(function (img) {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function () {
      var main = document.getElementById('MainImage');
      if (main && img.dataset.full) main.src = img.dataset.full;
    });
  });
})();
