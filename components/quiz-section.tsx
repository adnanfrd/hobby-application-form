"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Zap, FaMapPin, FaCalendar } from "react-icons/fa6"

interface QuizAnswer {
  step: number
  value: number
}

const questions = [
  {
    step: 1,
    text: "How long have you been sitting on this idea?",
    sub: "Be honest — this helps calibrate your score accurately.",
    options: [
      { value: 10, text: "Less than 6 months", sub: "Still fresh — good foundation to build from" },
      { value: 25, text: "6 months – 2 years", sub: "You've had time to think it through — let's see what's there" },
      { value: 20, text: "2–5 years", sub: 'Classic "one day" pattern — the Dream Tax is real' },
      { value: 15, text: "5+ years (or multiple ideas)", sub: "You're a thinker. Time to become a tester." },
    ],
  },
  {
    step: 2,
    text: "Can you name your first paying customer — specifically?",
    sub: "Not a demographic. A real person type with a real job, real pain, real budget.",
    options: [
      { value: 5, text: "Not yet — it's a broad market", sub: "This is the #1 thing to fix first" },
      {
        value: 12,
        text: "I have a general sense — but it's vague",
        sub: "A starting point — Stage 1 of the Hobby Method sharpens this",
      },
      { value: 20, text: "Yes — I can describe them precisely", sub: "Strong signal. The ICP foundation is there." },
      {
        value: 25,
        text: "Yes — and I've spoken to 3+ potential customers",
        sub: "This puts you ahead of 90% of pre-launch founders",
      },
    ],
  },
  {
    step: 3,
    text: "What's been the main thing holding you back?",
    sub: "Be honest — there's no wrong answer. This calibrates your personalised next step.",
    options: [
      { value: 15, text: "Time — I'm too busy with work", sub: "Solvable. 10-15 hours/week is enough to test systematically." },
      {
        value: 12,
        text: "Fear of failure / reputation risk",
        sub: "The most common block for high-performers. Addressable with the right structure.",
      },
      {
        value: 10,
        text: "I'm not sure if the idea is good enough",
        sub: "That's not a feeling problem. It's a data problem. Stage 2 fixes it.",
      },
      { value: 8, text: "All of the above", sub: "Honest answer — and exactly what Hobby is designed for" },
    ],
  },
  {
    step: 4,
    text: "How many hours per week can you realistically commit to this?",
    sub: "Don't answer what you wish — answer what's actually possible right now.",
    options: [
      { value: 5, text: "Less than 5 hours", sub: "Possible but tight — we'll give you a priority-only plan" },
      { value: 15, text: "5–10 hours", sub: "Workable — many Hobby members operate in this range" },
      { value: 20, text: "10–15 hours", sub: "The sweet spot. Enough to run the full method in 90 days." },
      {
        value: 20,
        text: "15+ hours (recently transitioned / in transition)",
        sub: "You can move fast. Let's use that window well.",
      },
    ],
  },
]

function getResults(score: number, name: string, email: string) {
  if (score >= 70) {
    return {
      label: "Launch Ready",
      title: "You're closer than you think.",
      desc: `${name}, your score of ${score}/100 puts you in the top tier of idea readiness. The foundations are there. What you need now is a systematic framework to test it — not more preparation.`,
      insights: [
        { icon: Check, text: "Your ICP definition is strong enough to start discovery conversations immediately." },
        { icon: Check, text: "You have the time and commitment to run a full 90-day validation sprint." },
        {
          icon: Zap,
          text: "Your next step: Stop refining the idea and start Stage 2 — 10 customer conversations in 2 weeks.",
        },
      ],
      ctaText: "Apply for the Next Cohort →",
      ctaSub: `Your score and full breakdown has been sent to ${email}. Applications for Cohort 1 close soon — 5 seats remaining.`,
    }
  } else if (score >= 40) {
    return {
      label: "Almost Ready",
      title: "One or two things to sharpen — then you test.",
      desc: `${name}, your score of ${score}/100 means you're in solid territory — but there are specific gaps between you and a successful 90-day test. The good news: every one of them is fixable.`,
      insights: [
        { icon: FaMapPin, text: "ICP definition likely needs sharpening. Vague customers = vague results." },
        { icon: FaCalendar, text: "Time commitment is the limiting factor at your stage. We'll give you a priority-only plan." },
        {
          icon: Check,
          text: "Your next step: Join the free 75-min workshop — From Buried Idea to First Customer. Link in your inbox.",
        },
      ],
      ctaText: "Reserve a Workshop Seat →",
      ctaSub: `Full score breakdown sent to ${email}. Workshop details included — join before it fills.`,
    }
  } else {
    return {
      label: "Foundation First",
      title: "The foundation needs work — that's exactly what we're here for.",
      desc: `${name}, your score of ${score}/100 tells us the idea hasn't been articulated clearly enough to test yet. That's not a problem — it's Stage 1 of the Hobby Method. Most people start here.`,
      insights: [
        { icon: FaCalendar, text: "Download the free Idea Extraction Framework in your inbox — this is your first step." },
        { icon: FaMapPin, text: "ICP definition needs to come before any testing. We'll walk you through it." },
        {
          icon: FaCalendar,
          text: "Your next step: complete the framework, then re-take this quiz in 2 weeks. You'll score higher.",
        },
      ],
      ctaText: "Get the Free Framework →",
      ctaSub: `Your score breakdown + the free Idea Extraction Framework has been sent to ${email}.`,
    }
  }
}

