@echo off
echo ====================================
echo Instalando dependencias do projeto
echo ====================================
echo.

cd /d "%~dp0"
call npm install

echo.
echo ====================================
echo Instalacao concluida!
echo ====================================
echo.
echo Para iniciar o servidor de desenvolvimento, execute:
echo npm run dev
echo.
pause
