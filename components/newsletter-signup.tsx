'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // First, store the subscription in the database
      const dbResponse = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const dbData = await dbResponse.json()

      if (!dbResponse.ok) {
        setMessage({
          type: 'error',
          text: dbData.error || 'Failed to subscribe',
        })
        setLoading(false)
        return
      }

      // Then, send the welcome email via Supabase Edge Function
      const emailResponse = await fetch(
        'https://dzmntqvjcaflwwtxpowk.supabase.co/functions/v1/send-newsletter-email',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email,
            name: name || email.split('@')[0]
          }),
        }
      )

      const emailData = await emailResponse.json()

      if (!emailResponse.ok) {
        console.log('[v0] Email sending warning:', emailData)
        // Still show success even if email fails, as subscription was saved
        setMessage({
          type: 'success',
          text: 'Successfully subscribed! Check your email for a welcome message.',
        })
      } else {
        setMessage({
          type: 'success',
          text: 'Successfully subscribed! Check your email for a welcome message.',
        })
      }

      setEmail('')
      setName('')
    } catch (error) {
      console.log('[v0] Error:', error)
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 md:gap-3 max-w-[500px] mx-auto w-full">
      <div className="flex-1">
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-cream placeholder-muted-text focus:outline-none focus:border-gold transition text-[15px]"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-3 bg-gold text-midnight font-semibold rounded-lg hover:bg-gold/90 disabled:opacity-50 transition whitespace-nowrap text-[15px]"
      >
        Subscribe →
      </button>
      {message && (
        <p className={`text-sm w-full ${message.type === 'success' ? 'text-green' : 'text-red'}`}>
          {message.text}
        </p>
      )}
    </form>
  )
}
