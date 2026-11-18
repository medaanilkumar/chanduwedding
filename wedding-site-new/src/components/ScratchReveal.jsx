import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Wand2 } from 'lucide-react';
import { SectionTitle } from '../utils/animations';
import { config } from '../config';
import { audioEngine } from '../utils/audioEngine';

/* ── Confetti burst on full reveal ── */
function spawnConfetti() {
  const colors = ['#f5c842', '#ffe080', '#ffffff', '#e8d8b0', '#f5a623', '#ffd700', '#ff7675'];
  for (let i = 0; i < 70; i++) {
    const el = document.createElement('div');
    const size = 6 + Math.random() * 8;
    el.style.cssText = `
      position: fixed; pointer-events: none; z-index: 9999;
      left: ${30 + Math.random() * 40}vw; top: 50vh;
      width: ${size}px; height: ${size * (Math.random() < 0.5 ? 1 : 2.5)}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() < 0.5 ? '50%' : '2px'};
      animation: confettiFall ${1.5 + Math.random() * 2}s ease-out ${Math.random() * 0.4}s forwards;
      --dx: ${(Math.random() - 0.5) * 350}px;
      --dy: ${200 + Math.random() * 320}px;
      --rot: ${Math.random() * 720}deg;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
  if (!document.getElementById('confetti-kf')) {
    const s = document.createElement('style');
    s.id = 'confetti-kf';
    s.textContent = `@keyframes confettiFall{0%{transform:translateY(0) translateX(0) rotate(0);opacity:1}100%{transform:translateY(var(--dy)) translateX(var(--dx)) rotate(var(--rot));opacity:0}}`;
    document.head.appendChild(s);
  }
}

export default function ScratchReveal() {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hint, setHint] = useState(true);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const doneRef = useRef(false);
  const D = new Date(config.date); // wedding day
  const R_DATE = new Date(config.receptionDate || '2026-11-28T11:30:00+05:30'); // reception day

  /* ── Draw 100% Solid Opaque Gold Foil ── */
  const drawFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Reset composite operation to source-over
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, W, H);

    // 1. Solid opaque dark base first to block anything underneath
    ctx.fillStyle = '#3a1f00';
    ctx.fillRect(0, 0, W, H);

    // 2. Solid gold gradient on top
    const g = ctx.createRadialGradient(W * 0.35, H * 0.3, W * 0.05, W * 0.5, H * 0.5, W * 0.65);
    g.addColorStop(0, '#fff4cc');
    g.addColorStop(0.25, '#f5c842');
    g.addColorStop(0.6, '#d48b11');
    g.addColorStop(0.85, '#995200');
    g.addColorStop(1, '#5c2b00');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // 2. Solid metallic foil banding for authentic sheen
    for (let i = 0; i < 18; i++) {
      const x = (i / 18) * W;
      const band = ctx.createLinearGradient(x - 40, 0, x + 80, H);
      band.addColorStop(0, 'rgba(255, 240, 180, 0.45)');
      band.addColorStop(0.5, 'rgba(255, 255, 255, 0.65)');
      band.addColorStop(1, 'rgba(212, 139, 17, 0.45)');
      ctx.fillStyle = band;
      ctx.fillRect(x - 20, 0, 60, H);
    }

    // 3. Subtle gold glitter noise
    for (let i = 0; i < 2000; i++) {
      ctx.fillStyle = Math.random() < 0.5 ? '#fff3c4' : '#c47d10';
      ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
    }

    // 4. Concentric Filigree Rings & Medallion Details
    ctx.save();
    ctx.translate(W / 2, H / 2);

    // Outer ring
    ctx.strokeStyle = '#fff8db';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, W * 0.45, 0, Math.PI * 2);
    ctx.stroke();

    // Dotted accent ring
    ctx.strokeStyle = '#4a2503';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 10]);
    ctx.beginPath();
    ctx.arc(0, 0, W * 0.41, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Center circular badge
    ctx.fillStyle = '#fce59f';
    ctx.strokeStyle = '#8a4b08';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, W * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Medallion Typography
    ctx.fillStyle = '#4a2503';
    ctx.font = `bold ${Math.round(W * 0.046)}px Cormorant Garamond, Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦  #DC RECEPTION  ✦', 0, -W * 0.07);

    ctx.font = `bold ${Math.round(W * 0.042)}px Montserrat, sans-serif`;
    ctx.fillStyle = '#220e00';
    ctx.fillText('SCRATCH TO REVEAL', 0, W * 0.015);

    ctx.font = `italic 600 ${Math.round(W * 0.034)}px Cormorant Garamond, Georgia, serif`;
    ctx.fillStyle = '#6b3603';
    ctx.fillText('The Auspicious Date', 0, W * 0.08);

    ctx.restore();

    // Set to destination-out for scratching
    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  useEffect(() => {
    drawFoil();
  }, [drawFoil]);

  /* ── Scratch progress check ── */
  const checkProgress = () => {
    if (doneRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let total = 0, cleared = 0;
    for (let i = 3; i < data.length; i += 32) {
      total++;
      if (data[i] < 40) cleared++;
    }
    const pct = cleared / total;
    setProgress(pct);

    // Auto-complete at 28% so user doesn't struggle
    if (pct > 0.28) {
      triggerReveal();
    }
  };

  const triggerReveal = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setRevealed(true);
    if (audioEngine) audioEngine.playChime();
    spawnConfetti();
  };

  const getPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return [
      (src.clientX - r.left) * (canvas.width / r.width),
      (src.clientY - r.top) * (canvas.height / r.height),
    ];
  };

  const scratch = (e) => {
    if (!drawingRef.current || doneRef.current) return;
    if (hint) setHint(false);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const [x, y] = getPos(e);

    // Extra wide brush for effortless scratching
    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.lineWidth = 110;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(lastPointRef.current[0], lastPointRef.current[1]);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    ctx.arc(x, y, 55, 0, Math.PI * 2);
    ctx.fill();

    lastPointRef.current = [x, y];

    if (Math.random() < 0.15) checkProgress();
  };

  const handleStart = (e) => {
    drawingRef.current = true;
    lastPointRef.current = getPos(e);
    scratch(e);
  };

  const handleEnd = () => {
    drawingRef.current = false;
    lastPointRef.current = null;
    checkProgress();
  };

  const R = 148, C = 2 * Math.PI * R;

  return (
    <section
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1b3e 0%, #070d22 40%, #0d1b3e 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,200,66,0.08) 0%, transparent 65%)' }}
      />

      <div className="max-w-lg mx-auto px-4 sm:px-6 text-center relative z-10">
        <SectionTitle sub="A Little Secret">Scratch &amp; Reveal</SectionTitle>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(15px,4vw,19px)',
            fontStyle: 'italic',
            color: 'rgba(200,180,140,0.85)',
            marginBottom: 28,
          }}
        >
          Scratch the golden card to unveil your special date
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* ── SCRATCH CARD CONTAINER ── */}
          <div
            className="relative select-none"
            style={{ width: 'min(320px, 88vw)', height: 'min(320px, 88vw)' }}
          >
            {/* ── DARK BASE (always visible, blocks bleed-through) ── */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: '#050c1e', zIndex: 0 }}
            />

            {/* ── REVEALED CONTENT (only shown after scratch) ── */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden flex flex-col items-center justify-center select-none"
              style={{
                background: 'radial-gradient(circle at 40% 30%, #1e3572 0%, #0e1d58 40%, #080f2e 100%)',
                border: '3px solid rgba(245,200,66,0.7)',
                boxShadow: '0 0 0 6px rgba(245,200,66,0.12), 0 16px 60px rgba(0,0,20,0.8)',
                opacity: revealed ? 1 : 0,
                transition: 'opacity 0.6s ease',
                zIndex: 1,
              }}
            >
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320">
                <circle cx="160" cy="160" r="148" fill="none" stroke="rgba(245,200,66,0.2)" strokeWidth="1" strokeDasharray="4 6" />
                <circle cx="160" cy="160" r="136" fill="none" stroke="rgba(245,200,66,0.12)" strokeWidth="0.8" />
                {[[160, 16], [304, 160], [160, 304], [16, 160]].map(([x, y], i) => (
                  <polygon
                    key={i}
                    points={`${x},${y - 6} ${x + 4},${y} ${x},${y + 6} ${x - 4},${y}`}
                    fill="rgba(245,200,66,0.8)"
                  />
                ))}
              </svg>

              <div className="relative z-10 flex flex-col items-center gap-1 px-6">
                <p className="text-[9px] uppercase font-mono tracking-[0.4em] text-gold/90 mb-0">
                  #DC Reception
                </p>
                <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,rgba(245,200,66,0.6),transparent)', margin: '4px 0' }} />

                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(20px,6vw,26px)', color: '#f5c842', lineHeight: 1.1, textShadow: '0 0 20px rgba(245,200,66,0.6)' }}>
                  {config.groom} &amp; {config.bride}
                </p>

                <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg,transparent,rgba(245,200,66,0.6),transparent)', margin: '5px 0' }} />

                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(36px,10vw,48px)', color: '#ffffff', lineHeight: 1, letterSpacing: '0.02em' }}>
                  {R_DATE.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).toUpperCase()}
                </p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(16px,5vw,22px)', color: 'rgba(245,200,66,0.95)', letterSpacing: '0.12em' }}>
                  {R_DATE.getFullYear()}
                </p>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, color: 'rgba(200,180,140,0.65)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 3, textAlign: 'center' }}>
                  Sri Venkateswara Kalyana Mandapam, NRT
                </p>
              </div>
            </div>

            {/* ── METALLIC GOLD SCRATCH CANVAS LAYER ── */}
            <canvas
              ref={canvasRef}
              width={640}
              height={640}
              className="absolute inset-0 w-full h-full select-none"
              style={{
                zIndex: 2,
                borderRadius: '50%',
                opacity: revealed ? 0 : 1,
                transition: 'opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1)',
                pointerEvents: revealed ? 'none' : 'auto',
                cursor: 'crosshair',
                touchAction: 'none',
              }}
              onMouseDown={handleStart}
              onMouseMove={scratch}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={scratch}
              onTouchEnd={handleEnd}
            />

            {/* ── PROGRESS RING ── */}
            {!revealed && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320">
                <circle cx="160" cy="160" r={R} fill="none" stroke="rgba(245,200,66,0.18)" strokeWidth="3" />
                <circle
                  cx="160" cy="160" r={R}
                  fill="none"
                  stroke="url(#ringGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - progress)}
                  transform="rotate(-90 160 160)"
                  style={{ transition: 'stroke-dashoffset 0.2s ease' }}
                />
                <defs>
                  <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c8a96e" />
                    <stop offset="50%" stopColor="#f5c842" />
                    <stop offset="100%" stopColor="#ffe080" />
                  </linearGradient>
                </defs>
              </svg>
            )}

            {/* ── PULSING HINT FINGER ── */}
            <AnimatePresence>
              {hint && !revealed && (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0.7, 1, 0.7], scale: [0.9, 1.2, 0.9], y: [0, -8, 0] }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="absolute pointer-events-none"
                  style={{ bottom: '12%', right: '12%', fontSize: 28 }}
                >
                  👆
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── HINT TEXT ── */}
          {!revealed && (
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, letterSpacing: '0.3em', color: 'rgba(245,200,66,0.75)', textTransform: 'uppercase' }}
            >
              👆 Tap &amp; scratch to reveal the Reception date
            </motion.p>
          )}

          {/* ── REVEALED CELEBRATION MESSAGE ── */}
          <AnimatePresence>
            {revealed && (
              <motion.div
                key="reveal-msg"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <p style={{ fontSize: 32 }}>✨💍✨</p>
                <p style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(28px,8vw,38px)', color: '#f5c842' }}>
                  Save the Date!
                </p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(15px,4vw,18px)', color: 'rgba(200,180,140,0.9)', fontStyle: 'italic' }}>
                  Saturday, 28 November 2026 · Sri Venkateswara Kalyana Mandapam, NRT
                </p>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(config.groom + ' & ' + config.bride + ' Reception')}&dates=${R_DATE.toISOString().replace(/[-:]|\.\d{3}/g, '')}/${new Date(+R_DATE + 4 * 36e5).toISOString().replace(/[-:]|\.\d{3}/g, '')}&location=${encodeURIComponent('Sri Venkateswara Kalyana Mandapam, Pattabi Ramaswami Temple, NRT')}`}
                  target="_blank"
                  rel="noopener"
                  className="btn-gold !py-2.5 !px-6 text-sm font-mono mt-2"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
