import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Insert into newsletter_subscribers table
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email, subscribed: true }])
      .select()

    if (error) {
      console.error('[v0] Supabase error:', error)
      
      // Check if it's a duplicate key error
      if (error.code === '23505' || error.message?.includes('duplicate')) {
        return NextResponse.json(
          { error: 'This email is already subscribed' },
          { status: 409 }
        )
      }
      
      throw error
    }

    console.log('[v0] Newsletter subscription successful:', data)

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Newsletter subscription error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to subscribe to newsletter',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
