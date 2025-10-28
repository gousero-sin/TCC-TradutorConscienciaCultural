'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  BookOpen, 
  Languages, 
  Info, 
  ChevronDown, 
  ChevronUp,
  Copy,
  CheckCircle
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface CulturalAnalysisProps {
  culturalTranslation: string | null
  literalTranslation: string | null
  culturalNotes: string | null
  culturalContext: string
  isTranslating: boolean
}

export function CulturalAnalysis({ 
  culturalTranslation, 
  literalTranslation, 
  culturalNotes, 
  culturalContext,
  isTranslating 
}: CulturalAnalysisProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCopy = async (text: string, section: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedSection(section)
      toast({
        title: "Copiado!",
        description: `${section} copiado para a área de transferência.`,
      })
      setTimeout(() => setCopiedSection(null), 2000)
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      })
    }
  }

  if (!culturalTranslation && !isTranslating) {
    return null
  }

  return (
    <Card className="w-full border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Análise Cultural Detalhada</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-8 px-2"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
        <CardDescription>
          Análise completa das adaptações culturais e escolhas de tradução
        </CardDescription>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Contexto Atual */}
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Contexto: <Badge variant="secondary">{culturalContext}</Badge>
            </span>
          </div>

          <Separator />

          {/* Tradução Cultural */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary" />
                <h3 className="font-semibold text-foreground">Tradução Cultural</h3>
              </div>
              {culturalTranslation && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(culturalTranslation, "Tradução Cultural")}
                  className="h-8 px-2"
                >
                  {copiedSection === "Tradução Cultural" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
              <p className="text-sm text-foreground">
                {isTranslating ? (
                  <span className="text-muted-foreground">Analisando contexto cultural...</span>
                ) : (
                  culturalTranslation || "Tradução não disponível"
                )}
              </p>
            </div>
          </div>

          {/* Tradução Literal */}
          {literalTranslation && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <h3 className="font-semibold text-foreground">Tradução Literal</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(literalTranslation, "Tradução Literal")}
                    className="h-8 px-2"
                  >
                    {copiedSection === "Tradução Literal" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-md">
                  <p className="text-sm text-foreground">
                    {literalTranslation}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Notas Culturais */}
          {culturalNotes && (
            <>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-orange-500" />
                    <h3 className="font-semibold text-foreground">Notas Culturais</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(culturalNotes, "Notas Culturais")}
                    className="h-8 px-2"
                  >
                    {copiedSection === "Notas Culturais" ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <ScrollArea className="h-32 w-full rounded-md border border-orange-200 dark:border-orange-800 p-3 bg-orange-50 dark:bg-orange-950/20">
                  <div className="text-sm text-foreground whitespace-pre-wrap">
                    {isTranslating ? (
                      <span className="text-muted-foreground">Gerando análise cultural...</span>
                    ) : (
                      culturalNotes
                    )}
                  </div>
                </ScrollArea>
              </div>
            </>
          )}

          {/* Comparação Visual */}
          {culturalTranslation && literalTranslation && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">Comparação Rápida</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-border rounded-md">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Cultural</p>
                    <p className="text-sm text-foreground">{culturalTranslation}</p>
                  </div>
                  <div className="p-3 border border-border rounded-md">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Literal</p>
                    <p className="text-sm text-foreground">{literalTranslation}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      )}
    </Card>
  )
}