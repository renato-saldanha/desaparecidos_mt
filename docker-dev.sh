#!/bin/bash

# Script para desenvolvimento com Docker
# Sistema de Pessoas Desaparecidas - Polícia Civil MT

echo "🔧 Iniciando ambiente de desenvolvimento..."

# Parar containers existentes
docker-compose down

# Build apenas da aplicação (sem cache)
docker-compose build app

# Iniciar em modo desenvolvimento
docker-compose up app

echo "✅ Ambiente de desenvolvimento iniciado!"
echo "🌐 Acesse: http://localhost:3000"
