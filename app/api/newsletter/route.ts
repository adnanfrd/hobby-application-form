import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, name } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { error: 'Valid email is required' },
      { status: 400 }
    )
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase is not configured' },
        { status: 500 }
      )
    }

    const functionResponse = await fetch(`${supabaseUrl}/functions/v1/send-newsletter-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({ email, name }),
    })

    const data = await functionResponse.json().catch(() => null)

    if (!functionResponse.ok) {
      return NextResponse.json(
        { error: data?.error || 'Failed to subscribe to newsletter' },
        { status: functionResponse.status }
      )
    }

    return NextResponse.json(data, { status: functionResponse.status })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}
