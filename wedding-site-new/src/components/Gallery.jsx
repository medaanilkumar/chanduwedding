import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Heart, MapPin, X, ChevronLeft, ChevronRight, Camera, Sparkles } from 'lucide-react';
import { SectionTitle } from '../utils/animations';
import { config } from '../config';
import { audioEngine } from '../utils/audioEngine';

const CATEGORIES = ['All', 'The Proposal', 'Pre-Wedding', 'Candids'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activePhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePhoto]);
  const [likes, setLikes] = useState(() => {
    const initial = {};
    config.gallery.forEach((item) => {
      initial[item.id] = item.likes;
    });
    return initial;
  });
  const [likedMap, setLikedMap] = useState({});

  const filteredPhotos =
    selectedCategory === 'All'
      ? config.gallery
      : config.gallery.filter((p) => p.category === selectedCategory);

  const handleLike = (e, id) => {
    e.stopPropagation();
    audioEngine.playSparkle();
    const isAlreadyLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isAlreadyLiked }));
    setLikes((prev) => ({
      ...prev,
      [id]: isAlreadyLiked ? prev[id] - 1 : prev[id] + 1,
    }));
  };

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!activePhoto) return;
    audioEngine.playChime();
    const currIdx = config.gallery.findIndex((p) => p.id === activePhoto.id);
    const prevIdx = (currIdx - 1 + config.gallery.length) % config.gallery.length;
    setActivePhoto(config.gallery[prevIdx]);
  }, [activePhoto]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    if (!activePhoto) return;
    audioEngine.playChime();
    const currIdx = config.gallery.findIndex((p) => p.id === activePhoto.id);
    const nextIdx = (currIdx + 1) % config.gallery.length;
    setActivePhoto(config.gallery[nextIdx]);
  }, [activePhoto]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!activePhoto) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, handlePrev, handleNext]);

  return (
    <section
      id="gallery"
      className="relative py-16 sm:py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0d1b3e 0%, #0f1938 50%, #0d1b3e 100%)',
      }}
    >
      {/* Decorative Golden Ambient Orbs */}
      <div
        className="absolute top-1/3 left-0 w-40 h-40 sm:w-80 sm:h-80 rounded-full pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(245,200,66,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-0 w-48 h-48 sm:w-96 sm:h-96 rounded-full pointer-events-none opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(201,116,138,0.25) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle sub="Glimpses of Forever">Moments & Memories</SectionTitle>

        <p
          className="text-center max-w-xl mx-auto -mt-6 mb-10 text-sm sm:text-base italic text-ink/70"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          "From quiet coffee dates to starlit palace waters, every photograph captures a chapter of our path toward one soul."
        </p>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  audioEngine.playChime();
                  setSelectedCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 font-medium ${
                  active
                    ? 'btn-gold shadow-md'
                    : 'card-peach text-ink/70 hover:text-gold hover:border-gold/50'
                }`}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.2em',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Photo Grid with 3D Tilt */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, i) => {
              const isLiked = likedMap[photo.id];
              return (
                <motion.div
                  key={photo.id}
                  className="break-inside-avoid mb-6 sm:mb-8"
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Tilt
                    tiltMaxAngleX={8}
                    tiltMaxAngleY={8}
                    perspective={1000}
                    scale={1.02}
                    transitionSpeed={1200}
                    className="h-full"
                  >
                    <div
                      onClick={() => {
                        audioEngine.playChime();
                        setActivePhoto(photo);
                      }}
                      className="card-peach overflow-hidden rounded-2xl group cursor-pointer border border-gold/30 hover:border-gold shadow-xl flex flex-col h-full transition-all duration-300"
                    >
                      {/* Image container */}
                      <div className="relative overflow-hidden bg-black/40">
                        <img
                          src={photo.img}
                          alt={photo.title}
                          loading="lazy"
                          className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Gold filigree gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b3e] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                        {/* Category badge */}
                        <div className="absolute top-3 left-3 bg-[#0d1b3e]/85 backdrop-blur-md border border-gold/40 px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider text-gold">
                          {photo.category}
                        </div>

                        {/* Interactive Heart / Like Button */}
                        <button
                          onClick={(e) => handleLike(e, photo.id)}
                          className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border border-white/20 transition-transform active:scale-125"
                          style={{
                            background: isLiked ? 'rgba(235, 77, 75, 0.85)' : 'rgba(13, 27, 62, 0.75)',
                            color: '#ffffff',
                          }}
                          title="Send love"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isLiked ? 'fill-white stroke-white' : 'stroke-white/80'
                            }`}
                          />
                        </button>

                        {/* Location Pill */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-ink/90 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md">
                          <MapPin className="w-3 h-3 text-gold" />
                          <span style={{ fontFamily: 'Montserrat, sans-serif' }} className="text-[11px]">
                            {photo.location}
                          </span>
                        </div>
                      </div>

                      {/* Photo details */}
                      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                        <div>
                          <h4
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            className="text-xl sm:text-2xl font-semibold text-gold mb-1.5 group-hover:text-gold-l transition-colors"
                          >
                            {photo.title}
                          </h4>
                          <p
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            className="text-sm text-ink/80 italic leading-relaxed"
                          >
                            "{photo.caption}"
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gold/15 text-xs text-muted">
                          <span className="flex items-center gap-1 text-[11px] font-mono text-gold/70">
                            <Camera className="w-3 h-3" /> Click to view
                          </span>
                          <span className="flex items-center gap-1 font-mono text-xs text-ink/80">
                            <Heart className="w-3 h-3 text-terracotta fill-terracotta" /> {likes[photo.id]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-8 backdrop-blur-2xl bg-black/90"
            style={{ touchAction: 'pan-y' }}
          >
            {/* Top Bar with Photo Counter and Close */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-50 pointer-events-none">
              <span className="pointer-events-auto px-3.5 py-1 rounded-full bg-black/60 border border-gold/40 text-[11px] font-mono text-gold backdrop-blur-md">
                Photo {config.gallery.findIndex((p) => p.id === activePhoto.id) + 1} of {config.gallery.length}
              </span>
              <button
                onClick={() => setActivePhoto(null)}
                aria-label="Close enlarged photo"
                className="pointer-events-auto p-2.5 rounded-full card-peach text-gold hover:text-white border border-gold/40 transition-colors shadow-lg active:scale-95"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Navigation Arrows (Desktop & Tablet) */}
            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full card-peach text-gold hover:text-white border border-gold/40 z-50 transition-all hover:scale-110 active:scale-95 shadow-xl flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-3.5 rounded-full card-peach text-gold hover:text-white border border-gold/40 z-50 transition-all hover:scale-110 active:scale-95 shadow-xl flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-6 sm:w-6 sm:h-6" />
            </button>

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="card-peach max-w-4xl w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-gold/50 shadow-2xl relative my-auto max-h-[92vh] flex flex-col"
              style={{ background: 'rgba(10, 20, 48, 0.98)' }}
            >
              {/* Photo Display */}
              <div className="relative w-full overflow-hidden bg-black flex items-center justify-center min-h-[220px] max-h-[60vh] sm:max-h-[68vh]">
                <img
                  src={activePhoto.img}
                  alt={activePhoto.title}
                  className="w-auto h-auto max-h-[60vh] sm:max-h-[68vh] max-w-full object-contain select-none"
                />
              </div>

              {/* Photo Caption & Info */}
              <div className="p-4 sm:p-6 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border-t border-gold/20 bg-gradient-to-b from-[#0d1b3e] to-[#0a152e]">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/30">
                      {activePhoto.category}
                    </span>
                    <span className="text-xs text-muted flex items-center gap-1 font-mono">
                      <MapPin className="w-3 h-3 text-gold" /> {activePhoto.location}
                    </span>
                  </div>
                  <h3
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    className="text-xl sm:text-2xl font-semibold text-gold"
                  >
                    {activePhoto.title}
                  </h3>
                  <p
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    className="text-sm sm:text-base text-ink/80 italic mt-0.5"
                  >
                    "{activePhoto.caption}"
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-1 sm:pt-0">
                  <button
                    onClick={(e) => handleLike(e, activePhoto.id)}
                    className="btn-gold py-2.5 px-5 text-xs flex items-center gap-2 flex-shrink-0"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedMap[activePhoto.id] ? 'fill-current text-rose-300' : ''
                      }`}
                    />
                    <span>{likes[activePhoto.id]} Blessings</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
