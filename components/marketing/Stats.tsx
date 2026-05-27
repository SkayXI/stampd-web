'use client'

import { useEffect, useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const stats = [
  { target: 95,  suffix: '%',       label: 'Egypt mobile penetration' },
  { target: 16,  suffix: 'K+',      label: 'MENA coffee shops by 2029' },
  { target: 60,  suffix: '%',       label: 'Customers prefer wallet loyalty' },
  { target: 5,   suffix: ' stamps', label: 'To a free reward — proven sweet spot' },
]

function runCounter(el: HTMLElement) {
  const target = parseFloat(el.dataset.target || '0')
  const suffix = el.dataset.suffix || ''
  const dec    = parseInt(el.dataset.dec    || '0')
  const t0  = performance.now()
  const dur = 2000

  const tick = (now: number) => {
    const p    = Math.min((now - t0) / dur, 1)
    const ease = 1 - Math.pow(1 - p, 4)
    el.innerHTML = (ease * target).toFixed(dec) + suffix
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollReveal(sectionRef)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            if (el.dataset.done) return
            el.dataset.done = '1'
            if (!reduced) runCounter(el)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )

    const nums = document.querySelectorAll<HTMLElement>('.stat-num')
    nums.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="stats" ref={sectionRef}>
      <div className="section-inner">
        <div className="stats-head">
          <div className="s-label rv">The opportunity</div>
          <h2 className="s-title rv d1">
            MENA coffee is <span className="anim-grad">booming</span>
          </h2>
        </div>

        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={s.label} className={`stat rv d${i + 1}`}>
              <span
                className="stat-num"
                data-target={s.target}
                data-suffix={s.suffix}
              >
                0
              </span>
              <span className="stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
