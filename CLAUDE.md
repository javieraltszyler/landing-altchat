# AltChat — Landing táctica de leads

Landing dedicada para captación de leads vía Meta Ads → WhatsApp. **No** es la web institucional (esa vive en [`WebAltChat-Frontend`](../WebAltChat-Frontend/) → www.altchat.io).

## Posicionamiento

AltChat se posiciona como **equipo técnico que hace consultoría, chatbots y plataformas a medida**, no como SaaS enlatado. La FAQ #1 ya refleja el pivot ("AltChat **no es solo una plataforma**, es un equipo especializado..."). Mantener ese tono — el resto de la landing es táctica (foco WhatsApp/automatización), pero el frame del equipo está.

## Stack y estructura

Una sola página (`index.html`) + `styles-landing.css` + JS vanilla (`landing.js`, `faqs.js`). Sin framework.

Pixel de Meta `1233574771432345` está embebido — **no removerlo** (lo usan las campañas de ads).

## Visual

- Fuente: **Montserrat** (NO Inter — la landing tiene su propia identidad táctica, distinta de la web institucional).
- CTA principal: WhatsApp directo a `+5491155670295` con mensaje pre-armado.
- Iframe de demo: YouTube `0VcSnh5O7Hg`.

## Don't

- No mergear el design system de `WebAltChat-Frontend` acá — son audiencias y propósitos distintos (esta landing es de conversión paga, debe verse "promocional").
- No remover el pixel de Meta.
- No cambiar el número de WhatsApp sin avisar a Javier (está activo en campañas).

## Deploy

Verificar dónde se sirve esta landing antes de hacer cambios — no está confirmado en este repo. Posible: subdominio tipo `landing.altchat.io` o `lp.altchat.io`. Si Javier no recuerda, revisar Cloudflare Pages.
