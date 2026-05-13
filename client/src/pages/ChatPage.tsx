import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/Layout';
import { ChatWindow } from '../components/ChatWindow';
import { Card, CardBody } from '../components/Card';
import { LoadingSpinner } from '../components/UI';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';
import axios from 'axios';

interface Message {
  _id?: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Chat {
  _id: string;
  title: string;
  messages: Message[];
  mood?: string;
  moodIntensity?: number;
}

export const ChatPage: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadChat = async () => {
      if (!chatId) return;

      try {
        const response = await axios.get(`/api/chats/${chatId}`);
        setChat(response.data.chat);
      } catch (error) {
        console.error('Failed to load chat:', error);
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadChat();
  }, [chatId, navigate]);

  const handleMessageSent = (message: Message) => {
    setChat((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, message],
      };
    });
  };

  const handleDeleteChat = async () => {
    if (!chatId || !window.confirm('Are you sure you want to delete this chat?')) return;

    setIsSaving(true);
    try {
      await axios.delete(`/api/chats/${chatId}`);
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to delete chat:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <LoadingSpinner />
        </div>
      </DashboardLayout>
    );
  }

  if (!chat) {
    return (
      <DashboardLayout>
        <Card>
          <CardBody className="text-center text-gray-500">
            Chat not found
          </CardBody>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-screen max-h-[calc(100vh_-_100px)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ChevronLeft size={20} />
            </Button>
            <h1 className="text-2xl font-bold">{chat.title}</h1>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteChat}
            isLoading={isSaving}
          >
            <Trash2 size={18} />
          </Button>
        </div>

        {/* Chat Window */}
        {chatId && (
          <ChatWindow
            chatId={chatId}
            messages={chat.messages}
            onMessageSent={handleMessageSent}
          />
        )}
      </div>
    </DashboardLayout>
  );
};
