import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: 28,
            right: 20,
            zIndex: 999,
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: '1px solid rgba(245,200,66,0.5)',
            background: 'rgba(13,27,62,0.92)',
            backdropFilter: 'blur(10px)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4), 0 0 12px rgba(245,200,66,0.15)',
          }}
          whileHover={{ scale: 1.12, boxShadow: '0 4px 24px rgba(245,200,66,0.35)' }}
          whileTap={{ scale: 0.93 }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 14 L9 4" stroke="#f5c842" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M4.5 8.5 L9 4 L13.5 8.5" stroke="#f5c842" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
