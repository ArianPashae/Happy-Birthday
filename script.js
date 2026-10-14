/**
 * Cinematic Interactive Happy Birthday Experience
 * Created by Arian Pashae
 * Features:
 *  - High-DPI Fireworks Engine with Particle Physics & Starfield
 *  - Fluttering 3D Ribbon & Confetti Physics System
 *  - Native Web Audio API Synthesizer (Happy Birthday melody & SFX)
 *  - Interactive 3D Cake with Blowable / Relightable Candles & Smoke
 *  - Personalization URL Parameters (?name=...&wish=...)
 */

(function () {
  'use strict';

  // ==========================================
  // 1. Audio Synthesizer (Web Audio API)
  // ==========================================
  class AudioEngine {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
      this.melodyTimer = null;
      this.currentNoteIndex = 0;

      // Happy Birthday Melody: Note, Duration (beats)
      this.melody = [
        { note: 'G4', d: 0.75 }, { note: 'G4', d: 0.25 }, { note: 'A4', d: 1 }, { note: 'G4', d: 1 }, { note: 'C5', d: 1 }, { note: 'B4', d: 2 },
        { note: 'G4', d: 0.75 }, { note: 'G4', d: 0.25 }, { note: 'A4', d: 1 }, { note: 'G4', d: 1 }, { note: 'D5', d: 1 }, { note: 'C5', d: 2 },
        { note: 'G4', d: 0.75 }, { note: 'G4', d: 0.25 }, { note: 'G5', d: 1 }, { note: 'E5', d: 1 }, { note: 'C5', d: 1 }, { note: 'B4', d: 1 }, { note: 'A4', d: 2 },
        { note: 'F5', d: 0.75 }, { note: 'F5', d: 0.25 }, { note: 'E5', d: 1 }, { note: 'C5', d: 1 }, { note: 'D5', d: 1 }, { note: 'C5', d: 2.5 }
      ];

      this.frequencies = {
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
        'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77
      };
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playNote(freq, duration = 0.5, type = 'sine') {
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        // Music box / Chime bell envelope
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      } catch (e) {
        console.warn('Audio note error:', e);
      }
    }

    playNextMelodyNote() {
      if (!this.isPlaying || !this.ctx) return;

      const item = this.melody[this.currentNoteIndex];
      const freq = this.frequencies[item.note];
      const beatSec = 0.45;
      const noteDuration = item.d * beatSec;

      if (freq) {
        this.playNote(freq, noteDuration * 1.2, 'triangle');
      }

      this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
      this.melodyTimer = setTimeout(() => {
        this.playNextMelodyNote();
      }, noteDuration * 1000);
    }

    toggleMusic() {
      this.init();
      this.isPlaying = !this.isPlaying;

      if (this.isPlaying) {
        this.currentNoteIndex = 0;
        this.playNextMelodyNote();
        return true;
      } else {
        clearTimeout(this.melodyTimer);
        return false;
      }
    }

    playCandleBlow() {
      this.init();
      if (!this.ctx) return;
      try {
        // Noise whoosh sound
        const bufferSize = this.ctx.sampleRate * 0.4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.4);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start();
      } catch {}
    }

    playConfettiPop() {
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.16);
      } catch {}
    }

    playChime() {
      this.init();
      if (!this.ctx) return;
      this.playNote(880, 0.4, 'sine');
      setTimeout(() => this.playNote(1320, 0.6, 'sine'), 80);
    }
  }

  const audio = new AudioEngine();

  // ==========================================
  // 2. Fireworks & Starfield Engine
  // ==========================================
  class FireworksEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.stars = [];
      this.fireworks = [];
      this.particles = [];
      this.shootingStars = [];
      this.width = 0;
      this.height = 0;
      this.dpr = window.devicePixelRatio || 1;

      this.colors = [
        '#ffd15c', '#ff5e8a', '#00f2fe', '#4facfe',
        '#ff9a9e', '#a1c4fd', '#fbc2eb', '#43e97b', '#f9d423'
      ];

      this.resize();
      this.initStars();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.scale(this.dpr, this.dpr);
    }

    initStars() {
      this.stars = [];
      const count = Math.min(180, Math.floor((this.width * this.height) / 7000));
      for (let i = 0; i < count; i++) {
        this.stars.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 1.6 + 0.4,
          alpha: Math.random(),
          speed: Math.random() * 0.02 + 0.005,
          color: Math.random() > 0.8 ? '#ffd15c' : '#ffffff'
        });
      }
    }

    launch(targetX, targetY) {
      const startX = targetX + (Math.random() * 80 - 40);
      const startY = this.height + 10;
      const speed = Math.random() * 3 + 12;
      const angle = Math.atan2(targetY - startY, targetX - startX);

      this.fireworks.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        targetX,
        targetY,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        trail: [],
        dead: false
      });
    }

    explode(x, y, baseColor) {
      const count = Math.floor(Math.random() * 25) + 45;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.2 - 0.1);
        const speed = Math.random() * 5.5 + 1.5;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: Math.random() > 0.3 ? baseColor : this.colors[Math.floor(Math.random() * this.colors.length)],
          alpha: 1,
          decay: Math.random() * 0.015 + 0.012,
          size: Math.random() * 2.5 + 1.2,
          gravity: 0.06
        });
      }
    }

    maybeSpawnShootingStar() {
      if (Math.random() < 0.008 && this.shootingStars.length < 2) {
        this.shootingStars.push({
          x: Math.random() * this.width * 0.8,
          y: Math.random() * this.height * 0.4,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 10,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          alpha: 1
        });
      }
    }

    updateAndRender() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Render Stars
      for (const s of this.stars) {
        s.alpha += s.speed;
        const currentAlpha = (Math.sin(s.alpha) + 1) / 2 * 0.8 + 0.1;
        this.ctx.fillStyle = s.color;
        this.ctx.globalAlpha = currentAlpha;
        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      // Render Shooting Stars
      this.maybeSpawnShootingStar();
      for (let i = this.shootingStars.length - 1; i >= 0; i--) {
        const ss = this.shootingStars[i];
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${ss.alpha})`;
        this.ctx.lineWidth = 1.8;
        this.ctx.beginPath();
        this.ctx.moveTo(ss.x, ss.y);
        this.ctx.lineTo(
          ss.x - Math.cos(ss.angle) * ss.length,
          ss.y - Math.sin(ss.angle) * ss.length
        );
        this.ctx.stroke();

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.025;

        if (ss.alpha <= 0) {
          this.shootingStars.splice(i, 1);
        }
      }

      // Render Fireworks Rockets
      for (let i = this.fireworks.length - 1; i >= 0; i--) {
        const fw = this.fireworks[i];
        fw.trail.push({ x: fw.x, y: fw.y });
        if (fw.trail.length > 7) fw.trail.shift();

        this.ctx.strokeStyle = fw.color;
        this.ctx.lineWidth = 2.5;
        this.ctx.beginPath();
        for (let j = 0; j < fw.trail.length; j++) {
          const pt = fw.trail[j];
          this.ctx.globalAlpha = (j + 1) / fw.trail.length * 0.8;
          if (j === 0) this.ctx.moveTo(pt.x, pt.y);
          else this.ctx.lineTo(pt.x, pt.y);
        }
        this.ctx.stroke();

        fw.x += fw.vx;
        fw.y += fw.vy;
        fw.vy += 0.05; // slight rocket drag

        // Check reach target
        if (fw.y <= fw.targetY || fw.vy >= 0) {
          this.explode(fw.x, fw.y, fw.color);
          this.fireworks.splice(i, 1);
        }
      }

      // Render Explosion Particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = p.alpha;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.globalAlpha = 1;
    }
  }

  // ==========================================
  // 3. Confetti Cannon Physics System
  // ==========================================
  class ConfettiEngine {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.confetti = [];
      this.width = 0;
      this.height = 0;
      this.dpr = window.devicePixelRatio || 1;

      this.colors = [
        '#ffd15c', '#ff4757', '#2ed573', '#1e90ff',
        '#9b59b6', '#ffa502', '#ff6b81', '#70a1ff'
      ];

      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.scale(this.dpr, this.dpr);
    }

    fire(x, y, count = 70, angleSpread = Math.PI * 2, baseAngle = -Math.PI / 2) {
      for (let i = 0; i < count; i++) {
        const angle = baseAngle + (Math.random() - 0.5) * angleSpread;
        const velocity = Math.random() * 11 + 6;
        this.confetti.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          size: Math.random() * 7 + 5,
          tilt: Math.random() * 10,
          tiltAngle: Math.random() * Math.PI,
          tiltAngleIncremental: (Math.random() * 0.08) + 0.04,
          wobble: Math.random() * 10,
          alpha: 1,
          gravity: 0.22,
          decay: Math.random() * 0.005 + 0.003
        });
      }
    }

    burstFromSides() {
      this.fire(50, this.height * 0.75, 55, Math.PI / 3, -Math.PI / 4);
      this.fire(this.width - 50, this.height * 0.75, 55, Math.PI / 3, -3 * Math.PI / 4);
    }

    updateAndRender() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = this.confetti.length - 1; i >= 0; i--) {
        const c = this.confetti[i];
        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.wobble) + c.vy + 1) / 2;
        c.x += Math.sin(c.tiltAngle) * 2 + c.vx;
        c.vy += c.gravity;
        c.vx *= 0.98;
        c.alpha -= c.decay;

        if (c.y > this.height + 20 || c.alpha <= 0) {
          this.confetti.splice(i, 1);
          continue;
        }

        const x = c.x + 10 * Math.cos(c.tiltAngle);
        const y = c.y + 10 * Math.sin(c.tiltAngle);

        this.ctx.fillStyle = c.color;
        this.ctx.globalAlpha = Math.max(0, c.alpha);
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(c.tiltAngle);
        this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
        this.ctx.restore();
      }

      this.ctx.globalAlpha = 1;
    }
  }

  // ==========================================
  // 4. Main Application Controller
  // ==========================================
  document.addEventListener('DOMContentLoaded', () => {
    const bgCanvas = document.getElementById('bg-canvas');
    const confettiCanvas = document.getElementById('confetti-canvas');

    const fireworks = new FireworksEngine(bgCanvas);
    const confetti = new ConfettiEngine(confettiCanvas);

    // DOM Elements
    const displayNameEl = document.getElementById('display-name');
    const displayWishEl = document.getElementById('display-wish');
    const cardRecipientEl = document.getElementById('card-recipient');
    const cardBodyEl = document.getElementById('card-body');

    const cakeStage = document.getElementById('cake-stage');
    const flames = [
      document.getElementById('flame-1'),
      document.getElementById('flame-2'),
      document.getElementById('flame-3')
    ];
    const hintText = document.getElementById('hint-text');
    const cakeHint = document.getElementById('cake-hint');

    // Controls
    const btnMusic = document.getElementById('btn-music');
    const audioWaves = document.getElementById('audio-waves');
    const btnBlow = document.getElementById('btn-blow');
    const blowIcon = document.getElementById('blow-icon');
    const blowLabel = document.getElementById('blow-label');
    const btnConfetti = document.getElementById('btn-confetti');
    const btnCard = document.getElementById('btn-card');
    const btnShare = document.getElementById('btn-share');

    // Modals
    const cardModal = document.getElementById('card-modal');
    const cardModalClose = document.getElementById('card-modal-close');
    const shareModal = document.getElementById('share-modal');
    const shareModalClose = document.getElementById('share-modal-close');

    // Customization Form
    const inputName = document.getElementById('input-name');
    const inputWish = document.getElementById('input-wish');
    const btnApplyChanges = document.getElementById('btn-apply-changes');
    const btnCopyLink = document.getElementById('btn-copy-link');

    let areCandlesLit = true;

    // Read URL Parameters for personalization
    function loadFromUrlParams() {
      const params = new URLSearchParams(window.location.search);
      const name = params.get('name') || params.get('n') || 'Arian Pashae';
      const wish = params.get('wish') || params.get('msg') || params.get('m') ||
        'Wishing you a year filled with boundless joy, limitless success, and unforgettable moments.';

      displayNameEl.textContent = name;
      cardRecipientEl.textContent = `Dear ${name},`;
      displayWishEl.textContent = `"${wish}"`;
      cardBodyEl.textContent = wish;

      inputName.value = name;
      inputWish.value = wish;
    }

    loadFromUrlParams();

    // Toggle Candles Function
    function toggleCandles() {
      areCandlesLit = !areCandlesLit;

      if (!areCandlesLit) {
        // Blow out candles
        flames.forEach(f => f && f.classList.add('extinguished'));
        document.querySelectorAll('.candle').forEach(c => c.classList.add('blown'));

        hintText.textContent = '🎉 Candles blown! Make a wish! (Click to relight)';
        cakeHint.classList.add('blown-state');
        blowIcon.textContent = '🔥';
        blowLabel.textContent = 'Relight';

        audio.playCandleBlow();

        // Epic celebration explosion
        const rect = cakeStage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height * 0.3;

        confetti.fire(centerX, centerY, 80);
        confetti.burstFromSides();

        fireworks.launch(centerX - 120, centerY - 150);
        fireworks.launch(centerX + 120, centerY - 150);
        fireworks.launch(centerX, centerY - 200);
      } else {
        // Relight candles
        flames.forEach(f => f && f.classList.remove('extinguished'));
        document.querySelectorAll('.candle').forEach(c => c.classList.remove('blown'));

        hintText.textContent = 'Click the cake to blow out candles!';
        cakeHint.classList.remove('blown-state');
        blowIcon.textContent = '🕯️';
        blowLabel.textContent = 'Blow';

        audio.playChime();
      }
    }

    // Cake Click Event
    cakeStage.addEventListener('click', () => {
      toggleCandles();
    });

    // Blow Button Click Event
    btnBlow.addEventListener('click', () => {
      toggleCandles();
    });

    // Music Button
    btnMusic.addEventListener('click', () => {
      const isPlaying = audio.toggleMusic();
      if (isPlaying) {
        audioWaves.classList.add('playing');
        btnMusic.title = 'Mute Melody';
      } else {
        audioWaves.classList.remove('playing');
        btnMusic.title = 'Play Birthday Melody';
      }
    });

    // Confetti Cannon Button
    btnConfetti.addEventListener('click', (e) => {
      audio.playConfettiPop();
      confetti.burstFromSides();
      confetti.fire(window.innerWidth / 2, window.innerHeight * 0.5, 60);

      // Also trigger a random firework
      const rx = Math.random() * (window.innerWidth * 0.6) + window.innerWidth * 0.2;
      const ry = Math.random() * (window.innerHeight * 0.3) + window.innerHeight * 0.15;
      fireworks.launch(rx, ry);
    });

    // Card Modal
    btnCard.addEventListener('click', () => {
      cardModal.classList.add('active');
      audio.playChime();
    });
    cardModalClose.addEventListener('click', () => {
      cardModal.classList.remove('active');
    });
    cardModal.addEventListener('click', (e) => {
      if (e.target === cardModal) cardModal.classList.remove('active');
    });

    // Customize Modal
    btnShare.addEventListener('click', () => {
      shareModal.classList.add('active');
    });
    shareModalClose.addEventListener('click', () => {
      shareModal.classList.remove('active');
    });
    shareModal.addEventListener('click', (e) => {
      if (e.target === shareModal) shareModal.classList.remove('active');
    });

    // Apply Changes from Form
    btnApplyChanges.addEventListener('click', () => {
      const newName = inputName.value.trim() || 'Arian Pashae';
      const newWish = inputWish.value.trim() || 'Wishing you all the joy and happiness in the world!';

      displayNameEl.textContent = newName;
      cardRecipientEl.textContent = `Dear ${newName},`;
      displayWishEl.textContent = `"${newWish}"`;
      cardBodyEl.textContent = newWish;

      shareModal.classList.remove('active');
      confetti.burstFromSides();
      audio.playChime();
    });

    // Copy Shareable Link
    btnCopyLink.addEventListener('click', () => {
      const name = encodeURIComponent(inputName.value.trim() || displayNameEl.textContent);
      const wish = encodeURIComponent(inputWish.value.trim() || cardBodyEl.textContent);
      const shareUrl = `${window.location.origin}${window.location.pathname}?name=${name}&wish=${wish}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(showCopiedSuccess).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }

      function fallbackCopy() {
        const temp = document.createElement('textarea');
        temp.value = shareUrl;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showCopiedSuccess();
      }

      function showCopiedSuccess() {
        btnCopyLink.classList.add('copied');
        confetti.fire(window.innerWidth / 2, window.innerHeight / 2, 40);
        setTimeout(() => {
          btnCopyLink.classList.remove('copied');
        }, 2200);
      }
    });

    // Click anywhere on scene to launch interactive fireworks
    window.addEventListener('click', (e) => {
      // Ignore clicks on dock, modals, or cake stage
      if (
        e.target.closest('.dock') ||
        e.target.closest('.modal-card') ||
        e.target.closest('.cake-stage')
      ) {
        return;
      }
      fireworks.launch(e.clientX, e.clientY);
      audio.playChime();
    });

    // Periodic automatic fireworks
    let lastAutoLaunch = Date.now();
    setInterval(() => {
      if (Date.now() - lastAutoLaunch > 2200) {
        const tx = Math.random() * (window.innerWidth * 0.75) + window.innerWidth * 0.12;
        const ty = Math.random() * (window.innerHeight * 0.35) + window.innerHeight * 0.1;
        fireworks.launch(tx, ty);
        lastAutoLaunch = Date.now();
      }
    }, 2400);

    // Initial festive welcoming burst
    setTimeout(() => {
      confetti.burstFromSides();
      fireworks.launch(window.innerWidth * 0.3, window.innerHeight * 0.25);
      fireworks.launch(window.innerWidth * 0.7, window.innerHeight * 0.25);
    }, 800);

    // Animation Loop
    function animate() {
      fireworks.updateAndRender();
      confetti.updateAndRender();
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  });
})();
