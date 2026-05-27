'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const orb1Ref   = useRef<HTMLDivElement>(null)
  const orb2Ref   = useRef<HTMLDivElement>(null)
  const orb3Ref   = useRef<HTMLDivElement>(null)

  /* ── Particle Network ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0
    const mouse = { x: 0, y: 0 }
    let rafId: number

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY }
    document.addEventListener('mousemove', onMouseMove)

    class Dot {
      x = 0; y = 0; vx = 0; vy = 0; r = 0; a = 0

      constructor() { this.reset() }

      reset() {
        this.x  = Math.random() * W
        this.y  = Math.random() * H
        this.vx = (Math.random() - 0.5) * 0.55
        this.vy = (Math.random() - 0.5) * 0.55
        this.r  = Math.random() * 1.8 + 0.5
        this.a  = Math.random() * 0.4 + 0.1
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        if (mouse.x) {
          const dx = this.x - mouse.x, dy = this.y - mouse.y
          const d  = Math.hypot(dx, dy)
          if (d < 130) {
            const f = (130 - d) / 130
            this.vx += (dx / d) * f * 0.35
            this.vy += (dy / d) * f * 0.35
          }
        }
        this.vx *= 0.98; this.vy *= 0.98
        if (this.x < 0) this.x = W; if (this.x > W) this.x = 0
        if (this.y < 0) this.y = H; if (this.y > H) this.y = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(79,70,229,${this.a})`
        ctx.fill()
      }
    }

    const dots = Array.from({ length: 80 }, () => new Dot())

    function drawLines() {
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const d = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y)
          if (d < 148) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.strokeStyle = `rgba(79,70,229,${(1 - d / 148) * 0.12})`
            ctx.lineWidth   = 0.6
            ctx.stroke()
          }
        }
        if (mouse.x) {
          const d = Math.hypot(dots[i].x - mouse.x, dots[i].y - mouse.y)
          if (d < 200) {
            ctx.beginPath()
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(129,140,248,${(1 - d / 200) * 0.38})`
            ctx.lineWidth   = 0.9
            ctx.stroke()
          }
        }
      }
    }

    const ploop = () => {
      ctx.clearRect(0, 0, W, H)
      dots.forEach(d => { d.update(); d.draw() })
      drawLines()
      rafId = requestAnimationFrame(ploop)
    }
    rafId = requestAnimationFrame(ploop)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  /* ── Orb Parallax ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onMove = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth  - 0.5) * 24
      const py = (e.clientY / window.innerHeight - 0.5) * 24
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${px}px,${py}px)`
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${-px}px,${-py}px)`
      if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${px * 0.5}px,${-py * 0.5}px)`
    }

    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="hero">
      <canvas id="particle-canvas" ref={canvasRef} />
      <div className="orb orb1" ref={orb1Ref} />
      <div className="orb orb2" ref={orb2Ref} />
      <div className="orb orb3" ref={orb3Ref} />

      <div className="hero-inner">
        <div className="hero-badge">
          <div className="badge-dot" />
          Now live in Egypt &amp; MENA — No app download needed
        </div>

        <h1 className="hero-title">
          <span className="line">
            <span className="word" style={{ animationDelay: '0.38s' }}>
              Turn first-time buyers
            </span>
          </span>
          <span className="line">
            <span className="word grad" style={{ animationDelay: '0.6s' }}>
              into regulars.
            </span>
          </span>
          <span className="line">
            <span className="word" style={{ animationDelay: '0.82s' }}>
              Automatically.
            </span>
          </span>
        </h1>

        <p className="hero-sub">
          Digital stamp cards that live inside Apple Wallet &amp; Google Wallet —
          branded to your café, powered by Stampd. No app. No friction. Just loyalty.
        </p>

        <div className="hero-btns">
          <button
            className="btn-p"
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start your loyalty program
          </button>
          <button
            className="btn-g"
            onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
          >
            See how it works →
          </button>
        </div>
      </div>

      <div className="scroll-cue">
        <span>Scroll</span>
        <div className="scroll-bar" />
      </div>
    </section>
  )
}
