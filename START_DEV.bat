@echo off
REM Spaz SsG Platform - Development Server Startup

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║         SPAZ SSG - OFFICIAL ARTIST PLATFORM                   ║
echo ║                 Development Server                             ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

echo Installing dependencies (if needed)...
call pnpm install --frozen-lockfile 2>nul

echo.
echo Starting Next.js development server...
echo.
echo 🚀 Website will be available at: http://localhost:3000
echo 📱 Admin Dashboard at:            http://localhost:3000/admin
echo.
echo Press Ctrl+C to stop the server
echo.

cd apps\web
call pnpm run dev

pause
