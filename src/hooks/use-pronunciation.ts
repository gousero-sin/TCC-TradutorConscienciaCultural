import { useState } from 'react'

interface PronunciationResult {
  overallScore: number
  breakdown: {
    accuracy: number
    fluency: number
    pronunciation: number
  }
  feedback: string
  wordsToImprove: string[]
  suggestions: string[]
}

interface UsePronunciationReturn {
  result: PronunciationResult | null
  loading: boolean
  error: string | null
  analyzePronunciation: (audioData: string, targetPhrase: string, language?: string) => Promise<void>
  clearResult: () => void
}

export function usePronunciation(): UsePronunciationReturn {
  const [result, setResult] = useState<PronunciationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzePronunciation = async (audioData: string, targetPhrase: string, language = 'en') => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/pronunciation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audioData,
          targetPhrase,
          language
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to analyze pronunciation')
      }
      
      const data = await response.json()
      setResult(data.data)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const clearResult = () => {
    setResult(null)
    setError(null)
  }

  return {
    result,
    loading,
    error,
    analyzePronunciation,
    clearResult
  }
}