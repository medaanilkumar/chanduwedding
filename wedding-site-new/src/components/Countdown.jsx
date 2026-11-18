import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, RevealSection, scaleUp } from '../utils/animations';
import { config } from '../config';

const TARGET = new Date('2026-11-28T11:30:00+05:30');

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Digit({ value, label, index }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      setTimeout(() => { setPrev(value); setFlip(false); }, 300);
    }
  }, [value, prev]);

  return (
    <motion.div
      variants={scaleUp}
      custom={index}
      className="flex flex-col items-center"
      style={{ gap: 2 }}
    >
      <div className="relative w-14 h-[72px] min-[400px]:w-16 min-[400px]:h-20 sm:w-20 sm:h-24 md:w-28 md:h-32">
        {/* Card face */}
        <div className="absolute inset-0 rounded-2xl flex items-center justify-center overflow-hidden card-peach">
          {/* Center shimmer line */}
          <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: 'rgba(245,200,66,0.15)' }} />
          <motion.span
            key={value}
            initial={flip ? { rotateX: -90, opacity: 0 } : false}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="section-title tabular-nums"
            style={{ fontSize: 'clamp(22px,6vw,44px)' }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
        {/* Corner dots */}
        <div className="absolute top-2 left-2 w-1 h-1 rounded-full" style={{ background: 'rgba(245,200,66,0.35)' }} />
        <div className="absolute top-2 right-2 w-1 h-1 rounded-full" style={{ background: 'rgba(245,200,66,0.35)' }} />
        <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full" style={{ background: 'rgba(245,200,66,0.35)' }} />
        <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full" style={{ background: 'rgba(245,200,66,0.35)' }} />
      </div>
      <span className="section-label" style={{ marginBottom: 0, marginTop: 0, whiteSpace: 'nowrap', fontSize: 'clamp(7px,2.2vw,10px)', letterSpacing: 'clamp(0.08em,0.6vw,0.5em)' }}>{label}</span>
    </motion.div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-16 sm:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1b3e 0%, #111830 40%, #0f1e48 70%, #0d1b3e 100%)' }}>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,184,112,0.18) 0%, transparent 70%)' }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <SectionTitle sub="Days Until the Grand Celebration">Counting Down</SectionTitle>

        <RevealSection variants={{ hidden: {}, visible: {} }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-nowrap items-center justify-center gap-0.5 sm:gap-3 md:gap-6"
          >
            {[
              { value: time.days,    label: 'Days',    index: 0 },
              { value: time.hours,   label: 'Hours',   index: 1 },
              { value: time.minutes, label: 'Minutes', index: 2 },
              { value: time.seconds, label: 'Seconds', index: 3 },
            ].map(({ value, label, index }, i) => (
              <div key={label} className="flex items-center gap-0.5 sm:gap-3 md:gap-6">
                <Digit value={value} label={label} index={index} />
                {i < 3 && (
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px,5vw,32px)', color: 'rgba(245,200,66,0.5)', marginTop: 'clamp(-24px,-4vw,-20px)', userSelect: 'none' }}
                  >
                    :
                  </motion.span>
                )}
              </div>
            ))}
          </motion.div>
        </RevealSection>

        {/* Wedding date display */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-8 sm:mt-12 card-peach rounded-2xl py-4 sm:py-5 px-5 sm:px-8 inline-block"
        >
          <p className="section-label text-center" style={{ marginBottom: 6 }}>Reception</p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#e8d8b0' }}>
            Saturday, 28 November 2026
          </p>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 11, color: 'rgba(245,200,66,0.7)', marginTop: 4 }}>
            11:30 AM · Sri Venkateswara Kalyana Mandapam, NRT
          </p>
        </motion.div>
      </div>
    </section>
  );
}
