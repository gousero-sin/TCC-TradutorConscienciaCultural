import { useState } from 'react'
import { copyToClipboard } from '@/lib/clipboard'

export function useSafeClipboard() {
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const copy = async (text: string) => {
    try {
      setError(null)
      const success = await copyToClipboard(text)
      
      if (success) {
        setIsCopied(true)
        // Reset after 2 seconds
        setTimeout(() => setIsCopied(false), 2000)
      } else {
        setError('Não foi possível copiar o texto')
      }
    } catch (err) {
      setError('Erro ao copiar texto')
      console.warn('Clipboard operation failed:', err)
    }
  }

  const reset = () => {
    setIsCopied(false)
    setError(null)
  }

  return {
    copy,
    isCopied,
    error,
    reset
  }
}