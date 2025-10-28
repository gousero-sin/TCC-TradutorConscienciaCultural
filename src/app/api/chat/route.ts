import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, language = 'en', context = 'language_learning' } = body
    
    const zai = await ZAI.create()
    
    const systemPrompt = `Você é um assistente de aprendizado de idiomas especializado em ${language}. 
    Sua função é ajudar o usuário a praticar o idioma de forma natural e educativa.
    - Responda sempre no idioma que o usuário está praticando (${language})
    - Seja paciente e encorajador
    - Corrija erros de forma construtiva
    - Forneça explicações claras quando necessário
    - Mantenha as conversas naturais e interessantes
    - Adapte o nível de dificuldade ao do usuário`

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    const aiResponse = completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.'

    return NextResponse.json({
      success: true,
      data: {
        message: aiResponse,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process chat message',
        message: 'Desculpe, estou com problemas para responder. Tente novamente em instantes.'
      },
      { status: 500 }
    )
  }
}