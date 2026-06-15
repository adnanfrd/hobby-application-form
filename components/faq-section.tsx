'use client'

import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'

const faqs = [
  {
    q: 'Is this for people with a fully formed idea, or can I come in earlier?',
    a: 'You need a problem hypothesis — something you believe people have and would pay to solve. You don\'t need a product, a brand, or a pitch deck. We extract clarity in Stage 1.',
  },
  {
    q: 'Do I need to quit my job to do this?',
    a: 'No. This is specifically designed for people who are currently employed. 10–15 hours per week is sufficient to run the full program properly.',
  },
  {
    q: 'What if my idea doesn\'t work out?',
    a: 'That\'s a valid outcome. By week 12 you\'ll have a data-backed decision — either a validated model or clear evidence to kill the idea quickly. Both results have real value.',
  },
  {
    q: 'What does "0% equity" mean in practice?',
    a: 'We take no ownership stake in your business, now or in the future. You pay a program fee. That is the entire financial relationship between us.',
  },
  {
    q: 'Who runs the program?',
    a: 'The Hobby Method is run by operators from the Falcon Accelerator family — people who\'ve built and scaled businesses. Not coaches, not academics.',
  },
  {
    q: 'What\'s the real difference between Core and Premium?',
    a: 'Core is the full framework with group sessions. Premium adds 4× direct 1:1 sessions with the lead operator, async access between sessions, and a custom sprint plan built specifically for your idea.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-midnight px-[6%] py-[100px]">
      <div className="max-w-[720px] mx-auto">
        <p className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-gold mb-[18px]">
          Common Questions
        </p>
        <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold leading-[1.15] mb-[18px] text-white">
          Before you apply.
        </h2>
        <div className="w-11 h-[3px] bg-gold rounded-sm mb-[38px]" />

        <div className="space-y-0 divide-y divide-border-white">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="py-5 cursor-pointer transition-colors hover:bg-white/[0.02]"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[16px] font-medium text-white leading-[1.5] flex-1">
                  {faq.q}
                </h3>
                <FaChevronDown
                  className={`text-gold flex-shrink-0 transition-transform duration-300 mt-1 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  size={16}
                />
              </div>

              {openIndex === index && (
                <div
                  className="mt-4 overflow-hidden"
                  style={{
                    maxHeight: '500px',
                    transition: 'max-height 0.3s ease-out',
                  }}
                >
                  <p className="text-[14px] text-muted-text leading-[1.7]">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
