'use client'

import { useRef, useState } from 'react'
import { CheckCircle2, LoaderCircle } from 'lucide-react'
import { invokeEdgeFunction } from '@/lib/supabase/functions'

interface SurveyFormData {
  email: string
  name: string
  company: string
  role: string
  ideaStage: string
  biggestChallenge: string
  heardFrom: string
  additionalNotes: string
}

type SurveyErrors = Partial<Record<keyof SurveyFormData, string>>

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function SurveyForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<SurveyFormData>({
    email: '',
    name: '',
    company: '',
    role: '',
    ideaStage: '',
    biggestChallenge: '',
    heardFrom: '',
    additionalNotes: '',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<SurveyErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validateForm = () => {
    const errors: SurveyErrors = {}
    const email = formData.email.trim()

    if (!email) errors.email = 'Email is required.'
    else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.'
    if (!formData.name.trim()) errors.name = 'Name is required.'

    return errors
  }

  const focusFirstError = (errors: SurveyErrors) => {
    const firstField = Object.keys(errors)[0]
    const element = formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      focusFirstError(errors)
      return
    }

    setLoading(true)
    setError(null)

    try {
      await invokeEdgeFunction('submit-survey', formData)

      setSubmitted(true)
      setFieldErrors({})
      setFormData({
        email: '',
        name: '',
        company: '',
        role: '',
        ideaStage: '',
        biggestChallenge: '',
        heardFrom: '',
        additionalNotes: '',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-card-dark rounded-lg border border-green/20 p-5 sm:p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 text-green" size={34} />
        <h3 className="text-2xl font-bold text-green mb-2">Thank you!</h3>
        <p className="text-cream mb-4">We&apos;ve received your survey response and will review it shortly.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="w-full sm:w-auto px-6 py-2 bg-gold text-midnight font-semibold rounded-lg hover:bg-gold/90 transition"
        >
          Submit Another Response
        </button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="bg-card-dark rounded-lg border border-border-white p-5 sm:p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-cream mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? 'survey-email-error' : undefined}
            placeholder="your@email.com"
            className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-cream placeholder-muted-text focus:outline-none focus:border-gold transition ${
              fieldErrors.email ? 'border-red/70 bg-red/10' : 'border-white/20'
            }`}
          />
          {fieldErrors.email && <p id="survey-email-error" className="mt-2 text-xs text-red">{fieldErrors.email}</p>}
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-cream mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'survey-name-error' : undefined}
            placeholder="Your name"
            className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-cream placeholder-muted-text focus:outline-none focus:border-gold transition ${
              fieldErrors.name ? 'border-red/70 bg-red/10' : 'border-white/20'
            }`}
          />
          {fieldErrors.name && <p id="survey-name-error" className="mt-2 text-xs text-red">{fieldErrors.name}</p>}
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-semibold text-cream mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company name"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-cream placeholder-muted-text focus:outline-none focus:border-gold transition"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-semibold text-cream mb-2">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Your role"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-cream placeholder-muted-text focus:outline-none focus:border-gold transition"
          />
        </div>

        {/* Idea Stage */}
        <div>
          <label className="block text-sm font-semibold text-cream mb-2">What stage is your idea at?</label>
          <select
            name="ideaStage"
            value={formData.ideaStage}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-cream focus:outline-none focus:border-gold transition"
          >
            <option value="">Select...</option>
            <option value="just-an-idea">Just an idea</option>
            <option value="early-validation">Early validation</option>
            <option value="prototype">Prototype</option>
            <option value="MVP">MVP</option>
            <option value="early-users">Early users</option>
            <option value="launched">Launched</option>
          </select>
        </div>

        {/* Biggest Challenge */}
        <div>
          <label className="block text-sm font-semibold text-cream mb-2">What&apos;s your biggest challenge?</label>
          <select
            name="biggestChallenge"
            value={formData.biggestChallenge}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-cream focus:outline-none focus:border-gold transition"
          >
            <option value="">Select...</option>
            <option value="finding-time">Finding time</option>
            <option value="market-fit">Finding market fit</option>
            <option value="building">Building</option>
            <option value="funding">Funding</option>
            <option value="distribution">Distribution</option>
            <option value="team">Building a team</option>
          </select>
        </div>
      </div>

      {/* How did you hear about us */}
      <div>
        <label className="block text-sm font-semibold text-cream mb-2">How did you hear about us?</label>
        <select
          name="heardFrom"
          value={formData.heardFrom}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-cream focus:outline-none focus:border-gold transition"
        >
          <option value="">Select...</option>
          <option value="google">Google</option>
          <option value="social-media">Social media</option>
          <option value="friend">Friend</option>
          <option value="twitter">Twitter</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-sm font-semibold text-cream mb-2">Anything else you&apos;d like to tell us?</label>
        <textarea
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          placeholder="Share any additional thoughts or context..."
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-cream placeholder-muted-text focus:outline-none focus:border-gold transition resize-none"
        />
      </div>

      {error && <p className="rounded-md border border-red/25 bg-red/10 px-4 py-3 text-sm text-red">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-gold text-midnight font-semibold rounded-lg hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-50 transition"
      >
        {loading ? 'Submitting...' : 'Submit Survey'}
        {loading && <LoaderCircle className="animate-spin" size={17} />}
      </button>
    </form>
  )
}
