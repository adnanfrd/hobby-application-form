"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"

const experienceOptions = [
  { value: "3-5", label: "3–5 years" },
  { value: "6-10", label: "6–10 years" },
  { value: "11-15", label: "11–15 years" },
  { value: "16+", label: "16+ years" },
]

const ideaAgeOptions = [
  { value: "under-6-months", label: "Under 6 months" },
  { value: "6-12-months", label: "6–12 months" },
  { value: "1-2-years", label: "1–2 years" },
  { value: "2-5-years", label: "2–5 years" },
  { value: "5-plus-years", label: "5+ years" },
]

const blockerOptions = [
  { value: "time", label: "Time — my job doesn't leave room for it" },
  { value: "fear", label: "Fear — I'm not sure it will work, and I don't want to fail publicly" },
  { value: "knowledge", label: "Knowledge — I don't know how to build or validate a business" },
  { value: "validation", label: "Validation — I don't know if anyone would actually pay for this" },
  { value: "all", label: "All of the above" },
]

const hoursOptions = [
  { value: "under-4", label: "Under 4 hours — I'm very constrained" },
  { value: "4-6", label: "4–6 hours — manageable alongside my job" },
  { value: "7-10", label: "7–10 hours — I can prioritise this" },
  { value: "10-plus", label: "10+ hours — I'm treating this as a serious side project" },
]

const tierOptions = [
  { value: "core", label: "Core — $8,000", sub: "10-week cohort, full curriculum, community access" },
  {
    value: "premium",
    label: "Premium — $12,000",
    badge: "MOST POPULAR",
    sub: "Core + monthly 1:1 coaching + idea review sessions",
  },
  {
    value: "elite",
    label: "Elite — $15,000",
    sub: "Premium + weekly 1:1s + co-founder advisory + priority intro to Falcon network",
  },
  { value: "undecided", label: "Undecided — I'd like to discuss on the discovery call" },
]

const priorExperienceOptions = [
  { value: "never", label: "Never — this would be my first" },
  { value: "side-project", label: "Yes — side projects or freelance work" },
  { value: "startup", label: "Yes — I've worked at or co-founded a startup" },
  { value: "exited", label: "Yes — I've built and exited a business" },
]

const referralOptions = [
  { value: "linkedin", label: "LinkedIn post" },
  { value: "referral", label: "Personal referral" },
  { value: "search", label: "Google / web search" },
  { value: "podcast", label: "Podcast or article" },
  { value: "newsletter", label: "Newsletter" },
  { value: "other", label: "Other" },
]

