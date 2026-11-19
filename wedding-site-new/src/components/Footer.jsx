import { motion } from 'framer-motion';
import { config } from '../config';

const NAV_LINKS = [
  { label: 'Events', href: '#events' },
  { label: 'Venue',  href: '#venue' },
];

export default function Footer() {
  const D = new Date(config.date);
  const R = new Date(config.receptionDate);
  return (
    <footer className="relative pt-16 sm:pt-28 pb-12 overflow-hidden text-center"
      style={{ background: 'linear-gradient(180deg, #0d1b3e 0%, #111830 40%, #0f1520 100%)' }}>

      {/* Top divider */}
      <div className="divider mb-16 mx-auto max-w-lg" />

      {/* Corner botanical accents */}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none opacity-25" viewBox="0 0 800 120" preserveAspectRatio="none">
        <path d="M0 120C100 60 200 90 300 50C400 90 500 40 600 70C700 100 750 55 800 75V120H0Z" fill="rgba(245,200,66,0.12)" />
        <path d="M0 120C80 80 180 100 280 70C380 100 480 55 580 80C680 105 740 70 800 85V120H0Z" fill="rgba(245,200,66,0.06)" />
      </svg>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="section-label mb-6">With love</p>

          <div className="script-name leading-none mb-2"
            style={{ fontSize: 'clamp(36px, 12vw, 96px)' }}>
            {config.groom}
          </div>
          <div style={{ fontFamily: 'Great Vibes, cursive', fontSize: 'clamp(28px,7vw,42px)', color: 'rgba(245,200,66,0.6)', marginBottom: 4 }}>&amp;</div>
          <div className="script-name leading-none"
            style={{ fontSize: 'clamp(36px, 12vw, 96px)' }}>
            {config.bride}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(14px,4vw,19px)', fontStyle: 'italic', color: 'rgba(200,180,140,0.75)', lineHeight: 1.6, marginTop: 24, marginBottom: 0 }}
        >
          "We can't wait to celebrate the beginning of our forever with you."
        </motion.p>

        {/* Date pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="card-peach inline-block px-8 py-5 mt-8"
        >
          <p className="section-label text-center mb-2">Reception</p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#e8d8b0' }}>
            {R.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(245,200,66,0.7)', marginTop: 4 }}>
            11:30 AM · {config.receptionVenueName}
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(200,180,140,0.6)', marginTop: 2 }}>
            {config.receptionVenueAddress}
          </p>
        </motion.div>


        {/* Nav links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 1 }}
          className="flex items-center justify-center gap-6 mt-12 flex-wrap"
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(200,180,140,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#f5c842'}
              onMouseLeave={e => e.target.style.color = 'rgba(200,180,140,0.45)'}
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="divider mt-10 mb-6" />

        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(200,180,140,0.35)' }}>
          Made with ❤️ for {config.groom} &amp; {config.bride} · {D.getFullYear()}
        </p>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: 'rgba(200,180,140,0.35)', marginTop: 6 }}>
          Designed by Meda Anil Kumar · 9493925464
        </p>
      </div>
    </footer>
  );
}
