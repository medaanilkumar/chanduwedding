import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import musicSrc from '../images/background-music.mp3';

const VOLUME = 0.45;

export default function BackgroundMusic({ opened }) {
  const audioRef = useRef(null);
  const resumeAfterVideo = useRef(false);
  const [playing, setPlaying] = useState(false);

  // Start the music once the invitation is opened (that click allows audio to play).
  useEffect(() => {
    if (!opened) return undefined;
    const audio = new Audio(musicSrc);
    audio.loop = true;
    audio.volume = VOLUME;
    audio.preload = 'auto';
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audioRef.current = audio;
    audio.play().catch(() => setPlaying(false));

    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audioRef.current = null;
      setPlaying(false);
    };
  }, [opened]);

  // Pause the music while the wedding video plays; resume it afterwards.
  useEffect(() => {
    const onVideoPlay = () => {
      const a = audioRef.current;
      if (a && !a.paused) {
        resumeAfterVideo.current = true;
        a.pause();
      }
    };
    const onVideoStop = () => {
      const a = audioRef.current;
      if (resumeAfterVideo.current && a) a.play().catch(() => {});
      resumeAfterVideo.current = false;
    };
    window.addEventListener('wedding:video-play', onVideoPlay);
    window.addEventListener('wedding:video-stop', onVideoStop);
    return () => {
      window.removeEventListener('wedding:video-play', onVideoPlay);
      window.removeEventListener('wedding:video-stop', onVideoStop);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    resumeAfterVideo.current = false;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  };

  if (!opened) return null;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Mute music' : 'Play music'}
      title={playing ? 'Mute music' : 'Play music'}
      className="fixed bottom-5 left-5 z-40 w-11 h-11 rounded-full flex items-center justify-center border border-gold/50 backdrop-blur-xl transition-transform hover:scale-105 active:scale-95"
      style={{
        background: 'rgba(10, 20, 45, 0.88)',
        color: '#f5c842',
        boxShadow: playing ? '0 0 18px rgba(245, 200, 66, 0.35)' : '0 6px 18px rgba(0, 0, 0, 0.4)',
      }}
    >
      {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
}
