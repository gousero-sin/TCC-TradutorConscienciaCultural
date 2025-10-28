import { useState } from 'react'
import { copyToClipboard } from '@/lib/clipboard'

interface UseTranslationReturn {
  translatedText: string | null
  literalTranslation: string | null
  culturalNotes: string | null
  isTranslating: boolean
  error: string | null
  translate: (text: string, sourceLang: string, targetLang: string, culturalContext?: string) => Promise<void>
  copyToClipboard: (text: string) => Promise<boolean>
}

export function useTranslation(): UseTranslationReturn {
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [literalTranslation, setLiteralTranslation] = useState<string | null>(null)
  const [culturalNotes, setCulturalNotes] = useState<string | null>(null)
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translate = async (text: string, sourceLang: string, targetLang: string, culturalContext = 'general') => {
    if (!text.trim()) {
      setError('Por favor, digite um texto para traduzir')
      return
    }

    if (sourceLang === targetLang) {
      setError('Os idiomas de origem e destino devem ser diferentes')
      return
    }

    setIsTranslating(true)
    setError(null)

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          source_lang: sourceLang,
          target_lang: targetLang,
          cultural_context: culturalContext
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao traduzir texto')
      }

      const data = await response.json()
      setTranslatedText(data.translated_text)
      setLiteralTranslation(data.literal_translation)
      setCulturalNotes(data.cultural_notes)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      setTranslatedText(null)
      setLiteralTranslation(null)
      setCulturalNotes(null)
    } finally {
      setIsTranslating(false)
    }
  }

  return {
    translatedText,
    literalTranslation,
    culturalNotes,
    isTranslating,
    error,
    translate,
    copyToClipboard
  }
}