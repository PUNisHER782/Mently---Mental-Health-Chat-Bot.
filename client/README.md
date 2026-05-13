# Mently - AI Mental Health Chatbot

A complete full-stack mental health chatbot application with AI-powered conversations, mood tracking, and modern UI/UX.

## 🎯 Features

### Core Features
- **AI Chatbot**: OpenAI-powered conversations with different therapy approaches
- **User Authentication**: Secure JWT-based authentication
- **Chat History**: Persistent conversations with full chat management
- **Mood Tracking**: Track emotions with intensity ratings and insights
- **User Profiles**: Customizable profiles with therapy preferences
- **Analytics**: Mood statistics and distribution charts

### UI/UX Features
- Beautiful gradient design with modern components
- Responsive layout (mobile, tablet, desktop)
- Real-time chat interactions
- Interactive mood tracking with emojis
- Toast notifications for user feedback
- Loading states and error handling

### Therapy Types
- **Cognitive**: Cognitive restructuring and thought patterns
- **Mindfulness**: Meditation and present-moment awareness
- **Supportive**: General support and validation
- **General**: Flexible, adaptive support

## 📁 Project Structure

```
mently/
├── server/                    # Backend
│   ├── src/
│   │   ├── db/              # Database connection
│   │   ├── models/          # MongoDB schemas (User, Chat, MoodTracker)
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth, error handling
│   │   ├── utils/           # OpenAI integration
│   │   └── index.ts         # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── client/                    # Frontend
    ├── src/
    │   ├── components/       # React components (UI, Forms, Chat, Mood)
    │   ├── pages/           # Page components
    │   ├── context/         # Auth and UI context
    │   ├── hooks/           # Custom API hooks
    │   ├── App.tsx          # Main app
    │   └── main.tsx         # Entry point
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.ts
    └── tsconfig.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- MongoDB (local or Atlas)
- OpenAI API key
- Git

### Backend Setup

1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your credentials:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mently
   JWT_SECRET=your_secure_secret_key
   OPENAI_API_KEY=your_openai_key
   CLIENT_URL=http://localhost:3000
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Chat
- `POST /api/chats` - Create new chat
- `GET /api/chats` - Get chat history
- `GET /api/chats/:chatId` - Get specific chat
- `POST /api/chats/:chatId/messages` - Send message
- `PUT /api/chats/:chatId/title` - Update chat title
- `DELETE /api/chats/:chatId` - Delete chat

### Mood Tracking
- `POST /api/mood` - Add mood entry
- `GET /api/mood/history` - Get mood history
- `GET /api/mood/stats` - Get mood statistics

### Health
- `GET /api/health` - Health check

## 🛠️ Available Scripts

### Backend
```bash
npm run dev      # Start development server
npm run build    # Build TypeScript
npm start        # Start production server
npm run lint     # Run ESLint
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Sensitive data in .env files
- **Input Validation**: Express validator for request validation
- **Error Handling**: Comprehensive error handling middleware

## 📊 Technology Stack

### Backend
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **AI**: OpenAI API
- **Utilities**: bcryptjs, axios, dotenv

### Frontend
- **Library**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Icons**: Lucide React
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Routing**: React Router v6

## 🎨 UI Components

- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Card**: Reusable card components with header/body/footer
- **Form**: Input, TextArea, Select with validation
- **Modal**: Configurable modal dialogs
- **Toast**: Notification system
- **Avatar**: User avatars with initials
- **Badge**: Status badges
- **Loading**: Spinner component
- **Layout**: Header, Sidebar, Dashboard layout

## 📈 Chat Features

- **Real-time Messaging**: Interactive chat interface
- **Mood Tracking**: Track mood before/during conversations
- **Therapy Customization**: Different conversation styles
- **Chat History**: Access previous conversations
- **Chat Management**: Create, rename, delete chats

## 📊 Mood Features

- **Mood Logging**: Log mood with intensity (1-10)
- **Mood Analytics**: View mood distribution and trends
- **Statistics**: Average mood, most common mood, etc.
- **Visual Charts**: Pie charts and bar graphs
- **Historical Data**: Filter by time period

## 🔄 State Management

- **AuthContext**: User authentication and profile
- **UIContext**: Toast notifications and UI state
- **Local Storage**: Persist authentication token
- **API Hooks**: Custom hooks for API calls

## ⚠️ Limitations & Disclaimers

- Mently is an AI companion and NOT a replacement for professional mental health services
- For severe distress or suicidal thoughts, contact a professional immediately
- All conversations are stored on our servers for quality improvement
- See privacy policy for data handling details

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

MIT

## 📧 Support

For support, reach out to support@mently.app

---

Built with ❤️ for mental wellness
