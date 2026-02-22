# 🚀 Guia de Deploy - tazsistemas.com.br

Este guia explica como fazer o deploy do site institucional TazSistemas para o domínio `tazsistemas.com.br`.

## 📋 Pré-requisitos

1. Servidor com acesso à internet
2. Domínio `tazsistemas.com.br` configurado
3. Certificado SSL (HTTPS) - recomendado usar Let's Encrypt (gratuito)
4. Node.js instalado no servidor (apenas para build)

---

## 🌐 1. Configuração de DNS

No painel de DNS do seu domínio, configure o registro A:

```
Tipo: A
Nome: @ (ou deixe em branco para o domínio principal)
Valor: [IP_DO_SEU_SERVIDOR]
TTL: 3600
```

**Exemplo:** Se seu servidor tem IP `123.45.67.89`:
- `tazsistemas.com.br` → `123.45.67.89`

> ⏱️ **Atenção:** Pode levar até 24 horas para propagar, mas geralmente é em minutos.

---

## 🏗️ 2. Build do Site

### 2.1. No servidor ou localmente, faça o build:

```bash
cd TazSistemas
npm install
npm run build
```

Isso criará a pasta `dist/` com os arquivos estáticos prontos para produção.

### 2.2. Copiar arquivos para o servidor

Se fez o build localmente, copie a pasta `dist/` para o servidor:

```bash
# Exemplo usando SCP (Linux/Mac)
scp -r dist/ usuario@servidor:/var/www/tazsistemas/

# Ou usando FTP/SFTP
```

---

## 🌐 3. Configurar Nginx

### 3.1. Instalar Nginx

**No Linux:**
```bash
sudo apt update
sudo apt install nginx
```

**No Windows:**
- Baixe de: https://nginx.org/en/download.html
- Ou use Chocolatey: `choco install nginx`

### 3.2. Criar configuração do Nginx

**No Linux:** Crie `/etc/nginx/sites-available/tazsistemas`

**No Windows:** Edite `C:\nginx\conf\nginx.conf` ou crie arquivo de configuração

```nginx
# Redirecionar HTTP para HTTPS
server {
    listen 80;
    server_name tazsistemas.com.br www.tazsistemas.com.br;
    
    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

# Configuração HTTPS
server {
    listen 443 ssl http2;
    server_name tazsistemas.com.br www.tazsistemas.com.br;
    
    # Certificados SSL (será configurado pelo Certbot)
    ssl_certificate /etc/letsencrypt/live/tazsistemas.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tazsistemas.com.br/privkey.pem;
    
    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Pasta do site (ajuste o caminho conforme necessário)
    root /var/www/tazsistemas/dist;  # Linux
    # root C:/Sistemas/TazSistemas/dist;  # Windows
    
    index index.html;
    
    # Configuração para SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache de assets estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
    
    # Segurança
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

### 3.3. Ativar configuração (Linux)

```bash
sudo ln -s /etc/nginx/sites-available/tazsistemas /etc/nginx/sites-enabled/
sudo nginx -t  # Testar configuração
sudo systemctl reload nginx
```

---

## 🔒 4. Configurar SSL/HTTPS (Let's Encrypt)

### 4.1. Instalar Certbot

**No Linux:**
```bash
sudo apt install certbot python3-certbot-nginx
```

**No Windows:**
- Use WSL (Windows Subsystem for Linux) ou
- Use Win-ACME: https://www.win-acme.com/

### 4.2. Obter Certificado SSL

**No Linux:**
```bash
sudo certbot --nginx -d tazsistemas.com.br -d www.tazsistemas.com.br
```

O Certbot irá:
- Obter os certificados
- Configurar automaticamente o Nginx
- Configurar renovação automática

### 4.3. Verificar Renovação Automática

```bash
sudo certbot renew --dry-run
```

---

## 🔥 5. Configurar Firewall

### No Windows:
1. Abra "Firewall do Windows Defender"
2. Permita as portas 80 (HTTP) e 443 (HTTPS)
3. Ou via PowerShell:
```powershell
New-NetFirewallRule -DisplayName "HTTP" -Direction Inbound -LocalPort 80 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "HTTPS" -Direction Inbound -LocalPort 443 -Protocol TCP -Action Allow
```

### No Linux:
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp  # SSH (importante!)
sudo ufw enable
```

---

## ✅ Checklist de Deploy

- [ ] DNS configurado e propagado (teste com `ping tazsistemas.com.br`)
- [ ] Build do site feito (`npm run build`)
- [ ] Arquivos copiados para o servidor
- [ ] Nginx configurado e rodando
- [ ] SSL/HTTPS configurado
- [ ] Firewall configurado
- [ ] Testar acesso: `https://tazsistemas.com.br`

---

## 🧪 Testar Configuração

### 1. Testar DNS:
```bash
ping tazsistemas.com.br
nslookup tazsistemas.com.br
```

### 2. Testar Site:
Abra no navegador: `https://tazsistemas.com.br`

### 3. Verificar SSL:
Acesse: https://www.ssllabs.com/ssltest/analyze.html?d=tazsistemas.com.br

---

## 🐛 Troubleshooting

### Site não carrega
```bash
# Verificar logs do Nginx
# Windows: C:\nginx\logs\error.log
# Linux: sudo tail -f /var/log/nginx/error.log

# Verificar se build foi feito
ls TazSistemas/dist

# Verificar permissões (Linux)
sudo chown -R www-data:www-data /var/www/tazsistemas
sudo chmod -R 755 /var/www/tazsistemas
```

### SSL não funciona
- Verificar se DNS está propagado
- Verificar se portas 80 e 443 estão abertas
- Verificar logs do Certbot: `sudo certbot certificates`

### Erro 404 em rotas
- Verificar se a configuração `try_files` está correta no Nginx
- Verificar se está servindo `index.html` para todas as rotas

### Assets não carregam
- Verificar caminhos relativos no build
- Verificar se o `base` está configurado corretamente no `vite.config.js`

---

## 🔄 Atualizar Site

Para atualizar o site após fazer alterações:

```bash
# 1. Fazer build novamente
cd TazSistemas
npm run build

# 2. Copiar arquivos para o servidor (se build local)
scp -r dist/* usuario@servidor:/var/www/tazsistemas/dist/

# 3. Recarregar Nginx (se necessário)
sudo systemctl reload nginx
```

---

## 📝 Estrutura de Diretórios Recomendada

```
/var/www/tazsistemas/          # Linux
├── dist/                      # Arquivos do build
│   ├── index.html
│   ├── assets/
│   └── ...
└── .well-known/               # Para validação SSL (se necessário)

C:\Sistemas\TazSistemas\       # Windows
├── dist\                      # Arquivos do build
│   ├── index.html
│   ├── assets\
│   └── ...
```

---

## 🚀 Próximos Passos

1. **Monitoramento:** Configure logs e monitoramento
2. **Backup:** Configure backup automático dos arquivos
3. **Performance:** Configure CDN se necessário
4. **Analytics:** Adicione Google Analytics ou similar
5. **SEO:** Configure meta tags e sitemap

---

## 📞 Suporte

Em caso de problemas:
1. Verifique logs: logs do Nginx
2. Verifique status: `sudo systemctl status nginx` (Linux)
3. Teste conectividade: `curl` e `ping`
4. Verifique firewall e portas

---

**🎉 Pronto! Seu site está acessível em https://tazsistemas.com.br!**
