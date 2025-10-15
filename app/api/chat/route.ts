import { NextRequest, NextResponse } from 'next/server'
import { getAIAssistance } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const response = await getAIAssistance(message)

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Error getting AI assistance:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get AI response' },
      { status: 500 }
    )
  }
}
