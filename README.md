<div align="center">

# ✨ Happy Birthday Celebration ✨
### A Cinematic, Interactive & Personalized Birthday Web Experience

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://en.wikipedia.org/wiki/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://en.wikipedia.org/wiki/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesized-blueviolet?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-success?style=flat&logo=github)](https://arianpashae.github.io/Happy-Birthday/)

[**Explore Live Demo »**](https://arianpashae.github.io/Happy-Birthday/)

</div>

---

## 🌟 Overview

**Happy Birthday** is a high-craft, cinematic web experience crafted to celebrate birthdays with unforgettable flair. Featuring realistic particle fireworks, a fluttering confetti cannon, an interactive multi-tier 3D cake with blowable candle flames, and a native Web Audio API melody synthesizer.

Zero heavy frameworks, zero external audio assets — 100% lightweight, responsive, and standalone.

---

## ✨ Features

- **🎆 Physics-Driven Fireworks Engine**: High-DPI canvas engine with rocket trails, multi-colored radial explosions, shooting stars, and interactive click-to-launch rockets.
- **🎂 Interactive 3D Cake**:
  - Detailed multi-tier layered cake with frosting drips and flickering organic candle flames.
  - **Blow out the candles** with a click or tap — triggers rising smoke, cheer SFX, and an explosion of confetti & fireworks!
  - Click again to relight anytime.
- **🎵 Procedural Web Audio Synthesizer**:
  - Plays the iconic "Happy Birthday" tune using harmonic chime bells and vibraphone envelopes.
  - Built-in sound effects (candle puff, confetti pops, sparkle chimes) with zero external MP3 dependencies.
  - Animated equalizer waves and audio toggle.
- **🎊 3D Confetti Cannon**: Physics-driven fluttering ribbons with 3D rotation, air drag, and gravity.
- **💌 Luxury Greeting Card**: An interactive 3D modal card with golden foil aesthetic and warm celebratory wishes.
- **🔗 Instant Personalization & Sharing**:
  - Custom URL query parameters allow anyone to generate a personalized link for their friends in seconds.
  - In-app customization modal with **Copy Share Link** button.
- **📱 Fully Responsive**: Flawless experience across mobile phones, tablets, and 4K displays at silky 60 FPS.

---

## 🚀 Live Demo & Personalization

### 🔗 URL Parameters

You can personalize the recipient's name and message directly via URL parameters:

```text
https://arianpashae.github.io/Happy-Birthday/?name=Sarah&wish=Wishing%20you%20the%20happiest%20birthday%20ever!
```

| Parameter | Alias | Default | Description |
|---|---|---|---|
| `name` | `n` | `Arian Pashae` | The name of the birthday person displayed in glowing typography |
| `wish` | `msg`, `m` | Default heartfelt quote | Custom birthday wish displayed on hero & greeting card |

---

## 🛠️ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/ArianPashae/Happy-Birthday.git
cd Happy-Birthday
```

### 2. Run locally
Since this project uses pure vanilla HTML, CSS, and JavaScript, you can simply open `index.html` in any modern web browser, or use a local static server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

Then visit `http://localhost:8000` in your browser.

---

## 🌐 Deploy to GitHub Pages

1. Go to your repository settings on GitHub: **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3. Choose branch: `master` (or `main`) and folder: `/ (root)`.
4. Click **Save** — your celebration will be live at `https://<your-username>.github.io/Happy-Birthday/`!

---

## 🎨 Technology Stack

- **Markup**: Semantic HTML5 with rich OpenGraph metadata.
- **Styling**: Modern CSS3 (Grid, Flexbox, 3D Transforms, Glassmorphism, CSS Custom Properties).
- **Animation**: Native Canvas 2D API (`requestAnimationFrame`) with Retina / high-DPI scaling.
- **Audio**: Web Audio API (Synthesizer, BiquadFilter, Oscillator, GainNode).
- **Fonts**: Google Fonts (*Playfair Display*, *Outfit*, *Dancing Script*).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - feel free to use, modify, and share joy!

---

<div align="center">

Crafted with ❤️ by **[Arian Pashae](https://github.com/ArianPashae)**

*May every year bring you closer to your dreams.* ✨

</div>
