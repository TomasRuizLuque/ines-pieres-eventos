import Hero from '@/components/Hero'
import WorkCarousel from '@/components/WorkCarousel'
import History from '@/components/History'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main>
      <ScrollToTop />
      <Hero />
      <WorkCarousel />
      <History />
      <ContactForm />
      <Footer />
    </main>
  )
}
