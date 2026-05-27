'use client'

import { useEffect, useState } from 'react'
import { StampdLogo } from '@/components/StampdLogo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav id="nav" className={scrolled ? 'scrolled' : ''}>
      <a className="nav-logo" href="#">
        <StampdLogo size={34} />
        <div>
          <div className="nav-logo-text">
            <span>Stamp</span>
            <em>d</em>
          </div>
          <div className="nav-sub">Loyalty Cards</div>
        </div>
      </a>

      <ul className="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#showcase">How it works</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#cta">Contact</a></li>
      </ul>

      <button className="nav-btn" onClick={() => {
        document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
      }}>
        Get started →
      </button>
    </nav>
  )
}
