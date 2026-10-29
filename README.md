# 🚨 Sistema de Pessoas Desaparecidas - Polícia Civil MT

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)](https://www.docker.com/)

## 📋 Sobre o Projeto

Sistema web desenvolvido para a **Polícia Civil de Mato Grosso** que permite aos cidadãos consultar registros de pessoas desaparecidas ou já localizadas, além de enviar informações adicionais sobre essas pessoas.

### 🎯 Funcionalidades Principais

- ✅ **Consulta de Registros** - Busca por pessoas desaparecidas/localizadas
- ✅ **Filtros Avançados** - Por nome, idade, sexo, status e localização
- ✅ **Paginação** - Navegação eficiente entre registros
- ✅ **Detalhamento** - Página completa com informações da pessoa
- ✅ **Envio de Informações** - Formulário para cidadãos reportarem avistamentos
- ✅ **Upload de Fotos** - Anexar imagens como evidência com validação
- ✅ **Máscaras de Entrada** - Formatação automática para datas, telefones e idade
- ✅ **Validação Avançada** - Controle de tipos, tamanhos e quantidade de arquivos
- ✅ **Validação de Data** - Verificação completa de formato, mês, dia, ano e data real
- ✅ **Teclado Numérico** - Automático para campos de data, telefone e idade
- ✅ **Botão Inteligente** - Habilitado apenas com campos obrigatórios preenchidos
- ✅ **Layout Responsivo** - Funciona em desktop, tablet e mobile
- ✅ **API Integrada** - Consumo em tempo real da API oficial

## 🛠️ Tecnologias Utilizadas

### **Frontend:**
- **Next.js 16.4.3** - Framework React com SSR/SSG
- **TypeScript 5.0** - Tipagem estática
- **Tailwind CSS 4.0** - Framework CSS utilitário
- **Headless UI** - Componentes acessíveis
- **Axios** - Cliente HTTP
- **@react-input/mask** - Máscaras de entrada para formulários

### **Backend/API:**
- **API Oficial** - https://abitus-api.geia.vip/swagger-ui/index.html
- **Endpoints:**
  - `/pessoas/aberto/estatistico` - Estatísticas
  - `/pessoas/aberto/filtro` - Busca com filtros
  - `/pessoas/{id}` - Detalhes da pessoa
  - `/ocorrencias/informacoes-desaparecido` - Envio de informações

### **Infraestrutura:**
- **Docker** - Containerização
- **Docker Compose** - Orquestração
- **Nginx** - Proxy reverso
- **Alpine Linux** - Base leve e segura

## 🚀 Instalação e Execução

### **Pré-requisitos:**
- Node.js 18+ 
- npm ou yarn
- Docker (opcional)

### **1. Clone o Repositório:**
```bash
git clone https://github.com/SEU_USUARIO/sistema-pessoas-desaparecidas-mt.git
cd sistema-pessoas-desaparecidas-mt
```

### **2. Instalar Dependências:**
```bash
npm install
# ou
yarn install
```

### **3. Executar em Desenvolvimento:**
```bash
npm run dev
# ou
yarn dev
```

### **4. Acessar a Aplicação:**
- **URL:** http://localhost:3000
- **API Health Check:** http://localhost:3000/api/hello

## 🧪 Modo Demonstração (API fora do ar)

A API oficial original (`https://abitus-api.geia.vip/v1`) saiu do ar e não há uma API pública equivalente. Por isso o projeto tem um **modo demonstração**, com uma API simulada dentro do próprio Next.js (`src/pages/api/mock`) e cerca de 30 registros **fictícios** (`src/mock/pessoas.ts`). Filtros e paginação funcionam sobre esses dados, e o envio de informações aceita arquivos sem gravar nada.

O modo é ativado pela variável `NEXT_PUBLIC_API_URL=/api/mock`. Quando ela está ativa, a interface exibe a faixa "Modo demonstração: dados fictícios". Sem a variável, o app usa a URL oficial.

Para rodar localmente em modo demo:
```bash
# Linux/Mac
NEXT_PUBLIC_API_URL=/api/mock npm run dev

# Windows (PowerShell)
$env:NEXT_PUBLIC_API_URL="/api/mock"; npm run dev
```

Na Vercel, basta definir `NEXT_PUBLIC_API_URL=/api/mock` nas variáveis de ambiente do projeto e fazer um novo deploy.

## 🐳 Docker

### **Execução com Docker:**

#### **Desenvolvimento:**
```bash
# Usar script
./docker-dev.sh

# Ou com npm
npm run docker:dev
```
DOCKER
#### **Produção:**
```bash
# Usar script
./docker-build.sh

# Ou com npm
npm run docker:build
npm run docker:up
```

#### **Gerenciamento:**
```bash
# Ver logs
npm run docker:logs

# Parar containers
npm run docker:down

# Verificar status
docker-compose ps
```

### **Acessos:**
- **Aplicação:** http://localhost:3000
- **Com Nginx:** http://localhost:80

## 📁 Estrutura do Projeto

```
src/
├── Components/           # Componentes reutilizáveis
│   ├── CardPessoa/      # Card de pessoa
│   ├── CardTotal/       # Card de estatísticas
│   ├── CustomButton/    # Botão personalizado
│   ├── CustomInput/     # Input personalizado
│   ├── DropDown/        # Dropdown com Headless UI
│   ├── MaskedInput/     # Input com máscaras de formatação
│   └── Paginacao/       # Componente de paginação
├── hooks/               # Custom hooks
│   └── useWindowSize.ts # Hook para responsividade
├── interfaces/          # Interfaces TypeScript
│   └── index.tsx        # DTOs da API
├── pages/               # Páginas Next.js
│   ├── DetalhesPessoa/  # Página de detalhes
│   ├── ListaCardPessoa/ # Lista de pessoas
│   ├── Main/            # Página principal
│   ├── Header/          # Cabeçalho
│   └── Footer/          # Rodapé
├── services/            # Serviços
│   └── apiService.ts    # Cliente da API
├── styles/              # Estilos
│   └── globals.css      # CSS global e tema
└── utils/               # Utilitários
    └── pessoaUtils.ts   # Funções auxiliares
```

## 🎨 Tema e Design

### **Cores da Polícia Civil MT:**
- **Azul Oficial:** `#1e3a8a`
- **Azul Claro:** `#3b82f6`
- **Amarelo Dourado:** `#fbbf24`
- **Vermelho Alerta:** `#dc2626`
- **Verde Sucesso:** `#16a34a`


## 📱 Responsividade

### **Breakpoints:**
- **Mobile:** < 640px (1 coluna)
- **Tablet:** 640px - 1024px (2 colunas)
- **Desktop:** > 1024px (5 colunas)

### **Layout Adaptativo:**
- **Mobile:** Cards empilhados
- **Tablet:** Grid 2 colunas
- **Desktop:** Tabela 5 colunas

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificar código

# Docker
npm run docker:build # Build Docker
npm run docker:up    # Iniciar containers
npm run docker:down  # Parar containers
npm run docker:logs  # Ver logs
npm run docker:dev   # Desenvolvimento com Docker
```

## 📊 API Endpoints

### **Estatísticas:**
```http
GET /pessoas/aberto/estatistico
```

### **Busca com Filtros:**
```http
GET /pessoas/aberto/filtro?nome=João&idadeMin=18&idadeMax=65&sexo=MASCULINO&status=DESAPARECIDO
```

### **Detalhes da Pessoa:**
```http
GET /pessoas/{id}
```

### **Envio de Informações:**
```http
POST /ocorrencias/informacoes-desaparecido?informacao=...&descricao=...&data=...&localizacao=...&telefone=...&ocoId=...
```

**Parâmetros:**
- `informacao` - Descrição do avistamento (obrigatório)
- `descricao` - Descrição do anexo (obrigatório)
- `data` - Data do avistamento no formato DD/MM/AAAA (obrigatório)
- `localizacao` - Local onde a pessoa foi avistada (obrigatório)
- `telefone` - Telefone para contato no formato (XX) XXXXX-XXXX (opcional)
- `ocoId` - ID da ocorrência (obrigatório)
- `anexos` - Arquivos de imagem (opcional, máximo 5 arquivos, 5MB cada)

## 🆕 Funcionalidades Implementadas

### **Máscaras de Entrada:**
- **Data:** Formato automático `DD/MM/AAAA` com validação completa
- **Telefone:** Formato automático `(XX) XXXXX-XXXX` para contato
- **Idade:** Máscara `99` nos campos de idade inicial/final
- **Biblioteca:** @react-input/mask para formatação em tempo real
- **Teclado numérico:** Automático para campos de data, telefone e idade

### **Validação Avançada:**
- **Data:** Verificação de formato, mês (01-12), dia (01-31), ano (1900-atual), data real e não futura
- **Arquivos:** Tipos permitidos (JPG, PNG, GIF, WebP), tamanho máximo 5MB, máximo 5 arquivos
- **Formulário:** Botão habilitado apenas com campos obrigatórios preenchidos
- **Tempo real:** Erros mostrados imediatamente com mensagens específicas

### **Formulário Melhorado:**
- **Campo de localização:** Obrigatório para indicar onde a pessoa foi avistada
- **Campo de telefone:** Opcional para contato
- **Scroll automático:** Para o campo de informações ao abrir formulário
- **Foco inteligente:** Condicional para mobile/desktop
- **Limpeza automática:** Formulário resetado após envio bem-sucedido
- **Interface responsiva:** Mantida em todos os dispositivos

## 🧪 Testes

### **Testar Funcionalidades:**
1. **Busca:** Teste filtros por nome, idade, sexo
2. **Paginação:** Navegue entre páginas
3. **Detalhes:** Clique em uma pessoa
4. **Formulário:** Envie informações com fotos
5. **Máscaras:** Teste formatação automática de datas e telefones
6. **Validação:** Teste upload de arquivos com diferentes tipos e tamanhos
7. **Responsividade:** Teste em diferentes tamanhos

## 🐛 Troubleshooting

### **Problemas Comuns:**

#### **1. Erro de CORS:**
```bash
# Verificar se a API está acessível
curl https://abitus-api.geia.vip/v1/pessoas/aberto/estatistico
```

#### **2. Porta 3000 ocupada:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

#### **3. Docker não inicia:**
```bash
# Verificar se Docker está rodando
docker --version
docker-compose --version

# Limpar cache
docker system prune -f
```

## 📈 Performance

### **Otimizações Implementadas:**
- ✅ **Lazy Loading** de componentes
- ✅ **Debounce** no resize de tela
- ✅ **Memoização** com useCallback
- ✅ **Build otimizado** com Next.js
- ✅ **Imagens otimizadas** com next/image
- ✅ **CSS purging** com Tailwind
- ✅ **Máscaras de entrada** com @react-input/mask
- ✅ **Validação em tempo real** de formulários
- ✅ **Preview de arquivos** antes do upload
- ✅ **Validação de data** robusta e reutilizável
- ✅ **Teclado numérico** automático
- ✅ **Formato híbrido** da API otimizado

### **Métricas:**
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.0s

## 🔒 Segurança

### **Medidas Implementadas:**
- ✅ **Headers de segurança** no Nginx
- ✅ **Validação de entrada** nos formulários
- ✅ **Sanitização** de dados
- ✅ **Validação de arquivos** (tipo, tamanho, quantidade)
- ✅ **Validação de data** robusta (formato, mês, dia, ano, data real)
- ✅ **Máscaras de entrada** para prevenir dados malformados
- ✅ **Teclado numérico** para campos sensíveis
- ✅ **HTTPS** em produção
- ✅ **CSP** (Content Security Policy)

Este projeto foi desenvolvido para a **Polícia Civil de Mato Grosso** como parte de um processo seletivo.

## 👨‍💻 Desenvolvedor

**Nome:** Renato Luan Almeida Saldanha  
**Email:** ranalisesaldanha@gmail.com
**Data:** 08/09/2025 (Atualizado com validações avançadas e correções na API)
**LinkedIn:** https://www.linkedin.com/in/renato-saldanha-a318067b/
**GitHub:** https://github.com/renato-saldanha

