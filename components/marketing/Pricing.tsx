const plans = [
  {
    tier: 'Starter',
    amount: '999',
    setup: 'EGP 2,000',
    featured: false,
    features: [
      { text: '1 location', active: true },
      { text: 'Apple & Google Wallet cards', active: true },
      { text: 'Custom branding', active: true },
      { text: 'QR scanner app', active: true },
      { text: 'Push notifications', active: true },
      { text: 'Dashboard (V2)', active: false },
      { text: 'WhatsApp campaigns', active: false },
    ],
  },
  {
    tier: 'Growth',
    amount: '1,799',
    setup: 'EGP 3,500',
    featured: true,
    features: [
      { text: '1 location', active: true },
      { text: 'Everything in Starter', active: true },
      { text: 'Analytics dashboard', active: true },
      { text: 'Customer visit history', active: true },
      { text: 'Priority WhatsApp support', active: true },
      { text: 'Multi-location', active: false },
      { text: 'WhatsApp campaigns', active: false },
    ],
  },
  {
    tier: 'Chain',
    amount: '3,499',
    setup: 'EGP 6,000',
    featured: false,
    features: [
      { text: 'Up to 5 locations', active: true },
      { text: 'Everything in Growth', active: true },
      { text: 'Multi-location stamp sharing', active: true },
      { text: 'Unified analytics', active: true },
      { text: 'Dedicated contact', active: true },
      { text: 'WhatsApp campaigns', active: false },
      { text: 'Customer CRM', active: false },
    ],
  },
  {
    tier: 'Marketing ★',
    amount: '4,999',
    setup: 'EGP 8,000',
    featured: false,
    features: [
      { text: '1–3 locations', active: true },
      { text: 'Everything in Chain', active: true },
      { text: 'WhatsApp campaigns', active: true },
      { text: '500 messages/month', active: true },
      { text: 'Birthday automation', active: true },
      { text: 'Full Customer CRM', active: true },
      { text: 'Monthly strategy call', active: true },
    ],
  },
]

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="section-inner">
        <div className="price-head">
          <div className="s-label rv">Simple pricing</div>
          <h2 className="s-title rv d1">
            Start small, <span className="anim-grad">grow big</span>
          </h2>
          <p className="s-sub rv d2">
            One-time setup fee + a flat monthly subscription. No per-stamp fees, no
            surprises. All prices in EGP.
          </p>
        </div>

        <div className="price-grid">
          {plans.map((plan, i) => (
            <div
              key={plan.tier}
              className={`price-card rv d${i + 1}${plan.featured ? ' featured' : ''}`}
            >
              {plan.featured && <div className="price-badge">Most popular</div>}
              <div className="price-tier">{plan.tier}</div>
              <div className="price-amount">{plan.amount}</div>
              <div className="price-period">EGP / month</div>
              <div className="price-setup">
                Setup fee: <strong>{plan.setup}</strong>
              </div>
              <ul className="price-features">
                {plan.features.map((f) => (
                  <li key={f.text} className={f.active ? '' : 'dim'}>
                    {f.text}
                  </li>
                ))}
              </ul>
              <button
                className={`price-btn ${plan.featured ? 'price-btn-fill' : 'price-btn-outline'}`}
              >
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
