import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Music, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export default function AudioPlayer({ opened }) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [expanded, setExpanded] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const unsub = audioEngine.subscribe((status) => setPlaying(status));
    return unsub;
  }, []);

  const handleTogglePlay = () => {
    audioEngine.playChime();
    audioEngine.toggle();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (muted && val > 0) setMuted(false);
    audioEngine.setMasterVolume(val);
  };

  const handleToggleMute = () => {
    audioEngine.playChime();
    if (muted) {
      setMuted(false);
      audioEngine.setMasterVolume(volume);
    } else {
      setMuted(true);
      audioEngine.setMasterVolume(0);
    }
  };

  if (!opened) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      aria-label="Royal Wedding Audio Player"
      className="fixed bottom-5 left-5 z-40 select-none"
    >
      <div
        className="card-peach flex items-center gap-3 p-2 px-3 rounded-full shadow-2xl backdrop-blur-xl border border-gold/40 hover:border-gold transition-all duration-300"
        style={{
          background: 'rgba(10, 20, 45, 0.88)',
          boxShadow: playing
            ? '0 8px 32px rgba(245, 200, 66, 0.25), 0 0 20px rgba(245, 200, 66, 0.15)'
            : '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        {/* Play/Pause Gold Disc Button */}
        <button
          onClick={handleTogglePlay}
          className="relative w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #c8a96e, #f5c842, #ffe8a0, #c8a96e)',
            color: '#0d1b3e',
            boxShadow: '0 2px 10px rgba(245, 200, 66, 0.5)',
          }}
          title={playing ? 'Pause Shehnai & Sitar Ambiance' : 'Play Royal Wedding Soundtrack'}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? (
            <Pause className="w-4 h-4 fill-current stroke-current" />
          ) : (
            <Play className="w-4 h-4 fill-current stroke-current ml-0.5" />
          )}

          {/* Disc pulse ring when playing */}
          {playing && (
            <motion.div
              className="absolute inset-0 rounded-full border border-gold-l"
              animate={{ scale: [1, 1.4, 1.7], opacity: [0.8, 0.3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </button>

        {/* Animated Equalizer Waveform & Info */}
        <div
          onClick={() => setExpanded(!expanded)}
          className="cursor-pointer flex items-center gap-2.5 py-1 px-1"
        >
          <div className="flex items-end gap-1 h-5 w-6 px-0.5">
            {[0.4, 0.8, 1, 0.6, 0.3].map((height, i) => (
              <motion.span
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-gold to-gold-l"
                animate={
                  playing
                    ? {
                        height: ['20%', `${height * 100}%`, '30%', `${height * 80}%`, '20%'],
                      }
                    : { height: '25%' }
                }
                transition={
                  playing
                    ? {
                        duration: 0.9 + i * 0.15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.1,
                      }
                    : { duration: 0.2 }
                }
                style={{ minHeight: 4 }}
              />
            ))}
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span
              className="text-[10px] uppercase font-mono tracking-widest leading-tight text-gold flex items-center gap-1"
            >
              <Music className="w-2.5 h-2.5" />
              Royal Ambiance
            </span>
            <span
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
              className="text-xs text-ink/90 font-medium leading-none"
            >
              Raag Yaman · Shehnai & Sitar
            </span>
          </div>
        </div>

        {/* Volume controls */}
        <div className="flex items-center gap-1 border-l border-gold/20 pl-2">
          <button
            onClick={handleToggleMute}
            className="p-1 rounded-full text-gold/80 hover:text-gold transition-colors"
            title={muted ? 'Unmute' : 'Mute'}
            aria-label={muted ? 'Unmute sound' : 'Mute sound'}
          >
            {muted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-terracotta" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 h-1 accent-gold cursor-pointer hidden md:block"
            title={`Volume: ${Math.round((muted ? 0 : volume) * 100)}%`}
            aria-label="Volume slider"
          />
        </div>
      </div>
    </motion.aside>
  );
}
