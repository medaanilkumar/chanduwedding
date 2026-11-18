import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const RECEPTION_MESSAGE = `💍 *Deepu & Chandu — Reception Invitation* 💍

You are cordially invited to celebrate the grand reception of

*Deepu weds Chandu* ✨
_#DC_

📅 *Date:* Saturday, 28 November 2026
⏰ *Time:* 11:30 AM onwards
📍 *Venue:* Sri Venkateswara Kalyana Mandapam, Pattabi Ramaswami Temple, NRT

🗺 *Directions:* https://www.google.com/maps/place/Sri+Venkateswara+Kalyana+Mandapam/@16.2372829,80.0520491,17z

Your presence and blessings will make this day truly special! 🙏

_— Pabbisetty's & Chevuri's_`;

export default function WhatsAppReminder() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(RECEPTION_MESSAGE)}`, '_blank');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[1000]"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVisible(false)}
          />

          {/* Popup */}
          <motion.div
            className="fixed z-[1001] left-1/2"
            style={{ top: '50%', transform: 'translate(-50%, -50%)', width: 'min(380px, 92vw)' }}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0d1b3e 60%, #111830 100%)', border: '1px solid rgba(245,200,66,0.3)' }}
            >
              {/* Gold top bar */}
              <div className="h-1.5" style={{ background: 'linear-gradient(90deg, #f5c842, #e8a820, #f5c842)' }} />

              {/* Close button */}
              <button
                onClick={() => setVisible(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(245,200,66,0.2)' }}
              >
                <X className="w-3.5 h-3.5 text-gold/60" />
              </button>

              <div className="p-6 pt-5">
                {/* Couple names */}
                <div className="text-center mb-5">
                  <p className="text-[10px] uppercase font-mono tracking-widest text-gold/60 mb-1">You are cordially invited</p>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(22px,6vw,28px)', fontStyle: 'italic', fontWeight: 600, color: '#f5c842', lineHeight: 1.2 }}>
                    Deepu &amp; Chandu
                  </h2>
                  <p className="text-[10px] font-mono text-gold/50 tracking-widest mt-0.5">#DC RECEPTION</p>
                </div>

                {/* Details card */}
                <div className="rounded-2xl p-4 mb-5 space-y-2.5"
                  style={{ background: 'rgba(245,200,66,0.05)', border: '1px solid rgba(245,200,66,0.15)' }}>
                  <div className="flex items-start gap-2.5 text-xs text-ink/80 font-mono">
                    <span className="text-base">📅</span>
                    <span>Saturday, <strong className="text-gold">28 November 2026</strong> · 11:30 AM</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-ink/70 font-mono">
                    <span className="text-base">📍</span>
                    <span>Sri Venkateswara Kalyana Mandapam, Pattabi Ramaswami Temple, NRT</span>
                  </div>
                </div>

                {/* WhatsApp button */}
                <motion.button
                  onClick={handleWhatsApp}
                  whileTap={{ scale: 0.96 }}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 text-white font-semibold text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
                    boxShadow: '0 6px 24px rgba(37,211,102,0.4)',
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '0.04em',
                  }}
                >
                  {/* WhatsApp icon */}
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Tap to Get Invitation on WhatsApp
                </motion.button>

                <p className="text-center text-[10px] text-muted font-mono mt-3 leading-relaxed">
                  Opens WhatsApp with the full invitation.<br/>Save it or share with family!
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
