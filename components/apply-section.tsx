import Link from "next/link"

const steps = [
  "Take the quiz & get your score",
  "Submit your application (15 min)",
  "Discovery call with the team",
  "Cohort offer & kickoff",
]

export function ApplySection() {
  return (
    <section className="bg-navy text-center px-[6%] py-[120px]" id="apply">
      <div className="max-w-[680px] mx-auto">
        <p className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-gold mb-[18px]">
          Applications Open
        </p>
        <h2 className="font-serif text-[clamp(38px,5vw,62px)] font-bold leading-[1.15] mb-5 text-white">
          Your idea has been
          <br />
          waiting long enough.
        </h2>
        <p className="text-lg text-muted-text leading-[1.7] mb-14">
          Cohort 1 is limited to 8 founding executives. We keep it small so every person gets real operator time — not a
          seat in a lecture hall.
        </p>

        <div className="inline-flex items-center gap-3 bg-gold/[0.08] border border-border-gold rounded-full px-5 py-2 text-xs text-gold font-semibold mb-7">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gold" />
            ))}
            {[4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-gold/20" />
            ))}
          </div>
          3 of 8 seats filled · Applications close soon
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-0 mb-14 relative">
          <div className="hidden md:block absolute top-[45px] left-[12%] right-[12%] h-px bg-border-white" />
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-4 flex-1 max-w-[200px] mx-auto md:mx-0">
              <div className="w-[28px] h-[28px] bg-gold text-midnight border-0 rounded-full flex items-center justify-center text-[13px] font-bold font-serif relative z-10 flex-shrink-0">
                {index + 1}
              </div>
              <span className="text-[14px] text-white font-semibold text-center leading-[1.5]">{step}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="#quiz"
            className="bg-gold text-midnight font-bold text-base px-12 py-[18px] rounded-md no-underline transition-colors duration-200 hover:bg-gold-lt"
          >
            Start With the Quiz →
          </Link>
          <p className="text-xs text-muted-text">
            Or if you&apos;re already ready —{" "}
            <a href="mailto:hello@hobbyaccelerator.com" className="text-gold no-underline">
              email us directly
            </a>{" "}
            to skip ahead.
          </p>
        </div>
      </div>
    </section>
  )
}
