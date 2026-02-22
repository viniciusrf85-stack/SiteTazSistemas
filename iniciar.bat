@echo off
echo ====================================
echo Iniciando servidor de desenvolvimento
echo ====================================
echo.

cd /d "%~dp0"
call npm run dev

pause
