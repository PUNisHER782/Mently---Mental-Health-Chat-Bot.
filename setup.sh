#!/bin/bash

# Mently - Complete Setup Script
# This script sets up both backend and frontend

echo "🧠 Welcome to Mently Setup!"
echo "=================================="

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "\n📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "${RED}✗ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "${RED}✗ Git is not installed${NC}"
    echo "Please install Git from https://git-scm.com/"
    exit 1
fi

echo "${GREEN}✓ Node.js $(node -v)${NC}"
echo "${GREEN}✓ npm $(npm -v)${NC}"

# Setup Backend
echo "\n${YELLOW}Setting up Backend...${NC}"
cd server

echo "📦 Installing backend dependencies..."
npm install

echo "📝 Creating .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "${YELLOW}Please update server/.env with your credentials:${NC}"
    echo "  - MONGODB_URI"
    echo "  - JWT_SECRET"
    echo "  - OPENAI_API_KEY"
else
    echo "${GREEN}✓ .env already exists${NC}"
fi

cd ..

# Setup Frontend
echo "\n${YELLOW}Setting up Frontend...${NC}"
cd client

echo "📦 Installing frontend dependencies..."
npm install

echo "📝 Creating .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "${GREEN}✓ .env created${NC}"
else
    echo "${GREEN}✓ .env already exists${NC}"
fi

cd ..

echo "\n${GREEN}=================================="
echo "✓ Setup Complete!${NC}"
echo "=================================="

echo "\n${YELLOW}Next Steps:${NC}"
echo "1. Update server/.env with your credentials"
echo "2. Start Backend:"
echo "   ${YELLOW}cd server && npm run dev${NC}"
echo "3. In another terminal, start Frontend:"
echo "   ${YELLOW}cd client && npm run dev${NC}"
echo "4. Open browser to http://localhost:3000"

echo "\n${YELLOW}Documentation:${NC}"
echo "  - Quick Start: ./QUICKSTART.md"
echo "  - Full Docs: ./README.md"
echo "  - Backend Docs: ./server/README.md"
echo "  - Frontend Docs: ./client/README.md"

echo "\n🚀 Happy coding!\n"
