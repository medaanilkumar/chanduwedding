// Royal Indian Wedding Audio Synthesizer Engine (Web Audio API)
// Provides continuous Indian classical tanpura drone & sitar/harp acoustic arpeggios in Raag Yaman,
// plus interactive crystal chimes, seal-cracking, and festive sparkle sound effects.

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.45;
    this.masterGain = null;
    this.droneGain = null;
    this.melodyGain = null;
    this.timerId = null;
    this.listeners = new Set();
    this.currentNoteIndex = 0;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Drone sub-gain
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);

    // Melody sub-gain with subtle warm filter
    this.melodyGain = this.ctx.createGain();
    this.melodyGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    // Lowpass filter to give sitar/harp notes a warm, royal acoustic warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, this.ctx.currentTime);
    filter.Q.setValueAtTime(2, this.ctx.currentTime);

    this.melodyGain.connect(filter);
    filter.connect(this.masterGain);
  }

  // Raag Yaman / Bhairavi scale frequencies (Sa Re Ga Ma Pa Dha Ni Sa) in Hz
  // Base D (approx 146.83 Hz): D, E, F#, G#, A, B, C#
  getNotes() {
    return [
      146.83, // D3 (Sa)
      164.81, // E3 (Re)
      185.00, // F#3 (Ga)
      207.65, // G#3 (Teevra Ma)
      220.00, // A3 (Pa)
      246.94, // B3 (Dha)
      277.18, // C#4 (Ni)
      293.66, // D4 (Taar Sa)
      329.63, // E4
      369.99, // F#4
      440.00, // A4
      554.37, // C#5
    ];
  }

  // Starts the continuous tanpura drone
  startTanpura() {
    if (!this.ctx || !this.droneGain) return;
    const now = this.ctx.currentTime;

    // Frequencies: Pa (220Hz), Sa (146.83Hz), Sa-octave (293.66Hz)
    const droneFreqs = [146.83, 147.2, 220.0, 293.66];
    droneFreqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle slow pulsing tremolo (LFO) for authentic Tanpura resonance
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.18 + idx * 0.05, now);
      lfoGain.gain.setValueAtTime(0.04, now);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      gain.gain.setValueAtTime(0.08, now);
      osc.connect(gain);
      gain.connect(this.droneGain);

      osc.start(now);
      lfo.start(now);

      this.droneOscs = this.droneOscs || [];
      this.droneOscs.push({ osc, lfo, gain });
    });
  }

  // Plucks an acoustic sitar/harp style string note
  pluck(freq, duration = 2.4, velocity = 0.5) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    // Sitar / Veena harmonic blend (triangle fundamental + subtle saw harmonic)
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq * 2, now); // Second harmonic overtone

    const sawGain = this.ctx.createGain();
    sawGain.gain.setValueAtTime(0.18, now);
    osc2.connect(sawGain);
    sawGain.connect(noteGain);

    osc1.connect(noteGain);
    noteGain.connect(this.melodyGain);

    // Fast acoustic pluck attack, gentle exponential decay
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(velocity * 0.4, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  // Step sequencer for Raag Yaman melody loop
  playMelodyLoop() {
    const notes = this.getNotes();
    // Beautiful melodic pattern of Raag Yaman (Ni Re Ga, Ma Dha Ni Sa, Pa Re Sa)
    const melodyPattern = [
      notes[6], // Ni (C#4)
      notes[1], // Re (E3)
      notes[2], // Ga (F#3)
      notes[3], // Ma (G#3)
      notes[4], // Pa (A3)
      notes[2], // Ga
      notes[1], // Re
      notes[0], // Sa (D3)
      notes[4], // Pa
      notes[5], // Dha (B3)
      notes[6], // Ni (C#4)
      notes[7], // Sa (D4)
      notes[9], // F#4
      notes[7], // Sa
      notes[6], // Ni
      notes[4], // Pa
    ];

    const step = () => {
      if (!this.isPlaying) return;
      const freq = melodyPattern[this.currentNoteIndex % melodyPattern.length];
      const isAccent = this.currentNoteIndex % 4 === 0;
      this.pluck(freq, isAccent ? 3.0 : 1.8, isAccent ? 0.7 : 0.45);

      this.currentNoteIndex++;
      // Natural humanized timing: 1.1s to 1.6s between notes
      const interval = isAccent ? 1800 : 1300 + Math.random() * 400;
      this.timerId = setTimeout(step, interval);
    };

    step();
  }

  async start() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.notify();

    // Fade master volume in smoothly
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 1.2);

    this.startTanpura();
    this.playMelodyLoop();
  }

  stop() {
    if (!this.isPlaying || !this.ctx) return;
    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
    }
    if (this.timerId) clearTimeout(this.timerId);
    setTimeout(() => {
      if (this.droneOscs) {
        this.droneOscs.forEach(({ osc, lfo }) => {
          try { osc.stop(); lfo.stop(); } catch (e) {}
        });
        this.droneOscs = [];
      }
      this.isPlaying = false;
      this.notify();
    }, 850);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  setMasterVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 0.1);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  // ── SOUND EFFECTS (SFX) ──

  // High-clarity crystal bell chime for button clicks & tab switches
  playChime() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;

    const chimeFreqs = [1760, 2640, 3520]; // A6, E7 harmonics
    chimeFreqs.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.03);

      gain.gain.setValueAtTime(0.001, now + i * 0.03);
      gain.gain.linearRampToValueAtTime(0.08 / (i + 1), now + i * 0.03 + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.03 + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.03);
      osc.stop(now + i * 0.03 + 0.9);
    });
  }

  // Wax seal cracking sound effect (authentic acoustic snap & resonance)
  playCrack() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;

    // Buffer noise snap
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.02));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(3.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);

    // Follow with warm gold chime
    setTimeout(() => this.playChime(), 120);
  }

  // Celebratory harp sparkle glissando for RSVP & confetti bursts
  playSparkle() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;
    const sparkleNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];

    sparkleNotes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = now + idx * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.001, noteTime);
      gain.gain.linearRampToValueAtTime(0.09, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.7);
    });
  }

  // Warm gentle flame whoosh when guest lights a Diya
  playDiyaFlame() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.3);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.8);

    setTimeout(() => this.playChime(), 150);
  }
}

export const audioEngine = new AudioEngine();
