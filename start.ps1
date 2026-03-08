# CivicFix Quick Start Script for PowerShell

Clear-Host

Write-Host @"

======================================
 CivicFix - Quick Start Setup
======================================

"@ -ForegroundColor Cyan

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "[CREATE] Creating .env.local file from template..." -ForegroundColor Yellow
    Copy-Item ".env.local.example" ".env.local"
    Write-Host ""
    Write-Host "⚠️  IMPORTANT: Edit .env.local with your MongoDB URI and NextAuth secret" -ForegroundColor Red
    Write-Host "   Open .env.local and fill in the required values" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to continue (after editing .env.local)"
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "[INSTALL] Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependencies installed" -ForegroundColor Green
    Write-Host ""
}

Write-Host "[START] Starting development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📱 Application will be available at http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

npm run dev

Read-Host "Press Enter to exit"
