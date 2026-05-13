@echo off
echo.
echo 🧠 Welcome to Mently Setup!
echo ==================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js is installed
node -v

echo.
echo Setting up Backend...
cd server
echo Installing backend dependencies...
call npm install

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo Please update server\.env with your credentials:
    echo   - MONGODB_URI
    echo   - JWT_SECRET
    echo   - OPENAI_API_KEY
) else (
    echo ✓ .env already exists
)

cd ..

echo.
echo Setting up Frontend...
cd client
echo Installing frontend dependencies...
call npm install

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo ✓ .env created
) else (
    echo ✓ .env already exists
)

cd ..

echo.
echo ==================================
echo ✓ Setup Complete!
echo ==================================
echo.
echo Next Steps:
echo 1. Update server\.env with your credentials
echo 2. Start Backend:
echo    cd server ^&^& npm run dev
echo 3. In another terminal, start Frontend:
echo    cd client ^&^& npm run dev
echo 4. Open browser to http://localhost:3000
echo.
echo 🚀 Happy coding!
echo.
pause
