import Link from "next/link"
import { Lock } from "lucide-react"

const tiers = [
  {
    name: "Core",
    price: "$8,000",
    sub: "The full Hobby Method: structured, systematic, and supported.",
    featured: false,
    features: [
      { text: "90 day cohort curriculum (5 stages)", enabled: true },
      { text: "Weekly group strategy sessions", enabled: true },
      { text: "Private Hobby community (cohort only)", enabled: true },
      { text: "Accountability framework + progress tracking", enabled: true },
      { text: "Discovery call script library", enabled: true },
      { text: "Offer design workshop", enabled: true },
      { text: "1:1 advisory sessions", enabled: false, locked: true },
      { text: "Operational audit", enabled: false, locked: true },
    ],
  },
  {
    name: "Premium",
    price: "$12,000",
    sub: "Core program plus direct 1:1 time with the lead operator.",
    featured: true,
    features: [
      { text: "Everything in Core", enabled: true },
      { text: "4 x 1:1 advisory sessions (60 min each)", enabled: true },
      { text: "Personal offer review and pricing audit", enabled: true },
      { text: "Direct async access between sessions", enabled: true },
      { text: "Priority review of discovery call recordings", enabled: true },
      { text: "Custom 90 day sprint plan built for your specific idea", enabled: true },
      { text: "Operational audit", enabled: false, locked: true },
    ],
  },
  {
    name: "Elite",
    price: "$15,000",
    sub: "Premium plus a direct pathway to operational investment.",
    featured: false,
    features: [
      { text: "Everything in Premium", enabled: true },
      { text: "Company C operational audit at program completion", enabled: true },
      { text: "Business model review by the investment team", enabled: true },
      { text: "Infrastructure setup assessment (CRM, funnel, email)", enabled: true },
      { text: "Pathway to operational investment for qualified graduates", enabled: true },
      { text: "Warm introductions to relevant investors and operators", enabled: true },
      { text: "Post program advisory retainer option", enabled: true },
    ],
  },
]

export function OfferSection() {
  return (
    <section className="bg-midnight px-5 py-16 sm:px-[6%] sm:py-[100px]" id="offer">
      <p className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-gold mb-[18px]">The Program</p>
      <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold leading-[1.15] mb-[18px] text-white">
        Three ways to engage.
        <br />
        One <em className="italic text-gold">90 day commitment.</em>
      </h2>
      <div className="w-11 h-[3px] bg-gold rounded-sm my-[22px] mb-[38px]" />
      <p className="text-[17px] text-muted-text max-w-[580px] leading-[1.8]">
        All tiers include the full Hobby Method. The difference is the depth of operational support, and what happens
        at the end.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-14">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`bg-card-dark border rounded-lg p-6 sm:p-7 flex flex-col transition-colors duration-200 relative ${
              tier.featured
                ? "border-gold border-[1.5px] bg-gradient-to-br from-gold/[0.06] to-card-dark"
                : "border-border-white"
            }`}
          >
            {tier.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-midnight text-[11px] font-bold tracking-[1px] uppercase px-4 py-1 rounded-full whitespace-nowrap">
                Most Popular
              </div>
            )}
            <div className="text-[11px] font-bold text-gold tracking-[2px] uppercase mb-3">{tier.name}</div>
            <div className="text-[42px] font-black text-white leading-none mb-1.5">{tier.price}</div>
            <div className="text-[13px] text-muted-text mb-7 leading-[1.6]">{tier.sub}</div>
            <div className="h-px bg-border-white mb-6" />
            <ul className="list-none flex-1 flex flex-col gap-3 mb-8">
              {tier.features.map((feature, index) => (
                <li
                  key={index}
                  className={`text-[13px] pl-[22px] relative leading-[1.5] before:absolute before:left-0 before:text-[11px] before:top-0.5 ${
                    feature.enabled
                      ? "text-cream before:content-['+'] before:text-gold"
                      : feature.locked
                      ? "text-white/40 line-through before:content-none"
                      : "text-muted-text before:text-white/20 before:content-['+']"
                  }`}
                >
                  {feature.locked && <Lock className="absolute left-0 top-0.5 w-3 h-3 mr-2" />}
                  {feature.text}
                  {feature.locked && <span className="text-[11px] text-muted-text ml-1">(Elite only)</span>}
                </li>
              ))}
            </ul>
            <Link
              href="/apply"
              className={`block text-center border rounded-lg px-3.5 py-3 font-bold text-sm no-underline transition-all duration-200 ${
                tier.featured
                  ? "bg-gold text-midnight border-gold hover:bg-gold-lt"
                  : "bg-gold/10 border-border-gold text-gold hover:bg-gold hover:text-midnight"
              }`}
            >
              Apply for {tier.name}
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
