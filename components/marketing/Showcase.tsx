'use client'

import { useRef } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const barHeights = [50, 72, 60, 88, 70, 100, 82]

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollReveal(sectionRef)

  return (
    <section className="section" id="showcase" ref={sectionRef}>
      <div className="section-inner">
        <div className="s-label rv">How it works</div>
        <h2 className="s-title rv d1">
          Loyalty that feels <span className="anim-grad">effortless</span>
        </h2>

        <div className="bento">

          {/* Wide: Stamp card mockup */}
          <div className="bc wide rv d1">
            <div className="bc-tag">Wallet Pass</div>
            <h3 className="bc-title">Your brand, permanently in their pocket</h3>
            <p className="bc-desc">
              A fully branded card with your logo and colors — issued directly into
              Apple Wallet or Google Wallet in seconds.
            </p>
            <div className="bc-visual">
              <div className="stamp-card">
                <div className="stamp-card-header">
                  <div>
                    <div className="stamp-card-name">Daily Grind Coffee</div>
                    <div className="stamp-card-tag">Loyalty Card · Collect &amp; Redeem</div>
                  </div>
                  <svg width="28" height="28" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" opacity={0.8}>
                    <ellipse cx="128" cy="208" rx="56" ry="8" fill="#3730A3" opacity="0.5" />
                    <rect x="44" y="168" width="168" height="24" rx="7" fill="white" />
                    <rect x="54" y="128" width="148" height="36" rx="6" fill="white" />
                    <path d="M 118,122 L 138,122 C 160,122 202,128 202,134 L 54,134 C 54,128 96,122 118,122 Z" fill="white" />
                    <rect x="116" y="92" width="24" height="34" rx="5" fill="white" />
                    <rect x="99" y="28" width="58" height="68" rx="29" fill="white" />
                  </svg>
                </div>
                <div className="stamps-row">
                  <div className="stamp filled" />
                  <div className="stamp filled" />
                  <div className="stamp filled" />
                  <div className="stamp" />
                  <div className="stamp" />
                </div>
                <div className="stamp-card-footer">
                  3 of 5 stamps — 2 more for a free coffee ☕
                </div>
              </div>
            </div>
          </div>

          {/* Tall: Analytics */}
          <div className="bc tall rv d2">
            <div className="bc-tag">Analytics</div>
            <h3 className="bc-title">Know your regulars, grow your revenue</h3>
            <p className="bc-desc">
              Real-time dashboard: active cards, stamps today, rewards redeemed, and
              top returning customers.
            </p>
            <div className="bc-visual">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-m)' }}>Stamps issued</span>
                <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600 }}>↑ 24% this week</span>
              </div>
              <div className="graph-wrap">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="bar"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp campaigns */}
          <div className="bc rv d2">
            <div className="bc-tag">WhatsApp Campaigns</div>
            <h3 className="bc-title">Fill slow days in 2 minutes</h3>
            <p className="bc-desc">
              Send a personalized offer to every customer. They get a message, you get
              foot traffic.
            </p>
            <div className="bc-visual" style={{ padding: '14px' }}>
              <div className="wa-bubble">
                <div className="wa-name">Stampd Campaign Preview</div>
                <p>
                  Hey Ahmed! ☕ Come visit us today before 6pm and get a free coffee on
                  us. See you soon! — Daily Grind
                </p>
                <div className="wa-time">Delivered · Read ✓✓</div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-m)', textAlign: 'center', marginTop: '8px' }}>
                87 customers · sent in 2 mins
              </div>
            </div>
          </div>

          {/* No app needed */}
          <div className="bc rv d3">
            <div className="bc-tag">Zero Friction</div>
            <h3 className="bc-title">No app. No sign-up. Just scan.</h3>
            <p className="bc-desc">
              Customers scan a QR code once and the card lands in their Wallet
              instantly. That&apos;s it.
            </p>
            <div
              className="bc-visual"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', minHeight: '80px' }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '30px', marginBottom: '4px' }}>🍎</div>
                <div style={{ fontSize: '10px', color: 'var(--text-m)' }}>Apple Wallet</div>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'var(--glass-b)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '30px', marginBottom: '4px' }}>🤖</div>
                <div style={{ fontSize: '10px', color: 'var(--text-m)' }}>Google Wallet</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
