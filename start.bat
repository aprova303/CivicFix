@echo off
REM CivicFix Quick Start Script for Windows

echo.
echo ======================================
echo  CivicFix - Quick Start Setup
echo ======================================
echo.

REM Check if .env.local exists
if not exist ".env.local" (
    echo [CREATE] Creating .env.local file from template...
    copy .env.local.example .env.local
    echo.
    echo ⚠️  IMPORTANT: Edit .env.local with your MongoDB URI and NextAuth secret
    echo    Open .env.local and fill in the required values
    echo.
    pause
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo [INSTALL] Installing dependencies...
    call npm install
    echo ✅ Dependencies installed
    echo.
)

echo [START] Starting development server...
echo.
echo 📱 Application will be available at http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
