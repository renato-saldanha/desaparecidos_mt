# Dockerfile para Sistema de Pessoas Desaparecidas - Polícia Civil MT
# Multi-stage build para otimização

# Stage 1: Build
FROM node:18-alpine AS builder

# Instalar dependências necessárias para o Alpine
RUN apk add --no-cache libc6-compat

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies para build)
RUN npm ci

# Copiar código fonte
COPY . .

# Gerar build de produção
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner

# Instalar dependências necessárias para o Alpine
RUN apk add --no-cache libc6-compat

# Definir diretório de trabalho
WORKDIR /app

# Definir variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000

# Copiar apenas os arquivos necessários para produção
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expor porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