const commitments = [
  "I can commit 4–6 hours per week to Hobby for 10 weeks",
  "I am willing to have 10 real discovery conversations with potential customers",
  "I understand Hobby does not guarantee a successful business — it guarantees a tested and validated idea",
  "I am applying in good faith with a real idea I intend to act on",
]

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    linkedin: "",
    job_title: "",
    company: "",
    experience: "",
    idea_description: "",
    idea_age: "",
    unfair_advantage: "",
    blocker: "",
    outcome: "",
    hours_per_week: "",
    tier: "",
    prior_experience: "",
    anything_else: "",
    referral_source: "",
    commitment_confirmed: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Application submitted:", formData)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const inputStyles =
    "w-full px-4 py-3 border-2 border-[#DDD8D0] rounded-md text-[15px] font-sans text-navy bg-white transition-colors duration-200 outline-none focus:border-navy placeholder:text-[#B0A898]"
  const selectStyles =
    "w-full px-4 py-3 border-2 border-[#DDD8D0] rounded-md text-[15px] font-sans text-navy bg-white transition-colors duration-200 outline-none focus:border-navy appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%3E%3Cpath%20fill%3D%22%230D1B2A%22%20d%3D%22M6%208L0%200h12z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_14px_center] pr-9"
  const textareaStyles =
    "w-full px-4 py-3 border-2 border-[#DDD8D0] rounded-md text-[15px] font-sans text-navy bg-white transition-colors duration-200 outline-none focus:border-navy resize-y min-h-[110px] leading-[1.6] placeholder:text-[#B0A898]"

  return (
    <main className="bg-cream min-h-screen">
      <nav className="bg-navy flex items-center justify-between px-[5%] h-[60px]">
        <div className="font-serif text-xl text-cream tracking-[0.04em]">
          HOBBY
        </div>
        <a href="/" className="text-[13px] text-cream/55 no-underline transition-colors duration-200 hover:text-gold">
          ← Back to Hobby
        </a>
      </nav>

      <div className="bg-navy px-[5%] py-[60px] pb-14 text-center">
        <div className="inline-block bg-gold/15 text-gold text-[11px] font-bold tracking-[0.14em] uppercase px-4 py-1.5 rounded-[20px] mb-5 border border-gold/30">
          Cohort 1 · 8 Seats · Applications Open
        </div>
        <h1 className="font-serif text-[clamp(32px,5vw,52px)] text-cream mb-3.5">Apply for Hobby</h1>
        <p className="text-[17px] text-cream/65 max-w-[520px] mx-auto font-light">
          Tell us about your buried idea. We review every application personally — no automated filters.
        </p>
      </div>

      <div className="bg-navy border-y border-gold/20">
        <div className="flex justify-center gap-12 px-[5%] py-4 flex-wrap">
          <div className="text-xs text-gold font-semibold tracking-[0.06em]">10-Minute Application</div>
          <div className="text-xs text-gold font-semibold tracking-[0.06em]">Review Within 3 Business Days</div>
          <div className="text-xs text-gold font-semibold tracking-[0.06em]">Free Discovery Call If Selected</div>
          <div className="text-xs text-gold font-semibold tracking-[0.06em]">No Commitment To Apply</div>
        </div>
      </div>

      <div className="max-w-[720px] mx-auto px-[5%] py-14 pb-20">
        <div className="flex gap-12 items-start">
          {/* Sidebar */}
          <aside className="w-[220px] flex-shrink-0 sticky top-20 hidden lg:block">
            <div className="bg-white border border-[#DDD8D0] rounded-[10px] p-6 px-5 mb-4">
              <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-gold mb-3">Cohort 1 Status</h4>
              <div className="flex gap-1.5 flex-wrap my-3 mb-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-gold" />
                ))}
                {[4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-[#DDD8D0]" />
                ))}
              </div>
              <div className="text-xs text-muted-text">
                <strong className="text-navy">3 of 8 seats taken.</strong>
                <br />
                Applications reviewed weekly.
              </div>
            </div>
            <div className="bg-white border border-[#DDD8D0] rounded-[10px] p-6 px-5">
              <h4 className="text-[11px] font-bold tracking-[0.12em] uppercase text-gold mb-3">Program at a Glance</h4>
              <div className="flex justify-between items-center py-2 border-b border-[#DDD8D0] text-[13px]">
                <span className="text-muted-text">Duration</span>
                <span className="font-bold text-navy">90 Days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#DDD8D0] text-[13px]">
                <span className="text-muted-text">Format</span>
                <span className="font-bold text-navy">Live Cohort</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#DDD8D0] text-[13px]">
                <span className="text-muted-text">Cohort Size</span>
                <span className="font-bold text-navy">8 Founders</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#DDD8D0] text-[13px]">
                <span className="text-muted-text">Investment</span>
                <span className="font-bold text-navy">$8K–$15K</span>
              </div>
              <div className="flex justify-between items-center py-2 text-[13px]">
                <span className="text-muted-text">Equity</span>
                <span className="font-bold text-navy">0%</span>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="flex-1">
            {!submitted ? (
              <form onSubmit={handleSubmit} noValidate>
                {/* Section 1 */}
                <div className="mb-10">
                  <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold mb-1.5">
                    Section 1 of 4
                  </div>
                  <div className="font-serif text-[22px] text-navy mb-1">About You</div>
                  <div className="text-[13px] text-muted-text mb-6 leading-[1.6]">
                    Background and context. We want to understand who you are before we look at your idea.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-navy mb-1.5">
                        First Name <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="Anthony"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                        className={inputStyles}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-navy mb-1.5">
                        Last Name <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Chen"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                        className={inputStyles}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      Email Address <span className="text-gold">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputStyles}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      LinkedIn Profile URL <span className="text-gold">*</span>
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/yourname"
                      value={formData.linkedin}
                      onChange={handleChange}
                      required
                      className={inputStyles}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="block text-[13px] font-semibold text-navy mb-1.5">
                        Current Job Title <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="job_title"
                        placeholder="e.g. VP of Engineering"
                        value={formData.job_title}
                        onChange={handleChange}
                        required
                        className={inputStyles}
                      />
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-navy mb-1.5">
                        Company / Industry <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. Meta / Tech"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className={inputStyles}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      Years of Professional Experience <span className="text-gold">*</span>
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className={selectStyles}
                    >
                      <option value="" disabled>
                        Select range
                      </option>
                      {experienceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <hr className="border-t border-[#DDD8D0] my-9" />

                {/* Section 2 */}
                <div className="mb-10">
                  <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold mb-1.5">
                    Section 2 of 4
                  </div>
                  <div className="font-serif text-[22px] text-navy mb-1">The Buried Idea</div>
                  <div className="text-[13px] text-muted-text mb-6 leading-[1.6]">
                    Tell us about the idea you&apos;ve been sitting on. Don&apos;t worry if it&apos;s rough — rough ideas are
                    expected at this stage.
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      Describe your idea in 2–3 sentences. <span className="text-gold">*</span>
                      <span className="font-normal text-muted-text text-xs ml-1">
                        (What is it? Who is it for? What problem does it solve?)
                      </span>
                    </label>
                    <textarea
                      name="idea_description"
                      placeholder="E.g. A B2B SaaS tool that helps operations teams at mid-size companies automate their vendor onboarding process. Currently, this takes weeks manually and costs companies $30-50K/year in ops hours. I've seen this problem firsthand at three different companies and believe a lightweight tool could solve it."
                      value={formData.idea_description}
                      onChange={handleChange}
                      required
                      className={textareaStyles}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      How long have you been thinking about this idea? <span className="text-gold">*</span>
                    </label>
                    <select
                      name="idea_age"
                      value={formData.idea_age}
                      onChange={handleChange}
                      required
                      className={selectStyles}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {ideaAgeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      What&apos;s your unique insight or unfair advantage? <span className="text-gold">*</span>
                      <span className="font-normal text-muted-text text-xs ml-1">(Why you, why now?)</span>
                    </label>
                    <textarea
                      name="unfair_advantage"
                      placeholder="E.g. I spent 8 years running vendor ops at Amazon and later at a Series B logistics startup. I know this problem from both sides — the buyer and the operator. I have relationships with 40+ operations leaders who would be early users."
                      value={formData.unfair_advantage}
                      onChange={handleChange}
                      required
                      className={textareaStyles}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      What&apos;s the biggest thing that has stopped you from acting on this idea so far?{" "}
                      <span className="text-gold">*</span>
                    </label>
                    <div className="flex flex-col gap-2.5">
                      {blockerOptions.map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-start gap-3 bg-white border-2 rounded-lg p-3.5 px-4 cursor-pointer transition-all duration-200 ${
                            formData.blocker === opt.value
                              ? "border-navy bg-navy/[0.02]"
                              : "border-[#DDD8D0] hover:border-navy hover:bg-navy/[0.02]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="blocker"
                            value={opt.value}
                            checked={formData.blocker === opt.value}
                            onChange={handleChange}
                            required
                            className="w-[18px] h-[18px] min-w-[18px] mt-0.5 accent-navy cursor-pointer"
                          />
                          <span className="text-sm text-navy leading-[1.4]">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="border-t border-[#DDD8D0] my-9" />

                {/* Section 3 */}
                <div className="mb-10">
                  <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold mb-1.5">
                    Section 3 of 4
                  </div>
                  <div className="font-serif text-[22px] text-navy mb-1">Fit & Readiness</div>
                  <div className="text-[13px] text-muted-text mb-6 leading-[1.6]">
                    Honest answers here help us place you in the right track and confirm we can genuinely help you in 90
                    days.
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      What outcome are you hoping for from Hobby? <span className="text-gold">*</span>
                    </label>
                    <textarea
                      name="outcome"
                      placeholder="E.g. I want to know within 90 days whether this idea is worth pursuing full-time. Ideally I'd have my first paying customer and a clear picture of whether to continue. I'm not trying to quit my job tomorrow — I want to test this intelligently before making a bigger commitment."
                      value={formData.outcome}
                      onChange={handleChange}
                      required
                      className={textareaStyles}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      How many hours per week can you realistically commit to Hobby? <span className="text-gold">*</span>
                    </label>
                    <select
                      name="hours_per_week"
                      value={formData.hours_per_week}
                      onChange={handleChange}
                      required
                      className={selectStyles}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {hoursOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      Which Hobby tier are you most interested in? <span className="text-gold">*</span>
                    </label>
                    <div className="flex flex-col gap-2.5">
                      {tierOptions.map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-start gap-3 bg-white border-2 rounded-lg p-3.5 px-4 cursor-pointer transition-all duration-200 ${
                            formData.tier === opt.value
                              ? "border-navy bg-navy/[0.02]"
                              : "border-[#DDD8D0] hover:border-navy hover:bg-navy/[0.02]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="tier"
                            value={opt.value}
                            checked={formData.tier === opt.value}
                            onChange={handleChange}
                            required
                            className="w-[18px] h-[18px] min-w-[18px] mt-0.5 accent-navy cursor-pointer"
                          />
                          <div>
                            <div className="text-sm text-navy leading-[1.4]">
                              {opt.label}
                              {opt.badge && (
                                <span className="text-gold text-[11px] font-bold ml-1.5">{opt.badge}</span>
                              )}
                            </div>
                            {opt.sub && <div className="text-xs text-muted-text mt-0.5">{opt.sub}</div>}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      Have you ever started a business, side project, or entrepreneurial venture before?{" "}
                      <span className="text-gold">*</span>
                    </label>
                    <select
                      name="prior_experience"
                      value={formData.prior_experience}
                      onChange={handleChange}
                      required
                      className={selectStyles}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {priorExperienceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <hr className="border-t border-[#DDD8D0] my-9" />

                {/* Section 4 */}
                <div className="mb-10">
                  <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-gold mb-1.5">
                    Section 4 of 4
                  </div>
                  <div className="font-serif text-[22px] text-navy mb-1">Final Questions</div>
                  <div className="text-[13px] text-muted-text mb-6 leading-[1.6]">
                    Two last things before you submit.
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      Is there anything else you want us to know about your situation or idea?
                      <span className="font-normal text-muted-text text-xs ml-1">(Optional)</span>
                    </label>
                    <textarea
                      name="anything_else"
                      placeholder="Anything that gives us better context — constraints, timelines, co-founders, prior traction, relevant background..."
                      value={formData.anything_else}
                      onChange={handleChange}
                      className={`${textareaStyles} min-h-[90px]`}
                    />
                  </div>

                  <div className="mb-5">
                    <label className="block text-[13px] font-semibold text-navy mb-1.5">
                      How did you hear about Hobby? <span className="text-gold">*</span>
                    </label>
                    <select
                      name="referral_source"
                      value={formData.referral_source}
                      onChange={handleChange}
                      required
                      className={selectStyles}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {referralOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Commitment Box */}
                <div className="bg-navy rounded-[10px] p-7 px-8 mb-8">
                  <h3 className="font-serif text-lg text-cream mb-3.5">Before you submit, confirm your commitment:</h3>
                  <ul className="list-none p-0">
                    {commitments.map((item, index) => (
                      <li
                        key={index}
                        className="text-[13px] text-cream/75 py-1.5 border-b border-white/10 last:border-b-0 flex items-start gap-2.5 before:content-['✓'] before:text-gold before:font-bold before:flex-shrink-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5">
                  <label
                    className={`flex items-start gap-3 bg-cream border-2 rounded-lg p-3.5 px-4 cursor-pointer transition-all duration-200 ${
                      formData.commitment_confirmed ? "border-navy" : "border-[#DDD8D0]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="commitment_confirmed"
                      checked={formData.commitment_confirmed}
                      onChange={handleChange}
                      required
                      className="w-[18px] h-[18px] min-w-[18px] p-0 border-none accent-navy cursor-pointer"
                    />
                    <span className="text-sm text-navy leading-[1.4]">
                      I confirm the above commitments and am applying in good faith. <span className="text-gold">*</span>
                    </span>
                  </label>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gold text-navy border-none text-base font-bold px-14 py-[18px] rounded-[5px] cursor-pointer font-sans transition-all duration-200 tracking-[0.02em] hover:translate-y-[-2px] hover:opacity-90"
                  >
                    Submit Application →
                  </button>
                  <p className="text-xs text-muted-text mt-3">
                    You&apos;ll hear from us within 3 business days. If selected, we&apos;ll invite you to a free 30-minute
                    discovery call — no payment required at this stage.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center py-[60px] px-6">
                <div className="text-[52px] mb-5">✦</div>
                <h2 className="font-serif text-[32px] text-navy mb-3">Application received.</h2>
                <p className="text-base text-muted-text max-w-[480px] mx-auto mb-6 leading-[1.7]">
                  Thank you for applying to Hobby Cohort 1. We review every application personally — you&apos;ll hear from
                  us within 3 business days.
                </p>
                <div className="bg-navy text-cream/80 rounded-lg p-5 px-7 text-sm max-w-[400px] mx-auto text-left leading-[1.8]">
                  <strong className="text-gold">What happens next:</strong>
                  <br />
                  1. We review your application (1–3 days)
                  <br />
                  2. If there&apos;s a fit, we invite you to a free 30-min discovery call
                  <br />
                  3. On the call we confirm fit and answer your questions
                  <br />
                  4. If it&apos;s a go: payment link + onboarding within 24 hours
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-navy px-[5%] py-8 text-center">
        <div className="font-serif text-lg text-cream mb-2">HOBBY</div>
        <div className="text-xs text-cream/35">© 2026 Hobby. A Falcon program. | hello@joinhobby.com</div>
      </footer>
    </main>
  )
}
