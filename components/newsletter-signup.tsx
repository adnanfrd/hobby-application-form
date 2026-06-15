'use client'

import { useState } from 'react'
import { FaBell } from 'react-icons/fa6'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to subscribe',
        })
        return
      }

      setMessage({
        type: 'success',
        text: 'Successfully subscribed to our newsletter!',
      })
      setEmail('')
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-cream placeholder-muted-text focus:outline-none focus:border-gold transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gold text-midnight font-semibold rounded-lg hover:bg-gold/90 disabled:opacity-50 transition flex items-center gap-2"
        >
          <FaBell size={16} />
          Subscribe
        </button>
      </div>
      {message && (
        <p className={`text-sm ${message.type === 'success' ? 'text-green' : 'text-red'}`}>
          {message.text}
        </p>
      )}
    </form>
  )
}
