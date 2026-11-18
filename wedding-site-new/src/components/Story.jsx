import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, BookOpen, HelpCircle, CheckCircle2, MapPin, Calendar, Award } from 'lucide-react';
import { SectionTitle } from '../utils/animations';
import { config } from '../config';
import { audioEngine } from '../utils/audioEngine';

function ProfileCard({ name, role, parents, profession, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="card-peach p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden group border border-gold/30 hover:border-gold shadow-xl"
    >
      {/* Top icon badge */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 via-gold/10 to-transparent border border-gold/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
        {role === 'Groom' ? (
          <svg viewBox="0 0 48 48" width="38" height="38" fill="none">
            {/* Sherwani / Groom silhouette */}
            <circle cx="24" cy="13" r="7" fill="rgba(245,200,66,0.18)" stroke="#f5c842" strokeWidth="1.2"/>
            {/* Crown */}
            <path d="M17 10 L19 6 L24 9 L29 6 L31 10" stroke="#f5c842" strokeWidth="1.1" fill="none" strokeLinejoin="round"/>
            <circle cx="19" cy="6" r="1.2" fill="#f5c842"/>
            <circle cx="24" cy="9" r="1.2" fill="#f5c842"/>
            <circle cx="29" cy="6" r="1.2" fill="#f5c842"/>
            {/* Body / Sherwani */}
            <path d="M10 42 C10 30 17 26 24 26 C31 26 38 30 38 42" fill="rgba(245,200,66,0.12)" stroke="#f5c842" strokeWidth="1.2"/>
            {/* Collar */}
            <path d="M21 26 L24 31 L27 26" stroke="#f5c842" strokeWidth="0.9" fill="none"/>
            {/* Button line */}
            <line x1="24" y1="31" x2="24" y2="38" stroke="#f5c842" strokeWidth="0.7" strokeDasharray="2 2"/>
            {/* Ornamental shoulder detail */}
            <path d="M13 30 Q10 28 11 25" stroke="rgba(245,200,66,0.5)" strokeWidth="0.8" fill="none"/>
            <path d="M35 30 Q38 28 37 25" stroke="rgba(245,200,66,0.5)" strokeWidth="0.8" fill="none"/>
          </svg>
        ) : (
          <svg viewBox="0 0 48 48" width="38" height="38" fill="none">
            {/* Bride silhouette */}
            <circle cx="24" cy="12" r="7" fill="rgba(245,200,66,0.18)" stroke="#f5c842" strokeWidth="1.2"/>
            {/* Tiara */}
            <path d="M17 9 Q18 5 24 7 Q30 5 31 9" stroke="#f5c842" strokeWidth="1" fill="none"/>
            <circle cx="24" cy="6" r="1.4" fill="#f5c842"/>
            <circle cx="19" cy="8" r="0.9" fill="rgba(245,200,66,0.7)"/>
            <circle cx="29" cy="8" r="0.9" fill="rgba(245,200,66,0.7)"/>
            {/* Veil */}
            <path d="M17 10 Q10 16 12 26" stroke="rgba(245,200,66,0.35)" strokeWidth="1" fill="none"/>
            <path d="M31 10 Q38 16 36 26" stroke="rgba(245,200,66,0.35)" strokeWidth="1" fill="none"/>
            {/* Lehenga / gown — flared */}
            <path d="M17 26 C14 30 8 34 6 44 L42 44 C40 34 34 30 31 26 C28 24 26 23 24 23 C22 23 20 24 17 26Z" fill="rgba(245,200,66,0.12)" stroke="#f5c842" strokeWidth="1.1"/>
            {/* Bodice */}
            <path d="M18 26 Q24 29 30 26 L29 22 Q24 25 19 22Z" fill="rgba(245,200,66,0.2)" stroke="#f5c842" strokeWidth="0.8"/>
            {/* Necklace */}
            <path d="M20 21 Q24 24 28 21" stroke="#f5c842" strokeWidth="0.8" fill="none"/>
            <circle cx="24" cy="23.5" r="1" fill="rgba(245,200,66,0.6)"/>
          </svg>
        )}
      </div>

      <span className="text-[10px] uppercase font-mono tracking-widest text-gold/80 mb-1">
        The {role}
      </span>

      <h3
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
        className="text-3xl sm:text-4xl font-semibold text-gold mb-2"
      >
        {name}
      </h3>

      <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent my-3" />

      <p
        style={{ fontFamily: 'Cormorant Garamond, serif' }}
        className="text-base text-ink/90 font-medium italic"
      >
        {parents}
      </p>

      <p
        style={{ fontFamily: 'Montserrat, sans-serif' }}
        className="text-xs text-muted mt-2 tracking-wide font-light"
      >
        {profession}
      </p>
    </motion.div>
  );
}

export default function Story() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});

  const handleQuizAnswer = (questionIdx, choice) => {
    audioEngine.playChime();
    setQuizAnswers((prev) => ({
      ...prev,
      [questionIdx]: choice,
    }));
  };

  const currentChapterData = config.loveStory[activeChapter];

  return (
    <section
      id="story"
      className="relative py-16 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0d1b3e 0%, #111830 50%, #0d1b3e 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle sub="Destiny & Devotion">Our Story</SectionTitle>

        {/* Romantic Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto -mt-4 mb-12"
        >
          <p
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
            className="text-xl sm:text-2xl italic text-gold-l leading-relaxed"
          >
            "With hearts full of joy and the blessings of our families, we invite you to celebrate the beginning of our forever."
          </p>
          <div className="flex items-center justify-center gap-3 mt-4 text-gold/60 text-xs font-mono">
            <span>◆</span>
            <span>DEEPU & CHANDU</span>
            <span>◆</span>
          </div>
        </motion.blockquote>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-16">
          <ProfileCard
            name={config.groom}
            role="Groom"
            parents={config.groomParents}
            profession={config.groomProfession}
            delay={0}
          />
          <ProfileCard
            name={config.bride}
            role="Bride"
            parents={config.brideParents}
            profession={config.brideProfession}
            delay={0.15}
          />
        </div>

      </div>
    </section>
  );
}
