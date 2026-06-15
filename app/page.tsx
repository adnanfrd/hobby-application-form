import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { PainSection } from "@/components/pain-section"
import { QuizSection } from "@/components/quiz-section"
import { MethodSection } from "@/components/method-section"
import { ICPSection } from "@/components/icp-section"
import { OfferSection } from "@/components/offer-section"
import { ApplySection } from "@/components/apply-section"
import { FaqSection } from "@/components/faq-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-midnight">
      <Navigation />
      <Hero />
      <PainSection />
      <QuizSection />
      <MethodSection />
      <ICPSection />
      <OfferSection />
      <ApplySection />
      <FaqSection />
      <NewsletterSection />
      <Footer />
    </main>
  )
}
