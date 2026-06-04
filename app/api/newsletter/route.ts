import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { error: 'Valid email is required' },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}
