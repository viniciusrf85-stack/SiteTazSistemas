@echo off
chcp 65001 >nul
echo ========================================
echo 🌐 Configuração de Domínio - TazSistemas
echo ========================================
echo.

set DOMINIO=tazsistemas.com.br

echo 📝 Configurando para o domínio: %DOMINIO%
echo.

REM Criar arquivo .env.production se não existir
if not exist ".env.production" (
    echo Criando arquivo .env.production...
    (
        echo # Configuração de produção para %DOMINIO%
        echo # VITE_BASE_URL=https://%DOMINIO%
    ) > .env.production
    echo ✅ Arquivo .env.production criado
) else (
    echo ⚠️  Arquivo .env.production já existe
)

echo.
echo ========================================
echo ✅ Configuração concluída!
echo ========================================
echo.
echo 📋 Próximos passos:
echo.
echo 1. Configure os registros DNS:
echo    - %DOMINIO% → IP do seu servidor
echo    - www.%DOMINIO% → IP do seu servidor (opcional)
echo.
echo 2. Faça o build do site:
echo    build-producao.bat
echo.
echo 3. Configure Nginx (veja nginx-config-exemplo.conf)
echo.
echo 4. Configure SSL/HTTPS com Let's Encrypt
echo.
echo 5. Teste o acesso: https://%DOMINIO%
echo.
pause
