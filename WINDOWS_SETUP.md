# 🪟 Configuração para Windows

## 🚀 Scripts Disponíveis

Para Windows, os seguintes scripts estão disponíveis:

### Desenvolvimento
```bash
# Servidor de desenvolvimento (sem log)
npm run dev

# Servidor de desenvolvimento com log em arquivo
npm run dev:log
```

### Produção
```bash
# Servidor de produção (sem log)
npm run start

# Servidor de produção com log em arquivo
npm run start:log
```

### Outros
```bash
# Build para produção
npm run build

# Verificação de código
npm run lint

# Banco de dados
npm run db:push
npm run db:generate
```

## 📝 Logs no Windows

### Ver logs em tempo real
```bash
# Para desenvolvimento
Get-Content -Path "dev.log" -Wait -Tail 10

# Para produção
Get-Content -Path "server.log" -Wait -Tail 10
```

### Ver logs completos
```bash
# Ver arquivo de log de desenvolvimento
type dev.log

# Ver arquivo de log de produção
type server.log
```

## 🔧 Comandos Equivalentes Windows vs Linux

| Linux/Mac | Windows | Descrição |
|-----------|---------|-----------|
| `npm run dev` | `npm run dev` | Servidor desenvolvimento |
| `npm run dev:log` | `npm run dev:log` | Servidor com log |
| `cat dev.log` | `type dev.log` | Ver log |
| `tail -f dev.log` | `Get-Content dev.log -Wait` | Log em tempo real |
| `2>&1 \| tee log` | `> log 2>&1` | Redirecionar saída |

## 🎯 Iniciar o Projeto

1. **Instalar dependências**
```bash
npm install
```

2. **Configurar API Key**
- Copiar `.env.example` para `.env.local`
- Adicionar sua API Key do DeepSeek

3. **Iniciar servidor**
```bash
npm run dev
```

4. **Acessar aplicação**
- Abrir: http://localhost:3000

## 🐛 Solução de Problemas

### Problema: 'tee' não reconhecido
**Solução**: Use `npm run dev` ou `npm run dev:log`

### Problema: Porta ocupada
```bash
# Verificar processos na porta 3000
netstat -ano | findstr :3000

# Matar processo (substitua PID pelo número)
taskkill /PID PID /F
```

### Problema: Permissões
- Execute o PowerShell como Administrador
- Ou use Git Bash que tem comandos Unix

## 📁 Estrutura de Logs

```
projeto/
├── dev.log        # Log de desenvolvimento
├── server.log     # Log de produção
└── .env.local     # Configurações (não commitar)
```

---

**Pronto!** Seu ambiente Windows está configurado para o Tradutor Cultural! 🚀