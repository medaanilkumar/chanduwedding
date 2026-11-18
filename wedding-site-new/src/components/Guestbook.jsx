import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Heart, Send, Sparkles, MessageSquareHeart } from 'lucide-react';
import { SectionTitle } from '../utils/animations';
import { config } from '../config';
import { audioEngine } from '../utils/audioEngine';

const BLESSING_TAGS = [
  'Eternal Bliss 💖',
  'Endless Joy ✨',
  'Prosperity & Peace 🕊️',
  'A Million Smiles 🥂',
];

export default function Guestbook() {
  const [diyasLit, setDiyasLit] = useState(1248);
  const [hasLitDiya, setHasLitDiya] = useState(false);
  const [blessings, setBlessings] = useState(() => {
    const saved = localStorage.getItem('wedding_blessings');
    return saved ? JSON.parse(saved) : config.initialBlessings;
  });

  const [form, setForm] = useState({
    name: '',
    relation: '',
    message: '',
    tag: BLESSING_TAGS[0],
  });
  const [submitted, setSubmitted] = useState(false);

  // Auto-fill guest name if stored from VIP greeting
  useEffect(() => {
    const savedName = localStorage.getItem('wedding_guest_name');
    if (savedName) {
      setForm((prev) => ({ ...prev, name: savedName }));
    }
    const handler = (e) => {
      if (e.detail) setForm((prev) => ({ ...prev, name: e.detail }));
    };
    window.addEventListener('guest-name-updated', handler);
    return () => window.removeEventListener('guest-name-updated', handler);
  }, []);

  const handleLightDiya = () => {
    if (hasLitDiya) return;
    audioEngine.playDiyaFlame();
    setHasLitDiya(true);
    setDiyasLit((n) => n + 1);

    if (window.confetti) {
      window.confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#f5c842', '#ff7675', '#ffa502', '#ffffff'],
      });
    }
  };

  const handleAddBlessing = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    audioEngine.playSparkle();
    const newBlessing = {
      name: form.name.trim(),
      relation: form.relation.trim() || 'Well-wisher',
      message: form.message.trim(),
      tag: form.tag,
      date: 'Just now',
      petals: 1,
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    localStorage.setItem('wedding_blessings', JSON.stringify(updated));
    setSubmitted(true);
    setForm((prev) => ({ ...prev, message: '' }));
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleSendPetals = (idx) => {
    audioEngine.playChime();
    setBlessings((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], petals: copy[idx].petals + 1 };
      localStorage.setItem('wedding_blessings', JSON.stringify(copy));
      return copy;
    });
  };

  return (
    <section
      id="guestbook"
      className="relative py-16 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0d1b3e 0%, #111830 50%, #0d1b3e 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle sub="Sacred Prayers & Wishes">Blessings & Diya Wall</SectionTitle>

        {/* ── SACRED DIYA INTERACTIVE WIDGET ── */}
        <div className="card-peach p-6 sm:p-10 rounded-3xl border border-gold/40 shadow-2xl text-center max-w-xl mx-auto mb-16 relative overflow-hidden">
          <div className="relative inline-block mb-3">
            {/* Glowing flame */}
            <motion.div
              animate={
                hasLitDiya
                  ? {
                      scale: [1, 1.25, 0.95, 1.2, 1],
                      filter: [
                        'drop-shadow(0 0 15px rgba(255,180,40,0.8))',
                        'drop-shadow(0 0 35px rgba(255,220,100,1))',
                        'drop-shadow(0 0 15px rgba(255,180,40,0.8))',
                      ],
                    }
                  : { scale: 1 }
              }
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-6xl cursor-pointer select-none"
              onClick={handleLightDiya}
            >
              {hasLitDiya ? '🪔' : '🕯️'}
            </motion.div>
          </div>

          <h3
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            className="text-2xl sm:text-3xl font-bold text-gold mb-2"
          >
            {hasLitDiya ? 'Your Sacred Flame is Glowing!' : 'Light a Diya for Aarav & Meera'}
          </h3>

          <p
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            className="text-base text-ink/80 italic mb-6 max-w-md mx-auto"
          >
            In Indian tradition, lighting a brass lamp invites divine light, prosperity, and removes all darkness on the couple's lifelong journey.
          </p>

          <button
            onClick={handleLightDiya}
            disabled={hasLitDiya}
            className={`btn-gold py-3 px-8 text-xs tracking-widest uppercase flex items-center justify-center gap-2 mx-auto ${
              hasLitDiya ? 'opacity-90' : ''
            }`}
          >
            <Flame className="w-4 h-4 fill-current" />
            {hasLitDiya ? 'Diya Lighted with Love' : 'Click to Light Sacred Diya'}
          </button>

          <div className="mt-4 text-xs font-mono text-gold/70">
            ✨ <span className="text-gold font-bold">{diyasLit.toLocaleString()}</span> Diyas lit across the world
          </div>
        </div>

        {/* ── GUESTBOOK FORM & BLESSINGS WALL ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Write a Blessing Form */}
          <div className="lg:col-span-5 card-peach p-6 sm:p-8 rounded-3xl border border-gold/30 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-gold">
              <MessageSquareHeart className="w-5 h-5" />
              <h4
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                className="text-2xl font-bold"
              >
                Pen Your Blessings
              </h4>
            </div>

            <form onSubmit={handleAddBlessing} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-gold/70 block mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh & Neha"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-input text-sm py-2.5"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-gold/70 block mb-1">
                  Relation / Connection
                </label>
                <input
                  type="text"
                  placeholder="e.g. School Friend / Groom's Cousin"
                  value={form.relation}
                  onChange={(e) => setForm({ ...form, relation: e.target.value })}
                  className="form-input text-sm py-2.5"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-gold/70 block mb-1">
                  Select Blessing Badge
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {BLESSING_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setForm({ ...form, tag })}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-sans border transition-all ${
                        form.tag === tag
                          ? 'bg-gold/20 border-gold text-gold font-medium'
                          : 'card-peach text-ink/70 border-gold/20'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-gold/70 block mb-1">
                  Your Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Write your wishes for the happy couple..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="form-input text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn-gold w-full py-3 text-xs tracking-widest flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post on Blessings Wall
              </button>

              {submitted && (
                <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500 text-emerald-200 text-xs text-center font-serif">
                  ✨ Blessing posted! Thank you for showering your love.
                </div>
              )}
            </form>
          </div>

          {/* Wall of Blessings Cards */}
          <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {blessings.map((bless, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-peach p-5 rounded-2xl border border-gold/25 shadow-md hover:border-gold/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h5
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      className="text-xl font-bold text-gold"
                    >
                      {bless.name}
                    </h5>
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                      {bless.relation} · {bless.date}
                    </span>
                  </div>

                  <span className="text-[11px] font-sans bg-gold/15 text-gold-l px-2.5 py-0.5 rounded-full border border-gold/30 whitespace-nowrap">
                    {bless.tag}
                  </span>
                </div>

                <p
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  className="text-base text-ink/90 italic leading-relaxed my-2"
                >
                  "{bless.message}"
                </p>

                <div className="flex items-center justify-end pt-2 border-t border-gold/15">
                  <button
                    onClick={() => handleSendPetals(i)}
                    className="flex items-center gap-1.5 text-xs text-terracotta hover:scale-105 transition-transform"
                    title="Shower rose petals"
                  >
                    <span>🌹</span>
                    <span className="font-mono text-ink/80">{bless.petals} Petals</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
