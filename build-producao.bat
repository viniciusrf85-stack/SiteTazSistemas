@echo off
chcp 65001 >nul
echo ========================================
echo 🏗️  Build para Produção - TazSistemas
echo ========================================
echo.

cd /d "%~dp0"

echo 📦 Verificando dependências...
if not exist "node_modules\" (
    echo ⚠️  Dependências não instaladas. Instalando...
    call npm install
    if errorlevel 1 (
        echo ❌ Erro ao instalar dependências!
        pause
        exit /b 1
    )
)

echo.
echo 🔨 Fazendo build do site...
call npm run build

if errorlevel 1 (
    echo ❌ Erro no build!
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✅ Build concluído com sucesso!
echo ========================================
echo.
echo 📁 Arquivos gerados em: dist/
echo.
echo 📋 Próximos passos:
echo.
echo 1. Copie a pasta dist/ para o servidor
echo 2. Configure o Nginx (veja DEPLOY.md)
echo 3. Configure SSL/HTTPS
echo 4. Teste o acesso: https://tazsistemas.com.br
echo.
pause
