@echo off
chcp 65001 >nul
title Biblioteca escolar
cd /d "%~dp0"

rem La biblioteca no necesita servidor: abre la pagina directamente en Chrome
start "" powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0abrir_navegador.ps1"
