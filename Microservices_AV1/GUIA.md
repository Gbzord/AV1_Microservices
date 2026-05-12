# GUIA — Step 01: Configuração do Monorepo

## 🎯 Objetivo

Criar a estrutura base do projeto usando **npm workspaces**, uma funcionalidade nativa do npm que permite gerenciar múltiplos pacotes em um único repositório (monorepo).

## 📁 Estrutura Criada

```
Microservices_AV1/
├── .gitignore
├── GUIA.md                    ← Este arquivo
├── package.json               ← Raiz do monorepo (workspaces)
├── tsconfig.json              ← Configuração TypeScript base
└── apps/
    └── product-service/
        ├── src/
        │   └── index.ts       ← Placeholder (será implementado no step 2)
        ├── package.json       ← Dependências isoladas do serviço
        └── tsconfig.json      ← Herda da raiz, sobrescreve outDir
```

## 🤔 Por que Monorepo?

Em vez de ter repositórios separados para cada serviço, o monorepo oferece:

- **🔄 Compartilhamento de código** — Tipos, utilitários e interfaces compartilhadas entre serviços
- **⚡ Uma instalação única** — `npm install` na raiz instala todas as dependências de todos os serviços
- **📌 Versionamento unificado** — Todos os serviços evoluem juntos no mesmo histórico Git
- **🛠️ Manutenção simplificada** — Mudanças que afetam vários serviços ocorrem em um único commit

## 📦 npm Workspaces

O campo `"workspaces"` no `package.json` raiz instrui o npm a reconhecer pastas dentro de `apps/` como pacotes independentes:

```json
{
  "workspaces": ["apps/*"]
}
```

**O que isso significa:**

- Cada serviço tem seu próprio `package.json` com dependências isoladas
- Ao rodar `npm install` na raiz, o npm resolve todas as dependências de todos os serviços em uma única árvore
- Cada workspace pode ter seus próprios scripts (`dev`, `build`, `start`)
- As dependências compartilhadas são instaladas uma única vez na raiz

## 🏗️ TypeScript Base

O `tsconfig.json` raiz define as regras de compilação que todos os serviços herdarão:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Cada serviço** tem seu próprio `tsconfig.json` que **estende** essas configurações e adiciona customizações específicas:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

Isso permite:
- ✅ Consistência entre todos os serviços (regras TypeScript iguais)
- ✅ Flexibilidade local (cada serviço pode customizar `outDir`, `rootDir`, etc.)

## 📋 Scripts Disponíveis

Na raiz do projeto:

```bash
npm install           # Instala todas as dependências de todos os serviços
npm run build         # Compila TypeScript em todos os workspaces
npm run dev           # Roda em modo desenvolvimento (watch) em todos os workspaces
npm start             # Inicia todos os serviços
```

Dentro de um workspace específico:

```bash
cd apps/product-service
npm run dev           # Desenvolvimento com hot-reload
npm run build         # Compila TypeScript
npm start             # Inicia o serviço
```

## ✅ Validação

Após criar os arquivos, você pode validar a estrutura com:

```bash
npm install           # Instala as dependências (pode falhar por falta de Node.js, isso é esperado)
npm run build         # Tenta compilar (pode falhar, é ok por enquanto)
```

## 🚀 Próximos Passos

### Step 02 — Primeiro Microserviço com Fastify
- Criar `src/index.ts` com Fastify
- Implementar rotas REST básicas para gerenciar produtos
- Testar com `npm run dev` no product-service

### Step 03 — Segundo Microserviço
- Criar `apps/order-service/` seguindo o mesmo padrão
- Rodar os dois serviços em portas diferentes
- Validar que cada um funciona isoladamente

### Step 04 — Comunicação HTTP
- Order Service consulta Product Service internamente
- Implementar chamadas HTTP entre serviços

### Step 05 — API Gateway
- Criar `apps/api-gateway/`
- Rotear `/products/*` → Port 3001 (Product Service)
- Rotear `/orders/*` → Port 3002 (Order Service)

### Step 06 — Docker
- Adicionar `Dockerfile` em cada serviço
- Criar `docker-compose.yml` na raiz
- Orquestrar todos os containers

## 🎓 Conceitos Aprendidos

✅ Estrutura de monorepo com npm workspaces  
✅ Herança de configuração TypeScript  
✅ Isolamento de dependências por workspace  
✅ Scripts compartilhados vs isolados  

---

**Status**: ✅ Estrutura do monorepo configurada com sucesso + step/02-product-service !

