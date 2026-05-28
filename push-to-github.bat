@echo off
cd /d "%~dp0"
echo Initialising git repository...
git init
git add .
git commit -m "Initial commit: Red Beacon Asset Management website"
git branch -M main
git remote add origin https://github.com/rbchelsea98/RB-AM.git
git push -u origin main
echo.
echo Done! Check https://github.com/rbchelsea98/RB-AM
pause
