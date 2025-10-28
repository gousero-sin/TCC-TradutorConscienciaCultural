import { NextRequest, NextResponse } from 'next/server'

// Configuração da API DeepSeek
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY

// Mapeamento de códigos de idioma para nomes
const languageMap: { [key: string]: string } = {
  'en': 'Inglês',
  'es': 'Espanhol', 
  'fr': 'Francês',
  'de': 'Alemão',
  'it': 'Italiano',
  'pt': 'Português',
  'zh': 'Chinês',
  'ja': 'Japonês',
  'ru': 'Russo',
  'ar': 'Árabe'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, source_lang, target_lang, cultural_context = 'general' } = body

    if (!text || !source_lang || !target_lang) {
      return NextResponse.json(
        { error: 'Parâmetros obrigatórios: text, source_lang, target_lang' },
        { status: 400 }
      )
    }

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API key não configurada' },
        { status: 500 }
      )
    }

    const sourceLanguage = languageMap[source_lang] || source_lang
    const targetLanguage = languageMap[target_lang] || target_lang

    // Contextos culturais específicos
    const culturalContexts = {
      general: 'tradução padrão para uso cotidiano',
      formal: 'contexto profissional, acadêmico ou empresarial',
      casual: 'conversação informal com amigos e familiares',
      academic: 'pesquisas, artigos científicos e conteúdo educacional',
      creative: 'literatura, poesia, música e expressão artística',
      technical: 'documentação técnica, manuais e especializada'
    }

    const contextDescription = culturalContexts[cultural_context as keyof typeof culturalContexts] || cultural_contexts.general

    const prompt = `Traduza o seguinte texto de ${sourceLanguage} para ${targetLanguage}.

CONTEXTO CULTURAL ESPECÍFICO: ${contextDescription.toUpperCase()}

Instruções importantes:
1. Adapte a tradução ao contexto cultural especificado
2. Considere as nuances culturais, sociais e situacionais
3. Use o tom e registro apropriados para o contexto
4. Mantenha o significado original, mas adapte a forma
5. Para contexto formal: use linguagem polida e profissional
6. Para contexto informal: use linguagem casual e natural
7. Para contexto acadêmico: use terminologia precisa e formal
8. Para contexto criativo: preserve elementos artísticos e emocionais
9. Para contexto técnico: use terminologia especializada correta

Texto original: ${text}

Forneça a resposta no seguinte formato JSON:
{
  "cultural_translation": "tradução culturalmente adaptada",
  "literal_translation": "tradução literal direta",
  "cultural_notes": "explicação detalhada das adaptações culturais feitas, incluindo expressões idiomáticas, referências culturais e justificativas das mudanças"
}`

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `Você é um tradutor profissional especializado em tradução cultural e contextual. Sua função é traduzir textos considerando profundamente o contexto cultural, social e situacional especificado. Adapte a tradução para que soe natural e apropriada para o público-alvo no contexto específico, mantendo o significado original mas ajustando o tom, registro e expressões idiomáticas conforme necessário.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.4,
        max_tokens: 2000,
        stream: false
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('DeepSeek API error:', errorData)
      
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'API key do DeepSeek inválida' },
          { status: 401 }
        )
      }
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Limite de requisições da API DeepSeek excedido' },
          { status: 429 }
        )
      }

      return NextResponse.json(
        { error: 'Erro na API DeepSeek' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const responseContent = data.choices?.[0]?.message?.content?.trim()

    if (!responseContent) {
      return NextResponse.json(
        { error: 'Resposta inválida da API DeepSeek' },
        { status: 500 }
      )
    }

    // Tentar fazer parse do JSON retornado
    let translationData
    try {
      // Procurar por JSON na resposta
      const jsonMatch = responseContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        translationData = JSON.parse(jsonMatch[0])
      } else {
        // Fallback para formato antigo se não encontrar JSON
        translationData = {
          cultural_translation: responseContent,
          literal_translation: responseContent,
          cultural_notes: "Tradução padrão sem análise cultural detalhada."
        }
      }
    } catch (parseError) {
      console.error('Error parsing translation JSON:', parseError)
      // Fallback se o JSON for inválido
      translationData = {
        cultural_translation: responseContent,
        literal_translation: responseContent,
        cultural_notes: "Erro ao processar análise cultural. Tradução padrão aplicada."
      }
    }

    return NextResponse.json({
      success: true,
      translated_text: translationData.cultural_translation,
      literal_translation: translationData.literal_translation,
      cultural_notes: translationData.cultural_notes,
      source_lang,
      target_lang,
      cultural_context
    })

  } catch (error) {
    console.error('Translation API error:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno ao processar tradução',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

// Endpoint para teste da API
export async function GET() {
  return NextResponse.json({
    message: 'API de tradução cultural com DeepSeek',
    status: 'operational',
    configured: !!DEEPSEEK_API_KEY,
    supported_languages: Object.keys(languageMap),
    cultural_contexts: [
      { id: 'general', name: 'Geral', description: 'Tradução padrão para uso cotidiano' },
      { id: 'formal', name: 'Formal', description: 'Contexto profissional e acadêmico' },
      { id: 'casual', name: 'Informal', description: 'Conversação com amigos e familiares' },
      { id: 'academic', name: 'Acadêmico', description: 'Pesquisas e conteúdo educacional' },
      { id: 'creative', name: 'Criativo', description: 'Literatura e expressão artística' },
      { id: 'technical', name: 'Técnico', description: 'Documentação especializada' }
    ]
  })
}