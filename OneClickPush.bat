@echo off
title Portfolio 1-Click Upload to GitHub
color 0A
echo ====================================================
echo   Ali Raza Portfolio - 1-Click GitHub Push
echo ====================================================
echo.
echo Connecting to GitHub...
echo GitHub sign-in window (browser/popup) open hoga.
echo Us par "Authorize" / "Sign in" click kar dein.
echo.

set GIT="C:\Program Files\Microsoft SQL Server Management Studio 22\Release\Common7\IDE\CommonExtensions\Microsoft\TeamFoundation\Team Explorer\Git\cmd\git.exe"

%GIT% -C "d:\My portfolio 01" remote set-url origin "https://github.com/meharaliraza207333-byte/My-portfolio.git"
%GIT% -C "d:\My portfolio 01" push -u origin main --force

echo.
echo ====================================================
if %ERRORLEVEL% == 0 (
    echo SUCCESS! Portfolio GitHub par live upload ho gaya!
) else (
    echo Something went wrong. Please try again.
)
echo ====================================================
echo.
pause
