'use client'

import { useEffect, useRef, type ComponentType } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import {
  WalletIcon,
  StampIcon,
  QrStampIcon,
  WhatsAppIcon,
  BirthdayIcon,
  CrmIcon,
} from './FeatureIcons'

type FeatureIcon = ComponentType<{ className?: string }>

const features: { icon: FeatureIcon; title: string; desc: string }[] = [
  {
    icon: WalletIcon,
    title: 'Apple & Google Wallet',
    desc: "Cards live natively inside your customers' phones. No app to download, no account to create — they just scan and go.",
  },
  {
    icon: StampIcon,
    title: 'The 5-Stamp Mechanic',
    desc: 'Collect 5 stamps, earn a free drink. Simple, proven, and psychologically effective. The card resets and stays in their wallet forever.',
  },
  {
    icon: QrStampIcon,
    title: 'Instant QR Stamping',
    desc: 'Baristas scan the wallet card barcode with the Stampd app in under a second. One tap — stamp added, notification sent.',
  },
  {
    icon: WhatsAppIcon,
    title: 'WhatsApp Campaigns',
    desc: 'Slow Tuesday? Send a personal WhatsApp offer to all your regulars in 2 minutes. Fill empty tables, boost daily revenue.',
  },
  {
    icon: BirthdayIcon,
    title: 'Birthday Automation',
    desc: 'The system automatically sends a birthday offer to every customer on their birthday. Zero effort from you, 30–50% conversion rate.',
  },
  {
    icon: CrmIcon,
    title: 'Customer CRM',
    desc: 'Know your regulars by name. Track visit frequency, stamp history, and lifetime value — in one clean dashboard.',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollReveal(sectionRef)

  /* ── 3D Card Tilt ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const cards = document.querySelectorAll<HTMLElement>('.card')

    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = []

    cards.forEach(card => {
      const move = (e: MouseEvent) => {
        const r  = card.getBoundingClientRect()
        const x  = e.clientX - r.left
        const y  = e.clientY - r.top
        const cx = r.width  / 2
        const cy = r.height / 2
        card.style.transform = `perspective(700px) rotateX(${((y - cy) / cy) * -7}deg) rotateY(${((x - cx) / cx) * 7}deg) translateY(-8px)`
        card.style.setProperty('--mx', (x / r.width  * 100) + '%')
        card.style.setProperty('--my', (y / r.height * 100) + '%')
      }
      const leave = () => { card.style.transform = '' }
      card.addEventListener('mousemove', move)
      card.addEventListener('mouseleave', leave)
      handlers.push({ el: card, move, leave })
    })

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <section className="section" id="features" ref={sectionRef}>
      <div className="section-inner">
        <div className="feat-head">
          <div className="s-label rv">Everything your café needs</div>
          <h2 className="s-title rv d1">
            Built for coffee shops <span className="anim-grad">that grow</span>
          </h2>
          <p className="s-sub rv d2">
            Everything from the stamp card to the WhatsApp campaign — in one simple
            platform designed for the MENA market.
          </p>
        </div>

        <div className="feat-grid">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
            <div key={f.title} className={`card rv d${(i % 4) + 1}`}>
              <div className="card-glow" />
              <div className="card-shine" />
              <div className="card-icon">
                <Icon />
              </div>
              <h3 className="card-title">{f.title}</h3>
              <p className="card-desc">{f.desc}</p>
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}
