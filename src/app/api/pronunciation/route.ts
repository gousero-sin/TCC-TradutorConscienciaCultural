import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { audioData, targetPhrase, language = 'en' } = body
    
    // Simulação de análise de pronúncia
    // Em produção, integraria com uma API real de reconhecimento de fala
    
    // Gerar pontuação aleatória para demonstração
    const accuracy = Math.floor(Math.random() * 30) + 70 // 70-100%
    const fluency = Math.floor(Math.random() * 20) + 80 // 80-100%
    const pronunciation = Math.floor(Math.random() * 25) + 75 // 75-100%
    
    const overallScore = Math.round((accuracy + fluency + pronunciation) / 3)
    
    let feedback = ''
    if (overallScore >= 90) {
      feedback = 'Excelente! Sua pronúncia é perfeita.'
    } else if (overallScore >= 80) {
      feedback = 'Muito bom! Continue praticando para melhorar ainda mais.'
    } else if (overallScore >= 70) {
      feedback = 'Bom trabalho! Preste atenção aos sons específicos do idioma.'
    } else {
      feedback = 'Continue praticando! Ouça atentamente a pronúncia nativa.'
    }
    
    // Simular palavras específicas que precisam melhorar
    const wordsToImprove = targetPhrase.split(' ').filter(() => Math.random() > 0.7).slice(0, 2)
    
    return NextResponse.json({
      success: true,
      data: {
        overallScore,
        breakdown: {
          accuracy,
          fluency,
          pronunciation
        },
        feedback,
        wordsToImprove,
        suggestions: wordsToImprove.length > 0 ? [
          `Tente enfatizar a sílaba correta em "${wordsToImprove.join(', ')}"`,
          'Ouça atentamente a pronúncia nativa e repita várias vezes',
          'Grave sua voz e compare com a pronúncia original'
        ] : [
          'Sua pronúncia está ótima!',
          'Continue praticando para manter o nível',
          'Tente conversas mais complexas para desafiar-se'
        ]
      }
    })

  } catch (error) {
    console.error('Pronunciation analysis error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to analyze pronunciation',
        message: 'Não foi possível analisar sua pronúncia. Tente novamente.'
      },
      { status: 500 }
    )
  }
}