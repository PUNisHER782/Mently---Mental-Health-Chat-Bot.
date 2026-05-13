import React, { useState } from 'react';
import { Send, Lightbulb } from 'lucide-react';
import { Button } from './Button';
import { TextArea, Select } from './Form';
import { Avatar } from './UI';
import axios from 'axios';

interface Message {
  _id?: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  chatId: string;
  messages: Message[];
  onMessageSent: (message: Message) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  chatId,
  messages,
  onMessageSent,
}) => {
  const [message, setMessage] = useState('');
  const [mood, setMood] = useState('');
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      const response = await axios.post(`/api/chats/${chatId}/messages`, {
        message,
        mood: mood || undefined,
        moodIntensity: mood ? moodIntensity : undefined,
      });

      const updatedMessages = response.data.chat.messages as Message[];
      const newMessages = updatedMessages.slice(messages.length);
      newMessages.forEach((msg) => onMessageSent(msg));

      setMessage('');
      setMood('');
      setMoodIntensity(5);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Lightbulb size={48} className="text-blue-400 mb-3" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Start a conversation</h3>
            <p className="text-gray-500 max-w-sm">
              Share your thoughts and feelings, and I'm here to listen and support you.
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'assistant' && <Avatar name="Mently" size="sm" />}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-200'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <small className={msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </small>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4 space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <Select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            options={[
              { value: '', label: 'How are you feeling?' },
              { value: 'happy', label: 'Happy 😊' },
              { value: 'sad', label: 'Sad 😢' },
              { value: 'anxious', label: 'Anxious 😰' },
              { value: 'stressed', label: 'Stressed 😟' },
              { value: 'calm', label: 'Calm 😌' },
            ]}
          />
          {mood && (
            <Select
              value={moodIntensity.toString()}
              onChange={(e) => setMoodIntensity(parseInt(e.target.value))}
              options={Array.from({ length: 10 }, (_, i) => ({
                value: (i + 1).toString(),
                label: `Intensity: ${i + 1}/10`,
              }))}
            />
          )}
        </div>

        <div className="flex gap-2">
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message... (Shift+Enter for new line)"
            className="!resize-none"
            rows={3}
            disabled={isSending}
          />
          <div className="flex flex-col justify-end">
            <Button
              onClick={handleSendMessage}
              isLoading={isSending}
              size="lg"
              className="h-full"
              disabled={!message.trim() || isSending}
            >
              <Send size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
