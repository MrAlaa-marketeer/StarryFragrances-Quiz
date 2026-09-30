# STARRY Quiz — React/Vite

Mobile-first implementation of the STARRY fragrance quiz design.

## Run
```bash
npm install
npm run dev
```

## Add the real perfume images
Put the bottle/product images in:
`public/images/`

Use these exact filenames for the current product data:
- the-elite.png
- luna.png
- tropical-bomb.png
- fizzy-apple.png
- perla.png
- spicy-vanilla.png
- star-boy.png
- starry-amber.png

You can also add quiz option images later by adding an `image` field to the relevant option in `src/data/products.js`.

## Where the fragrance data lives
`src/data/products.js`

Each fragrance is data-driven:
- name
- image
- positioning
- description
- tags used by the quiz
- accords
- fragrance notes

The quiz matching is intentionally simple and editable. We can replace it later with a weighted scoring system based on your exact 8 fragrances and your actual preferences.

## Next integration
1. Replace placeholder bottle images with the real transparent PNGs.
2. Add the actual backgrounds / cinematic hero images.
3. Finalize the exact quiz questions and scoring weights.
4. Add the full product details for all fragrances.
5. Connect the WhatsApp order CTA to your real number.
6. Deploy to Vercel/Netlify or your preferred host.


## Uploaded result creatives
Eight uploaded fragrance creatives are wired to their matching result pages.
