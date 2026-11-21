(function () {
  'use strict';

  // Si es true, el botón "Quiero ver si califico" aparece recién después de empezar el video.
  var DELAYED_CTA = true;
  var PLAY_REVEAL_MS = 3500;

  var WA_BASE = 'https://wa.me/' + String(WHATSAPP_NUMBER).replace(/[^0-9]/g, '');

  function waLink(text) {
    return WA_BASE + '?text=' + encodeURIComponent(text);
  }

  var DEFAULT_MSG = 'Hola, vi el video y quiero saber si califico.';

  // ---------- Enlaces de WhatsApp ----------
  document.querySelectorAll('[data-wa="header"], [data-wa="float"]').forEach(function (a) {
    a.href = waLink(DEFAULT_MSG);
  });

  var formWa = document.getElementById('form-wa');
  var nameInput = document.getElementById('f-nombre');

  function updateFormLink() {
    var name = nameInput.value.trim();
    var msg = name
      ? 'Hola, soy ' + name + '. Vi el video y quiero saber si califico.'
      : DEFAULT_MSG;
    formWa.href = waLink(msg);
  }

  nameInput.addEventListener('input', updateFormLink);
  updateFormLink();

  // ---------- VSL: reproducir y revelar CTA ----------
  var playBtn = document.getElementById('vsl-play');
  var stage = document.getElementById('vsl-stage');
  var progress = document.getElementById('vsl-progress');
  var ctaLocked = document.getElementById('cta-locked');
  var ctaVisible = document.getElementById('cta-visible');
  var revealTimer = null;

  function revealCta() {
    ctaVisible.hidden = false;
    ctaLocked.hidden = true;
  }

  if (!DELAYED_CTA) {
    revealCta();
  }

  playBtn.addEventListener('click', function () {
    playBtn.hidden = true;
    stage.hidden = false;
    // Forzar reflow para que la transición de la barra arranque desde 0.
    void progress.offsetWidth;
    progress.style.width = '64%';

    clearTimeout(revealTimer);
    if (DELAYED_CTA) {
      revealTimer = setTimeout(revealCta, PLAY_REVEAL_MS);
    }
  });

  // ---------- Testimonios ----------
  var testimonials = [
    { name: '[Cliente 1]', role: '[Rubro / empresa]', result: '[Resultado concreto en números]', quote: '[Frase textual del cliente sobre el resultado]', dur: '[1:45]' },
    { name: '[Cliente 2]', role: '[Rubro / empresa]', result: '[Resultado concreto en números]', quote: '[Frase textual del cliente]', dur: '[2:10]' },
    { name: '[Cliente 3]', role: '[Rubro / empresa]', result: '[Resultado concreto en números]', quote: '[Frase textual del cliente]', dur: '[0:58]' },
    { name: '[Cliente 4]', role: '[Rubro / empresa]', result: '[Resultado concreto en números]', quote: '[Frase textual del cliente]', dur: '[1:20]' }
  ];

  var tList = document.getElementById('t-list');
  var tQuote = document.getElementById('t-quote');
  var tAuthor = document.getElementById('t-author');
  var tDuration = document.getElementById('t-duration');

  function renderTestimonial(active) {
    var cur = testimonials[active];
    tQuote.textContent = '“' + cur.quote + '”';
    tAuthor.textContent = cur.name + ' · ' + cur.role;
    tDuration.textContent = 'Video testimonio · ' + cur.dur;

    tList.querySelectorAll('.testimonial-item').forEach(function (btn, i) {
      var on = i === active;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.querySelector('.testimonial-item__label').textContent = on ? 'En pantalla' : 'Ver testimonio';
    });
  }

  tList.innerHTML = '';
  testimonials.forEach(function (t, i) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'testimonial-item';
    btn.setAttribute('data-track', 'testimonio_click');
    btn.innerHTML =
      '<span class="testimonial-item__thumb">[Miniatura]</span>' +
      '<span class="testimonial-item__text">' +
      '<span class="testimonial-item__name"></span>' +
      '<span class="testimonial-item__result"></span>' +
      '<span class="testimonial-item__label"></span>' +
      '</span>';
    btn.querySelector('.testimonial-item__name').textContent = t.name;
    btn.querySelector('.testimonial-item__result').textContent = t.result;
    btn.addEventListener('click', function () { renderTestimonial(i); });
    tList.appendChild(btn);
  });
  renderTestimonial(0);

  // ---------- FAQ ----------
  document.querySelectorAll('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var expanded = q.getAttribute('aria-expanded') === 'true';
      // Un solo item abierto a la vez, como en el diseño.
      document.querySelectorAll('.faq__q').forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        document.getElementById(other.getAttribute('aria-controls')).hidden = true;
      });
      if (!expanded) {
        q.setAttribute('aria-expanded', 'true');
        document.getElementById(q.getAttribute('aria-controls')).hidden = false;
      }
    });
  });
})();
