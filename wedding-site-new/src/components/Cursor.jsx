import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailsRef = useRef([]);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

    const dot = dotRef.current;
    const ring = ringRef.current;

    // Trail elements
    const TRAIL_COUNT = 10;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const t = document.createElement('div');
      t.style.cssText = `
        position:fixed; pointer-events:none; z-index:99999;
        width:${4 + i * 0.5}px; height:${4 + i * 0.5}px;
        border-radius:50%;
        background: radial-gradient(circle, rgba(196,103,58,${0.6 - i * 0.05}), rgba(201,137,58,${0.3 - i * 0.02}));
        transform:translate(-50%,-50%);
        transition: opacity 0.3s;
      `;
      document.body.appendChild(t);
      trailsRef.current.push({ el: t, x: -200, y: -200 });
    }

    function onMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY };
    }

    window.addEventListener('mousemove', onMove);

    // Hover effects on interactive elements
    function addHover(el) {
      el.addEventListener('mouseenter', () => {
        ring.style.width = '56px';
        ring.style.height = '56px';
        ring.style.borderColor = 'rgba(196,103,58,0.7)';
        ring.style.background = 'rgba(196,103,58,0.07)';
        dot.style.transform = 'translate(-50%,-50%) scale(2)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(196,103,58,0.35)';
        ring.style.background = 'transparent';
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
      });
    }

    document.querySelectorAll('a, button, [role="button"]').forEach(addHover);
    const obs = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(addHover);
    });
    obs.observe(document.body, { childList: true, subtree: true });

    let animId;
    function animate() {
      // Dot snaps directly
      dot.style.left = posRef.current.x + 'px';
      dot.style.top = posRef.current.y + 'px';

      // Ring lags behind
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;
      ring.style.left = ringPosRef.current.x + 'px';
      ring.style.top = ringPosRef.current.y + 'px';

      // Trail follows with increasing lag
      let px = posRef.current.x, py = posRef.current.y;
      for (let i = 0; i < trailsRef.current.length; i++) {
        const t = trailsRef.current[i];
        t.x += (px - t.x) * (0.25 - i * 0.018);
        t.y += (py - t.y) * (0.25 - i * 0.018);
        t.el.style.left = t.x + 'px';
        t.el.style.top = t.y + 'px';
        px = t.x; py = t.y;
      }

      animId = requestAnimationFrame(animate);
    }
    animate();

    document.body.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
      obs.disconnect();
      trailsRef.current.forEach(t => t.el.remove());
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          zIndex: 99999,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #e8a07a, #c4673a)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          transition: 'transform 0.15s ease',
          boxShadow: '0 0 8px rgba(196,103,58,0.5)',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          zIndex: 99998,
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(196,103,58,0.35)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease',
        }}
      />
    </>
  );
}
