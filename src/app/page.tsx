'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'
import { CulturalAnalysis } from '@/components/cultural-analysis'
import { useTranslation } from '@/hooks/use-translation'
import { 
  Languages, 
  ArrowRightLeft, 
  Copy, 
  Volume2,
  Loader2,
  CheckCircle,
  Globe,
  Users,
  Briefcase,
  GraduationCap,
  Heart,
  Gamepad2,
  BookOpen
} from 'lucide-react'

const languages = [
  { code: 'en', name: 'Inglês', flag: '🇺🇸' },
  { code: 'es', name: 'Espanhol', flag: '🇪🇸' },
  { code: 'fr', name: 'Francês', flag: '🇫🇷' },
  { code: 'de', name: 'Alemão', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'zh', name: 'Chinês', flag: '🇨🇳' },
  { code: 'ja', name: 'Japonês', flag: '🇯🇵' },
  { code: 'ru', name: 'Russo', flag: '🇷🇺' },
  { code: 'ar', name: 'Árabe', flag: '🇸🇦' }
]

const culturalContexts = [
  {
    id: 'general',
    name: 'Geral',
    description: 'Tradução padrão para uso cotidiano',
    icon: <Globe className="w-4 h-4" />,
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  {
    id: 'formal',
    name: 'Formal',
    description: 'Contexto profissional e acadêmico',
    icon: <Briefcase className="w-4 h-4" />,
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  {
    id: 'casual',
    name: 'Informal',
    description: 'Conversação com amigos e familiares',
    icon: <Users className="w-4 h-4" />,
    color: 'bg-green-500/20 text-green-400 border-green-500/30'
  },
  {
    id: 'academic',
    name: 'Acadêmico',
    description: 'Pesquisas, artigos e conteúdo educacional',
    icon: <GraduationCap className="w-4 h-4" />,
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  },
  {
    id: 'creative',
    name: 'Criativo',
    description: 'Literatura, poesia e expressão artística',
    icon: <Heart className="w-4 h-4" />,
    color: 'bg-pink-500/20 text-pink-400 border-pink-500/30'
  },
  {
    id: 'technical',
    name: 'Técnico',
    description: 'Documentação e manuais especializados',
    icon: <Gamepad2 className="w-4 h-4" />,
    color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
  }
]

export default function Home() {
  const [sourceText, setSourceText] = useState('')
  const [sourceLang, setSourceLang] = useState('pt')
  const [targetLang, setTargetLang] = useState('en')
  const [culturalContext, setCulturalContext] = useState('general')
  const [copied, setCopied] = useState(false)

  const { 
    translatedText, 
    literalTranslation,
    culturalNotes,
    isTranslating, 
    error, 
    translate, 
    copyToClipboard 
  } = useTranslation()

  const handleTranslate = () => {
    if (sourceText.trim()) {
      translate(sourceText, sourceLang, targetLang, culturalContext)
    }
  }

  const handleSwapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText || '')
  }

  const handleCopy = async () => {
    const success = await copyToClipboard(translatedText || '')
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleTranslate()
    }
  }

  const selectedContext = culturalContexts.find(ctx => ctx.id === culturalContext)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Languages className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Tradutor Cultural
                </h1>
                <p className="text-sm text-muted-foreground">
                  Tradutor Cultural com DeepSeek
                </p>
              </div>
            </div>
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Tradução com Contexto Cultural
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Traduza textos considerando o contexto cultural, social e situacional apropriado
            </p>
          </div>

          {/* Cultural Context Selection */}
          <Card className="mb-6 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Globe className="w-5 h-5" />
                Contexto Cultural
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Selecione o contexto cultural para uma tradução mais precisa e apropriada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {culturalContexts.map((context) => (
                  <Button
                    key={context.id}
                    variant={culturalContext === context.id ? "default" : "outline"}
                    className={`h-auto p-3 flex flex-col items-center gap-2 ${
                      culturalContext === context.id 
                        ? context.color 
                        : 'border-border hover:bg-accent'
                    }`}
                    onClick={() => setCulturalContext(context.id)}
                  >
                    {context.icon}
                    <span className="text-xs font-medium">{context.name}</span>
                  </Button>
                ))}
              </div>
              {selectedContext && (
                <div className="mt-4 p-3 rounded-lg bg-accent/50 border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    {selectedContext.icon}
                    <span className="font-medium text-foreground">{selectedContext.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedContext.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Translation Interface */}
          <Card className="mb-8 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Languages className="w-5 h-5" />
                Tradutor Inteligente
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Digite ou cole o texto que deseja traduzir com contexto cultural
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Selection */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Select value={sourceLang} onValueChange={setSourceLang}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecione o idioma de origem" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center space-x-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapLanguages}
                  className="shrink-0 border-border hover:bg-accent"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </Button>

                <div className="flex-1">
                  <Select value={targetLang} onValueChange={setTargetLang}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Selecione o idioma de destino" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          <div className="flex items-center space-x-2">
                            <span>{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="bg-border" />

              {/* Text Areas */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Source Text */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Texto Original</label>
                  <Textarea
                    placeholder="Digite ou cole o texto aqui..."
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[200px] resize-none bg-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                  <div className="text-xs text-muted-foreground">
                    {sourceText.length} caracteres • Pressione Ctrl+Enter para traduzir
                  </div>
                </div>

                {/* Translated Text */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Tradução Cultural</label>
                    <div className="flex items-center gap-2">
                      {translatedText && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopy}
                            className="h-8 px-2 hover:bg-accent"
                          >
                            {copied ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 hover:bg-accent"
                            onClick={() => {
                              const analysisElement = document.getElementById('cultural-analysis')
                              analysisElement?.scrollIntoView({ behavior: 'smooth' })
                            }}
                          >
                            <BookOpen className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 hover:bg-accent"
                      >
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="relative">
                    <Textarea
                      placeholder="A tradução cultural aparecerá aqui..."
                      value={translatedText || ''}
                      readOnly
                      className="min-h-[200px] resize-none bg-muted border-border text-foreground"
                    />
                    {isTranslating && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-md">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-sm text-foreground">Traduzindo com contexto cultural...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {translatedText && (
                    <div className="text-xs text-muted-foreground">
                      {translatedText?.length || 0} caracteres • Contexto: {selectedContext?.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                  <p className="text-sm text-destructive">
                    Erro: {error}
                  </p>
                </div>
              )}

              {/* Translate Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleTranslate}
                  disabled={!sourceText.trim() || isTranslating}
                  size="lg"
                  className="px-8 bg-primary hover:bg-primary/90"
                >
                  {isTranslating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Traduzindo...
                    </>
                  ) : (
                    <>
                      <Languages className="w-4 h-4 mr-2" />
                      Traduzir com Contexto
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cultural Analysis */}
          <div id="cultural-analysis">
            <CulturalAnalysis
              culturalTranslation={translatedText}
              literalTranslation={literalTranslation}
              culturalNotes={culturalNotes}
              culturalContext={culturalContext}
              isTranslating={isTranslating}
            />
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Languages className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">Contexto Cultural</h3>
                <p className="text-sm text-muted-foreground">
                  Traduções adaptadas ao contexto social e cultural apropriado
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Copy className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">Cópia Rápida</h3>
                <p className="text-sm text-muted-foreground">
                  Copie a tradução cultural com um único clique
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Volume2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">Síntese de Voz</h3>
                <p className="text-sm text-muted-foreground">
                  Ouça a pronúncia cultural da tradução (em breve)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Languages className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">Tradutor Cultural</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TCC - Tradutor Cultural. Desenvolvido com DeepSeek AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}