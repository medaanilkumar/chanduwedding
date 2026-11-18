import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VIDEO_ID = 'DYcBV9OoAag';
const VOLUME = 45;

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (prev) prev();
      resolve(window.YT);
    };
    if (!document.getElementById('yt-iframe-api')) {
      const s = document.createElement('script');
      s.id = 'yt-iframe-api';
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    }
  });
}

export default function BackgroundMusic({ opened }) {
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Create the hidden YouTube player once the invitation is opened (user gesture).
  useEffect(() => {
    if (!opened) return undefined;
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !hostRef.current || playerRef.current) return;
      playerRef.current = new YT.Player(hostRef.current, {
        width: '200',
        height: '200',
        videoId: VIDEO_ID,
        playerVars: { autoplay: 1, loop: 1, playlist: VIDEO_ID, controls: 0, playsinline: 1, rel: 0 },
        events: {
          onReady: (e) => {
            e.target.setVolume(VOLUME);
            e.target.playVideo();
            setReady(true);
          },
          onStateChange: (e) => {
            setPlaying(e.data === YT.PlayerState.PLAYING);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
      playerRef.current = null;
      setReady(false);
      setPlaying(false);
    };
  }, [opened]);

  const toggle = () => {
    const p = playerRef.current;
    if (!p || !ready) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  if (!opened) return null;

  return (
    <>
      {/* Player is kept off-screen; the button below controls it */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', left: -9999, bottom: 0, width: 200, height: 200, overflow: 'hidden' }}
      >
        <div ref={hostRef} />
      </div>

      <button
        onClick={toggle}
        disabled={!ready}
        aria-label={playing ? 'Mute music' : 'Play music'}
        title={playing ? 'Mute music' : 'Play music'}
        className="fixed bottom-5 left-5 z-40 w-11 h-11 rounded-full flex items-center justify-center border border-gold/50 backdrop-blur-xl transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
        style={{
          background: 'rgba(10, 20, 45, 0.88)',
          color: '#f5c842',
          boxShadow: playing ? '0 0 18px rgba(245, 200, 66, 0.35)' : '0 6px 18px rgba(0, 0, 0, 0.4)',
        }}
      >
        {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>
    </>
  );
}
