import { NewsletterSignup } from "@/components/newsletter-signup"

export function NewsletterSection() {
  return (
    <section className="bg-navy px-[6%] py-[80px]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-gold mb-[18px]">Stay Updated</p>
        <h2 className="font-serif text-[clamp(28px,4vw,42px)] font-bold leading-[1.2] mb-[18px] text-white">
          Join our newsletter
        </h2>
        <p className="text-[16px] text-muted-text max-w-[500px] mx-auto leading-[1.8] mb-8">
          Get exclusive updates on the Hobby Method, cohort launches, and insights from founders building on the side.
        </p>
        <NewsletterSignup />
      </div>
    </section>
  )
}
