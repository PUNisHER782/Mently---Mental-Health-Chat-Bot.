import mongoose, { Schema, Document } from 'mongoose';

export interface IMoodEntry {
  mood: string;
  intensity: number; // 1-10
  notes?: string;
  activities?: string[];
  timestamp: Date;
}

export interface IMoodTracker extends Document {
  userId: mongoose.Types.ObjectId;
  entries: IMoodEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const moodEntrySchema = new Schema<IMoodEntry>(
  {
    mood: {
      type: String,
      enum: ['happy', 'sad', 'anxious', 'stressed', 'calm', 'neutral'],
      required: true,
    },
    intensity: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    activities: {
      type: [String],
      default: [],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const moodTrackerSchema = new Schema<IMoodTracker>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    entries: [moodEntrySchema],
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
moodTrackerSchema.index({ userId: 1, 'entries.timestamp': -1 });

export const MoodTracker = mongoose.model<IMoodTracker>('MoodTracker', moodTrackerSchema);
