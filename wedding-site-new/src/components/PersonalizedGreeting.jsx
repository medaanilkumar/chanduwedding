import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Edit3, Check, Heart } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function PersonalizedGreeting() {
  const [guestName, setGuestName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('wedding_guest_name') || '';
    if (saved) {
      setGuestName(saved);
      setTempName(saved);
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const trimmed = tempName.trim();
    if (!trimmed) return;
    audioEngine.playSparkle();
    setGuestName(trimmed);
    localStorage.setItem('wedding_guest_name', trimmed);
    setIsEditing(false);
    window.dispatchEvent(new CustomEvent('guest-name-updated', { detail: trimmed }));
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 mt-4 mb-2 z-20 relative">
      <AnimatePresence mode="wait">
        {!guestName || isEditing ? (
          <motion.form
            key="input-form"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSave}
            className="card-peach p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3 border border-gold/30 shadow-lg"
            style={{ background: 'rgba(15, 27, 60, 0.9)' }}
          >
            <div className="flex items-center gap-2 text-gold">
              <Crown className="w-5 h-5 flex-shrink-0 animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-mono text-gold-l whitespace-nowrap">
                VIP Guest:
              </span>
            </div>
            <input
              type="text"
              placeholder="Enter your name / family name..."
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="flex-1 w-full bg-black/20 border border-gold/30 rounded-xl px-3 py-1.5 text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:border-gold"
              autoFocus={isEditing}
            />
            <button
              type="submit"
              className="btn-gold py-1.5 px-5 text-[10px] w-full sm:w-auto tracking-widest flex items-center justify-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Personalize
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="display-banner"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-peach p-3 sm:px-6 sm:py-3 rounded-full flex items-center justify-between gap-3 border border-gold/40 shadow-xl backdrop-blur-md"
            style={{
              background: 'linear-gradient(90deg, rgba(15,27,60,0.92), rgba(25,40,85,0.92), rgba(15,27,60,0.92))',
            }}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="text-base">👑</span>
              <div className="truncate">
                <span className="text-[10px] uppercase tracking-widest text-gold/80 font-mono block">
                  Honored Royal Guest
                </span>
                <span
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  className="text-base sm:text-lg text-gold font-medium truncate italic"
                >
                  Warmest Welcome, <span className="font-semibold text-ink underline decoration-gold/50">{guestName}</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                audioEngine.playChime();
                setIsEditing(true);
              }}
              className="p-1.5 rounded-full hover:bg-gold/15 text-gold/70 hover:text-gold transition-colors flex-shrink-0"
              title="Edit Guest Name"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
