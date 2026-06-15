import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, name, company, role, ideaStage, biggestChallenge, heardFrom, additionalNotes } = await request.json()

  if (!email || !name) {
    return NextResponse.json(
      { error: 'Email and name are required' },
      { status: 400 }
    )
  }

  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('survey_responses')
      .insert([
        {
          email,
          name,
          company: company || null,
          role: role || null,
          idea_stage: ideaStage || null,
          biggest_challenge: biggestChallenge || null,
          heard_from: heardFrom || null,
          additional_notes: additionalNotes || null,
        },
      ])
      .select()

    if (error) throw error

    // Also subscribe to newsletter
    await supabase
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select()
      .catch(() => {
        // Ignore if already subscribed
      })

    return NextResponse.json(
      { message: 'Survey submitted successfully', data },
      { status: 201 }
    )
  } catch (error) {
    console.error('Survey submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit survey' },
      { status: 500 }
    )
  }
}
