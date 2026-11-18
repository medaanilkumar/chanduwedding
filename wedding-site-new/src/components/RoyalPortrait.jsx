import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';
import { config } from '../config';
import portraitImg from '../images/RAJ05022.JPG.jpeg';
import './RoyalPortrait.css';

const CHEERS = [
  'Made for each other! 💖',
  'Deepu & Chandu — Shubh Vivaah! 👑',
  'A lifetime of love & laughter! ✨',
  'The most radiant couple! 🌸',
  'Counting down to Nov 25! 🥂',
  'Shower of Ashirwad & Blessings! 🪔',
  'Two souls, one sacred journey! 💫',
];

const ICONS = ['💖', '🌸', '✨', '🌹', '👑', '🕊️', '💐', '💫'];

export default function RoyalPortrait() {
  const [cheerIdx, setCheerIdx] = useState(0);
  const [loveCount, setLoveCount] = useState(108);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const cardRef = useRef(null);

  // 3D Pointer Tilt
  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -y * 14,
      ry: x * 14,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  // Tap to shower petals & love
  const handleLoveBurst = (e) => {
    if (audioEngine) audioEngine.playChime();
    setLoveCount((prev) => prev + 1);
    setCheerIdx((prev) => (prev + 1) % CHEERS.length);

    // Haptics
    if (navigator.vibrate) navigator.vibrate(25);

    // Spawn floating particles at tap position
    const rect = cardRef.current?.getBoundingClientRect();
    const originX = e.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
    const originY = e.clientY || (rect ? rect.top + rect.height / 2 : window.innerHeight / 2);

    for (let i = 0; i < 18; i++) {
      const el = document.createElement('span');
      el.className = 'royal-love-pop';
      el.textContent = ICONS[Math.floor(Math.random() * ICONS.length)];

      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 120;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 60;
      const rot = (Math.random() - 0.5) * 80;
      const size = 18 + Math.random() * 14;

      el.style.cssText = `
        left: ${originX}px;
        top: ${originY}px;
        font-size: ${size}px;
        --tx: ${x}px;
        --ty: ${y}px;
        --rot: ${rot}deg;
        animation-delay: ${i * 20}ms;
      `;

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1800);
    }
  };

  return (
    <section className="relative py-12 sm:py-20 overflow-hidden text-center">
      <div className="max-w-xl mx-auto px-4 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
              The Royal Couple
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/60" />
          </div>

          <h2
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            className="text-3xl sm:text-4xl font-semibold text-gold"
          >
            {config.groom} &amp; {config.bride}
          </h2>
          <p
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            className="text-base sm:text-lg text-ink/80 italic mt-1"
          >
            Two hearts bonded by destiny, blessed by love
          </p>
        </motion.div>

        {/* 3D Royal Stage */}
        <div className="royal-photo-stage relative my-6 flex justify-center">
          {/* Ambient Rotating Sunburst & Halo */}
          <div className="royal-halo-ring" aria-hidden="true" />
          <div className="royal-sunburst" aria-hidden="true" />

          {/* 3D Tilt Card */}
          <div
            ref={cardRef}
            className="royal-polaroid group cursor-pointer select-none"
            role="button"
            tabIndex={0}
            aria-label="Royal Portrait of the couple — tap to send love and blessings"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onClick={handleLoveBurst}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleLoveBurst(e);
              }
            }}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            }}
          >
            {/* Washi Gold Corner Tapes */}
            <div className="washi-tape washi-left" aria-hidden="true" />
            <div className="washi-tape washi-right" aria-hidden="true" />

            {/* Photo Frame with Vignette & Sheen */}
            <div className="royal-frame relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={portraitImg}
                alt={`${config.groom} and ${config.bride}`}
                className="w-full h-auto object-cover object-top aspect-[4/5] transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="photo-vignette" />
              <div className="photo-sheen" />
            </div>

            {/* Polaroid Bottom Caption */}
            <div className="pt-4 pb-2 text-center">
              <h3
                style={{ fontFamily: 'Pinyon Script, Great Vibes, cursive' }}
                className="text-3xl sm:text-4xl text-amber-900 leading-tight"
              >
                {config.groom} &amp; {config.bride}
              </h3>
              <p
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                className="text-xs uppercase tracking-widest text-amber-800/80 font-semibold mt-1"
              >
                Forever &amp; Always • 25.11.2026
              </p>
            </div>

            {/* Floating corner ornaments */}
            <span className="float-badge float-top-left">👑</span>
            <span className="float-badge float-top-right">🌸</span>
            <span className="float-badge float-bottom-left">✨</span>
            <span className="float-badge float-bottom-right">💖</span>
          </div>
        </div>

        {/* Dynamic Cheer Text */}
        <div className="mt-4 min-h-[2.5rem]">
          <motion.p
            key={cheerIdx}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-base sm:text-lg font-serif italic text-gold font-medium"
          >
            {CHEERS[cheerIdx]}
          </motion.p>
        </div>

        {/* Interactive Tap Hint & Counter */}
        <div className="flex items-center justify-center gap-3 mt-2">
          <button
            onClick={handleLoveBurst}
            className="btn-gold !py-2 !px-4 text-xs font-mono tracking-wider flex items-center gap-2 shadow-lg"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-rose-300 animate-bounce" />
            <span>Tap Portrait to Shower Blessings</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-black/30 text-[11px] font-bold">
              {loveCount}
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
