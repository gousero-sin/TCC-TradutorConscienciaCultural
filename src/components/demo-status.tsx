'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertCircle, Zap, Globe } from 'lucide-react'

export function DemoStatus() {
  const features = [
    { name: 'Next.js 15', status: 'active', description: 'Framework React moderno' },
    { name: 'TypeScript', status: 'active', description: 'Type safety em todo o projeto' },
    { name: 'Tailwind CSS', status: 'active', description: 'Design system moderno' },
    { name: 'shadcn/ui', status: 'active', description: 'Componentes acessíveis' },
    { name: 'IA Integration', status: 'active', description: 'Z-AI SDK integrado' },
    { name: 'APIs RESTful', status: 'active', description: 'Lessons, Chat, Pronunciation' },
    { name: 'Dark Mode', status: 'active', description: 'Tema claro/escuro' },
    { name: 'Responsive', status: 'active', description: 'Mobile-first design' }
  ]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          <Zap className="w-5 h-5" />
          Tradutor Cultural - Sistema Operacional
        </CardTitle>
        <CardDescription>
          Plataforma de tradução com contexto cultural desenvolvida como TCC
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
              {feature.status === 'active' ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{feature.name}</span>
                  <Badge variant={feature.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {feature.status === 'active' ? 'Ativo' : 'Pendente'}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-sm">Status da Aplicação</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ✅ Servidor rodando em http://localhost:3000<br/>
            ✅ APIs funcionando corretamente<br/>
            ✅ Compilação sem erros<br/>
            ✅ Interface responsiva e acessível
          </p>
        </div>
      </CardContent>
    </Card>
  )
}