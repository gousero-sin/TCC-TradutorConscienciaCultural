import { useState, useEffect } from 'react'

interface Lesson {
  id: number
  title: string
  description: string
  duration: string
  difficulty: string
  progress: number
  category: string
  language: string
}

interface UseLessonsReturn {
  lessons: Lesson[]
  loading: boolean
  error: string | null
  fetchLessons: (language?: string, category?: string) => Promise<void>
  createLesson: (lesson: Omit<Lesson, 'id' | 'progress'>) => Promise<Lesson | null>
  updateProgress: (lessonId: number, progress: number) => Promise<void>
}

export function useLessons(): UseLessonsReturn {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLessons = async (language?: string, category?: string) => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (language) params.append('language', language)
      if (category) params.append('category', category)
      
      const response = await fetch(`/api/lessons?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch lessons')
      }
      
      const data = await response.json()
      setLessons(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createLesson = async (lesson: Omit<Lesson, 'id' | 'progress'>): Promise<Lesson | null> => {
    try {
      const response = await fetch('/api/lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lesson),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create lesson')
      }
      
      const data = await response.json()
      const newLesson = data.data
      
      setLessons(prev => [...prev, newLesson])
      return newLesson
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    }
  }

  const updateProgress = async (lessonId: number, progress: number) => {
    try {
      // Em produção, faria uma chamada API para atualizar o progresso
      setLessons(prev => 
        prev.map(lesson => 
          lesson.id === lessonId 
            ? { ...lesson, progress: Math.min(100, Math.max(0, progress)) }
            : lesson
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  useEffect(() => {
    fetchLessons()
  }, [])

  return {
    lessons,
    loading,
    error,
    fetchLessons,
    createLesson,
    updateProgress
  }
}