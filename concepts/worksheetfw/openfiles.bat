@echo off
color b7
color f0
PATH=Y:\dev\tools;Y:\dev\tools\np2;%PATH%
:: SETLOCAL ENABLEDELAYEDEXPANSION 

notepad.exe app.js
notepad.exe tools.js
notepad.exe style.css
notepad.exe index.html
notepad.exe notes.txt
notepad.exe module-tables.js

:: ########################################
:end
:: pause

