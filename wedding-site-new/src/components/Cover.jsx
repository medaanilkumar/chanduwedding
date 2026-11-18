import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';
import { config } from '../config';

/* ── Animated SVG border that draws itself in on mount ── */
function AnimatedBorder() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 620" preserveAspectRatio="none" style={{ zIndex: 9 }}>
      <defs>
        <linearGradient id="drawGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"  stopColor="rgba(255,220,100,0)" />
          <stop offset="40%" stopColor="rgba(255,220,100,0.9)" />
          <stop offset="60%" stopColor="rgba(218,165,58,0.9)" />
          <stop offset="100%" stopColor="rgba(218,165,58,0)" />
        </linearGradient>
      </defs>
      {/* Outer border draws in */}
      <motion.rect x="6" y="6" width="988" height="608" rx="4"
        fill="none" stroke="url(#drawGold)" strokeWidth="2.2"
        strokeDasharray="3196"
        initial={{ strokeDashoffset: 3196 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 3.2, ease: 'easeInOut', delay: 0.3 }}
      />
      {/* Inner dashed border draws in slightly delayed */}
      <motion.rect x="18" y="18" width="964" height="584" rx="3"
        fill="none" stroke="rgba(218,165,58,0.35)" strokeWidth="1" strokeDasharray="5 7"
        strokeDashoffset="0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.8 }}
      />
    </svg>
  );
}

/* ── Candle flame SVG that flickers ── */
function CandleFlame({ x, y, delay = 0 }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y, zIndex: 9, transform: 'translate(-50%, -100%)' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <svg width="22" height="42" viewBox="0 0 22 42">
        {/* Flame outer */}
        <motion.ellipse cx="11" cy="22" rx="7" ry="14"
          fill="rgba(255,180,40,0.55)"
          animate={{ scaleX: [1, 1.15, 0.9, 1.1, 1], scaleY: [1, 0.92, 1.08, 0.95, 1], cy: [22, 20, 23, 19, 22] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay }}
        />
        {/* Flame inner */}
        <motion.ellipse cx="11" cy="24" rx="4" ry="9"
          fill="rgba(255,230,100,0.8)"
          animate={{ scaleX: [1, 1.2, 0.85, 1.1, 1], cy: [24, 22, 25, 21, 24] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.15 }}
        />
        {/* Flame core */}
        <motion.ellipse cx="11" cy="27" rx="2" ry="5"
          fill="rgba(255,255,200,0.95)"
          animate={{ cy: [27, 25, 28, 24, 27] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.05 }}
        />
        {/* Candle body */}
        <rect x="8" y="36" width="6" height="6" rx="1" fill="rgba(250,230,200,0.85)" stroke="rgba(196,130,58,0.4)" strokeWidth="0.6" />
        {/* Glow halo */}
        <motion.circle cx="11" cy="22" r="11"
          fill="rgba(255,190,50,0.08)"
          animate={{ r: [11, 15, 10, 14, 11], opacity: [0.08, 0.18, 0.06, 0.15, 0.08] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay }}
        />
      </svg>
    </motion.div>
  );
}

/* ── Typewriter text above the seal ── */
function TypewriterInvite() {
  const text = `${config.groom}  ♦  ${config.bride}`;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: '50%', top: '18%', transform: 'translateX(-50%)', zIndex: 31, textAlign: 'center', width: '90vw', maxWidth: 420 }}
    >
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(7px,2.5vw,10px)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,200,66,0.85)', marginBottom: 4 }}
      >
        You Are Cordially Invited For
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(7px,2.2vw,10px)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,200,66,0.85)', marginBottom: 6, lineHeight: 1.5 }}
      >
        Pabbisetty's &amp; Chevuri's Wedding Celebration
      </motion.p>
    </motion.div>
  );
}

function spawnPetals() {
  const emojis = ['🌸','🌺','🌹','🌷','✨','🍃','🌼','💫'];
  for (let i = 0; i < 50; i++) {
    const el = document.createElement('div');
    el.style.cssText = `position:fixed;pointer-events:none;z-index:9999;font-size:${10+Math.random()*16}px;left:${Math.random()*100}vw;top:-20px;animation:petalDrift ${5+Math.random()*7}s linear ${Math.random()*2.5}s forwards;--dx:${(Math.random()-.5)*260}px;--sway:${(Math.random()-.5)*90}px;--rot:${Math.random()*720}deg;`;
    el.textContent = emojis[i % emojis.length];
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 14000);
  }
}

/* ── Floating particle on the envelope surface ── */
function FloatingParticle({ x, y, delay, size, speed }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x, top: y, width: size, height: size,
        background: 'radial-gradient(circle, rgba(232,184,112,0.7), rgba(196,130,58,0.2))',
        zIndex: 25,
      }}
      animate={{ y: [0, -18, 0], x: [0, 6, -4, 0], opacity: [0.15, 0.5, 0.15], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: speed, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Gold shimmer bar that sweeps across a surface ── */
function ShimmerSweep({ zIndex = 6, delay = 2, duration = 5, repeatDelay = 8 }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex, overflow: 'hidden' }}
      initial={false}
    >
      <motion.div
        style={{
          position: 'absolute', top: 0, bottom: 0,
          width: '30%',
          background: 'linear-gradient(105deg, transparent 20%, rgba(255,235,180,0.18) 50%, transparent 80%)',
          left: '-30%',
        }}
        animate={{ left: ['−30%', '130%'] }}
        transition={{ duration, delay, repeat: Infinity, repeatDelay, ease: 'linear' }}
      />
    </motion.div>
  );
}

