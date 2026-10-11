# Luse – Icon Logo Studio

A static, dependency-free web app (HTML5 + CSS + vanilla JavaScript). No build step.

## Run
Open `index.html` in a modern browser, or serve the folder:

    npx serve .        # or: python3 -m http.server 8000

## Structure
- `index.html` – markup
- `css/styles.css` – all styles (light/dark themes, responsive layout, modal panels)
- `js/app.js` – app logic (icon picker, scrubber sliders, color picker, text layout, export engine)
- `js/vendor/` – Lucide 0.460.0 (ISC) and JSZip 3.10.1 (MIT), bundled for offline use
- `assets/` – brand logo and favicon (SVG)

## Notes
- Designs are saved in the browser's localStorage.
- Text uses system fonts so exports match the preview on the same device.
- Icons by Lucide (https://lucide.dev), ISC License.
