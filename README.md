# 🌍 Tradutor Cultural com DeepSeek

Uma plataforma de tradução inteligente com contexto cultural, desenvolvida como Trabalho de Conclusão de Curso (TCC), powered por DeepSeek AI, projetada para traduções precisas que consideram nuances culturais, sociais e situacionais.

## ✨ Recursos Principais

### 🎯 Tradução Cultural Inteligente
- **🤖 DeepSeek AI**: Integração com modelos avançados de linguagem
- **🌍 Contexto Cultural**: 6 contextos diferentes para tradução precisa
- **🎭 Adaptação Social**: Considera nuances culturais e situacionais
- **⚡ Tradução Contextual**: Resultados adaptados ao público-alvo

### 🎨 Interface GitHub/ZReader
- **🌙 Tema Dark**: Cores autênticas do GitHub/ZReader
- **📱 Design Responsivo**: Funciona perfeitamente em mobile e desktop
- **📋 Copia Rápida**: Copie traduções com um clique
- **⌨️ Atalhos**: Ctrl+Enter para traduzir rapidamente

### 🎭 Contextos Culturais Suportados
- **🌐 Geral**: Tradução padrão para uso cotidiano
- **💼 Formal**: Contexto profissional, acadêmico ou empresarial
- **👥 Casual**: Conversação informal com amigos e familiares
- **🎓 Acadêmico**: Pesquisas, artigos científicos e educacional
- **🎨 Criativo**: Literatura, poesia, música e expressão artística
- **⚙️ Técnico**: Documentação técnica, manuais e especializada

## 🚀 Começando

### Pré-requisitos
- Node.js 18+
- API Key do DeepSeek

### Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd tradutor-cultural
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure a API Key do DeepSeek**

Crie um arquivo `.env.local` na raiz do projeto:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` e adicione sua API key:
```env
DEEPSEEK_API_KEY=sk-sua_chave_real_aqui
```

Para obter sua API key:
1. Acesse [DeepSeek Platform](https://platform.deepseek.com/)
2. Faça login ou crie uma conta
3. Vá para "API Keys" no painel
4. Crie uma nova API key
5. Copie e cole no arquivo `.env.local`

4. **Inicie o servidor**
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para usar o tradutor cultural.

## 🌐 Idiomas Suportados

| Idioma | Código | Bandeira |
|--------|--------|----------|
| Inglês | `en` | 🇺🇸 |
| Espanhol | `es` | 🇪🇸 |
| Francês | `fr` | 🇫🇷 |
| Alemão | `de` | 🇩🇪 |
| Italiano | `it` | 🇮🇹 |
| Português | `pt` | 🇧🇷 |
| Chinês | `zh` | 🇨🇳 |
| Japonês | `ja` | 🇯🇵 |
| Russo | `ru` | 🇷🇺 |
| Árabe | `ar` | 🇸🇦 |

## 🎭 Contextos Culturais

### 🌐 Geral
Tradução padrão para uso cotidiano, sem formalidades específicas.

### 💼 Formal
Contexto profissional, acadêmico ou empresarial. Usa linguagem polida e profissional.

### 👥 Casual
Conversação informal com amigos e familiares. Usa linguagem casual e natural.

### 🎓 Acadêmico
Pesquisas, artigos científicos e conteúdo educacional. Usa terminologia precisa e formal.

### 🎨 Criativo
Literatura, poesia, música e expressão artística. Preserva elementos artísticos e emocionais.

### ⚙️ Técnico
Documentação técnica, manuais e conteúdo especializado. Usa terminologia especializada correta.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js
│   ├── api/               # APIs
│   │   └── translate/     # API de tradução cultural
│   ├── layout.tsx         # Layout principal (tema GitHub)
│   └── page.tsx           # Página do tradutor cultural
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── theme-provider.tsx # Provedor de tema
│   └── theme-toggle.tsx   # Alternador de tema
├── hooks/                # Hooks personalizados
│   ├── use-translation.ts # Hook de tradução cultural
│   └── use-toast.ts      # Notificações
└── lib/                  # Utilitários
    ├── clipboard.ts      # Utilitário de clipboard
    └── utils.ts          # Funções utilitárias
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código

# Banco de Dados (se necessário)
npm run db:push      # Aplicar schema
npm run db:generate  # Gerar Prisma Client
```

