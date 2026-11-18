import { motion } from 'framer-motion';
import { config } from '../config';

const D = new Date(config.date);

function calUrl() {
  const iso = d => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(config.groom + ' & ' + config.bride + ' Wedding')}&dates=${iso(D)}/${iso(new Date(+D + 5 * 36e5))}&location=${encodeURIComponent(config.venueName + ', ' + config.venueAddress)}`;
}

function AnimatedText({ text, delay = 0, className = '', style: extraStyle = {}, tag: Tag = 'span' }) {
  // Extract gradient props to pass to each letter span
  const { background, WebkitBackgroundClip, WebkitTextFillColor, backgroundClip, ...tagStyle } = extraStyle;
  const gradientStyle = background ? { background, WebkitBackgroundClip, WebkitTextFillColor, backgroundClip } : {};
  return (
    <Tag className={className} style={{ display: 'inline-block', ...tagStyle }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: delay + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal', ...gradientStyle }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  );
}

export default function Hero({ opened }) {
  return (
    <section id="top" className="relative w-full overflow-x-hidden" style={{ minHeight: '100svh' }}>

      {/* ── BACKGROUND: warm peach/ivory gradient ── */}
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(175deg, #0a1628 0%, #0d1b3e 30%, #111830 60%, #0d1b3e 85%, #0a1628 100%)',
      }} />

      {/* Soft radial glow center */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 35%, rgba(245,200,66,0.08) 0%, transparent 65%)',
      }} />

      {/* ── MUGHAL ARCH FRAME (top) ── */}
      <MughalArchTop />

      {/* ── SIDE PEACOCK PANELS ── */}
      <PeacockLeft />
      <PeacockRight />

      {/* ── WATERCOLOR FOLIAGE CORNERS ── */}
      <FoliageCorners />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 sm:px-16 pt-16 sm:pt-24 pb-24 sm:pb-36">

        {/* Together with families */}
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-5 sm:mb-8"
          >
            <div className="h-px w-8 sm:w-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(245,200,66,0.6))' }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(8px,2.5vw,10px)', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(245,200,66,0.85)' }}>
              Together with their families
            </span>
            <div className="h-px w-8 sm:w-20" style={{ background: 'linear-gradient(90deg, rgba(245,200,66,0.6), transparent)' }} />
          </motion.div>
        )}

        {/* Save the Date */}
        {opened && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(15px,3.5vw,20px)', fontStyle: 'italic', color: 'rgba(245,200,66,0.9)', letterSpacing: '0.12em', marginBottom: 8 }}
          >
            Save the Date
          </motion.p>
        )}

        {/* GROOM NAME */}
        {opened && (
          <AnimatedText
            text={config.groom}
            delay={0.5}
            className=""
            style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(48px, 10vw, 110px)', lineHeight: 1.4, overflow: 'visible', paddingTop: '0.15em', background: 'linear-gradient(160deg, #c9956c 0%, #f5e6d0 35%, #ffffff 55%, #d4a574 80%, #c9956c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            tag="h1"
          />
        )}

        {/* Weds divider */}
        {opened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center my-2 sm:my-3 gap-1"
          >
            {/* Full ornamental row */}
            <div className="flex items-center justify-center gap-2">
              {/* Left arm */}              <svg width="60" height="32" viewBox="0 0 120 32" fill="none" className="hidden sm:block">
                {/* Main line */}
                <line x1="0" y1="16" x2="85" y2="16" stroke="rgba(245,200,66,0.35)" strokeWidth="0.7"/>
                {/* Tick marks */}
                {[15,30,45,60,75].map(x => (
                  <line key={x} x1={x} y1="12" x2={x} y2="20" stroke="rgba(245,200,66,0.3)" strokeWidth="0.6"/>
                ))}
                {/* Lotus petals cluster */}
                <ellipse cx="96" cy="16" rx="7" ry="4" fill="rgba(245,200,66,0.08)" stroke="rgba(245,200,66,0.5)" strokeWidth="0.8"/>
                <ellipse cx="96" cy="9"  rx="4" ry="7" fill="rgba(245,200,66,0.08)" stroke="rgba(245,200,66,0.45)" strokeWidth="0.8"/>
                <ellipse cx="96" cy="23" rx="4" ry="7" fill="rgba(245,200,66,0.08)" stroke="rgba(245,200,66,0.45)" strokeWidth="0.8"/>
                <circle  cx="96" cy="16" r="3"   fill="rgba(245,200,66,0.5)"/>
                <circle  cx="96" cy="16" r="1.2" fill="rgba(255,230,100,0.9)"/>
                {/* Diamond tip */}
                <polygon points="111,16 116,11 121,16 116,21" fill="rgba(245,200,66,0.2)" stroke="rgba(245,200,66,0.7)" strokeWidth="0.8"/>
                <circle cx="116" cy="16" r="1.5" fill="rgba(245,200,66,0.8)"/>
              </svg>

              {/* Weds text with glow */}
              <motion.span
                animate={{ textShadow: ['0 0 12px rgba(245,200,66,0.4)', '0 0 28px rgba(245,200,66,0.9)', '0 0 12px rgba(245,200,66,0.4)'] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(18px, 5vw, 40px)', fontStyle: 'italic', fontWeight: 600, color: '#f5c842', letterSpacing: '0.1em' }}
              >
                ✦ weds ✦
              </motion.span>

              {/* Right arm (mirrored) */}
              <svg width="60" height="32" viewBox="0 0 120 32" fill="none" style={{ transform: 'scaleX(-1)' }} className="hidden sm:block">
                <line x1="0" y1="16" x2="85" y2="16" stroke="rgba(245,200,66,0.35)" strokeWidth="0.7"/>
                {[15,30,45,60,75].map(x => (
                  <line key={x} x1={x} y1="12" x2={x} y2="20" stroke="rgba(245,200,66,0.3)" strokeWidth="0.6"/>
                ))}
                <ellipse cx="96" cy="16" rx="7" ry="4" fill="rgba(245,200,66,0.08)" stroke="rgba(245,200,66,0.5)" strokeWidth="0.8"/>
                <ellipse cx="96" cy="9"  rx="4" ry="7" fill="rgba(245,200,66,0.08)" stroke="rgba(245,200,66,0.45)" strokeWidth="0.8"/>
                <ellipse cx="96" cy="23" rx="4" ry="7" fill="rgba(245,200,66,0.08)" stroke="rgba(245,200,66,0.45)" strokeWidth="0.8"/>
                <circle  cx="96" cy="16" r="3"   fill="rgba(245,200,66,0.5)"/>
                <circle  cx="96" cy="16" r="1.2" fill="rgba(255,230,100,0.9)"/>
                <polygon points="111,16 116,11 121,16 116,21" fill="rgba(245,200,66,0.2)" stroke="rgba(245,200,66,0.7)" strokeWidth="0.8"/>
                <circle cx="116" cy="16" r="1.5" fill="rgba(245,200,66,0.8)"/>
              </svg>
            </div>

            {/* Tiny dot row beneath */}
            <div className="flex items-center gap-1.5">
              {[0.3,0.5,0.7,1,0.7,0.5,0.3].map((op, i) => (
                <div key={i} style={{ width: i === 3 ? 5 : 3, height: i === 3 ? 5 : 3, borderRadius: '50%', background: `rgba(245,200,66,${op})` }} />
              ))}
            </div>
          </motion.div>
        )}

        {/* BRIDE NAME */}
        {opened && (
          <AnimatedText
            text={config.bride}
            delay={1.4}
            className=""
            style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(48px, 10vw, 110px)', lineHeight: 1.4, overflow: 'visible', paddingTop: '0.15em', background: 'linear-gradient(160deg, #c9956c 0%, #f5e6d0 35%, #ffffff 55%, #d4a574 80%, #c9956c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            tag="h1"
          />
        )}

        {/* Wedding date badge */}
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.2 }}
            className="glass-peach rounded-2xl px-4 sm:px-7 py-4 sm:py-5 mt-6 sm:mt-10 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full max-w-sm sm:max-w-none sm:w-auto"
          >
            <div className="text-center">
              <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(245,200,66,0.7)', marginBottom: 4 }}>The Wedding Day</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(14px,4vw,18px)', color: '#e8d8b0' }}>
                {D.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="w-full h-px sm:w-px sm:h-10" style={{ background: 'rgba(245,200,66,0.25)' }} />
            <div className="text-center">
              <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 9, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(245,200,66,0.7)', marginBottom: 4 }}>Venue</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(14px,4vw,18px)', color: '#e8d8b0' }}>{config.venueName}</p>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'rgba(200,180,140,0.6)', marginTop: 2 }}>{config.venueAddress}</p>
            </div>
          </motion.div>
        )}

        {/* CTAs */}
        {opened && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:w-auto sm:px-0"
          >
            <a href={calUrl()} target="_blank" rel="noopener" className="btn-gold w-full sm:w-auto text-center justify-center">
              📅 Save the Date
            </a>
          </motion.div>
        )}
      </div>

      {/* ── MUGHAL ARCH FOOTER WAVE ── */}
      <MughalArchBottom />

      {/* ── SCROLL INDICATOR ── */}
      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: 8, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(245,200,66,0.6)' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-10"
            style={{ background: 'linear-gradient(180deg, rgba(245,200,66,0.7), transparent)' }}
          />
        </motion.div>
      )}
    </section>
  );
}

/* ── MUGHAL ARCH FRAME TOP ── */
function MughalArchTop() {
  return (
    <svg className="absolute top-0 left-0 w-full z-10 pointer-events-none"
      viewBox="0 0 1200 160" preserveAspectRatio="xMidYMin meet">
      <defs>
        <linearGradient id="archGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(245,200,66,0)" />
          <stop offset="20%" stopColor="rgba(245,200,66,0.35)" />
          <stop offset="50%" stopColor="rgba(255,225,100,0.55)" />
          <stop offset="80%" stopColor="rgba(245,200,66,0.35)" />
          <stop offset="100%" stopColor="rgba(245,200,66,0)" />
        </linearGradient>
      </defs>

      {/* Horizontal border lines */}
      <line x1="0" y1="8" x2="1200" y2="8" stroke="url(#archGold)" strokeWidth="1" />
      <line x1="0" y1="14" x2="1200" y2="14" stroke="url(#archGold)" strokeWidth="0.5" strokeDasharray="6 8" />

      {/* Center Mughal arch */}
      <path d="M450,14 L450,80 Q450,130 600,140 Q750,130 750,80 L750,14"
        fill="rgba(245,200,66,0.04)" stroke="rgba(245,200,66,0.4)" strokeWidth="1.2" />
      {/* Inner arch detail */}
      <path d="M470,14 L470,76 Q470,120 600,130 Q730,120 730,76 L730,14"
        fill="none" stroke="rgba(245,200,66,0.18)" strokeWidth="0.7" strokeDasharray="4 5" />

      {/* Keystone diamond */}
      <polygon points="600,100 610,115 600,130 590,115" fill="rgba(245,200,66,0.2)" stroke="rgba(245,200,66,0.5)" strokeWidth="0.8" />
      <circle cx="600" cy="115" r="4" fill="rgba(245,200,66,0.4)" />

      {/* Hanging jewels from arch */}
      {[500,540,580,600,620,660,700].map((x, i) => {
        const baseY = i === 3 ? 98 : i === 0 || i === 6 ? 28 : i === 1 || i === 5 ? 50 : 72;
        return (
          <g key={x}>
            <line x1={x} y1={baseY} x2={x} y2={baseY + 10} stroke="rgba(245,200,66,0.35)" strokeWidth="0.7" />
            <circle cx={x} cy={baseY + 13} r="2.5" fill="rgba(245,200,66,0.5)" />
          </g>
        );
      })}

      {/* Side corner ornaments */}
      <g stroke="rgba(245,200,66,0.35)" strokeWidth="0.9" fill="none">
        {/* Top-left corner */}
        <path d="M0,8 L80,8 M8,8 L8,70" />
        <path d="M8,8 Q50,8 50,50" strokeWidth="0.7" />
        <path d="M20,8 Q20,20 8,20" strokeWidth="0.7" />
        <circle cx="80" cy="8" r="2.5" fill="rgba(245,200,66,0.4)" stroke="none" />
        <circle cx="8" cy="70" r="2.5" fill="rgba(245,200,66,0.4)" stroke="none" />
        <circle cx="30" cy="30" r="1.5" fill="rgba(245,200,66,0.3)" stroke="none" />
        {/* Top-right corner */}
        <path d="M1200,8 L1120,8 M1192,8 L1192,70" />
        <path d="M1192,8 Q1150,8 1150,50" strokeWidth="0.7" />
        <path d="M1180,8 Q1180,20 1192,20" strokeWidth="0.7" />
        <circle cx="1120" cy="8" r="2.5" fill="rgba(245,200,66,0.4)" stroke="none" />
        <circle cx="1192" cy="70" r="2.5" fill="rgba(245,200,66,0.4)" stroke="none" />
      </g>

      {/* Mini arches on sides */}
      {[160, 300, 900, 1040].map((x, i) => (
        <g key={x}>
          <path d={`M${x - 40},14 L${x - 40},50 Q${x - 40},72 ${x},80 Q${x + 40},72 ${x + 40},50 L${x + 40},14`}
            fill="none" stroke="rgba(245,200,66,0.18)" strokeWidth="0.8" />
          <circle cx={x} cy={80} r="3" fill="rgba(245,200,66,0.22)" />
        </g>
      ))}
    </svg>
  );
}

/* ── MUGHAL ARCH BOTTOM WAVE ── */
function MughalArchBottom() {
  return (
    <svg className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
      viewBox="0 0 1200 100" preserveAspectRatio="none">
      {/* Scalloped wave — deep navy to blend into section below */}
      <path d="M0,100 L0,60 Q60,20 120,55 Q180,90 240,55 Q300,20 360,55 Q420,90 480,55 Q540,20 600,55 Q660,90 720,55 Q780,20 840,55 Q900,90 960,55 Q1020,20 1080,55 Q1140,90 1200,55 L1200,100 Z"
        fill="rgba(13,27,62,0.7)" />
      <path d="M0,100 L0,70 Q60,38 120,65 Q180,92 240,65 Q300,38 360,65 Q420,92 480,65 Q540,38 600,65 Q660,92 720,65 Q780,38 840,65 Q900,92 960,65 Q1020,38 1080,65 Q1140,92 1200,65 L1200,100 Z"
        fill="rgba(17,24,48,0.5)" />
      {/* Gold border line */}
      <path d="M0,60 Q60,20 120,55 Q180,90 240,55 Q300,20 360,55 Q420,90 480,55 Q540,20 600,55 Q660,90 720,55 Q780,20 840,55 Q900,90 960,55 Q1020,20 1080,55 Q1140,90 1200,55"
        fill="none" stroke="rgba(245,200,66,0.25)" strokeWidth="1" />
    </svg>
  );
}

/* ── LEFT PEACOCK PANEL ── */
function PeacockLeft() {
  return (
    <svg className="absolute left-0 top-0 h-full pointer-events-none z-5"
      style={{ width: 'clamp(80px, 12vw, 160px)', zIndex: 5, opacity: 0.65 }}
      viewBox="0 0 160 800" preserveAspectRatio="xMinYMid meet">

      {/* Stem */}
      <path d="M50,800 Q55,550 60,400 Q65,250 70,140" stroke="rgba(140,80,30,0.3)" strokeWidth="1.5" fill="none" />

      {/* Large feather fan arcs */}
      {[600, 480, 360, 250].map((y, i) => (
        <g key={y} transform={`translate(65, ${y})`} style={{ animation: `peacockSway ${3 + i * 0.5}s ease-in-out ${i * 0.4}s infinite` }}>
          {/* Fan arcs */}
          {[-50, -35, -20, -5, 10, 25, 40].map((angle, j) => {
            const rad = angle * Math.PI / 180;
            const len = 35 + (j === 3 ? 15 : 0);
            return (
              <g key={j}>
                <path d={`M0,0 Q${Math.cos(rad - 0.3) * len * 0.5},${Math.sin(rad - 0.3) * len * 0.5} ${Math.cos(rad) * len},${Math.sin(rad) * len}`}
                  stroke={`rgba(${j === 3 ? '60,100,60' : '140,80,30'},${0.25 + j * 0.02})`}
                  strokeWidth="0.9" fill="none" />
                {/* Eye at tip */}
                <ellipse
                  cx={Math.cos(rad) * len} cy={Math.sin(rad) * len}
                  rx="5" ry="3"
                  transform={`rotate(${angle} ${Math.cos(rad) * len} ${Math.sin(rad) * len})`}
                  fill="rgba(80,120,60,0.15)" stroke="rgba(80,120,60,0.35)" strokeWidth="0.7"
                />
                <circle cx={Math.cos(rad) * len} cy={Math.sin(rad) * len} r="1.5" fill="rgba(196,103,58,0.4)" />
              </g>
            );
          })}
          {/* Peacock head */}
          <circle cx="0" cy="-6" r="7" fill="rgba(60,100,60,0.12)" stroke="rgba(60,100,60,0.3)" strokeWidth="0.8" />
          <circle cx="0" cy="-10" r="2" fill="rgba(196,103,58,0.3)" />
        </g>
      ))}

      {/* Leaf sprigs */}
      {[700, 520, 320].map((y, i) => (
        <g key={y} transform={`translate(55, ${y}) rotate(${-20 + i * 10})`}>
          <path d="M0,0 Q15,-25 5,-45 Q-5,-25 0,0" fill="rgba(100,130,70,0.15)" stroke="rgba(100,130,70,0.3)" strokeWidth="0.7" />
          <line x1="0" y1="0" x2="5" y2="-45" stroke="rgba(100,130,70,0.2)" strokeWidth="0.4" />
        </g>
      ))}
    </svg>
  );
}

/* ── RIGHT PEACOCK PANEL ── */
function PeacockRight() {
  return (
    <svg className="absolute right-0 top-0 h-full pointer-events-none"
      style={{ width: 'clamp(80px, 12vw, 160px)', zIndex: 5, opacity: 0.65, transform: 'scaleX(-1)' }}
      viewBox="0 0 160 800" preserveAspectRatio="xMinYMid meet">

      <path d="M50,800 Q55,550 60,400 Q65,250 70,140" stroke="rgba(140,80,30,0.3)" strokeWidth="1.5" fill="none" />

      {[600, 480, 360, 250].map((y, i) => (
        <g key={y} transform={`translate(65, ${y})`} style={{ animation: `peacockSway ${3 + i * 0.5}s ease-in-out ${i * 0.4 + 0.2}s infinite` }}>
          {[-50, -35, -20, -5, 10, 25, 40].map((angle, j) => {
            const rad = angle * Math.PI / 180;
            const len = 35 + (j === 3 ? 15 : 0);
            return (
              <g key={j}>
                <path d={`M0,0 Q${Math.cos(rad - 0.3) * len * 0.5},${Math.sin(rad - 0.3) * len * 0.5} ${Math.cos(rad) * len},${Math.sin(rad) * len}`}
                  stroke={`rgba(${j === 3 ? '60,100,60' : '140,80,30'},${0.25 + j * 0.02})`}
                  strokeWidth="0.9" fill="none" />
                <ellipse
                  cx={Math.cos(rad) * len} cy={Math.sin(rad) * len}
                  rx="5" ry="3"
                  transform={`rotate(${angle} ${Math.cos(rad) * len} ${Math.sin(rad) * len})`}
                  fill="rgba(80,120,60,0.15)" stroke="rgba(80,120,60,0.35)" strokeWidth="0.7"
                />
                <circle cx={Math.cos(rad) * len} cy={Math.sin(rad) * len} r="1.5" fill="rgba(196,103,58,0.4)" />
              </g>
            );
          })}
          <circle cx="0" cy="-6" r="7" fill="rgba(60,100,60,0.12)" stroke="rgba(60,100,60,0.3)" strokeWidth="0.8" />
          <circle cx="0" cy="-10" r="2" fill="rgba(196,103,58,0.3)" />
        </g>
      ))}

      {[700, 520, 320].map((y, i) => (
        <g key={y} transform={`translate(55, ${y}) rotate(${-20 + i * 10})`}>
          <path d="M0,0 Q15,-25 5,-45 Q-5,-25 0,0" fill="rgba(100,130,70,0.15)" stroke="rgba(100,130,70,0.3)" strokeWidth="0.7" />
          <line x1="0" y1="0" x2="5" y2="-45" stroke="rgba(100,130,70,0.2)" strokeWidth="0.4" />
        </g>
      ))}
    </svg>
  );
}

/* ── WATERCOLOR FOLIAGE CORNERS ── */
function FoliageCorners() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-4" style={{ zIndex: 4 }}
      viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">

      {/* Bottom-left cluster */}
      <g transform="translate(20, 820)">
        {[0, 25, 50, 15, 38].map((rot, i) => (
          <g key={i} transform={`rotate(${rot - 20})`}>
            <path d={`M0,0 Q${10 + i * 3},${-40 - i * 8} ${5 + i * 2},${-80 - i * 10} Q${-5},${-40 - i * 8} 0,0`}
              fill={`rgba(${100 + i * 5},${130 + i * 3},60,0.12)`}
              stroke={`rgba(${100 + i * 5},${130 + i * 3},60,0.2)`} strokeWidth="0.8" />
          </g>
        ))}
        <circle cx="0" cy="-30" r="3" fill="rgba(196,103,58,0.2)" />
      </g>

      {/* Bottom-right cluster */}
      <g transform="translate(1180, 820) scaleX(-1)">
        {[0, 25, 50, 15, 38].map((rot, i) => (
          <g key={i} transform={`rotate(${rot - 20})`}>
            <path d={`M0,0 Q${10 + i * 3},${-40 - i * 8} ${5 + i * 2},${-80 - i * 10} Q${-5},${-40 - i * 8} 0,0`}
              fill={`rgba(${100 + i * 5},${130 + i * 3},60,0.12)`}
              stroke={`rgba(${100 + i * 5},${130 + i * 3},60,0.2)`} strokeWidth="0.8" />
          </g>
        ))}
      </g>

      {/* Scattered small flowers */}
      {[[200, 400], [1000, 350], [600, 750], [350, 600], [850, 600]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x}, ${y})`} opacity="0.25">
          {[0, 60, 120, 180, 240, 300].map(a => {
            const rad = a * Math.PI / 180;
            return <ellipse key={a} cx={Math.cos(rad) * 7} cy={Math.sin(rad) * 7} rx="5" ry="2.5"
              transform={`rotate(${a} ${Math.cos(rad) * 7} ${Math.sin(rad) * 7})`}
              fill="rgba(196,103,58,0.3)" stroke="rgba(196,103,58,0.4)" strokeWidth="0.6" />;
          })}
          <circle cx="0" cy="0" r="2.5" fill="rgba(196,103,58,0.35)" />
        </g>
      ))}
    </svg>
  );
}
