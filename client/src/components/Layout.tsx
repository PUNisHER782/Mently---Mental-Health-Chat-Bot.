import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Home, Settings, Brain } from 'lucide-react';
import { Avatar, Button } from './UI';
import { Card } from './Card';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >

          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Brain size={22} className="text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Mently
            </h1>

            <p className="text-xs text-gray-500 hidden sm:block">
              AI Mental Wellness
            </p>
          </div>
        </div>

        {/* RIGHT */}
        {user && (
          <div className="flex items-center gap-4">

            <div className="hidden md:block text-right">
              <p className="text-sm font-semibold text-gray-800">
                {user.firstName}
              </p>

              <p className="text-xs text-gray-500">
                {user.email}
              </p>
            </div>

            <Avatar
              name={`${user.firstName} ${user.lastName}`}
              size="sm"
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export const Sidebar: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
}> = ({ isOpen = true, onClose }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <User size={20} />,
      label: 'Profile',
      path: '/profile',
    },
    {
      icon: <Settings size={20} />,
      label: 'Settings',
      path: '/settings',
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? 'block' : 'hidden'
      } md:block fixed md:relative w-72 h-screen md:h-auto bg-white/70 backdrop-blur-xl border-r border-gray-200 overflow-y-auto`}
    >

      <nav className="p-5 space-y-3">

        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              onClose?.();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white transition-all duration-300 hover:shadow-lg"
          >
            {item.icon}

            <span className="font-medium">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  showSidebar = true,
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-indigo-50">

      <Header />

      <div className="flex">

        {showSidebar && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 md:p-8 xl:p-10">

          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export const AuthLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">

          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center mx-auto mb-5 shadow-2xl">
            <Brain size={40} className="text-white" />
          </div>

          <h1 className="text-5xl font-bold text-white mb-3">
            Mently
          </h1>

          <p className="text-indigo-100 text-lg">
            Your AI Mental Health Companion
          </p>
        </div>

        <Card className="rounded-3xl shadow-2xl border border-white/20 backdrop-blur-xl">
          {children}
        </Card>
      </div>
    </div>
  );
};