import { Request, Response } from 'express';
import { Chat } from '../models/Chat';
import { User } from '../models/User';
import { generateChatResponse } from '../utils/openai';
import { AppError, asyncHandler } from '../middleware/errorHandler';

export const createChat = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    throw new AppError('Title is required', 400);
  }

  const chat = new Chat({
    userId: req.userId,
    title,
    messages: [],
  });

  await chat.save();

  res.status(201).json({
    message: 'Chat created successfully',
    chat: {
      id: chat._id,
      title: chat.title,
      messages: chat.messages,
      createdAt: chat.createdAt,
    },
  });
});

export const getChatHistory = asyncHandler(async (req: Request, res: Response) => {
  const chats = await Chat.find({ userId: req.userId })
    .select('_id title createdAt updatedAt')
    .sort({ createdAt: -1 });

  res.status(200).json({
    chats,
  });
});

export const getChat = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;

  const chat = await Chat.findOne({ _id: chatId, userId: req.userId });

  if (!chat) {
    throw new AppError('Chat not found', 404);
  }

  res.status(200).json({
    chat,
  });
});

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const { message, mood, moodIntensity } = req.body;

  if (!message) {
    throw new AppError('Message content is required', 400);
  }

  const chat = await Chat.findOne({ _id: chatId, userId: req.userId });

  if (!chat) {
    throw new AppError('Chat not found', 404);
  }

  // Get user's therapy preference
  const user = await User.findById(req.userId);
  const therapyType = user?.preferredTherapyType || 'supportive';

  // Add user message to chat
  chat.messages.push({
    sender: 'user',
    content: message,
    timestamp: new Date(),
  });

  // Update mood if provided
  if (mood) {
    chat.mood = mood;
  }
  if (moodIntensity) {
    chat.moodIntensity = moodIntensity;
  }

  // Generate AI response
  const conversationMessages: Array<{ role: 'user' | 'assistant'; content: string }> = chat.messages.map((msg) => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.content,
  }));

  let aiResponse: string;
  try {
    aiResponse = await generateChatResponse(conversationMessages, therapyType);
  } catch (error) {
    console.error('Chat generation failed:', error);
    throw new AppError('AI response generation failed. Please try again later.', 500);
  }

  // Add AI response to chat
  chat.messages.push({
    sender: 'assistant',
    content: aiResponse,
    timestamp: new Date(),
  });

  await chat.save();

  res.status(200).json({
    message: 'Message sent successfully',
    chat: {
      id: chat._id,
      messages: chat.messages,
      mood: chat.mood,
      moodIntensity: chat.moodIntensity,
    },
  });
});

export const deleteChat = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;

  const chat = await Chat.findOneAndDelete({ _id: chatId, userId: req.userId });

  if (!chat) {
    throw new AppError('Chat not found', 404);
  }

  res.status(200).json({
    message: 'Chat deleted successfully',
  });
});

export const updateChatTitle = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const { title } = req.body;

  if (!title) {
    throw new AppError('Title is required', 400);
  }

  const chat = await Chat.findOneAndUpdate(
    { _id: chatId, userId: req.userId },
    { title },
    { new: true }
  );

  if (!chat) {
    throw new AppError('Chat not found', 404);
  }

  res.status(200).json({
    message: 'Chat title updated successfully',
    chat: {
      id: chat._id,
      title: chat.title,
    },
  });
});
