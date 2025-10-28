import { NextRequest, NextResponse } from 'next/server'

// Mock data - em produção viria do banco de dados
const lessons = [
  {
    id: 1,
    title: 'Cumprimentos Básicos',
    description: 'Aprenda a se apresentar e saudar pessoas',
    duration: '15 min',
    difficulty: 'Fácil',
    progress: 100,
    category: 'basics',
    language: 'en'
  },
  {
    id: 2,
    title: 'No Restaurante',
    description: 'Como fazer pedidos e pedir a conta',
    duration: '20 min',
    difficulty: 'Médio',
    progress: 75,
    category: 'daily',
    language: 'en'
  },
  {
    id: 3,
    title: 'Direções e Transporte',
    description: 'Navegue pela cidade com confiança',
    duration: '25 min',
    difficulty: 'Médio',
    progress: 30,
    category: 'travel',
    language: 'en'
  },
  {
    id: 4,
    title: 'Conversas Informais',
    description: 'Fale sobre hobbies e interesses',
    duration: '30 min',
    difficulty: 'Difícil',
    progress: 0,
    category: 'social',
    language: 'en'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language')
    const category = searchParams.get('category')
    
    let filteredLessons = lessons
    
    if (language) {
      filteredLessons = filteredLessons.filter(lesson => lesson.language === language)
    }
    
    if (category) {
      filteredLessons = filteredLessons.filter(lesson => lesson.category === category)
    }
    
    return NextResponse.json({
      success: true,
      data: filteredLessons
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch lessons' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, duration, difficulty, category, language } = body
    
    // Em produção, salvaria no banco de dados
    const newLesson = {
      id: lessons.length + 1,
      title,
      description,
      duration,
      difficulty,
      progress: 0,
      category,
      language
    }
    
    lessons.push(newLesson)
    
    return NextResponse.json({
      success: true,
      data: newLesson
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create lesson' },
      { status: 500 }
    )
  }
}