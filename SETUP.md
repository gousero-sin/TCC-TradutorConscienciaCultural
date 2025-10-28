# 🚀 Configuração Rápida - Tradutor Cultural

## 📝 Projeto: Trabalho de Conclusão de Curso (TCC)

Este guia descreve a configuração do Tradutor Cultural com contexto adaptativo desenvolvido como TCC.

## 1. Obter API Key do DeepSeek

### Passo a Passo:
1. Acesse: https://platform.deepseek.com/
2. Clique em "Sign Up" ou "Log In"
3. Faça login com email ou GitHub
4. No dashboard, clique em "API Keys" no menu lateral
5. Clique em "Create new key"
6. Dê um nome para sua key (ex: "TradutorCultural-TCC")
7. Copie a key gerada (começa com `sk-`)

## 2. Configurar no Projeto

### Método 1: Arquivo .env.local
```bash
# Na raiz do projeto, crie o arquivo:
cp .env.example .env.local

# Edite o arquivo .env.local e substitua:
DEEPSEEK_API_KEY=sk-sua_chave_real_aqui
```

### Método 2: Variável de Ambiente
```bash
# No terminal:
export DEEPSEEK_API_KEY=sk-sua_chave_real_aqui
npm run dev
```

## 3. Verificar Configuração

Após configurar, verifique se está funcionando:

```bash
# Teste a API:
curl http://localhost:3000/api/translate

# Deve retornar:
# {"message":"API de tradução cultural com DeepSeek","status":"operational","configured":true,...}
```

## 4. Usar o Tradutor

1. Abra: http://localhost:3000
2. Selecione os idiomas
3. Digite o texto
4. Clique em "Traduzir" ou pressione Ctrl+Enter

## 🔧 Problemas Comuns

### ❌ "API key não configurada"
- Verifique se a variável `DEEPSEEK_API_KEY` está definida
- Reinicie o servidor após configurar

### ❌ "API key inválida"
- Verifique se copiou a key corretamente
- Confirme se a key não expirou

### ❌ "Limite excedido"
- Aguarde um pouco e tente novamente
- Verifique seu plano no DeepSeek

## 💡 Dicas

- **Guarde sua API key** em local seguro
- **Não compartilhe** a key em repositórios públicos
- **Use diferentes keys** para desenvolvimento e produção
- **Monitore o uso** no dashboard do DeepSeek

---

🎉 **Pronto!** Seu tradutor cultural está configurado e pronto para usar!