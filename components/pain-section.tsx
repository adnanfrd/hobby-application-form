const painPoints = [
  {
    icon: "⏳",
    title: 'The "one day" loop',
    description:
      'Year 1: "When things slow down." Year 3: "When I have more saved." Year 5: "Maybe it wasn\'t meant to be." The idea didn\'t die. It got postponed indefinitely.',
    highlight: true,
  },
  {
    icon: "🎯",
    title: "No system, just pressure",
    description:
      "You know how to build at scale. But no one ever gave you the framework for applying your skills to your own idea — without blowing up your career to do it.",
  },
  {
    icon: "🔒",
    title: "Reputation risk paralysis",
    description:
      'You can\'t afford to fail publicly. The people who respect your professional track record — they\'ll see it. So you wait until it\'s "ready." It never is.',
  },
  {
    icon: "📊",
    title: '"I don\'t know if it\'s good enough"',
    description:
      "That's not a feeling problem. It's a data problem. You haven't had a structured way to test it without betting the whole thing on one launch.",
  },
]

export function PainSection() {
  return (
    <section className="px-[6%] py-[100px] md:py-[100px] bg-midnight">
      <p className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-gold mb-[18px]">The Problem</p>
      <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold leading-[1.15] mb-[18px] text-white">
        You&apos;ve had the idea for years.
        <br />
        Here&apos;s why it&apos;s still buried.
      </h2>
      <div className="w-11 h-[3px] bg-gold rounded-sm my-[22px] mb-[38px]" />
      <p className="text-[17px] text-muted-text max-w-[580px] leading-[1.8]">
        It&apos;s not that you&apos;re not capable. You&apos;ve built things that reached millions of people. The problem
        is you&apos;ve been applying the wrong framework to your own idea.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-14">
        {painPoints.map((point, index) => (
          <div
            key={index}
            className={`bg-card-dark border rounded-xl p-8 ${
              point.highlight ? "border-border-gold" : "border-border-white"
            }`}
          >
            <div className="w-[42px] h-[42px] bg-gold/10 rounded-[10px] flex items-center justify-center text-lg mb-[18px]">
              {point.icon}
            </div>
            <h3 className="text-[17px] font-bold text-cream mb-2.5">{point.title}</h3>
            <p className="text-[13px] text-muted-text leading-[1.7]">{point.description}</p>
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 bg-card-dark border-l-[3px] border-l-gold rounded-r-xl p-7 px-9">
          <blockquote className="font-serif text-lg italic text-cream leading-[1.65]">
            &quot;I&apos;ve shipped products used by 200 million people. But I can&apos;t figure out how to get 10
            people to pay me for something I built myself.&quot;
          </blockquote>
          <cite className="block mt-3.5 text-xs text-muted-text not-italic">— Senior PM, FAANG. Now in Hobby Cohort 1.</cite>
        </div>
      </div>
    </section>
  )
}
