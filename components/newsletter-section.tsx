import { NewsletterSignup } from "@/components/newsletter-signup"

export function NewsletterSection() {
  return (
    <section className="bg-navy px-5 py-16 sm:px-[6%] sm:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <p className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-gold mb-[18px]">Stay Updated</p>
        <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-bold leading-[1.2] mb-4 text-white">
          Get the Hobby Brief.
        </h2>
        <p className="text-[15px] text-muted-text max-w-[550px] mx-auto leading-[1.8] mb-8">
          Monthly dispatch on idea validation, cohort insights, and building on the side. No fluff.
        </p>
        <NewsletterSignup />
      </div>
    </section>
  )
}
