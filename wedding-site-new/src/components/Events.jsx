import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Shirt, ChevronRight, Check } from 'lucide-react';
import { SectionTitle } from '../utils/animations';
import { config } from '../config';
import { audioEngine } from '../utils/audioEngine';

function formatEventCalUrl(event) {
  const start = new Date(event.dateTimeIso);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000); // 4 hrs duration
  const iso = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const title = `${event.name} · ${config.groom} & ${config.bride} Wedding`;
  const details = `${event.subTitle}\n${event.desc}\n\nDress Code: ${event.dressCode}`;
  const loc = `${event.venue}, ${config.venueName}, ${config.venueAddress}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${iso(start)}/${iso(end)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
    loc
  )}`;
}

function MiniCountdown({ targetIso }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetIso) - new Date();
      if (diff <= 0) {
        setTimeLeft('Happening now / Concluded');
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      setTimeLeft(`${days}d ${hours}h left`);
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [targetIso]);

  return (
    <span className="text-[10px] font-mono tracking-wider text-gold bg-gold/15 px-2 py-0.5 rounded-full border border-gold/30">
      ⏳ {timeLeft}
    </span>
  );
}

export default function Events() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [flippedIdx, setFlippedIdx] = useState(null);

  const selectedEvent = config.events[selectedIdx];

  const handleCardClick = (i) => {
    audioEngine.playChime();
    setSelectedIdx(i);
    setFlippedIdx(prev => prev === i ? null : i);
  };

  return (
    <section
      id="events"
      className="relative py-16 sm:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1b3e 0%, #111830 50%, #0d1b3e 100%)' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,100vw)] h-[min(700px,100vw)] rounded-full pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.3) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle sub="Sacred Rituals & Celebrations">The Celebrations</SectionTitle>

        <p className="text-center max-w-xl mx-auto -mt-6 mb-10 text-sm sm:text-base italic text-ink/70"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          "Each ceremony carries ancestral blessings, joyous laughter, and timeless traditions weaving two lineages into one."
        </p>

        {/* ── BIG FLIP CARDS ON TOP ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10" style={{ perspective: '1200px' }}>
          {config.events.map((ev, i) => {
            const isFlipped = flippedIdx === i;
            return (
              <div
                key={ev.name}
                onClick={() => handleCardClick(i)}
                className="cursor-pointer"
                style={{ perspective: '800px', height: 'clamp(140px, 25vw, 180px)' }}
              >
                <div style={{
                  position: 'relative', width: '100%', height: '100%',
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                  transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                  {/* FRONT */}
                  <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
                    className={`rounded-2xl border flex flex-col items-center justify-center gap-2 p-4 transition-all ${
                      selectedIdx === i ? 'border-gold bg-gold/15 shadow-gold' : 'card-peach border-gold/25'
                    }`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                      style={{ background: `linear-gradient(90deg, ${ev.palette.join(', ')})` }}
                    />
                    <span className="text-4xl">{ev.icon}</span>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      className="text-lg font-bold text-gold text-center leading-tight">
                      {ev.name}
                    </p>
                    <p className="text-[10px] font-mono text-muted">{ev.date}</p>
                    <p className="text-[9px] text-gold/50 font-mono mt-1">tap to reveal ↓</p>
                  </div>
                  {/* BACK — minimal, details are shown below */}
                  <div
                    className="rounded-2xl flex flex-col items-center justify-center gap-2 p-4"
                    style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: `linear-gradient(135deg, ${ev.palette[0]}22, ${ev.palette[1]}33)`, border: `1px solid ${ev.palette[0]}66` }}
                  >
                    <span className="text-4xl">{ev.icon}</span>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-sm font-semibold text-gold/90 text-center">{ev.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── DETAILED CARD BELOW (switches on tab click) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedEvent.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="card-peach p-6 sm:p-10 rounded-3xl border border-gold/40 shadow-2xl relative overflow-hidden"
            style={{ background: 'rgba(12, 22, 50, 0.94)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-1.5"
              style={{ background: `linear-gradient(90deg, ${selectedEvent.palette.join(', ')})` }}
            />

            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl sm:text-4xl">{selectedEvent.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      className="text-3xl sm:text-4xl font-bold text-gold">
                      {selectedEvent.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono tracking-widest text-gold/80 uppercase">
                      {selectedEvent.subTitle}
                    </p>
                  </div>
                </div>

                <div className="my-4 p-3 rounded-xl bg-gold/10 border-l-2 border-gold flex items-center gap-2 text-xs font-serif italic text-gold-l">
                  <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{selectedEvent.tagline}</span>
                </div>

                <p style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  className="text-base sm:text-lg text-ink/90 leading-relaxed mb-6">
                  {selectedEvent.desc}
                </p>

                {/* Dress Code — only for Haldi */}
                {selectedEvent.name === 'Haldi' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/25 border border-gold/20 mb-6">
                    <div className="flex items-center gap-2 mb-2 text-xs uppercase font-mono tracking-wider text-gold">
                      <Shirt className="w-4 h-4" />
                      Dress Inspiration & Palette
                    </div>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      className="text-base text-ink mb-3 font-medium">
                      {selectedEvent.dressCode}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted font-mono">Palette:</span>
                      <div className="flex items-center gap-2">
                        {selectedEvent.palette.map((color, cIdx) => (
                          <div key={cIdx}
                            className="w-6 h-6 rounded-full border border-white/30 shadow-md transform hover:scale-125 transition-transform cursor-pointer"
                            style={{ backgroundColor: color }} title={`Hex: ${color}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full lg:w-80 flex flex-col gap-4 p-6 rounded-2xl bg-black/35 border border-gold/25 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-muted tracking-widest">Schedule</span>
                  <MiniCountdown targetIso={selectedEvent.dateTimeIso} />
                </div>

                <div className="space-y-3 my-2">
                  <div className="flex items-center gap-3 text-ink/90">
                    <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                    <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-lg font-medium text-gold">
                      {selectedEvent.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-ink/90">
                    <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                    <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-lg font-medium">
                      {selectedEvent.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-ink/90">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                    <span style={{ fontFamily: 'Cormorant Garamond, serif' }} className="text-base text-ink/80">
                      {selectedEvent.venue}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-gold/15 my-1" />

                <a href={formatEventCalUrl(selectedEvent)} target="_blank" rel="noopener noreferrer"
                  className="btn-gold w-full text-xs py-3 flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Add to Calendar
                </a>
                <a href="https://www.google.com/maps/place/Sri+Venkateswara+Kalyana+Mandapam/@16.2372829,79.9799513,13z/data=!4m10!1m2!2m1!1sSri+venkateswara+kalyana+mandapam+pattabi+ramaswamy+temple+nrt+maps!3m6!1s0x3a4a811dbe3d24eb:0x79e6bfb0c4d736aa!8m2!3d16.2372829!4d80.0520491"
                  target="_blank" rel="noopener noreferrer"
                  className="btn-outline w-full text-xs py-2.5 flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Hall Directions
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
