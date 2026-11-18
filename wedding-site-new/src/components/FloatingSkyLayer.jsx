import { useEffect, useRef } from 'react';
import './FloatingSkyLayer.css';

/**
 * Royal Wedding Celebration Layer:
 * - Rich Multi-Floral Petal Showers (Crimson Roses, Blush Petals, Saffron Marigolds, Mogra/Jasmine, Gold Foil)
 * - Shimmering Golden Bokeh Orbs
 * - Twinkling Auspicious Gold Stardust Glints
 */
export default function FloatingSkyLayer({ opened = true }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!opened) return;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const petalCount = isMobile ? 18 : 34;
    const starCount = isMobile ? 20 : 38;
    const bokehCount = isMobile ? 8 : 15;

    const elements = [];
    const rand = (min, max) => min + Math.random() * (max - min);

    // 1. Twinkling Auspicious Stardust Glints
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'wedding-star';
      const size = rand(7, 15);
      const left = rand(2, 98);
      const top = rand(2, 96);
      const delay = rand(0, 6);
      const dur = rand(2.2, 5.0);

      star.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${dur}s;
      `;
      container.appendChild(star);
      elements.push(star);
    }

    // 2. Soft Golden Bokeh Shimmer Spheres
    for (let i = 0; i < bokehCount; i++) {
      const bokeh = document.createElement('div');
      bokeh.className = 'wedding-bokeh';
      const size = rand(18, 52);
      const left = rand(3, 95);
      const top = rand(5, 92);
      const delay = rand(0, 8);
      const dur = rand(6, 12);

      bokeh.style.cssText = `
        left: ${left}%;
        top: ${top}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${dur}s;
      `;
      container.appendChild(bokeh);
      elements.push(bokeh);
    }

    // 3. Luxurious Multi-Floral Wedding Petal Shower
    // Crimson Rose, Blush Pink Rose, Saffron Marigold (Genda), White Mogra/Jasmine, Golden Foil
    const PETAL_TYPES = ['rose-crimson', 'rose-blush', 'marigold-saffron', 'mogra-jasmine', 'gold-foil'];

    for (let i = 0; i < petalCount; i++) {
      const petal = document.createElement('div');
      const type = PETAL_TYPES[i % PETAL_TYPES.length];
      petal.className = `wedding-petal ${type}`;

      const left = rand(-5, 105);
      const dur = rand(8, 15);
      const delay = rand(-15, 0);
      const size = rand(14, 26);
      const swayDist = rand(35, 100) * (Math.random() < 0.5 ? 1 : -1);
      const rot = rand(360, 1080) * (Math.random() < 0.5 ? 1 : -1);

      petal.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size * (type === 'mogra-jasmine' ? 1.0 : 1.35)}px;
        --sway: ${swayDist}px;
        --rot: ${rot}deg;
        animation-duration: ${dur}s;
        animation-delay: ${delay}s;
      `;
      container.appendChild(petal);
      elements.push(petal);
    }

    return () => {
      elements.forEach((el) => el.remove());
    };
  }, [opened]);

  if (!opened) return null;

  return (
    <div
      ref={containerRef}
      className="floating-wedding-layer"
      aria-hidden="true"
    />
  );
}
