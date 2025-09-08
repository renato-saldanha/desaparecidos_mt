# Dockerfile para Sistema de Pessoas Desaparecidas - Polícia Civil MT
# Usar Node.js 18 Alpine (versão leve e segura)
FROM node:18-alpine AS base

# Instalar dependências necessárias para o Alpine
RUN apk add --no-cache libc6-compat

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Gerar build de produção
RUN npm run build

# Expor porta 3000
EXPOSE 3000

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
