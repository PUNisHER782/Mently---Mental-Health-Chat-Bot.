import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardBody, CardHeader } from './Card';
import { LoadingSpinner } from './UI';
import axios from 'axios';

interface MoodStats {
  totalEntries: number;
  averageMood: number;
  averageIntensity: number;
  moodDistribution: Record<string, number>;
  mostCommonMood?: string;
}

export const MoodChart: React.FC<{ days?: number }> = ({ days = 30 }) => {
  const [stats, setStats] = useState<MoodStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await axios.get(`/api/mood/stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Failed to load mood stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [days]);

  if (isLoading) return <LoadingSpinner />;

  if (!stats || stats.totalEntries === 0) {
    return (
      <Card>
        <CardBody className="text-center text-gray-500">
          No mood data yet. Start tracking your mood to see analytics!
        </CardBody>
      </Card>
    );
  }

  const pieData = Object.entries(stats.moodDistribution).map(([mood, count]) => ({
    name: mood.charAt(0).toUpperCase() + mood.slice(1),
    value: count,
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6b7280'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-lg">Mood Distribution</h3>
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-semibold text-lg">Mood Statistics</h3>
        </CardHeader>
        <CardBody className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Total Entries</span>
            <span className="font-bold text-2xl text-blue-600">{stats.totalEntries}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-600">Average Intensity</span>
            <span className="font-bold text-2xl text-purple-600">{stats.averageIntensity?.toFixed(1)}/10</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Most Common Mood</span>
            <span className="font-bold capitalize">{stats.mostCommonMood || 'N/A'}</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export const MoodTracker: React.FC<{ onTrackMood?: () => void }> = ({ onTrackMood }) => {
  const [mood, setMood] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackMood = async () => {
    if (!mood) return;

    setIsLoading(true);
    try {
      await axios.post('/api/mood', {
        mood,
        intensity,
        notes,
      });

      setMood('');
      setIntensity(5);
      setNotes('');
      onTrackMood?.();
    } catch (error) {
      console.error('Failed to track mood:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const moodEmojis: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    anxious: '😰',
    stressed: '😟',
    calm: '😌',
    neutral: '😐',
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-lg">Track Your Mood</h3>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(moodEmojis).map(([moodVal, emoji]) => (
            <button
              key={moodVal}
              onClick={() => setMood(moodVal)}
              className={`p-3 rounded-lg transition-all ${
                mood === moodVal ? 'bg-blue-600 text-white scale-110' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-2xl">{emoji}</div>
              <div className="text-xs capitalize mt-1">{moodVal}</div>
            </button>
          ))}
        </div>

        {mood && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Intensity: {intensity}/10</label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about how you're feeling..."
              className="w-full px-3 py-2 rounded border border-gray-200 focus:border-blue-500 focus:outline-none"
              rows={3}
            />
          </>
        )}

        <button
          onClick={handleTrackMood}
          disabled={!mood || isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
        >
          {isLoading ? 'Saving...' : 'Save Mood Entry'}
        </button>
      </CardBody>
    </Card>
  );
};
