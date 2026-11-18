import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Check, Share2, Download, QrCode, Phone, Mail, User, Users, Calendar, MapPin } from 'lucide-react';
import { SectionTitle } from '../utils/animations';
import { config } from '../config';
import { audioEngine } from '../utils/audioEngine';

const ATTENDING_OPTIONS = ["Yes, I'll be there in person! 🎉", 'Attending virtually 💻', "Sadly can't make it 😢"];
const MEAL_OPTIONS = ['Vegetarian 🌿', 'Non-Vegetarian 🍗', 'Vegan 🌱', 'Jain 🙏'];

export default function RSVP() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    attending: ATTENDING_OPTIONS[0],
    meal: MEAL_OPTIONS[0],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passNumber, setPassNumber] = useState('');

  // Auto-fill from guest name if stored
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

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.attending) e.attending = 'Please select attendance status';
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setLoading(true);

    const generatedPass = `ROYAL-${Math.floor(1000 + Math.random() * 9000)}-${config.groom[0]}${config.bride[0]}`;
    setPassNumber(generatedPass);

    const msg =
      `💍 *ROYAL RSVP — ${config.groom} & ${config.bride} Wedding*\n\n` +
      `🎫 *VIP Pass:* ${generatedPass}\n` +
      `👤 *Name:* ${form.name}\n` +
      `📧 *Email:* ${form.email || 'Not provided'}\n` +
      `📱 *Phone:* ${form.phone || 'Not provided'}\n` +
      `👥 *Guests Attending:* ${form.guests}\n` +
      `✅ *Attendance Status:* ${form.attending}\n` +
      `🍽️ *Meal Choice:* ${form.meal || 'Not specified'}\n` +
      `💬 *Blessing / Message:* ${form.message || 'Heartiest congratulations!'}`;

    setTimeout(() => {
      audioEngine.playSparkle();
      if (window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#f5c842', '#ffe080', '#c8a96e', '#ff7675'],
        });
      }
      setLoading(false);
      setSubmitted(true);
      window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    }, 800);
  }

  function setField(field) {
    return (val) => {
      setForm((f) => ({ ...f, [field]: val }));
      setErrors((e) => ({ ...e, [field]: undefined }));
    };
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      id="rsvp"
      className="relative py-16 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0d1b3e 0%, #111830 40%, #0f1e48 70%, #0d1b3e 100%)',
      }}
    >
      {/* Center radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(245,200,66,0.25) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle sub={`Kindly respond by ${config.rsvpDeadline}`}>Royal RSVP</SectionTitle>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="card-peach p-6 sm:p-10 rounded-3xl border border-gold/40 shadow-2xl flex flex-col gap-6"
              style={{ background: 'rgba(12, 22, 50, 0.94)' }}
            >
              <div className="text-center pb-3 border-b border-gold/15">
                <span className="text-xs uppercase font-mono tracking-widest text-gold block mb-1">
                  Imperial Invitation
                </span>
                <p
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  className="text-base text-ink/80 italic"
                >
                  We are deeply honored to have you celebrate our sacred union.
                </p>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-mono tracking-widest text-gold/80 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gold" />
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anand & Sunita Mehta"
                  value={form.name}
                  onChange={(e) => setField('name')(e.target.value)}
                  className="form-input text-base"
                />
                {errors.name && <p className="text-xs text-rose-400 font-mono">{errors.name}</p>}
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-mono tracking-widest text-gold/80 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setField('email')(e.target.value)}
                    className="form-input text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase font-mono tracking-widest text-gold/80 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gold" />
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setField('phone')(e.target.value)}
                    className="form-input text-sm"
                  />
                </div>
              </div>

              {/* Number of guests */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-mono tracking-widest text-gold/80 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gold" />
                  Number of Attendees
                </label>
                <div className="flex items-center gap-3 flex-wrap">
                  {['1', '2', '3', '4', '5+'].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setField('guests')(n)}
                      className={`w-11 h-11 rounded-2xl border font-sans text-sm font-medium transition-all duration-200 ${
                        form.guests === n
                          ? 'border-gold bg-gold/20 text-gold shadow-md scale-105'
                          : 'border-gold/30 text-ink/60 hover:border-gold/60'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attendance */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-mono tracking-widest text-gold/80">
                  Will You Attend? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {ATTENDING_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setField('attending')(opt)}
                      className={`px-3 py-3 rounded-xl border text-xs sm:text-sm font-medium text-center transition-all ${
                        form.attending === opt
                          ? 'border-gold bg-gold/20 text-gold shadow-md'
                          : 'border-gold/25 text-ink/70 hover:border-gold/50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Meal preference */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-mono tracking-widest text-gold/80">
                  Culinary Preference
                </label>
                <div className="flex flex-wrap gap-2">
                  {MEAL_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setField('meal')(opt)}
                      className={`px-4 py-2 rounded-full border text-xs font-sans transition-all ${
                        form.meal === opt
                          ? 'border-gold bg-gold/20 text-gold font-medium'
                          : 'border-gold/25 text-ink/70 hover:border-gold/50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase font-mono tracking-widest text-gold/80">
                  Warm Note or Dietary Allergies
                </label>
                <textarea
                  placeholder="Share a sweet memory, dietary notes, or travel plans..."
                  value={form.message}
                  onChange={(e) => setField('message')(e.target.value)}
                  rows={3}
                  className="form-input text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold justify-center text-sm py-4 mt-2 disabled:opacity-50"
              >
                {loading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block"
                  >
                    ⏳
                  </motion.span>
                ) : (
                  'Confirm RSVP & Issue VIP Royal Pass 💌'
                )}
              </button>
            </motion.form>
          ) : (
            /* ── BREATHTAKING ROYAL VIP PASS ── */
            <motion.div
              key="vip-pass"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="card-peach p-6 sm:p-10 rounded-3xl border-2 border-gold shadow-2xl relative overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(245,200,66,0.2) 0%, rgba(12,22,50,0.98) 75%)',
                boxShadow: '0 0 50px rgba(245,200,66,0.3)',
              }}
            >
              {/* Gold foil metallic seal corner */}
              <div className="flex items-center justify-between pb-6 border-b border-gold/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center text-2xl text-gold">
                    👑
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold block">
                      Royal Matrimony · VIP Guest Pass
                    </span>
                    <h3
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      className="text-2xl sm:text-3xl font-bold text-gold"
                    >
                      {config.groom} & {config.bride}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono bg-gold/20 text-gold-l px-3 py-1 rounded-full border border-gold/40">
                  {passNumber}
                </span>
              </div>

              {/* Pass details */}
              <div className="my-6 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted block">
                    Honored Guest
                  </span>
                  <p
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    className="text-2xl sm:text-3xl font-bold text-ink"
                  >
                    {form.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gold/20 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">Attendees</span>
                    <span className="text-sm font-semibold text-gold">{form.guests} Guests</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">Status</span>
                    <span className="text-sm font-semibold text-emerald-400">Confirmed ✅</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">Catering</span>
                    <span className="text-sm font-semibold text-ink/90">{form.meal}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase block">Reserved Hall</span>
                    <span className="text-sm font-semibold text-gold">Grand Ballroom</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/30 border border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-left w-full sm:w-auto">
                    <div className="flex items-center gap-2 text-xs text-gold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Wednesday, 25 November 2026 · 8:36 AM</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-ink/80">
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      <span>{config.venueName}, {config.venueAddress}</span>
                    </div>
                  </div>

                  {/* Stylized QR Code Graphic */}
                  <div className="w-20 h-20 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-black">
                      <rect x="10" y="10" width="30" height="30" rx="4" />
                      <rect x="16" y="16" width="18" height="18" fill="white" />
                      <rect x="20" y="20" width="10" height="10" />
                      <rect x="60" y="10" width="30" height="30" rx="4" />
                      <rect x="66" y="16" width="18" height="18" fill="white" />
                      <rect x="70" y="20" width="10" height="10" />
                      <rect x="10" y="60" width="30" height="30" rx="4" />
                      <rect x="16" y="66" width="18" height="18" fill="white" />
                      <rect x="20" y="70" width="10" height="10" />
                      <rect x="46" y="46" width="12" height="12" rx="2" />
                      <rect x="60" y="60" width="14" height="14" rx="2" />
                      <rect x="78" y="78" width="12" height="12" rx="2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pass Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gold/30">
                <button
                  onClick={handlePrint}
                  className="btn-gold flex-1 py-3 text-xs flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Print / Save Pass
                </button>

                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline flex-1 py-3 text-xs flex items-center justify-center"
                >
                  Submit Another RSVP
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