export default function Cover({ onOpen }) {
  const [phase, setPhase] = useState('idle'); // idle | opening | open
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const fn = e => setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', fn);
    return () => window.removeEventListener('mousemove', fn);
  }, []);

  // Spawn sparkle bursts periodically on the seal
  useEffect(() => {
    if (phase !== 'idle') return;
    const id = setInterval(() => {
      const newSparkles = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        angle: (i / 6) * 360 + Math.random() * 30,
        dist: 90 + Math.random() * 40,
      }));
      setSparkles(newSparkles);
      setTimeout(() => setSparkles([]), 1200);
    }, 3500);
    return () => clearInterval(id);
  }, [phase]);

  function handleTap() {
    if (phase !== 'idle') return;
    setPhase('opening');
    setTimeout(() => {
      setPhase('open');
      spawnPetals();
    }, 600);
    setTimeout(() => {
      onOpen();
    }, 1400);
  }

  const initials = config.groom[0] + '&' + config.bride[0];

  // Mouse parallax offsets
  const px = (mouse.x - 0.5) * 12;
  const py = (mouse.y - 0.5) * 8;

  return (
    <motion.div
      key="cover"
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{ zIndex: 200, willChange: 'opacity, transform' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(4px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
    >
          {/* ── BACKGROUND with animated aurora ── */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(160deg, #0a1628 0%, #0d1b3e 35%, #111830 65%, #0a1628 100%)',
          }} />

          {/* Animated radial aurora pulse */}
          <motion.div className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(245,200,66,0.12) 0%, transparent 65%)' }}
          />

          {/* ── INNER GLOW PULSE — like a warm light from within the envelope ── */}
          <motion.div className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0, 0.22, 0, 0.18, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(255,200,100,0.5) 0%, transparent 55%)', zIndex: 6 }}
          />

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,10,0.55) 100%)',
          }} />

          {/* Embossed botanical BG with parallax */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
            animate={{ x: px, y: py }}
            transition={{ type: 'spring', stiffness: 35, damping: 22 }}
          >
            <EmbossedBotanicals />
          </motion.div>

          {/* ── ANIMATED GOLD BORDER DRAW ── */}
          <AnimatedBorder />

          {/* ── FULL-SCREEN ENVELOPE ── */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 10 }}
            animate={phase === 'open' ? { y: '-105vh', opacity: 0, rotate: 1 } : { y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1], delay: phase === 'open' ? 0.08 : 0 }}
          >
            {/* Envelope body SVG */}
            <EnvelopeBody />

            {/* Animated shimmer sweep on body */}
            <ShimmerSweep zIndex={7} delay={3} duration={5} repeatDelay={7} />

            {/* Floating dust particles on envelope */}
            {[
              { x:'8%',  y:'22%', delay:0,   size:4, speed:4.2 },
              { x:'18%', y:'60%', delay:1.2, size:3, speed:5.5 },
              { x:'76%', y:'18%', delay:0.6, size:5, speed:3.8 },
              { x:'88%', y:'55%', delay:2.1, size:3, speed:6.1 },
              { x:'45%', y:'80%', delay:0.9, size:4, speed:4.8 },
              { x:'60%', y:'72%', delay:1.7, size:3, speed:5.2 },
              { x:'32%', y:'15%', delay:2.8, size:4, speed:4.5 },
              { x:'70%', y:'40%', delay:0.4, size:3, speed:5.8 },
            ].map((p,i) => <FloatingParticle key={i} {...p} />)}

            {/* Animated corner ornament rotation */}
            {[
              { corner: 'tl', x:'3.5%',  y:'3.5%'  },
              { corner: 'tr', x:'96.5%', y:'3.5%'  },
              { corner: 'bl', x:'3.5%',  y:'96.5%' },
              { corner: 'br', x:'96.5%', y:'96.5%' },
            ].map(({ corner, x, y }) => (
              <motion.div
                key={corner}
                className="absolute pointer-events-none"
                style={{ left: x, top: y, zIndex: 8, transform: 'translate(-50%,-50%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <g stroke="rgba(196,130,58,0.45)" strokeWidth="0.8" fill="none">
                    {[0,45,90,135,180,225,270,315].map(a => {
                      const r = a * Math.PI / 180;
                      return <line key={a} x1="18" y1="18" x2={18+Math.cos(r)*14} y2={18+Math.sin(r)*14} />;
                    })}
                    {[0,60,120,180,240,300].map(a => {
                      const r = a * Math.PI / 180;
                      return <circle key={a} cx={18+Math.cos(r)*11} cy={18+Math.sin(r)*11} r="2.2"
                        fill="rgba(196,130,58,0.3)" />;
                    })}
                    <circle cx="18" cy="18" r="4" fill="rgba(196,130,58,0.2)" stroke="rgba(196,130,58,0.5)" strokeWidth="0.8" />
                    <circle cx="18" cy="18" r="12" strokeDasharray="3 3" strokeWidth="0.5" />
                  </g>
                </svg>
              </motion.div>
            ))}

            {/* Animated mid-edge pulse ornaments */}
            {[
              { x:'50%', y:'2%'  },
              { x:'50%', y:'98%' },
              { x:'1.5%', y:'50%' },
              { x:'98.5%', y:'50%' },
            ].map(({ x, y }, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ left: x, top: y, zIndex: 8, transform: 'translate(-50%,-50%)' }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <polygon points="10,2 12,8 18,10 12,12 10,18 8,12 2,10 8,8"
                    fill="rgba(196,130,58,0.35)" stroke="rgba(196,130,58,0.6)" strokeWidth="0.7" />
                </svg>
              </motion.div>
            ))}

            {/* Envelope flap — rotates open */}
            <EnvelopeFlap phase={phase} />

            {/* ── TYPEWRITER COUPLE NAMES ── */}
            {phase === 'idle' && <TypewriterInvite />}

            {/* ── WAX SEAL — perfectly centered ── */}
            <AnimatePresence>
              {phase === 'idle' && (
                <div style={{
                  position: 'absolute', left: '50%', top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}>
                  {/* Orbiting gold dots around seal */}
                  {[0, 120, 240].map((startAngle, i) => (
                    <motion.div
                      key={i}
                      className="absolute pointer-events-none"
                      style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(218,165,58,0.7)', zIndex: 35 }}
                      animate={{ rotate: [startAngle, startAngle + 360] }}
                      transition={{ duration: 5 + i, repeat: Infinity, ease: 'linear' }}
                      transformTemplate={({ rotate }) => {
                        const rad = parseFloat(rotate) * Math.PI / 180;
                        const r = 115;
                        return `translate(${Math.cos(rad) * r}px, ${Math.sin(rad) * r}px)`;
                      }}
                    />
                  ))}

                  {/* Sparkle burst on interval */}
                  <AnimatePresence>
                    {sparkles.map(s => {
                      const rad = s.angle * Math.PI / 180;
                      return (
                        <motion.div key={s.id}
                          className="absolute pointer-events-none"
                          style={{ zIndex: 36, width: 6, height: 6, borderRadius: '50%',
                            background: 'radial-gradient(circle, #f5e090, rgba(218,165,58,0))',
                            left: '50%', top: '50%', marginLeft: -3, marginTop: -3,
                          }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{ x: Math.cos(rad)*s.dist, y: Math.sin(rad)*s.dist, opacity: 0, scale: 0.3 }}
                          exit={{}}
                          transition={{ duration: 1.1, ease: 'easeOut' }}
                        />
                      );
                    })}
                  </AnimatePresence>

                  {/* Pulsing outer rings */}
                  {[0, 1, 2].map(i => (
                    <motion.div key={i}
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        width: 200 + i * 46, height: 200 + i * 46,
                        border: `1px solid rgba(201,137,58,${0.22 - i * 0.06})`,
                        top: '50%', left: '50%',
                        marginLeft: -(100 + i * 23), marginTop: -(100 + i * 23),
                      }}
                      animate={{ scale: [0.88, 1.6], opacity: [0.55, 0] }}
                      transition={{ duration: 2.8, delay: i * 0.85, repeat: Infinity, ease: 'easeOut' }}
                    />
                  ))}

                  {/* Spinning rings (opposite directions) */}
                  <motion.div className="absolute rounded-full pointer-events-none"
                    style={{ width: 196, height: 196, border: '1px dashed rgba(201,137,58,0.28)', top: '50%', left: '50%', marginLeft: -98, marginTop: -98 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div className="absolute rounded-full pointer-events-none"
                    style={{ width: 168, height: 168, border: '1px solid rgba(201,137,58,0.15)', top: '50%', left: '50%', marginLeft: -84, marginTop: -84 }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  />

                  <motion.button
                    onClick={handleTap}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0, transition: { duration: 0.4 } }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                    className="outline-none border-none bg-transparent cursor-pointer flex flex-col items-center"
                    style={{ position: 'relative' }}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    {/* Seal with dual glow pulse + heartbeat on hover */}
                    <motion.div
                      animate={{
                        scale: [1, 1.04, 1],
                        filter: [
                          'drop-shadow(0 6px 20px rgba(120,60,10,0.4)) drop-shadow(0 0 30px rgba(201,137,58,0.2))',
                          'drop-shadow(0 10px 36px rgba(120,60,10,0.65)) drop-shadow(0 0 60px rgba(201,137,58,0.45))',
                          'drop-shadow(0 6px 20px rgba(120,60,10,0.4)) drop-shadow(0 0 30px rgba(201,137,58,0.2))',
                        ],
                      }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <WaxSeal initials={initials} />
                    </motion.div>
                    {/* Heartbeat ring on hover */}
                    <motion.div
                      className="absolute rounded-full pointer-events-none"
                      style={{ width: 200, height: 200, border: '2px solid rgba(201,137,58,0.5)', top: '50%', left: '50%', marginLeft: -100, marginTop: -100 }}
                      initial={{ scale: 1, opacity: 0 }}
                      whileHover={{ scale: [1, 1.3, 1.1, 1.4, 1], opacity: [0, 0.7, 0.4, 0.6, 0] }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                    />

                    {/* Tap to Open pill */}
                    <motion.div
                      animate={{ opacity: [0.75, 1, 0.75], y: [0, -4, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ marginTop: 24 }}
                    >
                      <div style={{
                        fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(9px,2.5vw,11px)', letterSpacing: '0.38em',
                        textTransform: 'uppercase', color: '#e8d8b0',
                        background: 'linear-gradient(135deg, rgba(13,27,62,0.95), rgba(17,24,72,0.9))',
                        border: '1px solid rgba(245,200,66,0.5)',
                        borderRadius: 999, padding: '10px 28px', whiteSpace: 'nowrap',
                        boxShadow: '0 3px 24px rgba(245,200,66,0.2), inset 0 1px 0 rgba(245,200,66,0.1)',
                        display: 'flex', alignItems: 'center', gap: 10,
                      }}>
                        <motion.span
                          animate={{ rotate: [0, 180, 360] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                          style={{ color: 'rgba(245,200,66,0.9)', fontSize: 10, display: 'inline-block' }}
                        >✦</motion.span>
                        Tap to Open
                        <motion.span
                          animate={{ rotate: [360, 180, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                          style={{ color: 'rgba(245,200,66,0.9)', fontSize: 10, display: 'inline-block' }}
                        >✦</motion.span>
                      </div>
                    </motion.div>
                  </motion.button>
                </div>
              )}
            </AnimatePresence>

            {/* ── LETTER card peeks out on opening ── */}
            <AnimatePresence>
              {(phase === 'opening' || phase === 'open') && (
                /* Outer div: fixed centering (no framer transform conflict) */
                <div style={{
                  position: 'fixed',
                  top: 0, left: 0, right: 0, bottom: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 60, pointerEvents: 'none',
                }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.85, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    style={{ width: 'min(420px, 88vw)' }}
                  >
                    <LetterCard />
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Floating decorative petals (idle only) */}
          {phase === 'idle' && [...Array(10)].map((_, i) => (
            <motion.div key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${3 + i * 9.5}%`,
                top: `${10 + Math.sin(i * 1.2) * 30}%`,
                fontSize: 11 + i % 4 * 3, zIndex: 4, opacity: 0.28,
              }}
              animate={{ y: [0, -14, 0], rotate: [0, i % 2 ? 10 : -10, 0], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 3.5 + i * 0.45, delay: i * 0.32, repeat: Infinity, ease: 'easeInOut' }}
            >
              {['🌸', '🌺', '🌷', '🍃', '🌼', '✨'][i % 6]}
            </motion.div>
          ))}

          {/* Opening flash burst */}
          <AnimatePresence>
            {phase === 'opening' && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 50, background: 'radial-gradient(circle at 50% 50%, rgba(245,200,66,0.18), transparent 55%)' }}
                initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>
        </motion.div>
  );
}

/* ── ENVELOPE BODY ── */
function EnvelopeBody() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 620" preserveAspectRatio="none" style={{ zIndex: 5 }}>
      <defs>
        <radialGradient id="envBody" cx="50%" cy="45%" r="65%">
          <stop offset="0%"   stopColor="#1a2a5e" />
          <stop offset="35%"  stopColor="#111c48" />
          <stop offset="75%"  stopColor="#0d1638" />
          <stop offset="100%" stopColor="#080f28" />
        </radialGradient>
        <linearGradient id="vLeft" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%"   stopColor="rgba(245,200,66,0.12)" />
          <stop offset="100%" stopColor="rgba(245,200,66,0.01)" />
        </linearGradient>
        <linearGradient id="vRight" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%"   stopColor="rgba(245,200,66,0.12)" />
          <stop offset="100%" stopColor="rgba(245,200,66,0.01)" />
        </linearGradient>
        <linearGradient id="vBottom" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%"   stopColor="rgba(100,50,200,0.12)" />
          <stop offset="100%" stopColor="rgba(100,50,200,0.01)" />
        </linearGradient>
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(245,200,66,0.0)" />
          <stop offset="30%"  stopColor="rgba(245,200,66,0.7)" />
          <stop offset="50%"  stopColor="rgba(255,230,100,0.95)" />
          <stop offset="70%"  stopColor="rgba(245,200,66,0.7)" />
          <stop offset="100%" stopColor="rgba(245,200,66,0.0)" />
        </linearGradient>
        <linearGradient id="stampGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1a2a5e" />
          <stop offset="100%" stopColor="#0d1a42" />
        </linearGradient>
        <filter id="creaseGlow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
          <feFlood floodColor="rgba(218,165,58,0.4)" result="color"/>
          <feComposite in="color" in2="blur" operator="in" result="glow"/>
          <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="softGlow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
          <feFlood floodColor="rgba(218,165,58,0.5)" result="color"/>
          <feComposite in="color" in2="blur" operator="in" result="glow"/>
          <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Base paper */}
      <rect x="0" y="0" width="1000" height="620" fill="url(#envBody)" />

      {/* Side flaps */}
      <path d="M0,0 L500,310 L0,620 Z"    fill="url(#vLeft)" />
      <path d="M1000,0 L500,310 L1000,620 Z" fill="url(#vRight)" />
      {/* Bottom flap */}
      <path d="M0,620 L500,310 L1000,620 Z"  fill="url(#vBottom)" />

      {/* Crease lines with glow */}
      <line x1="0"    y1="0"   x2="500" y2="310" stroke="rgba(196,130,58,0.25)" strokeWidth="1.8" filter="url(#creaseGlow)" />
      <line x1="1000" y1="0"   x2="500" y2="310" stroke="rgba(196,130,58,0.25)" strokeWidth="1.8" filter="url(#creaseGlow)" />
      <line x1="0"    y1="620" x2="500" y2="310" stroke="rgba(196,130,58,0.32)" strokeWidth="2"   filter="url(#creaseGlow)" />
      <line x1="1000" y1="620" x2="500" y2="310" stroke="rgba(196,130,58,0.32)" strokeWidth="2"   filter="url(#creaseGlow)" />

      {/* Outer gold border */}
      <rect x="0" y="0" width="1000" height="620" fill="none" stroke="url(#goldBorder)" strokeWidth="3" />
      {/* Double inner frame */}
      <rect x="10"  y="10"  width="980" height="600" rx="2" fill="none" stroke="rgba(218,165,58,0.28)" strokeWidth="1" strokeDasharray="9 11" />
      <rect x="22"  y="22"  width="956" height="576" rx="3" fill="none" stroke="rgba(196,130,58,0.18)" strokeWidth="0.7" />
      <rect x="34"  y="34"  width="932" height="552" rx="2" fill="none" stroke="rgba(196,130,58,0.1)"  strokeWidth="0.5" strokeDasharray="4 8" />

      {/* ── CORNER DIAMOND STACKS ── */}
      {[[28,28],[972,28],[28,592],[972,592]].map(([x,y],i) => (
        <g key={i} transform={`translate(${x},${y})`} filter="url(#softGlow)">
          <polygon points="0,-9 7,0 0,9 -7,0"  fill="rgba(218,165,58,0.5)" />
          <polygon points="0,-6 5,0 0,6 -5,0"  fill="rgba(240,195,100,0.65)" />
          <polygon points="0,-3 2.5,0 0,3 -2.5,0" fill="rgba(255,220,130,0.8)" />
        </g>
      ))}

      {/* ── CORNER FLORAL SUNBURSTS ── */}
      {[[55,55],[945,55],[55,565],[945,565]].map(([cx,cy],i) => (
        <g key={i} stroke="rgba(196,130,58,0.38)" strokeWidth="0.85" fill="none">
          {Array.from({length:16}).map((_,j) => {
            const a = (j/16)*Math.PI*2;
            const r2 = j%2===0 ? 13 : 9;
            return <line key={j} x1={cx} y1={cy} x2={cx+Math.cos(a)*r2} y2={cy+Math.sin(a)*r2}
              strokeWidth={j%4===0?1:0.6} />;
          })}
          {[0,60,120,180,240,300].map(a => {
            const rad = a*Math.PI/180;
            return <circle key={a} cx={cx+Math.cos(rad)*13} cy={cy+Math.sin(rad)*13} r="2.8"
              fill="rgba(218,165,58,0.28)" stroke="rgba(218,165,58,0.55)" strokeWidth="0.7" />;
          })}
          <circle cx={cx} cy={cy} r="5"  fill="rgba(218,165,58,0.2)"  stroke="rgba(218,165,58,0.5)"  strokeWidth="1" />
          <circle cx={cx} cy={cy} r="14" fill="none" stroke="rgba(196,130,58,0.18)" strokeWidth="0.5" strokeDasharray="2 3" />
        </g>
      ))}

      {/* ── EDGE CENTER CROSS+DIAMOND ORNAMENTS ── */}
      {[[500,22],[22,310],[978,310],[500,598]].map(([cx,cy],i) => (
        <g key={i} transform={`translate(${cx},${cy})`} stroke="rgba(196,130,58,0.38)" strokeWidth="0.8" fill="none">
          <line x1="-22" y1="0" x2="22" y2="0" />
          <line x1="0" y1="-22" x2="0" y2="22" />
          <polygon points="0,-7 5,0 0,7 -5,0" fill="rgba(218,165,58,0.35)" stroke="rgba(218,165,58,0.6)" strokeWidth="0.7" />
          <circle cx="-22" cy="0" r="2" fill="rgba(218,165,58,0.45)" />
          <circle cx="22"  cy="0" r="2" fill="rgba(218,165,58,0.45)" />
          <circle cx="0" cy="-22" r="2" fill="rgba(218,165,58,0.45)" />
          <circle cx="0" cy="22"  r="2" fill="rgba(218,165,58,0.45)" />
        </g>
      ))}

      {/* ── MUGHAL ARCH MOTIFS along top and bottom ── */}
      {[200, 400, 600, 800].map((x,i) => (
        <g key={i}>
          {/* top arch */}
          <path d={`M${x-20},32 L${x-20},55 Q${x-20},70 ${x},76 Q${x+20},70 ${x+20},55 L${x+20},32`}
            fill="none" stroke="rgba(196,130,58,0.22)" strokeWidth="0.8" />
          <circle cx={x} cy={76} r="2" fill="rgba(196,130,58,0.3)" />
          {/* bottom arch (mirrored) */}
          <path d={`M${x-20},588 L${x-20},565 Q${x-20},550 ${x},544 Q${x+20},550 ${x+20},565 L${x+20},588`}
            fill="none" stroke="rgba(196,130,58,0.22)" strokeWidth="0.8" />
          <circle cx={x} cy={544} r="2" fill="rgba(196,130,58,0.3)" />
        </g>
      ))}

      {/* ── POSTAGE STAMP top-right ── */}
      <g transform="translate(888, 36)">
        {Array.from({length:7}).map((_,i)=>( <circle key={`t${i}`} cx={i*12}    cy="0"  r="3.2" fill="url(#envBody)" /> ))}
        {Array.from({length:7}).map((_,i)=>( <circle key={`b${i}`} cx={i*12}    cy="58" r="3.2" fill="url(#envBody)" /> ))}
        {Array.from({length:4}).map((_,i)=>( <circle key={`l${i}`} cx="0"       cy={i*14+8} r="3.2" fill="url(#envBody)" /> ))}
        {Array.from({length:4}).map((_,i)=>( <circle key={`r${i}`} cx="72"      cy={i*14+8} r="3.2" fill="url(#envBody)" /> ))}
        <rect x="5" y="5" width="62" height="48" rx="2" fill="url(#stampGrad)" stroke="rgba(196,130,58,0.45)" strokeWidth="1.2" />
        <g transform="translate(36,29)" stroke="rgba(196,130,58,0.55)" strokeWidth="0.65" fill="none">
          {[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>{
            const r2=a*Math.PI/180;
            return <line key={a} x1="0" y1="0" x2={Math.cos(r2)*13} y2={Math.sin(r2)*13} strokeWidth={a%90===0?1:0.5} />;
          })}
          <circle cx="0" cy="0" r="15" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="9"  strokeWidth="0.5" />
          <circle cx="0" cy="0" r="4"  fill="rgba(196,130,58,0.35)" />
        </g>
      </g>

      {/* ── SMALL ADDRESS LINES (decorative) ── */}
      <g stroke="rgba(196,130,58,0.2)" strokeWidth="1" fill="none">
        <line x1="80"  y1="460" x2="280" y2="460" />
        <line x1="80"  y1="478" x2="240" y2="478" />
        <line x1="80"  y1="496" x2="200" y2="496" />
        <circle cx="76" cy="460" r="2.5" fill="rgba(196,130,58,0.3)" />
        <circle cx="76" cy="478" r="2.5" fill="rgba(196,130,58,0.3)" />
        <circle cx="76" cy="496" r="2.5" fill="rgba(196,130,58,0.3)" />
      </g>

      {/* ══════════════════════════════════════════════════════════
           LEFT SIDE PANEL DECORATIONS
      ══════════════════════════════════════════════════════════ */}

      {/* Left side: large peacock feather fan centered at (165, 310) */}
      <g transform="translate(165,310)" opacity="0.72">
        {/* Feather stems radiating outward — 9 feathers in a fan */}
        {[-70,-52,-34,-16,0,16,34,52,70].map((angle,i) => {
          const rad = (angle - 90) * Math.PI / 180;
          const len = i === 4 ? 140 : i === 3 || i === 5 ? 128 : i === 2 || i === 6 ? 110 : i === 1 || i === 7 ? 88 : 64;
          const tx = Math.cos(rad) * len;
          const ty = Math.sin(rad) * len;
          const cx1 = Math.cos(rad) * len * 0.45;
          const cy1 = Math.sin(rad) * len * 0.45 + 8;
          const cx2 = Math.cos(rad) * len * 0.75;
          const cy2 = Math.sin(rad) * len * 0.75 - 5;
          const eyeX = tx;
          const eyeY = ty;
          // feather barbs
          const perpRad = rad + Math.PI/2;
          const barbLen = i === 4 ? 22 : i === 3 || i === 5 ? 18 : 14;
          return (
            <g key={i}>
              {/* Stem */}
              <path d={`M0,0 C${cx1},${cy1} ${cx2},${cy2} ${tx},${ty}`}
                stroke="rgba(180,120,40,0.55)" strokeWidth="1.1" fill="none" />
              {/* Feather barbs along stem */}
              {[0.25,0.4,0.55,0.68,0.80,0.90].map((t, bi) => {
                // Bezier point approximation
                const bx = (1-t)**3*0 + 3*(1-t)**2*t*cx1 + 3*(1-t)*t**2*cx2 + t**3*tx;
                const by = (1-t)**3*0 + 3*(1-t)**2*t*cy1 + 3*(1-t)*t**2*cy2 + t**3*ty;
                const bl = barbLen * (0.5 + t * 0.5);
                return (
                  <g key={bi}>
                    <line x1={bx} y1={by} x2={bx + Math.cos(perpRad)*bl} y2={by + Math.sin(perpRad)*bl}
                      stroke="rgba(196,150,60,0.4)" strokeWidth="0.6" />
                    <line x1={bx} y1={by} x2={bx - Math.cos(perpRad)*bl} y2={by - Math.sin(perpRad)*bl}
                      stroke="rgba(196,150,60,0.4)" strokeWidth="0.6" />
                  </g>
                );
              })}
              {/* Eye at tip */}
              <ellipse cx={eyeX} cy={eyeY} rx={i===4?11:i===3||i===5?9:i===2||i===6?7:5} ry={i===4?15:i===3||i===5?12:i===2||i===6?9:7}
                transform={`rotate(${angle} ${eyeX} ${eyeY})`}
                fill="rgba(180,120,50,0.12)" stroke="rgba(196,140,55,0.55)" strokeWidth="0.8" />
              <ellipse cx={eyeX} cy={eyeY} rx={i===4?6:i===3||i===5?5:4} ry={i===4?8:i===3||i===5?7:5}
                transform={`rotate(${angle} ${eyeX} ${eyeY})`}
                fill="rgba(140,90,30,0.18)" stroke="rgba(218,165,58,0.6)" strokeWidth="0.7" />
              <circle cx={eyeX} cy={eyeY} r={i===4?2.8:2}
                fill="rgba(218,165,58,0.45)" stroke="rgba(240,200,120,0.7)" strokeWidth="0.5" />
            </g>
          );
        })}
        {/* Fan base ornament */}
        <circle cx="0" cy="0" r="10" fill="rgba(218,165,58,0.18)" stroke="rgba(218,165,58,0.55)" strokeWidth="1" />
        <circle cx="0" cy="0" r="5"  fill="rgba(218,165,58,0.35)" />
        {[0,60,120,180,240,300].map(a => {
          const r2=a*Math.PI/180;
          return <line key={a} x1={Math.cos(r2)*10} y1={Math.sin(r2)*10} x2={Math.cos(r2)*18} y2={Math.sin(r2)*18}
            stroke="rgba(196,130,58,0.45)" strokeWidth="0.7" />;
        })}
      </g>

      {/* Left side: Mughal jali geometric panel */}
      <g transform="translate(82,240)" opacity="0.38">
        {/* Diamond lattice 5×4 */}
        {Array.from({length:5}).map((_,row) =>
          Array.from({length:4}).map((_,col) => {
            const x = col*22 + (row%2)*11;
            const y = row*18;
            return <polygon key={`${row}-${col}`}
              points={`${x},${y-9} ${x+11},${y} ${x},${y+9} ${x-11},${y}`}
              fill="rgba(218,165,58,0.08)" stroke="rgba(196,130,58,0.45)" strokeWidth="0.6" />;
          })
        )}
      </g>

      {/* Left side: floral vine running along left crease line, bottom half */}
      {[0.55, 0.62, 0.70, 0.78, 0.86, 0.93].map((t, i) => {
        // Points on line from (0,620) to (500,310)
        const x = t * 500;
        const y = 620 - t * 310;
        const offsetX = -28 + (i%2)*56;
        const offsetY = (i%2)*8 - 4;
        return (
          <g key={i} transform={`translate(${x + offsetX}, ${y + offsetY})`} opacity="0.55">
            <ellipse cx="0" cy="0" rx="14" ry="7" transform={`rotate(${-30+i*12})`}
              fill="rgba(196,140,60,0.12)" stroke="rgba(196,130,58,0.4)" strokeWidth="0.65" />
            <circle cx="0" cy="0" r="2.5" fill="rgba(218,165,58,0.4)" />
          </g>
        );
      })}

      {/* Left side: floral vine along left crease line, top half */}
      {[0.15, 0.25, 0.35, 0.45].map((t, i) => {
        const x = t * 500;
        const y = t * 310;
        const offsetX = -24 + (i%2)*48;
        return (
          <g key={i} transform={`translate(${x + offsetX}, ${y})`} opacity="0.5">
            <ellipse cx="0" cy="0" rx="11" ry="6" transform={`rotate(${25-i*10})`}
              fill="rgba(196,140,60,0.1)" stroke="rgba(196,130,58,0.38)" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="2" fill="rgba(218,165,58,0.35)" />
          </g>
        );
      })}

      {/* Left hanging chain ornament from top-left corner */}
      <g opacity="0.62">
        {[0,1,2,3,4].map(i => (
          <g key={i}>
            <circle cx={80 + i*28} cy={55 + i*38} r="3.5"
              fill="rgba(218,165,58,0.25)" stroke="rgba(218,165,58,0.65)" strokeWidth="0.8" />
            {i < 4 && <line x1={80+i*28} y1={55+i*38} x2={80+(i+1)*28} y2={55+(i+1)*38}
              stroke="rgba(196,130,58,0.3)" strokeWidth="0.7" strokeDasharray="3 2" />}
          </g>
        ))}
        {/* Jhumka bell at end */}
        <g transform="translate(192,207)">
          <path d="M-14,0 Q-14,18 0,22 Q14,18 14,0 Z"
            fill="rgba(218,165,58,0.22)" stroke="rgba(218,165,58,0.6)" strokeWidth="0.9" />
          <ellipse cx="0" cy="-2" rx="14" ry="7"
            fill="rgba(218,165,58,0.18)" stroke="rgba(218,165,58,0.55)" strokeWidth="0.7" />
          {[-7,0,7].map(dx=>(
            <line key={dx} x1={dx} y1="22" x2={dx} y2="30"
              stroke="rgba(218,165,58,0.45)" strokeWidth="0.6" />
          ))}
          {[-7,0,7].map(dx=>(
            <circle key={dx} cx={dx} cy="32" r="2.5"
              fill="rgba(218,165,58,0.5)" stroke="rgba(218,165,58,0.7)" strokeWidth="0.5" />
          ))}
        </g>
      </g>

      {/* Left side: small rosette clusters scattered */}
      {[[120,180],[90,390],[140,490],[110,550]].map(([cx,cy],i) => (
        <g key={i} transform={`translate(${cx},${cy})`} opacity="0.48">
          {[0,45,90,135,180,225,270,315].map(a => {
            const r2=a*Math.PI/180;
            return <ellipse key={a} cx={Math.cos(r2)*9} cy={Math.sin(r2)*9} rx="6" ry="2.5"
              transform={`rotate(${a} ${Math.cos(r2)*9} ${Math.sin(r2)*9})`}
              fill="rgba(196,140,60,0.12)" stroke="rgba(196,130,58,0.38)" strokeWidth="0.6" />;
          })}
          <circle cx="0" cy="0" r="3.5" fill="rgba(218,165,58,0.3)" stroke="rgba(218,165,58,0.6)" strokeWidth="0.6" />
        </g>
      ))}

      {/* ══════════════════════════════════════════════════════════
           RIGHT SIDE PANEL DECORATIONS (mirrored)
      ══════════════════════════════════════════════════════════ */}

      {/* Right side: large peacock feather fan centered at (835, 310) */}
      <g transform="translate(835,310) scale(-1,1)" opacity="0.72">
        {[-70,-52,-34,-16,0,16,34,52,70].map((angle,i) => {
          const rad = (angle - 90) * Math.PI / 180;
          const len = i === 4 ? 140 : i === 3 || i === 5 ? 128 : i === 2 || i === 6 ? 110 : i === 1 || i === 7 ? 88 : 64;
          const tx = Math.cos(rad) * len;
          const ty = Math.sin(rad) * len;
          const cx1 = Math.cos(rad) * len * 0.45;
          const cy1 = Math.sin(rad) * len * 0.45 + 8;
          const cx2 = Math.cos(rad) * len * 0.75;
          const cy2 = Math.sin(rad) * len * 0.75 - 5;
          const perpRad = rad + Math.PI/2;
          const barbLen = i === 4 ? 22 : i === 3 || i === 5 ? 18 : 14;
          return (
            <g key={i}>
              <path d={`M0,0 C${cx1},${cy1} ${cx2},${cy2} ${tx},${ty}`}
                stroke="rgba(180,120,40,0.55)" strokeWidth="1.1" fill="none" />
              {[0.25,0.4,0.55,0.68,0.80,0.90].map((t, bi) => {
                const bx = (1-t)**3*0 + 3*(1-t)**2*t*cx1 + 3*(1-t)*t**2*cx2 + t**3*tx;
                const by = (1-t)**3*0 + 3*(1-t)**2*t*cy1 + 3*(1-t)*t**2*cy2 + t**3*ty;
                const bl = barbLen * (0.5 + t * 0.5);
                return (
                  <g key={bi}>
                    <line x1={bx} y1={by} x2={bx + Math.cos(perpRad)*bl} y2={by + Math.sin(perpRad)*bl}
                      stroke="rgba(196,150,60,0.4)" strokeWidth="0.6" />
                    <line x1={bx} y1={by} x2={bx - Math.cos(perpRad)*bl} y2={by - Math.sin(perpRad)*bl}
                      stroke="rgba(196,150,60,0.4)" strokeWidth="0.6" />
                  </g>
                );
              })}
              <ellipse cx={tx} cy={ty} rx={i===4?11:i===3||i===5?9:i===2||i===6?7:5} ry={i===4?15:i===3||i===5?12:i===2||i===6?9:7}
                transform={`rotate(${angle} ${tx} ${ty})`}
                fill="rgba(180,120,50,0.12)" stroke="rgba(196,140,55,0.55)" strokeWidth="0.8" />
              <ellipse cx={tx} cy={ty} rx={i===4?6:i===3||i===5?5:4} ry={i===4?8:i===3||i===5?7:5}
                transform={`rotate(${angle} ${tx} ${ty})`}
                fill="rgba(140,90,30,0.18)" stroke="rgba(218,165,58,0.6)" strokeWidth="0.7" />
              <circle cx={tx} cy={ty} r={i===4?2.8:2}
                fill="rgba(218,165,58,0.45)" stroke="rgba(240,200,120,0.7)" strokeWidth="0.5" />
            </g>
          );
        })}
        <circle cx="0" cy="0" r="10" fill="rgba(218,165,58,0.18)" stroke="rgba(218,165,58,0.55)" strokeWidth="1" />
        <circle cx="0" cy="0" r="5"  fill="rgba(218,165,58,0.35)" />
        {[0,60,120,180,240,300].map(a => {
          const r2=a*Math.PI/180;
          return <line key={a} x1={Math.cos(r2)*10} y1={Math.sin(r2)*10} x2={Math.cos(r2)*18} y2={Math.sin(r2)*18}
            stroke="rgba(196,130,58,0.45)" strokeWidth="0.7" />;
        })}
      </g>

      {/* Right side: Mughal jali geometric panel */}
      <g transform="translate(840,240)" opacity="0.38">
        {Array.from({length:5}).map((_,row) =>
          Array.from({length:4}).map((_,col) => {
            const x = col*22 + (row%2)*11;
            const y = row*18;
            return <polygon key={`${row}-${col}`}
              points={`${x},${y-9} ${x+11},${y} ${x},${y+9} ${x-11},${y}`}
              fill="rgba(218,165,58,0.08)" stroke="rgba(196,130,58,0.45)" strokeWidth="0.6" />;
          })
        )}
      </g>

      {/* Right side: floral vine along right crease lines */}
      {[0.55, 0.62, 0.70, 0.78, 0.86, 0.93].map((t, i) => {
        const x = 1000 - t * 500;
        const y = 620 - t * 310;
        const offsetX = 28 - (i%2)*56;
        const offsetY = (i%2)*8 - 4;
        return (
          <g key={i} transform={`translate(${x + offsetX}, ${y + offsetY})`} opacity="0.55">
            <ellipse cx="0" cy="0" rx="14" ry="7" transform={`rotate(${30-i*12})`}
              fill="rgba(196,140,60,0.12)" stroke="rgba(196,130,58,0.4)" strokeWidth="0.65" />
            <circle cx="0" cy="0" r="2.5" fill="rgba(218,165,58,0.4)" />
          </g>
        );
      })}
      {[0.15, 0.25, 0.35, 0.45].map((t, i) => {
        const x = 1000 - t * 500;
        const y = t * 310;
        const offsetX = 24 - (i%2)*48;
        return (
          <g key={i} transform={`translate(${x + offsetX}, ${y})`} opacity="0.5">
            <ellipse cx="0" cy="0" rx="11" ry="6" transform={`rotate(${-25+i*10})`}
              fill="rgba(196,140,60,0.1)" stroke="rgba(196,130,58,0.38)" strokeWidth="0.6" />
            <circle cx="0" cy="0" r="2" fill="rgba(218,165,58,0.35)" />
          </g>
        );
      })}

      {/* Right hanging chain ornament from top-right corner */}
      <g opacity="0.62">
        {[0,1,2,3,4].map(i => (
          <g key={i}>
            <circle cx={920 - i*28} cy={55 + i*38} r="3.5"
              fill="rgba(218,165,58,0.25)" stroke="rgba(218,165,58,0.65)" strokeWidth="0.8" />
            {i < 4 && <line x1={920-i*28} y1={55+i*38} x2={920-(i+1)*28} y2={55+(i+1)*38}
              stroke="rgba(196,130,58,0.3)" strokeWidth="0.7" strokeDasharray="3 2" />}
          </g>
        ))}
        <g transform="translate(808,207)">
          <path d="M-14,0 Q-14,18 0,22 Q14,18 14,0 Z"
            fill="rgba(218,165,58,0.22)" stroke="rgba(218,165,58,0.6)" strokeWidth="0.9" />
          <ellipse cx="0" cy="-2" rx="14" ry="7"
            fill="rgba(218,165,58,0.18)" stroke="rgba(218,165,58,0.55)" strokeWidth="0.7" />
          {[-7,0,7].map(dx=>(
            <line key={dx} x1={dx} y1="22" x2={dx} y2="30"
              stroke="rgba(218,165,58,0.45)" strokeWidth="0.6" />
          ))}
          {[-7,0,7].map(dx=>(
            <circle key={dx} cx={dx} cy="32" r="2.5"
              fill="rgba(218,165,58,0.5)" stroke="rgba(218,165,58,0.7)" strokeWidth="0.5" />
          ))}
        </g>
      </g>

      {/* Right side: small rosette clusters scattered */}
      {[[880,180],[910,390],[860,490],[890,550]].map(([cx,cy],i) => (
        <g key={i} transform={`translate(${cx},${cy})`} opacity="0.48">
          {[0,45,90,135,180,225,270,315].map(a => {
            const r2=a*Math.PI/180;
            return <ellipse key={a} cx={Math.cos(r2)*9} cy={Math.sin(r2)*9} rx="6" ry="2.5"
              transform={`rotate(${a} ${Math.cos(r2)*9} ${Math.sin(r2)*9})`}
              fill="rgba(196,140,60,0.12)" stroke="rgba(196,130,58,0.38)" strokeWidth="0.6" />;
          })}
          <circle cx="0" cy="0" r="3.5" fill="rgba(218,165,58,0.3)" stroke="rgba(218,165,58,0.6)" strokeWidth="0.6" />
        </g>
      ))}

      {/* ── BOTTOM FLAP CENTER: large Mughal arch medallion ── */}
      <g transform="translate(500,530)" opacity="0.45">
        {/* Arch shape */}
        <path d="M-55,40 L-55,-10 Q-55,-50 0,-60 Q55,-50 55,-10 L55,40 Z"
          fill="rgba(218,165,58,0.06)" stroke="rgba(218,165,58,0.4)" strokeWidth="0.9" />
        {/* Inner arch */}
        <path d="M-42,38 L-42,-5 Q-42,-40 0,-48 Q42,-40 42,-5 L42,38 Z"
          fill="none" stroke="rgba(196,130,58,0.25)" strokeWidth="0.6" strokeDasharray="4 5" />
        {/* Arch keystone diamond */}
        <polygon points="0,-62 6,-55 0,-48 -6,-55"
          fill="rgba(218,165,58,0.4)" stroke="rgba(218,165,58,0.7)" strokeWidth="0.8" />
        {/* Inner rosette */}
        {[0,45,90,135,180,225,270,315].map(a => {
          const r2=a*Math.PI/180;
          return <ellipse key={a} cx={Math.cos(r2)*16} cy={Math.sin(r2)*16} rx="9" ry="3.5"
            transform={`rotate(${a} ${Math.cos(r2)*16} ${Math.sin(r2)*16})`}
            fill="rgba(196,140,60,0.1)" stroke="rgba(196,130,58,0.35)" strokeWidth="0.6" />;
        })}
        <circle cx="0" cy="0" r="6" fill="rgba(218,165,58,0.22)" stroke="rgba(218,165,58,0.55)" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="2.5" fill="rgba(218,165,58,0.5)" />
      </g>
    </svg>
  );
}

/* ── ENVELOPE FLAP ── */
function EnvelopeFlap({ phase }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 20, perspective: 1600, transformStyle: 'preserve-3d' }}>
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 620"
        preserveAspectRatio="none"
        style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
        animate={phase === 'opening' || phase === 'open' ? { rotateX: -172 } : { rotateX: 0 }}
        transition={{ duration: 1.3, ease: [0.4, 0, 0.15, 1] }}
      >
        <defs>
          <radialGradient id="flapBody" cx="50%" cy="15%" r="85%">
            <stop offset="0%"   stopColor="#1e3070" />
            <stop offset="45%"  stopColor="#111c50" />
            <stop offset="100%" stopColor="#080f2e" />
          </radialGradient>
          <linearGradient id="flapShad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%"   stopColor="rgba(0,0,0,0.0)" />
            <stop offset="100%" stopColor="rgba(0,0,20,0.5)" />
          </linearGradient>
          <linearGradient id="flapEL" x1="0%" y1="0%" x2="60%" y2="0%">
            <stop offset="0%"   stopColor="rgba(245,200,66,0.12)" />
            <stop offset="100%" stopColor="rgba(245,200,66,0.0)" />
          </linearGradient>
          <linearGradient id="flapER" x1="100%" y1="0%" x2="40%" y2="0%">
            <stop offset="0%"   stopColor="rgba(245,200,66,0.12)" />
            <stop offset="100%" stopColor="rgba(245,200,66,0.0)" />
          </linearGradient>
          <linearGradient id="topGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(218,165,58,0.0)" />
            <stop offset="25%"  stopColor="rgba(218,165,58,0.7)" />
            <stop offset="50%"  stopColor="rgba(255,220,100,0.95)" />
            <stop offset="75%"  stopColor="rgba(218,165,58,0.7)" />
            <stop offset="100%" stopColor="rgba(218,165,58,0.0)" />
          </linearGradient>
          <filter id="flapDrop">
            <feDropShadow dx="0" dy="8" stdDeviation="14" floodColor="rgba(100,60,15,0.28)" />
          </filter>
          <filter id="creaseF">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="b"/>
            <feFlood floodColor="rgba(218,165,58,0.4)" result="c"/>
            <feComposite in="c" in2="b" operator="in" result="g"/>
            <feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Main flap */}
        <path d="M0,0 L1000,0 L500,310 Z" fill="url(#flapBody)" filter="url(#flapDrop)" />
        <path d="M0,0 L1000,0 L500,310 Z" fill="url(#flapShad)" />
        <path d="M0,0 L280,0   L500,310 Z" fill="url(#flapEL)" />
        <path d="M1000,0 L720,0 L500,310 Z" fill="url(#flapER)" />

        {/* Top gold edge */}
        <line x1="0" y1="1.5" x2="1000" y2="1.5" stroke="url(#topGold)" strokeWidth="3" />
        <line x1="0" y1="7"   x2="1000" y2="7"   stroke="rgba(218,165,58,0.22)" strokeWidth="0.7" strokeDasharray="9 11" />

        {/* Crease lines */}
        <line x1="0" y1="0" x2="500" y2="310" stroke="rgba(218,165,58,0.22)" strokeWidth="1.8" filter="url(#creaseF)" />
        <line x1="1000" y1="0" x2="500" y2="310" stroke="rgba(218,165,58,0.22)" strokeWidth="1.8" filter="url(#creaseF)" />

        {/* Inner dashed border */}
        <path d="M22,11 L978,11 L500,298 Z" fill="none" stroke="rgba(196,130,58,0.28)" strokeWidth="0.9" strokeDasharray="7 9" />
        {/* Second inner border */}
        <path d="M40,20 L960,20 L500,285 Z" fill="none" stroke="rgba(196,130,58,0.14)" strokeWidth="0.6" />

        {/* Center crease */}
        <line x1="500" y1="12" x2="500" y2="302" stroke="rgba(196,130,58,0.2)" strokeWidth="1" />

        {/* Corner diamonds */}
        {[[22,9],[978,9]].map(([x,y],i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <polygon points="0,-7 5,0 0,7 -5,0"   fill="rgba(218,165,58,0.55)" />
            <polygon points="0,-4 3,0 0,4 -3,0"   fill="rgba(255,220,130,0.8)" />
          </g>
        ))}

        {/* Top edge floral trio */}
        {[[200,20],[500,14],[800,20]].map(([cx,cy],i)=>(
          <g key={i} transform={`translate(${cx},${cy})`} stroke="rgba(196,130,58,0.32)" strokeWidth="0.7" fill="none">
            {[0,60,120,180,240,300].map(a=>{
              const r2=a*Math.PI/180;
              return <ellipse key={a} cx={Math.cos(r2)*8} cy={Math.sin(r2)*8} rx="5" ry="2.5"
                transform={`rotate(${a} ${Math.cos(r2)*8} ${Math.sin(r2)*8})`} />;
            })}
            <circle cx="0" cy="0" r="3" fill="rgba(196,130,58,0.22)" stroke="rgba(196,130,58,0.45)" strokeWidth="0.8" />
          </g>
        ))}

        {/* Tip starburst */}
        <g transform="translate(500,310)" stroke="rgba(196,130,58,0.45)" strokeWidth="0.9" fill="none">
          {[0,45,90,135,180,225,270,315].map(a=>{
            const r2=a*Math.PI/180;
            const len = a%90===0 ? 14 : 10;
            return <line key={a} x1="0" y1="0" x2={Math.cos(r2)*len} y2={Math.sin(r2)*len} />;
          })}
          <circle cx="0" cy="0" r="6" fill="rgba(218,165,58,0.3)" stroke="rgba(218,165,58,0.6)" strokeWidth="1" />
          <circle cx="0" cy="0" r="12" fill="none" stroke="rgba(196,130,58,0.2)" strokeWidth="0.5" strokeDasharray="2 3" />
        </g>

        {/* Mughal arch details along top edge */}
        {[160, 340, 500, 660, 840].map((x,i) => (
          <g key={i}>
            <path d={`M${x-18},0 L${x-18},28 Q${x-18},42 ${x},48 Q${x+18},42 ${x+18},28 L${x+18},0`}
              fill="rgba(196,130,58,0.06)" stroke="rgba(196,130,58,0.2)" strokeWidth="0.7" />
            <circle cx={x} cy={48} r="2" fill="rgba(196,130,58,0.35)" />
          </g>
        ))}
      </motion.svg>
    </div>
  );
}

/* ── LETTER CARD ── */
function LetterCard() {
  const D = new Date(config.date);
  return (
    <div style={{
      background: 'linear-gradient(160deg, #1a2a60 0%, #0f1848 100%)',
      border: '1px solid rgba(245,200,66,0.45)',
      borderRadius: 14,
      padding: 'clamp(14px,3vw,22px) clamp(16px,4vw,28px)',
      boxShadow: '0 6px 32px rgba(0,0,20,0.5), inset 0 1px 0 rgba(245,200,66,0.12)',
      textAlign: 'center',
      width: '100%',
    }}>
      {/* Top ornament line */}
      <div style={{ width: '60%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(245,200,66,0.5),transparent)', margin: '0 auto 10px' }} />

      <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:'clamp(7px,1.8vw,9px)', letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(245,200,66,0.65)', marginBottom:8 }}>
        You Are Cordially Invited
      </p>
      <p style={{ fontFamily:'Great Vibes,cursive', fontSize:'clamp(22px,6vw,34px)', color:'#f5c842', lineHeight:1.2, textShadow:'0 0 16px rgba(245,200,66,0.4)' }}>
        {config.groom} &amp; {config.bride}
      </p>

      {/* Divider */}
      <div style={{ display:'flex', alignItems:'center', gap:8, margin:'8px 0' }}>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(245,200,66,0.3))' }} />
        <span style={{ color:'rgba(245,200,66,0.6)', fontSize:8 }}>✦</span>
        <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(245,200,66,0.3),transparent)' }} />
      </div>

      <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(12px,3vw,15px)', color:'rgba(200,180,140,0.8)', letterSpacing:'0.06em' }}>
        {D.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'long', year:'numeric' })}
      </p>
      <p style={{ fontFamily:'Montserrat,sans-serif', fontSize:'clamp(8px,2vw,10px)', color:'rgba(245,200,66,0.55)', letterSpacing:'0.2em', marginTop:4, textTransform:'uppercase' }}>
        {config.venueName}
      </p>

      {/* Bottom ornament */}
      <div style={{ width: '60%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(245,200,66,0.5),transparent)', margin: '10px auto 0' }} />
    </div>
  );
}

/* ── EMBOSSED BOTANICAL BG ── */
function EmbossedBotanicals() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 900" preserveAspectRatio="xMidYMid slice">
      {[[80,120],[520,80],[60,750],[540,780],[150,440],[450,420],[300,160],[300,740]].map(([cx,cy],idx) => (
        <g key={idx} stroke="rgba(245,200,66,0.1)" strokeWidth="0.8" fill="none">
          {Array.from({length:12}).map((_,i) => {
            const a = (i/12)*Math.PI*2 - Math.PI/2;
            const r = idx%2===0 ? 55 : 45;
            return <path key={i} d={`M${cx},${cy} Q${cx+Math.cos(a-0.2)*r*0.5},${cy+Math.sin(a-0.2)*r*0.5} ${cx+Math.cos(a)*r},${cy+Math.sin(a)*r}`} />;
          })}
          <circle cx={cx} cy={cy} r="4" fill="rgba(180,110,60,0.15)" stroke="none" />
        </g>
      ))}
      {[[180,200],[420,180],[130,600],[470,620],[300,460],[250,320],[360,580]].map(([x,y],i)=>(
        <g key={i} stroke="rgba(180,110,60,0.18)" strokeWidth="0.7" fill="none">
          {[0,60,120,180,240,300].map(a => {
            const rad=a*Math.PI/180;
            return <ellipse key={a} cx={x+Math.cos(rad)*6} cy={y+Math.sin(rad)*6} rx="4" ry="2.5"
              transform={`rotate(${a} ${x+Math.cos(rad)*6} ${y+Math.sin(rad)*6})`} />;
          })}
          <circle cx={x} cy={y} r="2.5" fill="rgba(180,110,60,0.12)" stroke="rgba(180,110,60,0.22)" />
        </g>
      ))}
    </svg>
  );
}

/* ── BEAUTIFUL HEART SEAL ── */
function WaxSeal({ initials }) {
  const parts = initials.split('&');
  const groomI = (parts[0] ?? '').toUpperCase();
  const brideI = (parts[1] ?? '').toUpperCase();

  const heartPath = 'M110,168 C68,142 24,116 24,78 C24,52 44,32 68,32 C84,32 98,42 110,56 C122,42 136,32 152,32 C176,32 196,52 196,78 C196,116 152,142 110,168 Z';

  return (
    <svg viewBox="0 0 220 195" width={220} height={195} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        {/* Rich multi-stop rose gradient */}
        <radialGradient id="heartFill" cx="38%" cy="28%" r="72%">
          <stop offset="0%"   stopColor="#f07898" />
          <stop offset="18%"  stopColor="#d44870" />
          <stop offset="42%"  stopColor="#aa2850" />
          <stop offset="68%"  stopColor="#801438" />
          <stop offset="100%" stopColor="#520820" />
        </radialGradient>
        {/* Bright top-left shine */}
        <radialGradient id="heartShine" cx="32%" cy="22%" r="48%">
          <stop offset="0%"   stopColor="rgba(255,220,230,0.80)" />
          <stop offset="55%"  stopColor="rgba(255,200,215,0.18)" />
          <stop offset="100%" stopColor="rgba(255,200,215,0)" />
        </radialGradient>
        {/* Bottom-edge depth */}
        <radialGradient id="heartDepth" cx="50%" cy="80%" r="55%">
          <stop offset="0%"   stopColor="rgba(60,0,15,0.45)" />
          <stop offset="100%" stopColor="rgba(60,0,15,0)" />
        </radialGradient>
        {/* Gold shimmer for border */}
        <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ffe566" />
          <stop offset="35%"  stopColor="#f5c842" />
          <stop offset="65%"  stopColor="#ffd95a" />
          <stop offset="100%" stopColor="#e8a820" />
        </linearGradient>
        {/* Glow for shadow */}
        <filter id="heartShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="rgba(90,0,20,0.6)" />
          <feDropShadow dx="0" dy="0"  stdDeviation="22" floodColor="rgba(230,80,110,0.35)" />
        </filter>
        {/* Text shadow for readability */}
        <filter id="txtShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(50,0,10,0.9)" />
        </filter>
        {/* Gold text glow */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="rgba(180,120,0,0.8)" />
        </filter>
      </defs>

      {/* ── HEART BODY ── */}
      <path d={heartPath} fill="url(#heartFill)" filter="url(#heartShadow)" />
      <path d={heartPath} fill="url(#heartShine)" style={{ mixBlendMode: 'screen' }} />
      <path d={heartPath} fill="url(#heartDepth)" />

      {/* ── GOLD OUTER BORDER — double line ── */}
      <path d={heartPath} fill="none" stroke="url(#goldBorder)" strokeWidth="3.5" />
      <path d={heartPath} fill="none" stroke="rgba(255,240,180,0.4)" strokeWidth="1" strokeDasharray="0" />

      {/* ── DECORATIVE INNER FRAME (thin gold line, not touching text) ── */}
      <path
        d="M110,152 C80,132 52,114 52,82 C52,62 66,50 80,50 C92,50 103,57 110,67 C117,57 128,50 140,50 C154,50 168,62 168,82 C168,114 140,132 110,152 Z"
        fill="none" stroke="rgba(255,215,90,0.35)" strokeWidth="1" strokeDasharray="5 4"
      />

      {/* ── SPARKLE DOTS inside heart ── */}
      {[[68,62],[152,62],[54,95],[166,95],[80,145],[140,145],[110,55]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={i===6?2.5:1.8} fill="rgba(255,230,130,0.7)" />
      ))}

      {/* ── TOP ORNAMENT — thin line + diamond above initials ── */}
      <line x1="68" y1="78" x2="152" y2="78" stroke="rgba(255,215,90,0.55)" strokeWidth="0.8" />
      <polygon points="110,72 114,78 110,84 106,78" fill="rgba(255,215,90,0.8)" />

      {/* ── INITIALS ── */}
      <text x="76" y="116" textAnchor="middle"
        fontFamily="'Playfair Display', 'Times New Roman', serif"
        fontSize="54" fontWeight="700" letterSpacing="1"
        fill="white" filter="url(#txtShadow)">
        {groomI}
      </text>
      {/* Heart — big, centred vertically between the two letters */}
      <text x="110" y="103" textAnchor="middle" dominantBaseline="central"
        fontFamily="Arial, sans-serif" fontSize="32"
        fill="rgba(255,215,80,1)" filter="url(#goldGlow)">♥</text>
      <text x="144" y="116" textAnchor="middle"
        fontFamily="'Playfair Display', 'Times New Roman', serif"
        fontSize="54" fontWeight="700" letterSpacing="1"
        fill="white" filter="url(#txtShadow)">
        {brideI}
      </text>

      {/* ── BOTTOM ORNAMENT — thin lines flanking "Forever" ── */}
      <line x1="68" y1="128" x2="93" y2="128" stroke="rgba(255,215,90,0.55)" strokeWidth="0.8" />
      <line x1="127" y1="128" x2="152" y2="128" stroke="rgba(255,215,90,0.55)" strokeWidth="0.8" />
      <circle cx="110" cy="128" r="1.5" fill="rgba(255,215,90,0.8)" />

      {/* ── "Forever" ── */}
      <text x="110" y="146" textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontSize="19" fontStyle="italic" letterSpacing="1"
        fill="rgba(255,225,80,1)" filter="url(#goldGlow)">
        Forever
      </text>
    </svg>
  );
}
