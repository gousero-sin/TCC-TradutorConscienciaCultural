import { useState } from 'react'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface UseChatReturn {
  messages: ChatMessage[]
  loading: boolean
  error: string | null
  sendMessage: (message: string, language?: string) => Promise<void>
  clearMessages: () => void
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! How can I help you practice English today?',
      timestamp: new Date().toISOString()
    }
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (message: string, language = 'en') => {
    try {
      setLoading(true)
      setError(null)
      
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, userMessage])
      
      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          language,
          context: 'language_learning'
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      
      const data = await response.json()
      
      // Add assistant response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.data.message,
        timestamp: data.data.timestamp
      }
      
      setMessages(prev => [...prev, assistantMessage])
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      
      // Add error message
      const errorChatMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I\'m having trouble responding. Please try again.',
        timestamp: new Date().toISOString()
      }
      
      setMessages(prev => [...prev, errorChatMessage])
    } finally {
      setLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! How can I help you practice English today?',
        timestamp: new Date().toISOString()
      }
    ])
    setError(null)
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages
  }
}