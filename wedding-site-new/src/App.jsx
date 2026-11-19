import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Cover from './components/Cover';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RoyalPortrait from './components/RoyalPortrait';
import ThemeSelector from './components/ThemeSelector';
import BackgroundMusic from './components/BackgroundMusic';
import Story from './components/Story';
import ScratchReveal from './components/ScratchReveal';
import Countdown from './components/Countdown';
import DayOfBanner from './components/DayOfBanner';
import VideoSection from './components/VideoSection';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Venue from './components/Venue';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import PetalRain from './components/PetalRain';
import FloatingSkyLayer from './components/FloatingSkyLayer';
import Cursor from './components/Cursor';
import { GoldDust, Orbs, openingBurst, useSmoothScroll, useSceneEffects } from './effects/Effects';
import './effects/effects.css';
import { config } from './config';

function speakGreeting(onDone) {
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    onDone();
  };
  if (!window.speechSynthesis) {
    finish();
    return;
  }
  window.speechSynthesis.cancel();
  const guest = localStorage.getItem('wedding_guest_name');
  const greetingText = guest
    ? `Dear ${guest}, you are cordially invited to celebrate the royal wedding of ${config.groom} and ${config.bride}.`
    : `You are cordially invited to celebrate the royal wedding of ${config.groom} and ${config.bride}.`;

  const msg = new SpeechSynthesisUtterance(greetingText);
  msg.pitch = 1.05;
  msg.rate = 0.88;
  msg.volume = 0.85;

  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => /female|samantha|karen|victoria|moira|fiona|susan|zira/i.test(v.name)) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    voices[0];
  if (preferred) msg.voice = preferred;
  msg.onend = finish;
  msg.onerror = finish;
  window.speechSynthesis.speak(msg);
  // Fallback: start the music anyway if the browser never reports the end of the speech
  setTimeout(finish, 15000);
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [musicStart, setMusicStart] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useSmoothScroll(opened);
  useSceneEffects(opened);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Progress bar
  useEffect(() => {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      bar.style.width = ((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when cover is closed
  useEffect(() => {
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  const handleOpenInvitation = () => {
    openingBurst();
    setOpened(true);
  };

  const handlePopupClosed = () => {
    speakGreeting(() => setMusicStart(true));
  };

  return (
    <>
      {/* Top golden progress bar */}
      <div id="progress-bar" />

      {/* Background celestial effects */}
      <Orbs />
      <GoldDust />

      {/* Custom golden cursor */}
      <Cursor />

      {/* Floating Celebration Sky Layer (Lanterns, Petals, Stars) */}
      {opened && <FloatingSkyLayer opened={opened} />}

      {/* Floating Theme Selector */}
      <ThemeSelector opened={opened} />

      {/* Background music: starts after the spoken greeting ends; mute/play button */}
      <BackgroundMusic opened={opened} start={musicStart} />

      {/* Grand Envelope Cover Overlay */}
      <AnimatePresence mode="wait">
        {!opened && <Cover onOpen={handleOpenInvitation} />}
      </AnimatePresence>

      {/* Fixed Navigation bar */}
      <Navbar scrollY={scrollY} opened={opened} />

      {/* Day-of popup: shows once per session after the invitation opens */}
      <DayOfBanner opened={opened} onClose={handlePopupClosed} />

      {/* Main Page Content */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero opened={opened} />

        <div className="divider" />
        <RoyalPortrait />

        <div className="divider" />
        <Story />

        <div className="divider" />
        <ScratchReveal />

        <div className="divider" />
        <Countdown />

        <div className="divider" />
        <VideoSection />

        <div className="divider" />
        <Events />

        <div className="divider" />
        <Gallery />

        <div className="divider" />
        <Venue />

        <Footer />
      </main>
      <BackToTop />
      <Analytics />
    </>
  );
}
