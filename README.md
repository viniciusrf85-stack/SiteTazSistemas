# TazSistemas - Site Institucional

Site institucional moderno e responsivo para a TazSistemas, desenvolvido com React e Vite.

## 🚀 Tecnologias

- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool rápida e moderna
- **React Router DOM** - Roteamento
- **Lucide React** - Ícones modernos
- **CSS3** - Estilização moderna e responsiva

## 📦 Estrutura do Projeto

```
TazSistemas/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   └── Contact.jsx
│   ├── pages/           # Páginas
│   │   └── Home.jsx
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Funcionalidades

- ✅ Design moderno e responsivo
- ✅ Navegação suave entre seções
- ✅ Header fixo com efeito de scroll
- ✅ Seção Hero com animações
- ✅ Seção Sobre com cards de características
- ✅ Seção de Serviços
- ✅ Formulário de contato
- ✅ Footer informativo
- ✅ Menu mobile responsivo

## 📋 Instalação

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Acesse o site em `http://localhost:3001`

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

## 📝 Personalização

### Cores
As cores podem ser personalizadas no arquivo `src/index.css` através das variáveis CSS:

```css
:root {
  --primary-color: #8b5cf6;
  --secondary-color: #f59e0b;
  /* ... */
}
```

### Conteúdo
Edite os componentes em `src/components/` para alterar textos, serviços e informações de contato.

## 🌐 Deploy

Para fazer deploy do site para o domínio **tazsistemas.com.br**:

### Opção 1: Usando o script de build
```bash
# Windows
build-producao.bat

# Linux/Mac
npm run build
```

### Opção 2: Deploy completo
Consulte o arquivo `DEPLOY.md` para instruções detalhadas de:
- Configuração de DNS
- Build do site
- Configuração do Nginx
- Configuração de SSL/HTTPS
- Configuração de firewall

### Arquivos de configuração
- `DEPLOY.md` - Guia completo de deploy
- `nginx-config-exemplo.conf` - Exemplo de configuração do Nginx
- `build-producao.bat` - Script para build em produção

## 📧 Contato

Para mais informações, entre em contato através do formulário no site ou pelo email: contato@tazsistemas.com.br

## 🌐 Domínio

Site configurado para: **tazsistemas.com.br**
