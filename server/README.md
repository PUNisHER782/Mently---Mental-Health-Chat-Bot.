# Mently - AI Mental Health Chatbot Backend

This is the backend server for Mently, an AI-powered mental health support chatbot.

## Features

- **User Authentication**: Secure JWT-based authentication
- **AI-Powered Chatbot**: OpenAI integration for intelligent conversations
- **Therapy Types**: Support for different therapy approaches (Cognitive, Mindfulness, General, Supportive)
- **Mood Tracking**: Track and analyze user mood patterns over time
- **Chat History**: Persistent chat sessions with full conversation logs
- **User Profiles**: Customizable user profiles with therapy preferences

## Prerequisites

- Node.js >= 16.0.0
- MongoDB
- Ollama Medgemma:4b

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your configuration:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure secret key for JWT
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `CLIENT_URL`: Frontend URL (for CORS)

## Development

Start the development server with hot reload:

```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

## Building

Build the TypeScript project:

```bash
npm run build
```

## Production

Start the production server:

```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (authenticated)
- `PUT /api/auth/profile` - Update user profile (authenticated)

### Chat
- `POST /api/chats` - Create a new chat session
- `GET /api/chats` - Get chat history
- `GET /api/chats/:chatId` - Get a specific chat
- `POST /api/chats/:chatId/messages` - Send a message
- `PUT /api/chats/:chatId/title` - Update chat title
- `DELETE /api/chats/:chatId` - Delete a chat

### Mood Tracking
- `POST /api/mood` - Add a mood entry
- `GET /api/mood/history` - Get mood history
- `GET /api/mood/stats` - Get mood statistics

### Health
- `GET /api/health` - Health check endpoint

## Environment Variables

```
PORT=5000
NODE_ENV=development
MONGODB_URI=
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRY=7d
OPENAI_API_KEY=your_openai_api_key_here
CLIENT_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

## Project Structure

```
server/
├── src/
│   ├── db/
│   │   └── connection.ts        # MongoDB connection
│   ├── models/
│   │   ├── User.ts             # User schema
│   │   ├── Chat.ts             # Chat schema
│   │   └── MoodTracker.ts       # Mood tracking schema
│   ├── controllers/
│   │   ├── authController.ts    # Auth logic
│   │   ├── chatController.ts    # Chat logic
│   │   └── moodController.ts    # Mood tracking logic
│   ├── routes/
│   │   ├── authRoutes.ts        # Auth routes
│   │   ├── chatRoutes.ts        # Chat routes
│   │   └── moodRoutes.ts        # Mood routes
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   └── errorHandler.ts      # Error handling
│   ├── utils/
│   │   └── openai.ts            # OpenAI integration
│   └── index.ts                 # Main server file
├── package.json
├── tsconfig.json
└── .env.example
```

## License

MIT
