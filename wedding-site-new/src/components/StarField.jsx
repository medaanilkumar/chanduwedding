import { useEffect, useRef } from 'react';

// Shooting stars + deep star field
export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [], shooters = [], animId;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      // Re-seed stars
      stars = [];
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.3 + Math.random() * 1.2,
          a: 0.1 + Math.random() * 0.7,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.01 + Math.random() * 0.03,
          color: ['rgba(241,217,142,', 'rgba(255,255,255,', 'rgba(200,230,255,', 'rgba(138,154,107,'][Math.floor(Math.random() * 4)],
        });
      }
    }
    resize();
    window.addEventListener('resize', resize);

    function spawnShooter() {
      if (Math.random() > 0.015) return;
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 6);
      shooters.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.5,
        vx: Math.cos(angle) * (6 + Math.random() * 8),
        vy: Math.sin(angle) * (3 + Math.random() * 4),
        len: 80 + Math.random() * 120,
        life: 1,
        decay: 0.03 + Math.random() * 0.02,
        color: ['#f1d98e', '#fff', '#c5d4a4'][Math.floor(Math.random() * 3)],
      });
    }

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // Stars
      for (const s of stars) {
        s.twinkleOffset += s.twinkleSpeed;
        const alpha = s.a * (0.5 + 0.5 * Math.sin(s.twinkleOffset));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color + alpha + ')';
        ctx.fill();

        // Cross sparkle for bright stars
        if (s.r > 0.9 && alpha > 0.5) {
          const len = s.r * 5;
          ctx.strokeStyle = s.color + (alpha * 0.4) + ')';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(s.x - len, s.y); ctx.lineTo(s.x + len, s.y);
          ctx.moveTo(s.x, s.y - len); ctx.lineTo(s.x, s.y + len);
          ctx.stroke();
        }
      }

      // Shooting stars
      spawnShooter();
      shooters = shooters.filter(s => s.life > 0);
      for (const s of shooters) {
        const grad = ctx.createLinearGradient(
          s.x - s.vx * s.len / 10, s.y - s.vy * s.len / 10,
          s.x, s.y
        );
        grad.addColorStop(0, s.color.replace(')', ', 0)').replace('#', 'rgba(').replace('rgba(', '#').replace(')', '').replace(',', '').replace(' 0', ', 0'));
        // simpler approach:
        ctx.save();
        ctx.globalAlpha = s.life * 0.7;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * (s.len / 10), s.y - s.vy * (s.len / 10));
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Glow head
        ctx.globalAlpha = s.life;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.restore();

        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;
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
      style={{ zIndex: 0 }}
    />
  );
}
