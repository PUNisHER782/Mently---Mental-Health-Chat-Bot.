# Mently - AI Mental Health Chatbot 🧠

A complete, production-ready full-stack mental health chatbot application with AI-powered conversations, mood tracking, user authentication, and modern UI/UX.

## 📋 Overview

Mently is an AI mental health companion designed to:
- Provide empathetic support through AI-powered conversations
- Help users track and understand their emotions
- Offer different therapy approaches (Cognitive, Mindfulness, Supportive, General)
- Maintain conversation history for continuity
- Visualize mood patterns over time

## 🎯 Key Features

### 🤖 AI Chatbot
- OpenAI GPT-3.5 powered conversations
- Contextual understanding with conversation history
- Multiple therapy approaches
- Empathetic and supportive responses
- Real-time streaming responses

### 👤 User Management
- Secure authentication with JWT
- User profiles and customization
- Therapy preference selection
- Password hashing with bcryptjs

### 💬 Chat Features
- Create and manage multiple conversations
- Full chat history persistence
- Mood tracking during conversations
- Chat renaming and deletion
- Chronological message display

### 📊 Mood Analytics
- Track daily mood with intensity ratings (1-10)
- Visual charts (pie, bar graphs)
- Mood statistics and trends
- Mood distribution analysis
- 7-day, 30-day, 90-day views

### 🎨 Beautiful UI/UX
- Modern gradient design
- Responsive layout (mobile-first)
- Smooth animations and transitions
- Intuitive navigation
- Dark/light mode ready
- Accessibility focused

## 🏗️ Architecture

### Backend Stack
```
Express.js + Node.js + TypeScript
├── MongoDB (Mongoose ODM)
├── JWT Authentication
├── ollama medgemma:4b integration
└── Comprehensive Error Handling
```

### Frontend Stack
```
React 18 + TypeScript + Vite
├── Tailwind CSS (styling)
├── Recharts (data visualization)
├── Axios (HTTP client)
├── React Router v6 (routing)
└── Lucide React (icons)
```

### Database Schema
```
Users
├── Email (unique)
├── Password (hashed)
├── First/Last Name
├── Therapy Preference
├── Bio & Avatar
└── Timestamps

Chats
├── UserId (ref)
├── Title
├── Messages
│   ├── Sender (user/assistant)
│   ├── Content
│   └── Timestamp
├── Mood Tracking
└── Timestamps

MoodTracker
├── UserId (unique ref)
└── Entries[]
    ├── Mood (category)
    ├── Intensity (1-10)
    ├── Notes
    ├── Activities
    └── Timestamp
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 16.0.0
- **MongoDB** (local or MongoDB Atlas)
- **npm** or **yarn**

### Installation

#### 1. Clone and Navigate
```bash
cd mently
```

#### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
```

Update `.env` with:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRY=7d
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000
```

Start backend:
```bash
npm run dev
```

#### 3. Frontend Setup
```bash
cd ../client
npm install
cp .env.example .env
```

Update `.env` with:
```env
VITE_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm run dev
```

#### 4. Access Application
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
GET    /api/auth/profile           Get user profile (auth required)
PUT    /api/auth/profile           Update profile (auth required)
```

### Chat Endpoints
```
POST   /api/chats                  Create new chat (auth required)
GET    /api/chats                  Get chat history (auth required)
GET    /api/chats/:chatId          Get specific chat (auth required)
POST   /api/chats/:chatId/messages Send message (auth required)
PUT    /api/chats/:chatId/title    Update chat title (auth required)
DELETE /api/chats/:chatId          Delete chat (auth required)
```

### Mood Endpoints
```
POST   /api/mood                   Add mood entry (auth required)
GET    /api/mood/history           Get mood history (auth required)
GET    /api/mood/stats             Get mood statistics (auth required)
```

### Health Check
```
GET    /api/health                 Server health status
```

## 📦 Project Structure

