import Navbar      from '@/components/marketing/Navbar'
import Hero        from '@/components/marketing/Hero'
import LogoMarquee from '@/components/marketing/LogoMarquee'
import Features    from '@/components/marketing/Features'
import Stats       from '@/components/marketing/Stats'
import Showcase    from '@/components/marketing/Showcase'
import Pricing     from '@/components/marketing/Pricing'
import CTA         from '@/components/marketing/CTA'
import Footer      from '@/components/marketing/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoMarquee />
      <Features />
      <Stats />
      <Showcase />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}
