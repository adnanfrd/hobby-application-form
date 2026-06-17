'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, LoaderCircle } from 'lucide-react'
import { invokeEdgeFunction } from '@/lib/supabase/functions'

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getNewsletterErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : ''
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('already') || lowerMessage.includes('duplicate')) {
    return 'This email is already subscribed. You are good to go.'
  }

  if (lowerMessage.includes('invalid') || lowerMessage.includes('email')) {
    return 'That email address does not look right. Please check it and try again.'
  }

  if (lowerMessage.includes('failed to fetch') || lowerMessage.includes('network')) {
    return 'We could not reach the newsletter service. Please check your connection and try again.'
  }

  return message || 'Something went wrong while subscribing. Please try again.'
}

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const isEmailEmpty = email.trim().length === 0
  const isSubscribed = message?.type === 'success'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setMessage({
        type: 'error',
        text: 'Enter your email to subscribe.',
      })
      return
    }

    if (!isValidEmail(trimmedEmail)) {
      setMessage({
        type: 'error',
        text: 'Enter a valid email address, for example you@company.com.',
      })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      await invokeEdgeFunction('send-newsletter-email', { email: trimmedEmail })

      setMessage({
        type: 'success',
        text: 'You are subscribed to the Hobby Brief.',
      })
      setEmail('')
    } catch (error) {
      setMessage({
        type: 'error',
        text: getNewsletterErrorMessage(error),
      })
    } finally {
      setLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <div className="mx-auto w-full max-w-[520px] rounded-lg border border-green/25 bg-green/10 px-5 py-4 text-left sm:text-center">
        <div className="flex items-start gap-3 sm:justify-center">
          <CheckCircle2 className="mt-0.5 flex-shrink-0 text-green" size={18} />
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
          {loading ? <LoaderCircle className="animate-spin" size={16} /> : <ArrowRight size={14} />}
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
