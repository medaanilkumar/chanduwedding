import { useEffect, useRef } from 'react';

// Animated aurora / mesh gradient background
export default function Aurora() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, animId, t = 0;

    const orbs = [
      { x: 0.2, y: 0.3, r: 0.45, color: [138, 154, 107], speed: 0.0004 },
      { x: 0.8, y: 0.7, r: 0.4,  color: [217, 168, 78],  speed: 0.0006 },
      { x: 0.5, y: 0.1, r: 0.35, color: [80, 100, 60],   speed: 0.0003 },
      { x: 0.1, y: 0.9, r: 0.3,  color: [180, 140, 60],  speed: 0.0005 },
      { x: 0.9, y: 0.2, r: 0.38, color: [60, 80, 45],    speed: 0.00035 },
    ];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 1;

      for (const orb of orbs) {
        const ox = (orb.x + Math.sin(t * orb.speed * 1.3) * 0.18) * W;
        const oy = (orb.y + Math.cos(t * orb.speed) * 0.22) * H;
        const radius = orb.r * Math.max(W, H);

        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);
        const [r, g, b] = orb.color;
        grad.addColorStop(0, `rgba(${r},${g},${b},0.12)`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},0.06)`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(ox, oy, radius, radius * 0.6, t * orb.speed * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, mixBlendMode: 'screen' }}
    />
  );
}
