import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../components/Layout';
import { Button } from '../components/Button';
import { LoadingSpinner, Modal } from '../components/UI';
import { MoodChart, MoodTracker } from '../components/MoodComponents';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { Input } from '../components/Form';
import axios from 'axios';

interface Chat {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newChatTitle, setNewChatTitle] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const response = await axios.get('/api/chats');
      setChats(response.data.chats);
    } catch (error) {
      console.error('Failed to load chats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateChat = async () => {
    if (!newChatTitle.trim()) return;

    setIsCreating(true);

    try {
      const response = await axios.post('/api/chats', {
        title: newChatTitle,
      });

      setChats([response.data.chat, ...chats]);

      navigate(`/chat/${response.data.chat._id}`);

      setNewChatTitle('');
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Failed to create chat:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteChat = async (chatId: string) => {
    if (!window.confirm('Are you sure you want to delete this chat?')) return;

    try {
      await axios.delete(`/api/chats/${chatId}`);

      setChats(chats.filter((c) => c._id !== chatId));
    } catch (error) {
      console.error('Failed to delete chat:', error);
    }
  };

  return (
    <DashboardLayout>

      <div className="max-w-6xl mx-auto space-y-6">

        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 md:p-8 shadow-xl">

          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-400/20 rounded-full blur-3xl" />

          <div className="relative z-10">

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Welcome back 👋
            </h1>

            <p className="text-white/90 text-base md:text-lg max-w-2xl mb-6 leading-relaxed">
              Your AI-powered mental wellness companion.
              Track moods, reflect on emotions, and start meaningful conversations.
            </p>

            <Button
  onClick={() => setIsCreateModalOpen(true)}
  className="bg-slate-900 text-white hover:bg-slate-800 h-12 px-6 rounded-2xl font-semibold shadow-2xl border border-white/10 flex items-center gap-2"
>
  <Plus size={20} />
  <span>Start New Chat</span>
</Button>
          </div>
        </div>

        {/* MOOD SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* MOOD ANALYTICS */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg border border-gray-100 p-5">

            <div className="mb-5">

              <h2 className="text-2xl font-bold text-gray-800">
                Mood Analytics
              </h2>

              <p className="text-gray-500 mt-1">
                Track emotional patterns over time
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden">
              <MoodChart />
            </div>
          </div>

          {/* DAILY MOOD */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 h-fit">

            <div className="mb-5">

              <h2 className="text-2xl font-bold text-gray-800">
                Daily Mood
              </h2>

              <p className="text-gray-500 mt-1">
                How are you feeling today?
              </p>
            </div>

            <MoodTracker onTrackMood={loadChats} />
          </div>
        </div>

        {/* CHAT SECTION */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>

              <h2 className="text-3xl font-bold text-gray-800">
                Recent Conversations
              </h2>

              <p className="text-gray-500 mt-1">
                Continue your emotional wellness journey
              </p>
            </div>

            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="rounded-2xl h-11 px-5"
            >
              <Plus size={20} />
              New Chat
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : chats.length === 0 ? (

            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-3xl">

              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-50 flex items-center justify-center">

                <MessageSquare
                  size={40}
                  className="text-indigo-500"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                No conversations yet
              </h3>

              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Start your first conversation and begin tracking your emotional wellness.
              </p>

              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="rounded-2xl h-11 px-6"
              >
                Create First Chat
              </Button>
            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

              {chats.map((chat) => (

                <div
                  key={chat._id}
                  className="group bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl p-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >

                  <div
                    onClick={() => navigate(`/chat/${chat._id}`)}
                    className="cursor-pointer"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg mb-5">

                      <MessageSquare size={24} />
                    </div>

                    <h3 className="font-bold text-xl text-gray-800 mb-3 truncate group-hover:text-indigo-600 transition-colors">
                      {chat.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {new Date(chat.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">

                    <Button
                      onClick={() => navigate(`/chat/${chat._id}`)}
                      className="flex-1 rounded-xl"
                    >
                      Open Chat
                    </Button>

                    <Button
                      variant="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat._id);
                      }}
                      className="rounded-xl"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CREATE CHAT MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Start New Conversation"
      >

        <div className="space-y-5">

          <Input
            label="Chat Title"
            placeholder="e.g., Dealing with stress"
            value={newChatTitle}
            onChange={(e) => setNewChatTitle(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleCreateChat();
            }}
          />

          <div className="flex gap-3">

            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 rounded-xl h-11"
            >
              Cancel
            </Button>

            <Button
              onClick={handleCreateChat}
              isLoading={isCreating}
              className="flex-1 rounded-xl h-11"
            >
              Create Chat
            </Button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};