const stages = [
  {
    number: 1,
    name: "Extraction: Pull the idea out of your head",
    week: "Weeks 1 to 2",
    desc: "We take everything in your head and put it on a one-page framework. What does the customer get? Why do they pay? Who exactly are they? No fluff, no business plan. Just the clarity to start moving.",
    tags: ["Idea Framework", "ICP Definition", "Value Proposition"],
  },
  {
    number: 2,
    name: "Discovery: 10 structured conversations in 2 weeks",
    week: "Weeks 3 to 4",
    desc: "You'll know more about your market than 90% of funded startups. We give you the exact script, the qualification criteria, and the synthesis framework. No assumptions. Real signal.",
    tags: ["Discovery Calls", "Customer Insight", "Market Mapping"],
  },
  {
    number: 3,
    name: "Offer Design: Build from what you heard",
    week: "Weeks 5 to 6",
    desc: "Your offer is designed from Stage 2 data, not assumptions. Pricing, positioning, packaging. We stop you underselling yourself. We stop you over-engineering the product.",
    tags: ["Offer Architecture", "Pricing Strategy", "Positioning"],
  },
  {
    number: 4,
    name: "First Customer Sprint: Close before you build",
    week: "Weeks 7 to 8",
    desc: "The most counterintuitive stage. You try to close a paying customer before the product is fully built. If they pay, you build. If they don't, you learn. Either way, you win data.",
    tags: ["Pre Sell Sprint", "Sales Conversations", "First Revenue"],
  },
  {
    number: 5,
    name: "Validate or Pivot: Data decides. Not ego.",
    week: "Weeks 9 to 12",
    desc: "You have real data now. We analyse it together. If the model is working, we scale the inputs. If something isn't working, we make a calibrated adjustment, not a panicked pivot. By week 12, you have a validated business or a clear decision.",
    tags: ["Data Review", "Iteration", "Growth Playbook", "Decision Framework"],
  },
]

export function MethodSection() {
  return (
    <section className="bg-midnight px-5 py-16 sm:px-[6%] sm:py-[100px]" id="method">
      <p className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-gold mb-[18px]">The Hobby Method</p>
      <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold leading-[1.15] mb-[18px] text-white">
        Five stages. 90 days.
        <br />
        One <em className="italic text-gold">validated business.</em>
      </h2>
      <div className="w-11 h-[3px] bg-gold rounded-sm my-[22px] mb-[38px]" />
      <p className="text-[17px] text-muted-text max-w-[580px] leading-[1.8]">
        Built on one belief: your idea isn&apos;t the risk. Your approach to testing it is. The Hobby Method gives you
        the same rigour you apply at work, pointed at yourself.
      </p>

      <div className="mt-14 flex flex-col gap-3">
        {stages.map((stage) => (
          <div
            key={stage.number}
            className="grid grid-cols-1 md:grid-cols-[72px_1fr] bg-card-dark border border-border-white rounded-lg overflow-hidden transition-colors duration-200 hover:border-border-gold"
          >
            <div className="bg-gold/[0.07] flex items-center justify-center text-[11px] font-extrabold tracking-[2px] text-gold uppercase py-6 md:py-0 md:writing-mode-vertical">
              <span className="md:[writing-mode:vertical-rl] md:rotate-180">Stage {stage.number}</span>
            </div>
            <div className="p-5 sm:p-6 sm:px-7">
              <div className="text-base font-bold text-cream mb-1">{stage.name}</div>
              <div className="text-[11px] text-gold font-semibold tracking-[1px] uppercase mb-2.5">{stage.week}</div>
              <div className="text-[13px] text-muted-text leading-[1.7]">{stage.desc}</div>
              <div className="flex flex-wrap gap-2 mt-3.5">
                {stage.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/[0.04] rounded-full px-3 py-1 text-[11px] text-muted-text font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
