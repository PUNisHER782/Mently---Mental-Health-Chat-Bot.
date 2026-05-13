import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  _id?: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface IChat extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  messages: IMessage[];
  mood?: string;
  moodIntensity?: number; // 1-10
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const chatSchema = new Schema<IChat>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    messages: [messageSchema],
    mood: {
      type: String,
      enum: ['happy', 'sad', 'anxious', 'stressed', 'calm', 'neutral'],
      default: 'neutral',
    },
    moodIntensity: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
chatSchema.index({ userId: 1, createdAt: -1 });

export const Chat = mongoose.model<IChat>('Chat', chatSchema);
