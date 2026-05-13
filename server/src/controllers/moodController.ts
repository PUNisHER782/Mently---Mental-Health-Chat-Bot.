import { Request, Response } from 'express';
import { MoodTracker } from '../models/MoodTracker';
import { AppError, asyncHandler } from '../middleware/errorHandler';

export const addMoodEntry = asyncHandler(async (req: Request, res: Response) => {
  const { mood, intensity, notes, activities } = req.body;

  if (!mood || !intensity) {
    throw new AppError('Mood and intensity are required', 400);
  }

  if (intensity < 1 || intensity > 10) {
    throw new AppError('Intensity must be between 1 and 10', 400);
  }

  let moodTracker = await MoodTracker.findOne({ userId: req.userId });

  if (!moodTracker) {
    moodTracker = new MoodTracker({
      userId: req.userId,
      entries: [],
    });
  }

  moodTracker.entries.push({
    mood,
    intensity,
    notes: notes || '',
    activities: activities || [],
    timestamp: new Date(),
  });

  await moodTracker.save();

  res.status(201).json({
    message: 'Mood entry added successfully',
    entry: moodTracker.entries[moodTracker.entries.length - 1],
  });
});

export const getMoodHistory = asyncHandler(async (req: Request, res: Response) => {
  const { days = 30 } = req.query;

  const moodTracker = await MoodTracker.findOne({ userId: req.userId });

  if (!moodTracker) {
    return res.status(200).json({
      entries: [],
    });
  }

  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - Number(days));

  const filteredEntries = moodTracker.entries.filter(
    (entry) => entry.timestamp >= cutoffDate
  );

  res.status(200).json({
    entries: filteredEntries,
    stats: calculateMoodStats(filteredEntries),
  });
});

export const getMoodStats = asyncHandler(async (req: Request, res: Response) => {
  const moodTracker = await MoodTracker.findOne({ userId: req.userId });

  if (!moodTracker || moodTracker.entries.length === 0) {
    return res.status(200).json({
      averageMood: 5,
      moodDistribution: {},
      totalEntries: 0,
    });
  }

  const stats = calculateMoodStats(moodTracker.entries);

  res.status(200).json(stats);
});

interface MoodEntry {
  mood: string;
  intensity: number;
  timestamp: Date;
  notes?: string;
  activities?: string[];
}

interface MoodStats {
  averageMood: number;
  moodDistribution: { [key: string]: number };
  totalEntries: number;
  mostCommonMood?: string;
  averageIntensity?: number;
}

const calculateMoodStats = (entries: MoodEntry[]): MoodStats => {
  if (entries.length === 0) {
    return {
      averageMood: 5,
      moodDistribution: {},
      totalEntries: 0,
    };
  }

  const moodDistribution: { [key: string]: number } = {};
  let totalIntensity = 0;

  entries.forEach((entry) => {
    moodDistribution[entry.mood] = (moodDistribution[entry.mood] || 0) + 1;
    totalIntensity += entry.intensity;
  });

  const mostCommonMood = Object.keys(moodDistribution).reduce((a, b) =>
    moodDistribution[a] > moodDistribution[b] ? a : b
  );

  return {
    totalEntries: entries.length,
    averageMood: totalIntensity / entries.length,
    averageIntensity: totalIntensity / entries.length,
    moodDistribution,
    mostCommonMood,
  };
};
