#!/bin/bash

# Script para build e execução do Docker
# Sistema de Pessoas Desaparecidas - Polícia Civil MT

echo "🐳 Iniciando build do Docker..."

# Parar containers existentes
echo "⏹️ Parando containers existentes..."
docker-compose down

# Remover imagens antigas (opcional)
echo "🗑️ Removendo imagens antigas..."
docker system prune -f

# Build da aplicação
echo "🔨 Fazendo build da aplicação..."
docker-compose build --no-cache

# Iniciar containers
echo "🚀 Iniciando containers..."
docker-compose up -d

# Verificar status
echo "📊 Verificando status dos containers..."
docker-compose ps

# Mostrar logs
echo "📝 Logs da aplicação:"
docker-compose logs -f app
