@echo off
echo Iniciando Sistema POS 1SOLUTION - Version Windows Offline
echo =========================================================
set RUNTIME=desktop
set NODE_ENV=development
npx tsx server/index.ts
pause