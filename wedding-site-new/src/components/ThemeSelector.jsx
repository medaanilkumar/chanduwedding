import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Check } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const THEMES = [
  {
    id: 'midnight',
    name: 'Midnight Royale',
    sub: 'Obsidian & Gold',
    badge: '👑',
    preview: 'linear-gradient(135deg, #0d1b3e, #f5c842)',
    accent: '#f5c842',
  },
  {
    id: 'emerald',
    name: 'Imperial Emerald',
    sub: 'Velvet Jade & Champagne',
    badge: '🌿',
    preview: 'linear-gradient(135deg, #062319, #f3d078)',
    accent: '#55e6a5',
  },
  {
    id: 'crimson',
    name: 'Crimson Palace',
    sub: 'Maharaja Ruby & Rose Gold',
    badge: '🍷',
    preview: 'linear-gradient(135deg, #2a0812, #f4cf98)',
    accent: '#ff7675',
  },
];

export default function ThemeSelector({ opened }) {
  const [activeTheme, setActiveTheme] = useState('midnight');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_theme') || 'midnight';
    setActiveTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const selectTheme = (themeId) => {
    audioEngine.playChime();
    setActiveTheme(themeId);
    localStorage.setItem('wedding_theme', themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    setMenuOpen(false);

    // Subtle celebration particle pop
    if (window.confetti) {
      const colors =
        themeId === 'emerald'
          ? ['#2ecc71', '#f3d078', '#1abc9c']
          : themeId === 'crimson'
          ? ['#e84393', '#fdcb6e', '#d63031']
          : ['#f5c842', '#ffe080', '#c8a96e'];
      window.confetti({
        particleCount: 25,
        spread: 45,
        origin: { x: 0.9, y: 0.15 },
        colors,
      });
    }
  };

  if (!opened) return null;

  const current = THEMES.find((t) => t.id === activeTheme) || THEMES[0];

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-40 select-none">
      <div className="relative">
        {/* Toggle Pill */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            audioEngine.playChime();
            setMenuOpen(!menuOpen);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full card-peach text-xs border border-gold/40 shadow-lg backdrop-blur-xl"
          style={{ background: 'rgba(12, 22, 50, 0.88)' }}
          title="Change Royal Wedding Theme"
          aria-expanded={menuOpen}
        >
          <span className="text-sm">{current.badge}</span>
          <span
            style={{ fontFamily: 'Montserrat, sans-serif' }}
            className="text-[10px] tracking-wider uppercase text-gold font-medium hidden sm:inline"
          >
            {current.name}
          </span>
          <Crown className="w-3 h-3 text-gold/80" />
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl border border-gold/40 card-peach z-50"
              style={{ background: 'rgba(9, 18, 42, 0.95)' }}
            >
              <div className="px-3 py-2 border-b border-gold/15 mb-1.5">
                <span className="text-[10px] uppercase tracking-widest text-gold/70 font-mono block">
                  Select Royal Theme
                </span>
                <span className="text-xs text-ink/80 italic font-serif">
                  Curated Imperial Ambiances
                </span>
              </div>

              <div className="flex flex-col gap-1">
                {THEMES.map((theme) => {
                  const isSelected = activeTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => selectTheme(theme.id)}
                      className={`flex items-center justify-between p-2 rounded-xl text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-gold/15 border border-gold/50 shadow-inner'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-5 h-5 rounded-full shadow-inner border border-gold/40 flex items-center justify-center text-[10px]"
                          style={{ background: theme.preview }}
                        >
                          {theme.badge}
                        </div>
                        <div>
                          <div
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                            className="text-xs font-medium text-ink"
                          >
                            {theme.name}
                          </div>
                          <div className="text-[9px] text-muted tracking-tight">
                            {theme.sub}
                          </div>
                        </div>
                      </div>

                      {isSelected && <Check className="w-4 h-4 text-gold ml-2" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
