# Mently 🧠 — AI Mental Health Chatbot

A production-ready full-stack AI mental health companion with:
- AI-powered, empathetic conversations (OpenAI GPT-3.5)
- Mood tracking + analytics (1–10 intensity)
- User authentication (JWT + bcrypt)
- Conversation history persistence

> **Disclaimer**: This project is for support and education. It is **not** a replacement for professional mental health services.

> **Crisis support**: If you or someone else is in danger or considering self-harm, contact your local emergency services or a local crisis hotline immediately.

---

## ✨ Features

### 🤖 AI Chatbot
- Context-aware conversations using conversation history
- Multiple therapy approaches
- Supportive, empathetic responses
- Streaming responses (real-time feel)

### 👤 Users & Profiles
- Register/Login with JWT authentication
- Password hashing with bcryptjs
- Therapy preference selection
- Profile customization

### 💬 Chats & History
- Create multiple chat sessions
- Persist full chat messages
- Rename/delete chats
- Mood tracking during conversations

### 📊 Mood Analytics
- Daily mood entries with intensity (1–10)
- Mood charts + statistics
- Trend views (7/30/90 days)

### 🎨 UI/UX
- Responsive, mobile-first UI
- Tailwind-based design
- Accessibility-focused

---

## 🏗️ Architecture

### Backend
- Express.js + Node.js + TypeScript
- MongoDB (Mongoose ODM)
- JWT authentication + Express middleware
- OpenAI integration
- Error handling utilities

### Frontend
- React 18 + TypeScript + Vite
- Tailwind CSS
- Recharts for analytics visualization
- Axios for API calls
- React Router v6
- Lucide React icons

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- MongoDB (local or MongoDB Atlas)
- npm (or yarn)
- **Ollama** running with model **`medgemma:4b`** (required for the AI model used by this project)

### 0) Start Ollama (required)
1. Install **Ollama** from https://ollama.com/
2. Pull the model:
   ```bash
   ollama pull medgemma:4b
   ```
3. Ensure the Ollama server is running:
   ```bash
   ollama serve
   ```

> This project takes its model from **Ollama Medgemma:4b**.

### 1) Clone
```bash
cd mently
```

### 2) Start Backend
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
Update `.env` (example keys):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRY=7d
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000
```

### 3) Start Frontend
```bash
cd ../client
npm install
cp .env.example .env
npm run dev
```
Set frontend `.env`:
```env
VITE_API_URL=http://localhost:5000
```

### 4) Open
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📚 Documentation

- Quick start: [`QUICKSTART.md`](./QUICKSTART.md)
- Backend API docs: [`server/README.md`](./server/README.md)
- Deployment guide: [`DEPLOYMENT.md`](./DEPLOYMENT.md)
- Contributing: [`CONTRIBUTING.md`](./CONTRIBUTING.md)

---

## 🔐 Security & Disclaimer

- JWT authentication (stateless token-based auth)
- Password hashing with bcryptjs
- CORS origin whitelist
- Input validation on endpoints
- No sensitive details in error messages
- Secrets kept in `.env`

---

## 🧪 Scripts

### Backend
```bash
cd server
npm run lint
npm run build
```

### Frontend
```bash
cd client
npm run lint
npm run build
```

---

## 🧩 Project Structure

```text
mently/
├── server/
│   └── src/               # backend code
├── client/
│   └── src/               # frontend code
├── QUICKSTART.md
├── DEPLOYMENT.md
├── CONTRIBUTING.md
└── README.md
```

---

## 📄 License

MIT License — feel free to use this project for personal or educational purposes.

---

**Made with ❤️ for mental wellness**

*Last updated: May 8, 2026* 

