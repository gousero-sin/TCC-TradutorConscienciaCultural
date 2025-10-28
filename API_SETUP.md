# 🚀 Configuração da API Key do DeepSeek

## 📝 Projeto: Tradutor Cultural com Contexto Adaptativo

Este documento descreve a configuração da API Key para o projeto de Tradutor Cultural desenvolvido como Trabalho de Conclusão de Curso (TCC).

## 📍 Onde Colocar a API Key

Você precisa configurar sua API Key no arquivo `.env.local` na raiz do projeto:

### 📁 Arquivo: `.env.local`

```bash
# API Keys
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Outras configurações
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🔧 Passo a Passo

### 1️⃣ Obter sua API Key do DeepSeek

1. Acesse: https://platform.deepseek.com/
2. Faça login ou crie uma conta gratuita
3. No painel, vá para **API Keys**
4. Clique em **Create new key**
5. Dê um nome para sua key (ex: "LingoAI")
6. Copie a key gerada (começa com `sk-`)

### 2️⃣ Configurar no Projeto

Edite o arquivo `.env.local`:

```bash
# Substitua "sua_chave_api_deepseek_aqui" pela sua chave real
DEEPSEEK_API_KEY=sk-sua-chave-real-aqui
```

### 3️⃣ Verificar Configuração

Após configurar, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🧪 Testar a API

Você pode testar se a API está funcionando:

### Via Browser
Acesse: http://localhost:3000/api/translate

### Via cURL
```bash
curl http://localhost:3000/api/translate
```

Resposta esperada:
```json
{
  "message": "API de tradução cultural com DeepSeek",
  "status": "operational",
  "configured": true,
  "supported_languages": ["en", "es", "fr", "de", "it", "pt", "zh", "ja", "ru", "ar"],
  "cultural_contexts": [...]
}
```

## ⚠️ Importante

### 🔐 Segurança
- **NUNCA** compartilhe sua API Key
- **NUNCA** commit o arquivo `.env.local` no Git
- Apenas o `.env.example` deve ser versionado

### 💡 Dicas
- A key começa sempre com `sk-`
- Mantenha uma cópia segura da sua key
- Se perder a key, crie uma nova no painel DeepSeek

### 🚨 Erros Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `API key não configurada` | Key não encontrada | Verifique `.env.local` |
| `API key inválida` | Key incorreta | Copie novamente do painel |
| `Limite excedido` | Muitas requisições | Aguarde ou upgrade plano |

## 🎯 Próximos Passos

1. ✅ Configure sua API Key
2. ✅ Reinicie o servidor
3. ✅ Teste a tradução cultural
4. ✅ Experimente diferentes contextos

## 📞 Suporte

Se tiver problemas:

1. Verifique o console do navegador
2. Confirme a key está correta
3. Teste no painel DeepSeek
4. Verifique conexão com internet

---

**Sua API Key está pronta para uso! 🎉**