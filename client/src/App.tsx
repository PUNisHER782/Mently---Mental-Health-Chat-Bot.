import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';

import { Toast } from './components/UI';

import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { ProtectedRoute } from './pages/ProtectedRoute';

import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UIProvider>

          <Toast />

          <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/" element={<AuthPage />} />

            {/* DASHBOARD */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* CHAT */}
            <Route
              path="/chat/:chatId"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />

            {/* PROFILE */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* SETTINGS */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* CATCH ALL */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </UIProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;