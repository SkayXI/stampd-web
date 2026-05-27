import { StampdLogo } from '@/components/StampdLogo'

export default function Footer() {
  return (
    <footer>
      <a className="nav-logo" href="#" style={{ textDecoration: 'none' }}>
        <StampdLogo size={28} />
        <div className="nav-logo-text">
          <span>Stamp</span>
          <em>d</em>
        </div>
      </a>

      <span className="foot-copy">© 2026 Stampd. Built for the MENA coffee scene.</span>

      <div className="foot-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Contact</a>
        <a href="#">Arabic / عربي</a>
      </div>
    </footer>
  )
}
