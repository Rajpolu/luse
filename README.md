# Luse – Icon Logo Studio

<p align="center">
  <img src="assets/logo.svg" alt="Luse Logo" width="96" height="96">
</p>

<p align="center">
  <strong>An ultra-fast, dependency-free in-browser studio for crafting professional app icons, logos, and favicon packages.</strong>
</p>

<p align="center">
  <a href="https://github.com/Rajpolu/luse/stargazers"><img src="https://img.shields.io/github/stars/Rajpolu/luse?style=flat-square&color=ffbe18" alt="GitHub Stars"></a>
  <a href="https://github.com/Rajpolu/luse/network/members"><img src="https://img.shields.io/github/forks/Rajpolu/luse?style=flat-square&color=4f46e5" alt="GitHub Forks"></a>
  <a href="https://github.com/Rajpolu/luse/issues"><img src="https://img.shields.io/github/issues/Rajpolu/luse?style=flat-square&color=22c55e" alt="GitHub Issues"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-f7df1e?style=flat-square&logo=javascript&logoColor=black" alt="Vanilla JS">
  <img src="https://img.shields.io/badge/Icons-1700%2B%20Lucide-orange?style=flat-square" alt="Lucide Icons">
  <img src="https://img.shields.io/badge/Build%20Step-None%20(Pure%20Web)-success?style=flat-square" alt="Zero Build">
</p>

---

## 📸 Preview

<p align="center">
  <img src="assets/screenshot.png" alt="Luse Icon Logo Studio Interface" width="100%">
</p>

---

## ⚡ About This Web App

**Luse** is a lightweight, zero-dependency web application designed for developers, indie hackers, designers, and creators who need clean, modern logos and app icons in seconds. 

Unlike heavy graphic design suites or subscription-gated tools, Luse runs **entirely client-side in your browser** with zero build configuration, no Node.js build pipeline, and no telemetry. It combines vector precision with an intuitive, tactile interface featuring draggable scrubbers, real-time HSV color pickers, curated typographic presets, 3D stage tilt effects, and an export engine that renders assets from favicons up to crisp 4K rasters.

---

## ✨ Detailed Features

