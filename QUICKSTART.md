# Mently - Quick Start Guide

## ⚡ 5-Minute Setup

### Step 1: Prerequisites
Ensure you have installed:
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Git](https://git-scm.com/)
- [OpenAI API Key](https://platform.openai.com/api-keys)

### Step 2: Clone Repository
```bash
cd desktop
git clone <repository-url>
cd mently
```

### Step 3: Backend Configuration
```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials
# (Use your favorite editor)
```

**Required .env values:**
```
PORT=5000
MONGODB_URI=
JWT_SECRET=change_me_to_a_strong_secret_key
OPENAI_API_KEY=sk-your-openai-key
CLIENT_URL=http://localhost:3000
```

**Start Backend:**
```bash
npm run dev
```

Expected output:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
✓ Environment: development
```

### Step 4: Frontend Configuration (New Terminal)
```bash
cd client

# Install dependencies
npm install

# Frontend doesn't need .env for local development
# (Already configured to use http://localhost:5000)

# Start Frontend
npm run dev
```

Expected output:
```
  VITE v4.2.0  ready in 123 ms

  ➜  Local:   http://localhost:3000/
```

### Step 5: Open Application
- Open browser to [http://localhost:3000](http://localhost:3000)
- Create account or login
- Start chatting!

## 💡 What to Try First

1. **Register Account**
   - Click "Create Account"
   - Fill in email, password, name
   - Submit

2. **Start a Chat**
   - Click "Start New Chat"
   - Enter a title (e.g., "Dealing with stress")
   - Click "Create Chat"

3. **Chat with AI**
   - Type your message
   - Optionally select your mood
   - Click send or press Ctrl+Enter
   - AI responds based on selected therapy type

4. **Track Mood**
   - In Dashboard, click mood indicator
   - Select emoji for current mood
   - Set intensity (1-10)
   - Add optional notes
   - View statistics

5. **Update Profile**
   - Click Profile in sidebar
   - Update your information
   - Choose therapy preference
   - Save changes

## 🔧 Troubleshooting

### MongoDB Connection Error
```
✗ MongoDB connection failed
```
**Solution:**
- Ensure MongoDB is running locally OR
- Update MONGODB_URI to MongoDB Atlas connection string
- Check connection string format

### OpenAI API Error
```
Failed to generate response
```
**Solution:**
- Verify OPENAI_API_KEY is correct
- Check API key is active in OpenAI dashboard
- Ensure account has credits/billing enabled

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Change PORT in .env to unused port (e.g., 5001)
# Or kill process using the port
```

### Build/Dependency Issues
```bash
# Clear everything and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📚 Common URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:5000 |
| API Health | http://localhost:5000/api/health |
| MongoDB | localhost:27017 |

## 🚀 Next Steps

1. **Deploy Backend** → Heroku, Railway, or Digital Ocean
2. **Deploy Frontend** → Vercel, Netlify, or GitHub Pages
3. **Setup Database** → Use MongoDB Atlas for cloud storage
4. **Custom Domain** → Add your domain name
5. **Enable Payments** → Add subscription features

## 📖 Full Documentation

- [Backend Setup](./server/README.md)
- [Frontend Setup](./client/README.md)
- [API Documentation](./server/README.md#api-endpoints)
- [Architecture](./README.md#🏗️-architecture)

## 🆘 Stuck?

1. Check logs in terminal
2. Verify environment variables
3. Ensure all services running
4. Check network connectivity
5. See main [README.md](./README.md)

## ✅ Verify Installation

**Backend Check:**
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"OK","timestamp":"..."}
```

**Frontend Check:**
Your browser should show Mently login page

---

Happy chatting! 🧠

*If you encounter issues, check the troubleshooting section above.*
