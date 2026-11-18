import { useEffect, useRef } from 'react';

// Continuous background petal rain
export default function PetalRain() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const emojis = ['🌸', '🌺', '🍃', '🌹', '✿', '❀'];
    const petals = [];
    let animId;
    const container = containerRef.current;

    function spawn() {
      const el = document.createElement('div');
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const size = 12 + Math.random() * 16;
      const duration = 8 + Math.random() * 10;
      const delay = Math.random() * -duration;
      const dx = (Math.random() - 0.5) * 300;
      const startX = Math.random() * 110 - 5;
      const rotation = Math.random() * 720 - 360;
      const swayAmp = 20 + Math.random() * 40;

      el.style.cssText = `
        position: fixed;
        left: ${startX}vw;
        top: -40px;
        font-size: ${size}px;
        pointer-events: none;
        z-index: 3;
        user-select: none;
        opacity: 0.75;
        animation: petalFall ${duration}s linear ${delay}s infinite;
        --dx: ${dx}px;
        --rot: ${rotation}deg;
        --sway: ${swayAmp}px;
      `;
      el.textContent = emoji;
      container.appendChild(el);
      petals.push(el);
    }

    // Inject keyframe
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes petalFall {
        0%   { transform: translateY(0)   translateX(0)           rotate(0deg); opacity: 0; }
        5%   { opacity: 0.7; }
        50%  { transform: translateY(50vh) translateX(var(--sway)) rotate(calc(var(--rot) * 0.5)); }
        95%  { opacity: 0.5; }
        100% { transform: translateY(110vh) translateX(var(--dx)) rotate(var(--rot)); opacity: 0; }
      }
    `;
    document.head.appendChild(styleEl);

    // Stagger spawn
    for (let i = 0; i < 18; i++) setTimeout(spawn, i * 400);

    return () => {
      petals.forEach(p => p.remove());
      styleEl.remove();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }} />;
}