### 🎨 Icon Library & Customization
- **1,700+ Vector Icons**: Full integration of the complete [Lucide](https://lucide.dev) icon library with instant search, live filtering, and direct links to icon specs.
- **Parametric Geometry**: Fine-tune icon scaling (100–460px), smooth rotation (-180° to +180°), stroke border thickness (0.5–4.0px), and fill opacity (0–100%).
- **Shape Radii**: Toggle between sharp square, squircle (iOS-style corner radius), and circular avatar layouts, or scrub continuous corner radius from 0 to 256px.

### 🌈 Color & Visual Styling
- **Precision Color Engine**: Full HSV color picker with 2D saturation/value plane, continuous hue slider, and direct hex code input.
- **Native EyeDropper API**: Sample any color directly from your desktop screen (on supported Chromium browsers).
- **Curated Palettes & Presets**: Quick-select trending solid swatches and single-click style presets.
- **Dynamic Gradients**: 8 handcrafted linear gradient blends (Sunset, Ocean, Aurora, Grape, Peach, Midnight, Mint, Candy) with customizable gradient rotation angles (0–360°).
- **Transparency Mode**: Instant checkerboard canvas toggle for transparent PNG/SVG exports.

### ✍️ Typography & Layout Engine
- **Three Composition Modes**: Choose between *Icon Only*, *Icon + Text*, or *Text Only*.
- **Auto-Balanced Optical Layout**: Automatic mathematical scaling and vertical positioning to maintain visual harmony between icon and label.
- **6 Typographic Presets**:
  - **Modern** (Inter / System Sans-Serif)
  - **Elegant** (Playfair Display / Serif)
  - **Tech** (JetBrains Mono / Monospace)
  - **Friendly** (Nunito / Rounded Sans)
  - **Impact** (Arial Black / Display)
  - **Script** (Brush & Cursive)
- **Typographic Controls**: Font weights (Regular 400, Bold 700, Black 900), letter-spacing tracking (-10% to +40%), text scaling, and instant uppercase casing.

### 🚀 Production-Grade Export Engine
- **Multi-Format Export**: Download in **SVG** (infinite resolution vector), **PNG**, **WebP**, or **JPG**.
- **High-DPI Resolutions**: One-click rendering in **512px**, **1K (1024px)**, **2K (2048px)**, and ultra-crisp **4K (4096px)** with bicubic smoothing.
- **One-Click Favicon Pack (.zip)**: Bundles a complete web favicon suite containing 16×16, 32×32, 48×48, 64×64, 128×128, 180×180 (Apple Touch Icon), 192×192, 256×256, 512×512 PNGs alongside raw vector `icon.svg` using client-side JSZip.
- **Direct Clipboard Integration**: Copy raw SVG vector markup or binary PNG raster image directly to your clipboard.

### 🛠️ Workflow & Productivity
- **Tactile Scrubber Sliders**: Drag left/right to scrub values, hold <kbd>Shift</kbd> for 0.1x micro-precision, use arrow keys to step, or double-click to type exact numeric values.
- **Undo / Redo History**: Up to 80 action history states accessible via <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> and <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> (or <kbd>Cmd</kbd> + <kbd>Y</kbd>).
- **Design Bookmarks**: Save up to 24 design iterations locally in your browser’s `localStorage`.
- **Shareable Hash Links**: Encode your full configuration directly into a URL hash (`#d=...`) to share designs without a backend database.
- **Dark & Light Mode**: Seamless theme switching with system preference detection and manual override.
- **Interactive 3D Stage**: Smooth parallax 3D card tilt responding to pointer movement.
- **Mobile & Tablet Optimized**: Responsive bottom-sheet modal with accessible keyboard navigation and focus trapping.

---

## 🚀 How to Use It

### Option 1: Open Directly
Because Luse is entirely self-contained with no build steps, you can simply open the `index.html` file in any modern web browser:

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### Option 2: Run a Local Static Server
To avoid local file URL limitations and enable full web capabilities (like the EyeDropper API and clipboard permissions), serve the directory with any static server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```
Then visit **`http://localhost:8000`** in your browser.

---

## 📖 Quick Start Guide

1. **Pick an Icon**: Navigate to the **Icon** tab and search among 1,700+ Lucide symbols (or click the **Shuffle** button in the bottom toolbar for random inspiration).
2. **Refine Geometry**: Switch to the **Adjust** tab to customize icon size, stroke border width, rotation angle, and background squircle roundness.
3. **Style Colors**: Go to **Style** to pick colors, adjust fill opacity, apply gradients, or select one of the starter presets.
4. **Add Brand Text**: On the **Text** tab, set the mode to *Icon + Text*, enter your brand name, and choose a typography preset.
5. **Export Your Assets**: Open the **Export** tab to download high-resolution PNGs (up to 4K), copy clean SVG code, or generate a complete **Favicon pack (.zip)**.

---

## 📁 Project Structure

```text
luse/
├── index.html            # Main application layout and markup
├── css/
│   └── styles.css        # Clean responsive styles, themes, and CSS custom properties
├── js/
│   ├── app.js            # Core application state, scrubber logic, and render engine
│   └── vendor/
│       ├── lucide.min.js # Lucide Icons v0.460.0 (offline vector icon library)
│       └── jszip.min.js  # JSZip v3.10.1 (client-side favicon ZIP generator)
├── assets/
│   ├── logo.svg          # Luse brand mark
│   ├── favicon.svg       # Studio favicon
│   └── screenshot.png    # High-resolution retina preview
├── LICENSE               # MIT License
└── README.md             # Documentation
```

---

## 🤝 Contributing Guidelines

Contributions, ideas, and bug reports are welcome! To contribute:

1. **Fork the Repository** on GitHub.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/luse.git
   cd luse
   ```
3. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make Your Changes**:
   - Keep the application dependency-free and lightweight.
   - Maintain vanilla JavaScript and standard CSS.
   - Test across modern browsers (Chrome/Brave, Firefox, Safari) and mobile viewport sizes.
5. **Commit Your Changes**:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
6. **Push to Your Fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request** describing what you added or fixed.

---

## 📄 License

This project is licensed under the **[MIT License](LICENSE)** – created by [Rajpolu](https://github.com/rajpolu).

### Third-Party Credits
- **[Lucide Icons](https://lucide.dev)** – [ISC License](https://github.com/lucide-icons/lucide/blob/main/LICENSE)
- **[JSZip](https://stuk.github.io/jszip/)** – [MIT License](https://github.com/Stuk/jszip/blob/master/LICENSE.markdown)
