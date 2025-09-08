# 🐳 Docker - Sistema de Pessoas Desaparecidas

## 📋 Pré-requisitos

- Docker Desktop instalado
- Docker Compose instalado

## 🚀 Comandos Rápidos

### **Desenvolvimento:**
```bash
# Iniciar ambiente de desenvolvimento
npm run docker:dev

# Ou usar script
./docker-dev.sh
```

### **Produção:**
```bash
# Build e iniciar em produção
npm run docker:build
npm run docker:up

# Ou usar script
./docker-build.sh
```

### **Gerenciamento:**
```bash
# Parar containers
npm run docker:down

# Ver logs
npm run docker:logs

# Rebuild completo
docker-compose build --no-cache
```

## 🌐 Acessos

- **Aplicação:** http://localhost:3000
- **Com Nginx:** http://localhost:80

## 📁 Estrutura de Arquivos

```
├── Dockerfile              # Configuração do container
├── docker-compose.yml      # Orquestração dos serviços
├── .dockerignore           # Arquivos ignorados no build
├── nginx.conf              # Configuração do Nginx
├── docker-build.sh         # Script de build
└── docker-dev.sh           # Script de desenvolvimento
```

## 🔧 Configurações

### **Variáveis de Ambiente:**
- `NODE_ENV=production`
- `PORT=3000`

### **Portas:**
- `3000` - Aplicação Next.js
- `80` - Nginx (proxy reverso)

## 🐛 Troubleshooting

### **Problemas Comuns:**

1. **Porta já em uso:**
   ```bash
   # Verificar processos na porta 3000
   netstat -ano | findstr :3000
   
   # Parar processo
   taskkill /PID <PID> /F
   ```

2. **Build falha:**
   ```bash
   # Limpar cache do Docker
   docker system prune -f
   
   # Rebuild sem cache
   docker-compose build --no-cache
   ```

3. **Container não inicia:**
   ```bash
   # Verificar logs
   docker-compose logs app
   
   # Verificar status
   docker-compose ps
   ```

## 📊 Monitoramento

### **Verificar Status:**
```bash
docker-compose ps
```

### **Ver Logs:**
```bash
docker-compose logs -f app
```

### **Health Check:**
```bash
curl http://localhost:3000/api/hello
```