export function QuizSection() {
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", role: "" })
  const [finalScore, setFinalScore] = useState(0)

  const totalSteps = 5

  const handleSelectOption = (value: number) => {
    setSelectedOption(value)
    setAnswers((prev) => ({ ...prev, [currentStep]: value }))
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
      setSelectedOption(answers[currentStep + 1] || null)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setSelectedOption(answers[currentStep - 1] || null)
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert("Please enter your name and email to receive your score.")
      return
    }
    const raw = (answers[1] || 0) + (answers[2] || 0) + (answers[3] || 0) + (answers[4] || 0)
    const total = Math.min(Math.round(raw), 100)
    setFinalScore(total)
    setShowResults(true)
  }

  const progressPercent = showResults ? 100 : ((currentStep - 1) / totalSteps) * 100

  const stepLabels = [
    "Question 1 of 5",
    "Question 2 of 5",
    "Question 3 of 5",
    "Question 4 of 5",
    "Almost done — enter your details",
  ]

  const results = showResults ? getResults(finalScore, formData.name, formData.email) : null

  return (
    <section className="bg-navy px-[6%] py-[100px]" id="quiz">
      <div className="text-center max-w-[680px] mx-auto mb-16">
        <p className="inline-block text-[11px] font-bold tracking-[3px] uppercase text-gold mb-[18px]">
          Free Assessment
        </p>
        <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-bold leading-[1.15] mb-4 text-white">
          What&apos;s your <em className="italic text-gold">Idea Readiness Score?</em>
        </h2>
        <div className="w-11 h-[3px] bg-gold rounded-sm mx-auto my-[18px] mb-6" />
        <p className="text-[17px] text-muted-text leading-[1.8]">
          5 questions. 90 seconds. Get a personalised score (0–100), your readiness label, and a specific next step —
          delivered to your inbox immediately.
        </p>
      </div>

      <div className="max-w-[720px] mx-auto bg-card-dark border border-border-gold rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <div className="bg-gold/10 border-b border-border-gold px-9 py-6 flex items-center justify-between">
          <span className="text-[13px] font-bold text-gold tracking-[1px] uppercase">Idea Readiness Assessment</span>
          <span className="text-xs text-muted-text">
            {showResults ? `Score: ${finalScore}/100 · ${results?.label}` : stepLabels[currentStep - 1]}
          </span>
        </div>

        <div className="h-[3px] bg-white/5">
          <div
            className="h-[3px] bg-gradient-to-r from-gold to-gold-lt transition-all duration-400"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {!showResults ? (
          <div className="p-11 px-10">
            {currentStep <= 4 ? (
              <>
                <div className="text-[22px] font-bold text-white leading-[1.4] mb-2.5">
                  {questions[currentStep - 1].text}
                </div>
                <div className="text-[13px] text-muted-text mb-8 leading-[1.6]">{questions[currentStep - 1].sub}</div>

                <div className="flex flex-col gap-3">
                  {questions[currentStep - 1].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectOption(option.value)}
                      className={`flex items-start gap-4 bg-white/[0.03] border rounded-[10px] p-4 px-5 cursor-pointer transition-all duration-200 text-left w-full ${
                        selectedOption === option.value
                          ? "border-gold bg-gold/10"
                          : "border-white/10 hover:border-gold/40 hover:bg-gold/5"
                      }`}
                    >
                      <div
                        className={`w-[18px] h-[18px] border-2 rounded-full flex-shrink-0 mt-0.5 transition-all duration-200 ${
                          selectedOption === option.value ? "border-gold bg-gold" : "border-white/20"
                        }`}
                      />
                      <div>
                        <div className="text-sm text-cream leading-[1.5]">{option.text}</div>
                        <div className="text-xs text-muted-text mt-1">{option.sub}</div>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-9">
                  {currentStep > 1 ? (
                    <button
                      onClick={handleBack}
                      className="bg-transparent border-none text-[13px] text-muted-text cursor-pointer p-0 transition-colors duration-200 hover:text-white"
                    >
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="bg-gold text-midnight border-none rounded-md px-7 py-3 text-sm font-bold cursor-pointer transition-colors duration-200 hover:bg-gold-lt disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue →
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-[22px] font-bold text-white leading-[1.4] mb-6">
                  Where should we send your Idea Readiness Score?
                </div>
                <div className="text-[13px] text-muted-text mb-8 leading-[1.6]">
                  Your personalised score, readiness label, and specific next step — delivered immediately. No fluff, no
                  spam. Unsubscribe any time.
                </div>

                <div className="flex flex-col gap-3.5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-muted-text font-medium tracking-[0.5px] uppercase">First Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Your first name"
                      className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] font-sans outline-none transition-colors duration-200 focus:border-gold placeholder:text-white/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-muted-text font-medium tracking-[0.5px] uppercase">Work Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="you@company.com"
                      className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] font-sans outline-none transition-colors duration-200 focus:border-gold placeholder:text-white/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-muted-text font-medium tracking-[0.5px] uppercase">
                      Current or Most Recent Role
                    </label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                      placeholder="e.g. Senior PM at Google, Laid off from Meta"
                      className="bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 text-white text-[15px] font-sans outline-none transition-colors duration-200 focus:border-gold placeholder:text-white/20"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-muted-text mt-3 leading-[1.6]">
                  By submitting, you&apos;ll receive your score and a short email sequence from Hobby. No spam. No hard
                  selling. Unsubscribe instantly at any time.
                </p>

                <div className="flex items-center justify-between mt-9">
                  <button
                    onClick={handleBack}
                    className="bg-transparent border-none text-[13px] text-muted-text cursor-pointer p-0 transition-colors duration-200 hover:text-white"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-gold text-midnight border-none rounded-md px-8 py-3.5 text-[15px] font-bold cursor-pointer transition-colors duration-200 hover:bg-gold-lt"
                  >
                    Get My Score →
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="p-11 px-10">
            <div className="text-center p-10 bg-gold/[0.06] border border-border-gold rounded-xl mb-8">
              <div className="w-[100px] h-[100px] mx-auto mb-4 relative flex items-center justify-center">
                <span className="text-[42px] font-black text-gold leading-none">{finalScore}</span>
              </div>
              <div className="text-[13px] font-bold tracking-[2px] uppercase text-gold mb-2">{results?.label}</div>
              <div className="font-serif text-[26px] font-bold text-white mb-3">{results?.title}</div>
              <div className="text-sm text-muted-text leading-[1.7]">{results?.desc}</div>
            </div>

            <div className="mb-7">
              <h4 className="text-xs font-bold text-gold tracking-[2px] uppercase mb-4">Your personalised insights</h4>
              {results?.insights.map((insight, index) => {
                const IconComponent = insight.icon
                return (
                <div key={index} className="flex gap-3.5 bg-white/[0.02] rounded-lg p-3.5 px-4 mb-2.5">
                  <IconComponent className="text-base flex-shrink-0 mt-px text-gold" size={20} />
                  <span className="text-[13px] text-cream leading-[1.6]">{insight.text}</span>
                </div>
              )
              })}
            </div>

            <div className="text-center">
              <Link
                href="/apply"
                className="bg-gold text-midnight text-[15px] font-bold px-9 py-4 mb-3.5 block w-full rounded-md no-underline text-center transition-colors duration-200 hover:bg-gold-lt"
              >
                {results?.ctaText}
              </Link>
              <p className="text-xs text-muted-text">{results?.ctaSub}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
