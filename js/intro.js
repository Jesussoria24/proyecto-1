(function () {
  'use strict';

  var WA_BASE = 'https://wa.me/' + String(WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
  var DEFAULT_MSG = 'Hola, tengo una consulta sobre el curso de entrada.';

  function waLink(text) {
    return WA_BASE + '?text=' + encodeURIComponent(text);
  }

  // ---------- Enlace de WhatsApp (botón flotante) ----------
  document.querySelectorAll('[data-wa="float"]').forEach(function (a) {
    a.href = waLink(DEFAULT_MSG);
  });

  // ---------- Temario: acordeón ----------
  // Completá cada módulo con el título y lo que se aprende. El primero arranca abierto.
  var MODULES = [
    { title: '[Módulo 1]', body: '[Qué se aprende en este módulo.]' },
    { title: '[Módulo 2]', body: '[Qué se aprende en este módulo.]' },
    { title: '[Módulo 3]', body: '[Qué se aprende en este módulo.]' },
    { title: '[Módulo 4]', body: '[Qué se aprende en este módulo.]' }
  ];

  var list = document.getElementById('syllabus');
  if (!list) return;

  MODULES.forEach(function (m, i) {
    var num = '0' + (i + 1);
    var answerId = 'syllabus-a-' + i;

    var item = document.createElement('div');
    item.className = 'syllabus__item';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'syllabus__q';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', answerId);
    btn.innerHTML =
      '<span class="syllabus__label">' +
      '<span class="syllabus__num"></span>' +
      '<span class="syllabus__name"></span>' +
      '</span>' +
      '<svg aria-hidden="true" class="syllabus__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A86A" stroke-width="1.6"><path d="M12 5v14M5 12h14"></path></svg>';
    btn.querySelector('.syllabus__num').textContent = num;
    btn.querySelector('.syllabus__name').textContent = m.title;

    var answer = document.createElement('p');
    answer.className = 'syllabus__a';
    answer.id = answerId;
    answer.hidden = true;
    answer.textContent = m.body;

    item.appendChild(btn);
    item.appendChild(answer);
    list.appendChild(item);
  });

  // Un solo módulo abierto a la vez, como en la landing.
  var questions = list.querySelectorAll('.syllabus__q');
  questions.forEach(function (q) {
    q.addEventListener('click', function () {
      var expanded = q.getAttribute('aria-expanded') === 'true';
      questions.forEach(function (other) {
        other.setAttribute('aria-expanded', 'false');
        document.getElementById(other.getAttribute('aria-controls')).hidden = true;
      });
      if (!expanded) {
        q.setAttribute('aria-expanded', 'true');
        document.getElementById(q.getAttribute('aria-controls')).hidden = false;
      }
    });
  });

  // Abrir el primer módulo al cargar.
  if (questions[0]) {
    questions[0].setAttribute('aria-expanded', 'true');
    document.getElementById(questions[0].getAttribute('aria-controls')).hidden = false;
  }
})();
