@echo off
chcp 65001 >nul
echo ====================================
echo Reiniciando servidor completamente
echo ====================================
echo.

cd /d "%~dp0"

echo Parando processos do Node.js...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo Limpando cache do Vite...
if exist ".vite" (
    rmdir /s /q .vite
    echo Cache do Vite removido
)

if exist "dist" (
    rmdir /s /q dist
    echo Pasta dist removida
)

echo.
echo Verificando dependencias...
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
    if errorlevel 1 (
        echo ERRO ao instalar dependencias!
        pause
        exit /b 1
    )
)

echo.
echo ====================================
echo Iniciando servidor...
echo ====================================
echo.
echo IMPORTANTE:
echo 1. Apos o servidor iniciar, pressione Ctrl+F5 no navegador
echo 2. Ou limpe o cache do navegador (Ctrl+Shift+Delete)
echo 3. Ou abra em modo anonimo/privado
echo.
echo Servidor iniciando em: http://localhost:3001
echo.

call npm run dev

pause
