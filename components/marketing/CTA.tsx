'use client'

import { useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollReveal(sectionRef)

  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // TODO: wire to /api/waitlist
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section className="section" id="cta" ref={sectionRef}>
      <div className="section-inner">
        <div className="cta-box rv">
          <h2 className="cta-title">
            Ready to bring your <span className="anim-grad">customers back?</span>
          </h2>
          <p className="cta-sub">
            Join the first coffee shops across Egypt building real digital loyalty.
            We&apos;ll have your card live in 48 hours.
          </p>

          {submitted ? (
            <div style={{ position: 'relative', padding: '16px', background: 'rgba(79,70,229,0.1)', borderRadius: '12px', border: '1px solid rgba(79,70,229,0.3)', color: 'var(--accent)', fontSize: '15px', fontWeight: 500 }}>
              ✦ We&apos;ve got your details — we&apos;ll be in touch within 24 hours!
            </div>
          ) : (
            <form className="cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="cta-input"
                placeholder="your@cafe.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn-p"
                style={{ padding: '14px 24px', borderRadius: '10px', fontSize: '15px', whiteSpace: 'nowrap' }}
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Get a free demo'}
              </button>
            </form>
          )}

          <p className="cta-note">
            No credit card · Setup in 48 hours · Arabic support included
          </p>
        </div>
      </div>
    </section>
  )
}
