import { Navigation } from "@/components/navigation"
import { SurveyForm } from "@/components/survey-form"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Hobby Survey: Share Your Story",
  description: "Take a quick survey to help us understand your journey as a side builder.",
}

export default function SurveyPage() {
  return (
    <main className="bg-midnight min-h-screen flex flex-col">
      <Navigation />
      
      <section className="flex-1 px-[6%] py-[80px]">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <p className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-gold mb-[18px]">Help Us Understand</p>
            <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-bold leading-[1.15] mb-[18px] text-white">
              Share your side project journey
            </h1>
            <p className="text-[17px] text-muted-text leading-[1.8]">
              This quick survey helps us understand where you are in your entrepreneurial journey and how we can better support you. All responses are confidential and will help us improve our program.
            </p>
          </div>

          <SurveyForm />
        </div>
      </section>

      <Footer />
    </main>
  )
}
