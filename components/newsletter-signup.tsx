'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      console.log('[v0] Sending newsletter signup to Edge Function:', email)
      
      const response = await fetch(
        'https://dzmntqvjcaflwwtxpowk.supabase.co/functions/v1/send-newsletter-email',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email,
            name: email.split('@')[0]
          }),
        }
      )

      const data = await response.json()
      console.log('[v0] Edge Function response:', data, 'Status:', response.status)

      if (!response.ok) {
        console.error('[v0] Edge Function error:', data)
        setMessage({
          type: 'error',
          text: data.error || 'Failed to subscribe. Please try again.',
        })
        setLoading(false)
        return
      }

      setMessage({
        type: 'success',
        text: 'Successfully subscribed! Check your email for a welcome message.',
      })
      setEmail('')
    } catch (error) {
      console.error('[v0] Subscription error:', error)
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
        {loading ? 'Subscribing...' : 'Subscribe →'}
      </button>
      {message && (
        <p className={`text-sm w-full ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message.text}
        </p>
      )}
    </form>
  )
}
