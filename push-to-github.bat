@echo off
echo Pushing Style DNA to GitHub...
cd /d "%~dp0"

where git >nul 2>nul || (
    echo ERROR: Git is not installed or not in PATH.
    echo Install from https://git-scm.com/download/win
    pause
    exit /b 1
)

git init
git add .
git commit -m "Initial commit: Style DNA MVP"

git remote remove origin 2>nul
git remote add origin https://github.com/MoskalVhyacheslav/style.git
git branch -M main
git push -u origin main

echo.
echo Done! Check https://github.com/MoskalVhyacheslav/style
pause
