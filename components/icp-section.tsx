'use client'

import { Check, X } from 'react-icons/fa6'

const yesItems = [
  "5+ years in a corporate or professional role (FAANG, finance, consulting, law)",
  "Business idea you've been carrying for 12+ months",
  "Currently employed or recently in transition with severance",
  "10–15 hours per week you're willing to protect for this",
  "You want a systematic framework — not motivation or mindset work",
  "Targeting Western markets (US / UK / AUS) first",
  "Coachable — you know what you don't know",
]

const noItems = [
  "Idea stage only — no clarity on what problem you're solving",
  "Student or pre-employment (different program for you)",
  "Already launched and looking for growth support",
  "Looking for someone to do the work for you",
  "Expecting motivation or emotional support as the primary deliverable",
  "Not willing to make and test decisions in real-time",
]

export function ICPSection() {
  return (
    <section className="bg-navy px-[6%] py-[100px]" id="who">
      <p className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-gold mb-[18px]">Who This Is For</p>
      <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold leading-[1.15] mb-[18px] text-white">
        Built for the executive
        <br />
        who&apos;s ready to <em className="italic text-gold">stop postponing.</em>
      </h2>
      <div className="w-11 h-[3px] bg-gold rounded-sm my-[22px] mb-[38px]" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
        <div className="bg-card-dark rounded-xl p-9 border border-green/20">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[1px] uppercase bg-green/10 text-green mb-6">
            This is built for you
          </span>
          <ul className="list-none flex flex-col gap-3.5">
            {yesItems.map((item, index) => (
              <li
                key={index}
                className="text-sm text-cream pl-[26px] relative leading-[1.5] before:absolute before:left-0 before:text-green before:font-bold"
              >
                <Check className="absolute left-0 top-0.5 text-green" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card-dark rounded-xl p-9 border border-border-white">
          <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-bold tracking-[1px] uppercase bg-white/5 text-muted-text mb-6">
            Not a fit right now
          </span>
          <ul className="list-none flex flex-col gap-3.5">
            {noItems.map((item, index) => (
              <li
                key={index}
                className="text-sm text-cream pl-[26px] relative leading-[1.5] before:absolute before:left-0 before:text-red before:font-bold"
              >
                <X className="absolute left-0 top-0.5 text-red" size={16} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
