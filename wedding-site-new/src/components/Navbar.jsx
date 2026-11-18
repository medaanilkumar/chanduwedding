import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { config } from '../config';
import { audioEngine } from '../utils/audioEngine';

const NAV_LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'Events', href: '#events' },
  { label: 'Moments', href: '#gallery' },
  { label: 'Venue', href: '#venue' },
  { label: 'Blessings', href: '#guestbook' },
  { label: 'Travel', href: '#travel' },
];

export default function Navbar({ scrollY, opened }) {
  const [open, setOpen] = useState(false);
  const visible = scrollY > 80 && opened;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            background: 'rgba(13,27,62,0.95)',
            borderBottom: '1px solid rgba(245,200,66,0.18)',
          }}
        >
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#top"
              onClick={() => audioEngine.playChime()}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontStyle: 'italic', fontWeight: 600, position: 'relative', top: '-2px', background: 'linear-gradient(160deg, #c9956c 0%, #f5e6d0 35%, #ffffff 55%, #d4a574 80%, #c9956c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>#</span><span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontStyle: 'italic', fontWeight: 600, letterSpacing: '0.04em', background: 'linear-gradient(160deg, #c9956c 0%, #f5e6d0 35%, #ffffff 55%, #d4a574 80%, #c9956c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>DC</span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => audioEngine.playChime()}
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 10,
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: 'rgba(200,180,140,0.7)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#f5c842')}
                  onMouseLeave={(e) => (e.target.style.color = 'rgba(200,180,140,0.7)')}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => {
                audioEngine.playChime();
                setOpen(!open);
              }}
              className="md:hidden flex flex-col gap-1.5 p-3 min-w-[44px] min-h-[44px] items-center justify-center"
              aria-label="Menu"
            >
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  borderRadius: 2,
                  background: '#c9a84c',
                  transition: 'all 0.3s',
                  transform: open ? 'rotate(45deg) translateY(6px)' : 'none',
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  borderRadius: 2,
                  background: '#c9a84c',
                  transition: 'all 0.3s',
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  borderRadius: 2,
                  background: '#c9a84c',
                  transition: 'all 0.3s',
                  transform: open ? 'rotate(-45deg) translateY(-6px)' : 'none',
                }}
              />
            </button>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  overflow: 'hidden',
                  borderTop: '1px solid rgba(245,200,66,0.15)',
                  background: 'rgba(13,27,62,0.98)',
                }}
              >
                <div className="flex flex-col py-4 px-6 gap-4">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        audioEngine.playChime();
                        setOpen(false);
                      }}
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: 11,
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'rgba(200,180,140,0.8)',
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
