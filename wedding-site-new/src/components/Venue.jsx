import { motion } from 'framer-motion';
import { MapPin, Sun, Navigation, ExternalLink, Compass } from 'lucide-react';
import { SectionTitle } from '../utils/animations';
import { config } from '../config';
import { audioEngine } from '../utils/audioEngine';

export default function Venue() {
  const uberUrl = `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=${encodeURIComponent(
    'Sri Venkateswara Kalyana Mandapam, Pattabi Ramaswami Temple, Narasaraopet'
  )}&dropoff[latitude]=16.2372829&dropoff[longitude]=80.0520491`;

  return (
    <section
      id="venue"
      className="relative py-16 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0d1b3e 0%, #111830 40%, #0f1e48 70%, #0d1b3e 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle sub="Where We Celebrate">Venue & Travel Guide</SectionTitle>

        <p
          className="text-center max-w-xl mx-auto -mt-6 mb-12 text-sm sm:text-base italic text-ink/70"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          "Join us at Sri Venkateswara Kalyana Mandapam, Pattabi Ramaswami Temple, NRT for the grand reception of Deepu &amp; Chandu."
        </p>

        {/* Venue Info + Live Weather Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left: Venue details */}
          <div className="lg:col-span-7 card-peach p-6 sm:p-10 rounded-3xl border border-gold/40 shadow-2xl space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold block mb-1">
                  Reception Venue
                </span>
                <h3
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                  className="text-3xl sm:text-4xl font-bold text-gold"
                >
                  {config.venueName}
                </h3>
                <p className="text-xs sm:text-sm text-ink/80 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                  {config.venueAddress}
                </p>
              </div>

              <div className="text-4xl p-3 rounded-2xl bg-gold/15 border border-gold/30">
                🏛️
              </div>
            </div>

            {/* Weather widget */}
            <div className="p-4 rounded-2xl bg-black/30 border border-gold/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sun className="w-6 h-6 text-gold animate-spin-slow" />
                <div>
                  <span className="text-[10px] font-mono uppercase text-muted block">
                    Expected Weather · NRT (Nov)
                  </span>
                  <span className="text-sm font-semibold text-gold-l">
                    26°C / 79°F · Pleasant Evening Breeze
                  </span>
                </div>
              </div>
              <span className="text-xs text-muted font-mono hidden sm:inline">Clear Skies</span>
            </div>

            {/* Quick Details List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-black/20 border border-gold/15">
                <span className="text-[10px] font-mono text-gold/70 block uppercase">Date</span>
                <span className="font-semibold text-ink">28 Nov 2026</span>
              </div>
              <div className="p-3 rounded-xl bg-black/20 border border-gold/15">
                <span className="text-[10px] font-mono text-gold/70 block uppercase">Time</span>
                <span className="font-semibold text-ink">6:30 PM</span>
              </div>
              <div className="p-3 rounded-xl bg-black/20 border border-gold/15">
                <span className="text-[10px] font-mono text-gold/70 block uppercase">Attire</span>
                <span className="font-semibold text-ink">Traditional Formal</span>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="flex pt-2">
              <a
                href="https://www.google.com/maps/place/Sri+Venkateswara+Kalyana+Mandapam/@16.2372829,79.9799513,13z/data=!4m10!1m2!2m1!1sSri+venkateswara+kalyana+mandapam+pattabi+ramaswamy+temple+nrt+maps!3m6!1s0x3a4a811dbe3d24eb:0x79e6bfb0c4d736aa!8m2!3d16.2372829!4d80.0520491"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex-1 py-3 text-xs flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Right: Stylized Venue Map Card */}
          <div className="lg:col-span-5 card-peach p-6 rounded-3xl border border-gold/30 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[280px] sm:min-h-[360px]">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gold block mb-1">
                Reception Location
              </span>
              <h4
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                className="text-2xl font-bold text-ink"
              >
                Narasaraopet, Andhra Pradesh
              </h4>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Sri Venkateswara Kalyana Mandapam, Pattabi Ramaswami Temple, NRT
              </p>
            </div>

            {/* Stylized Map SVG */}
            <div className="my-6 relative w-full h-44 rounded-2xl bg-black/40 border border-gold/20 overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full opacity-60" viewBox="0 0 400 200">
                <path d="M20 50 Q100 20 200 60 T380 40" stroke="rgba(245,200,66,0.3)" strokeWidth="2" fill="none" />
                <path d="M10 120 Q120 160 220 110 T390 140" stroke="rgba(245,200,66,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
                <circle cx="200" cy="100" r="30" fill="rgba(245,200,66,0.15)" stroke="rgba(245,200,66,0.6)" strokeWidth="2" />
                <circle cx="200" cy="100" r="8" fill="#f5c842" />
                <text x="200" y="150" textAnchor="middle" fill="#ffe88a" fontSize="12" fontFamily="Montserrat">Sri Venkateswara Kalyana Mandapam</text>
              </svg>
            </div>

            <a
              href={config.venueMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-xs font-mono text-gold hover:underline flex items-center justify-center gap-1.5"
            >
              Open Full Interactive Map <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ── TRAVEL GUIDE FOR GUESTS ── */}
        <div>
          <div className="text-center mb-8">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gold flex items-center justify-center gap-1.5 mb-1">
              <Compass className="w-3.5 h-3.5" />
              For Our Travelling Guests
            </span>
            <h3
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
              className="text-2xl sm:text-3xl text-ink font-semibold"
            >
              Getting to the Reception
            </h3>
            <p className="text-xs sm:text-sm text-ink/70 italic mt-1 font-serif">
              Explore what to see and experience around Narasaraopet while you're here.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {config.hyderabadGuide.map((sight, idx) => (
              <div
                key={idx}
                className="card-peach p-5 rounded-2xl border border-gold/25 hover:border-gold shadow-lg flex flex-col justify-between group transition-all duration-300"
              >
                <div>
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                    {sight.icon}
                  </div>
                  <h5
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    className="text-xl font-bold text-gold mb-1"
                  >
                    {sight.title}
                  </h5>
                  <div className="text-[10px] font-mono text-gold/80 mb-2">
                    {sight.type} · {sight.distance}
                  </div>
                  <p
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    className="text-xs text-ink/80 italic leading-relaxed"
                  >
                    {sight.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
