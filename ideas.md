# Design brief — STARRY Fragrance Quiz

## Direction and source of truth
Preserve the current STARRY fragrance-quiz design as the ground truth. This work is a hosting/adoption task, not a redesign. The existing implementation in `src/styles.css`, `src/main.jsx`, and the supplied product-result artwork defines the look and behavior; keep it consistent across the hosted version.

## Design dimensions
- **Design movement:** Mobile-first, nocturnal fragrance editorial with restrained luxury cues.
- **Core principles:** Preserve the current interface, copy, quiz flow, answer selection, progress, result presentation, product detail content, gallery, and WhatsApp calls to action. Keep content readable and tap targets comfortable on narrow screens; center the phone-width experience on wider screens.
- **Color philosophy:** Near-black midnight backgrounds (`#020509`, `#010307`) with deep navy atmosphere (`#0a1a2b`), warm antique-gold accents (`#e0ad5c`), and soft ivory text (`#ebe0c7`). Retain existing border and muted-gold colors from the stylesheet.
- **Layout paradigm:** A single responsive, vertically scrollable experience with a maximum screen width of 430px, centered on desktop against a dark surround. Keep the existing compact cards, clear section spacing, and product-art stages.
- **Signature elements:** STARRY wordmark, subtle star glyphs, gold progress and match accents, fine dark-blue borders, atmospheric radial gradients, and the supplied fragrance-result artwork.
- **Interaction philosophy:** Simple, direct quiz choices with visible selected state and progress; back/next navigation; a brief preference-analysis interstitial; a clear matched fragrance, details view, gallery, and order action. Preserve existing interaction behavior without adding routes or new account steps.
- **Animation:** Retain only the existing restrained analysis loading-bar motion. Do not add decorative motion.
- **Typography system:** Montserrat for interface/body copy and Playfair Display for the wordmark and editorial headings, as already specified in `index.html` and the stylesheet.
- **Brand essence:** STARRY fragrance house; celestial, nocturnal, polished, and approachable.
- **Brand voice:** Concise, evocative fragrance copy; preserve current product language verbatim.
- **Wordmark/logo:** Preserve the existing STARRY text wordmark. Add a project-specific star symbol in the same midnight-and-gold identity for the favicon and project metadata; it must not replace or restyle the site's wordmark.
- **Signature brand color:** Antique gold `#e0ad5c`.

## Project icon direction
Create one opaque, unmasked square icon with a full-bleed midnight-navy background and a single bold antique-gold celestial star mark. Use two or three broad filled shapes, strong silhouette, and intentional negative space; no wording, frame, inset tile, glow, gradient, texture, shadow, or small details. This icon supports the existing identity and is not a new visual direction for the application.