```
mently/
│
├── server/
│   ├── src/
│   │   ├── db/
│   │   │   ├── connection.ts       # MongoDB connection setup
│   │   │   └── index.ts            # DB exports
│   │   │
│   │   ├── models/
│   │   │   ├── User.ts             # User schema & methods
│   │   │   ├── Chat.ts             # Chat & message schema
│   │   │   └── MoodTracker.ts       # Mood tracking schema
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.ts   # Auth logic
│   │   │   ├── chatController.ts   # Chat operations
│   │   │   └── moodController.ts   # Mood operations
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.ts       # Auth endpoints
│   │   │   ├── chatRoutes.ts       # Chat endpoints
│   │   │   └── moodRoutes.ts       # Mood endpoints
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts             # JWT verification
│   │   │   └── errorHandler.ts     # Error handling
│   │   │
│   │   ├── utils/
│   │   │   └── openai.ts           # OpenAI integration
│   │   │
│   │   └── index.ts                # Server entry point
│   │
│   ├── .env.example
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   ├── README.md
│   └── dist/                       # Compiled output
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Button.tsx          # Button component
│   │   │   ├── Card.tsx            # Card component
│   │   │   ├── Form.tsx            # Form inputs
│   │   │   ├── UI.tsx              # UI utilities
│   │   │   ├── Layout.tsx          # Page layouts
│   │   │   ├── AuthForms.tsx       # Login/Register forms
│   │   │   ├── ChatWindow.tsx      # Chat interface
│   │   │   └── MoodComponents.tsx  # Mood tracking
│   │   │
│   │   ├── pages/
│   │   │   ├── AuthPage.tsx        # Auth page
│   │   │   ├── DashboardPage.tsx   # Dashboard
│   │   │   ├── ChatPage.tsx        # Chat view
│   │   │   ├── ProfilePage.tsx     # User profile
│   │   │   └── ProtectedRoute.tsx  # Route protection
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.tsx     # Auth state
│   │   │   └── UIContext.tsx       # UI state
│   │   │
│   │   ├── hooks/
│   │   │   └── useApi.ts           # API hooks
│   │   │
│   │   ├── App.tsx                 # Main app
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Global styles
│   │
│   ├── index.html
│   ├── .env.example
│   ├── .eslintrc.json
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.cjs
│   ├── README.md
│   └── dist/                       # Build output
│
└── README.md                       # This file
```

## 🔐 Security

- **JWT Authentication**: Stateless, secure token-based auth
- **Password Security**: Bcryptjs hashing (10 salt rounds)
- **CORS Protection**: Configurable origin whitelist
- **Input Validation**: Express validator on all inputs
- **Error Handling**: No sensitive info in error messages
- **Environment Variables**: All secrets in .env
- **HTTPS Ready**: Production deployment with SSL

## 🎓 Key Technologies Explained

### OpenAI Integration
- Uses GPT-3.5-turbo for conversations
- System prompts customize therapy approach
- Conversation history for context
- Temperature 0.7 for balanced responses

### MongoDB
- Document-based storage
- Mongoose ODM for schema validation
- Indexes for performance optimization
- TTL indexes for automatic cleanup (optional)

### JWT Flow
1. User registers/logs in
2. Server verifies credentials, signs JWT
3. Client stores token in localStorage
4. Client sends token in Authorization header
5. Server verifies token on protected routes

### React Context
- Global auth state management
- UI state for notifications
- Eliminates prop drilling
- Easy to test and debug

## 🚦 Development

### Run in Development Mode
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

### Build for Production
```bash
# Backend
cd server
npm run build

# Frontend
cd client
npm run build
```

### Run Production Build
```bash
# Backend
cd server
npm start

# Frontend
cd client
npm run preview
```

## 🧪 Testing

### Backend
```bash
cd server
npm run lint          # ESLint
npm run build         # TypeScript check
```

### Frontend
```bash
cd client
npm run lint          # ESLint
npm run build         # Vite build
```

## 📱 Responsive Design

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1280px+

Mobile-first approach with progressive enhancement.

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation
- Color contrast compliance
- Form validation feedback

## 🔄 State Flow

```
User Input
    ↓
Component State Update
    ↓
API Call (if needed)
    ↓
Context Update
    ↓
Component Re-render
    ↓
UI Update + Toast Notification
```

## 💡 Best Practices Implemented

✅ TypeScript for type safety
✅ Error boundary handling
✅ Loading states on all async operations
✅ Proper cleanup in useEffect
✅ Separation of concerns (components, pages, utils)
✅ Reusable components
✅ Environment variable management
✅ Comprehensive error messages
✅ Responsive design
✅ Accessibility considerations

## ⚠️ Important Notes

1. **AI Limitations**: This chatbot is an AI companion, NOT a replacement for professional mental health services
2. **Crisis Support**: For emergencies, contact local mental health authorities
3. **Data Privacy**: Review privacy policy for data handling
4. **API Costs**: OpenAI API calls incur costs
5. **Rate Limiting**: Implement rate limiting for production

## 🔗 External Resources

- [MongoDB Docs](https://docs.mongodb.com/)
- [React Docs](https://react.dev)
- [Express.js Docs](https://expressjs.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## 📄 License

MIT License - Feel free to use this project for personal or educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support & Contact

- **Issues**: Use GitHub Issues for bug reports
- **Discussions**: Use GitHub Discussions for questions
- **Email**: duttaarijit782@gmail.com

## 🎉 Acknowledgments

- Ollama Medgemma:4b
- MongoDB for database
- React community
- Tailwind Labs
- All open-source contributors

---

**Made with ❤️ for mental wellness**

*Last Updated: May 8, 2026*

Happy coding! 🚀
#   M e n t l y - - - M e n t a l - H e a l t h - C h a t - B o t .  
 