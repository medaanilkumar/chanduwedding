import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import confetti from 'canvas-confetti'

export const GOLDS = ['#c9893a', '#e8b870', '#f5dbb0', '#f2c4a0', '#c4673a']
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = () => window.matchMedia('(pointer: fine)').matches

/* Gold burst used when the invitation opens */
export function openingBurst() {
  if (reduced()) return
  const shot = (x, angle) => confetti({ particleCount: 90, angle, spread: 75, startVelocity: 55, origin: { x, y: 0.75 }, colors: GOLDS, scalar: 0.9 })
  shot(0.1, 60); shot(0.9, 120)
  setTimeout(() => confetti({ particleCount: 120, spread: 120, origin: { y: 0.5 }, colors: GOLDS, scalar: 0.8 }), 250)
}

/* Buttery smooth scroll — only starts once the cover is open */
export function useSmoothScroll(active) {
  useEffect(() => {
    if (!active || reduced()) return
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [active])
}

/* Floating gold dust that drifts away from the cursor, plus a sparkle trail */
export function GoldDust() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduced()) return
    const c = ref.current, ctx = c.getContext('2d')
    let w, h, raf
    const m = { x: -999, y: -999 }
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight }
    resize()
    const dust = Array.from({ length: innerWidth < 640 ? 30 : 70 }, () => ({
      x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + 0.5,
      vx: 0, vy: -(Math.random() * 0.25 + 0.06), a: Math.random() * 6.28, s: Math.random() * 0.02 + 0.006,
      col: GOLDS[(Math.random() * 3) | 0],
    }))
    const trail = []
    const move = (e) => {
      m.x = e.clientX; m.y = e.clientY
      if (fine() && trail.length < 40 && Math.random() < 0.6)
        trail.push({ x: m.x, y: m.y, vx: (Math.random() - 0.5) * 0.8, vy: Math.random() * 0.8 + 0.2, life: 1, r: Math.random() * 2 + 1 })
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of dust) {
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy) || 1
        if (d < 120) { p.vx += (dx / d) * 0.45; p.vy += (dy / d) * 0.45 }
        p.vx *= 0.94; p.vy = p.vy * 0.96 - 0.004
        p.x += p.vx + Math.sin((p.a += p.s)) * 0.3; p.y += p.vy
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        ctx.globalAlpha = 0.25 + Math.abs(Math.sin(p.a * 2)) * 0.5
        ctx.fillStyle = p.col
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill()
      }
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i]
        t.x += t.vx; t.y += t.vy; t.life -= 0.03
        if (t.life <= 0) { trail.splice(i, 1); continue }
        ctx.globalAlpha = t.life; ctx.fillStyle = '#e8b870'
        ctx.save(); ctx.translate(t.x, t.y); ctx.rotate(t.life * 4)
        ctx.fillRect(-t.r, -t.r, t.r * 2, t.r * 2); ctx.restore()   // tiny diamond sparkle
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    addEventListener('mousemove', move); addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', move); removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="fx-dust" aria-hidden />
}

/* Soft glowing orbs behind the page */
export const Orbs = () => <div className="fx-orbs" aria-hidden><i /><i /><i /></div>

/* Scroll reveals, 3D card tilt, magnetic buttons, button sparkle bursts.
   All work by watching the existing markup, so your components stay untouched. */
export function useSceneEffects(opened) {
  useEffect(() => {
    if (!opened || reduced()) return
    const secs = [...document.querySelectorAll('main > *:not(.divider)')].slice(1) // skip the hero
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('fx-in'); io.unobserve(e.target) }
    }), { threshold: 0.06, rootMargin: '0px 0px -8% 0px' })
    secs.forEach((s) => { s.classList.add('fx-reveal'); io.observe(s) })

    let card = null, mag = null
    const reset = (el) => { if (el) { el.style.removeProperty('--rx'); el.style.removeProperty('--ry') } }
    const onMove = (e) => {
      if (!fine()) return
      const c = e.target.closest?.('.card-peach')
      if (card && card !== c) reset(card)
      card = c
      if (c) {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
        c.style.setProperty('--ry', `${(x - 0.5) * 14}deg`); c.style.setProperty('--rx', `${(0.5 - y) * 12}deg`)
        c.style.setProperty('--mx', `${x * 100}%`); c.style.setProperty('--my', `${y * 100}%`)
      }
      const b = e.target.closest?.('.btn-gold, .btn-outline')
      if (mag && mag !== b) mag.style.translate = ''
      mag = b
      if (b) {
        const r = b.getBoundingClientRect()
        b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.2}px ${(e.clientY - r.top - r.height / 2) * 0.3}px`
      }
    }
    const onClick = (e) => {
      if (!e.target.closest?.('.btn-gold')) return
      confetti({ particleCount: 26, spread: 70, startVelocity: 24, ticks: 90, scalar: 0.7, colors: GOLDS,
        origin: { x: e.clientX / innerWidth, y: e.clientY / innerHeight } })
    }
    document.addEventListener('pointermove', onMove)
    document.addEventListener('click', onClick)
    return () => { io.disconnect(); document.removeEventListener('pointermove', onMove); document.removeEventListener('click', onClick)
      secs.forEach((s) => s.classList.remove('fx-reveal', 'fx-in')) }
  }, [opened])
}
