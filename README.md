# Landing VSL + Tracker

Sitio estático: no necesita build, ni servidor, ni base de datos. Se sube la carpeta tal cual.

Flujo: **link en bio** (`hub.html`) → botón 1: **curso de entrada** con cobro (`intro.html`) · botón 2: **VSL** con video y testimonios (`index.html`).

## Archivos

- `hub.html`: link en bio (público). Perfil, dos botones principales, testimonios y CTA.
- `intro.html`: curso de entrada / checkout (público). Precios, qué incluye y temario.
- `index.html`: landing de venta con el VSL (público).
- `tracker.html`: tracker interno con datos de ejemplo. **No lo dejes público con datos reales.** Tiene `noindex`, pero eso no es protección.
- `css/styles.css`: estilos compartidos.
- `js/config.js`: número de WhatsApp (`WHATSAPP_NUMBER`). Cambialo acá si cambia el número.
- `js/landing.js`, `js/intro.js`, `js/tracker.js`: interacción de cada página.

## Antes de publicar

1. Completar los campos entre corchetes en todas las páginas: `hub.html` (nombre, foto, bio, testimonios), `intro.html` (nombre del curso, precios, módulos del temario en `js/intro.js`) e `index.html` (nombre, precio, testimonios, logos, garantía, año, etc.).
2. Insertar el video (Vimeo, Wistia o YouTube no listado) en el reproductor de `index.html`.
3. Enlazar los botones de compra de `intro.html` (`comprar_ars`, `comprar_usd`, `comprar_regalo`) a tu pasarela de pago.
4. Revisar que el número en `js/config.js` sea `5492664229899`.

## Subir (elegí una opción)

**Netlify Drop (lo más rápido, sin cuenta de código):**
1. Entrá a https://app.netlify.com/drop e iniciá sesión.
2. Arrastrá la carpeta `proyecto uno` completa a la página.
3. Te da una URL pública. Podés cambiarle el nombre en *Site settings*.

**Vercel:** en https://vercel.com/new importá la carpeta o un repositorio de GitHub. Framework preset: *Other*. No hay comando de build ni carpeta de salida.

**GitHub Pages:** subí los archivos a un repositorio, luego *Settings → Pages → Deploy from a branch → main / (root)*.

## Después de subir

- Probar en el celular: el botón flotante, el formulario y el reproductor.
- Confirmar que el link de WhatsApp abre el chat con +54 9 2664 22-9899.
- Si agregás Meta Pixel o GA4, pegá el código en `index.html` antes de `</head>`. Los atributos `data-track` ya están puestos en los botones para medir eventos.
