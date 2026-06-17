'use client'

import { useState } from 'react'
import { FaArrowRight, FaCircleCheck } from 'react-icons/fa6'
import { invokeEdgeFunction } from '@/lib/supabase/functions'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const isEmailEmpty = email.trim().length === 0
  const isSubscribed = message?.type === 'success'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isEmailEmpty) {
      setMessage({
        type: 'error',
        text: 'Enter your email to subscribe.',
      })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      await invokeEdgeFunction('send-newsletter-email', { email })

      setMessage({
        type: 'success',
        text: 'You are subscribed to the Hobby Brief.',
      })
      setEmail('')
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'An error occurred. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <div className="mx-auto w-full max-w-[520px] rounded-lg border border-green/25 bg-green/10 px-5 py-4 text-left sm:text-center">
        <div className="flex items-start gap-3 sm:justify-center">
          <FaCircleCheck className="mt-0.5 flex-shrink-0 text-green" size={18} />
          <div>
            <p className="text-[15px] font-semibold text-cream">{message.text}</p>
            <p className="mt-1 text-[13px] leading-[1.6] text-muted-text">
              Check your inbox for the welcome email.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[540px]">
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <div className="min-w-0">
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (message?.type === 'error') setMessage(null)
            }}
            required
            aria-invalid={message?.type === 'error'}
            aria-describedby={message?.type === 'error' ? 'newsletter-message' : undefined}
            className="h-14 w-full rounded-lg border border-white/20 bg-white/10 px-4 text-[15px] text-cream placeholder:text-muted-text outline-none transition focus:border-gold focus:bg-white/[0.14] focus:ring-2 focus:ring-gold/20"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-lg bg-gold px-7 text-[15px] font-semibold text-midnight transition hover:bg-gold-lt disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-muted-text"
        >
          {loading ? 'Subscribing' : 'Subscribe'}
          {!loading && <FaArrowRight size={14} />}
        </button>
      </div>

      {message?.type === 'error' && (
        <p id="newsletter-message" className="mt-3 text-center text-sm text-red">
          {message.text}
        </p>
      )}
    </form>
  )
}