## 🎯 Como Usar

1. **Selecione o Contexto Cultural**: Escolha o contexto apropriado para sua tradução
2. **Selecione os Idiomas**: Escolha o idioma de origem e destino
3. **Digite o Texto**: Insira ou cole o texto que deseja traduzir
4. **Traduza**: Clique em "Traduzir com Contexto" ou pressione Ctrl+Enter
5. **Copie**: Use o botão de copiar para salvar a tradução

### Exemplos de Uso

#### Contexto Formal
```
Original: "I need to schedule a meeting with the team."
Tradução: "Gostaria de agendar uma reunião com a equipe."
```

#### Contexto Casual
```
Original: "I need to schedule a meeting with the team."
Tradução: "Preciso marcar uma reunião com a galera."
```

#### Contexto Acadêmico
```
Original: "The research shows significant results."
Tradução: "A pesquisa demonstra resultados significativos."
```

### Atalhos de Teclado
- `Ctrl + Enter` - Traduzir texto
- `Tab` - Navegar entre campos

## 🤖 API DeepSeek com Contexto Cultural

O projeto utiliza a API do DeepSeek com prompts especializados para cada contexto cultural:

### Configuração
- **Modelo**: `deepseek-chat`
- **Temperatura**: `0.4` (equilíbrio entre precisão e criatividade)
- **Tokens máximos**: `2000`
- **Contexto**: Adaptado according to selected cultural context

### Tratamento de Erros
- Validação de API key
- Tratamento de limites de taxa
- Mensagens de erro claras
- Fallback para erros de rede

## 🎨 Tema GitHub/ZReader

A aplicação usa as cores autênticas do GitHub e ZReader:

### Dark Mode (Padrão)
- **Background**: `#0d1117`
- **Foreground**: `#c9d1d9`
- **Primary**: `#238636`
- **Card**: `#161b22`
- **Border**: `#30363d`

### Light Mode
- **Background**: `#ffffff`
- **Foreground**: `#1f2328`
- **Primary**: `#1f6feb`
- **Card**: `#ffffff`
- **Border**: `#d0d7de`

## 🌟 Funcionalidades

### ✅ Implementadas
- [x] Tradução cultural entre 10+ idiomas
- [x] 6 contextos culturais diferentes
- [x] Interface GitHub/ZReader autêntica
- [x] Dark mode (padrão) e light mode
- [x] Copiar tradução
- [x] Troca rápida de idiomas
- [x] Atalhos de teclado
- [x] Tratamento de erros
- [x] Loading states
- [x] Indicadores visuais de contexto

### 🚧 Futuras
- [ ] Síntese de voz (text-to-speech)
- [ ] Histórico de traduções
- [] Tradução de documentos
- [ ] Modo conversação
- [ ] Suporte offline
- [ ] Mais contextos culturais

## 🔒 Segurança

- **API Keys**: Armazenadas em variáveis de ambiente
- **Type Safety**: TypeScript em todo o projeto
- **Validação**: Validação de entrada e saída
- **Error Handling**: Tratamento robusto de erros

## 📱 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Faça deploy automático

### Outras Plataformas
```bash
npm run build
npm start
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'Adicionar nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

## 🙏 Agradecimentos

- **DeepSeek** - pela API de tradução poderosa
- **GitHub** - pelo design system inspirador
- **ZReader** - pela paleta de cores elegante
- **Vercel** - pela plataforma de deploy
- **shadcn/ui** - pelos componentes incríveis

---

Feito com ❤️ como Trabalho de Conclusão de Curso (TCC) para facilitar a comunicação global com contexto cultural. 🚀🌍

## 📞 Suporte

Se tiver problemas ou dúvidas:
1. Verifique se sua API key está configurada corretamente
2. Consulte os logs do console para erros
3. Abra uma issue no GitHub

### 🎯 Dicas de Uso
- **Contexto Formal**: Use para e-mails profissionais, documentos acadêmicos
- **Contexto Casual**: Use para mensagens a amigos, redes sociais
- **Contexto Criativo**: Use para traduzir poesia, letras de música
- **Contexto Técnico**: Use para manuais, documentação técnica