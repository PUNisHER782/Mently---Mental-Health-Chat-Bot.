import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/Layout';
import { LoginForm, RegisterForm } from '../components/AuthForms';
import { Button } from '../components/Button';

export const AuthPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.25)] p-8 md:p-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {isLogin ? 'Welcome Back' : 'Join Mently'}
          </h2>

          <p className="text-gray-500 text-base leading-relaxed">
            {isLogin
              ? 'Login to continue your wellness journey'
              : 'Start your mental wellness journey today'}
          </p>
        </div>

        {/* Forms */}
        <div className="space-y-5">
          {isLogin ? (
            <LoginForm onSuccess={() => navigate('/dashboard')} />
          ) : (
            <RegisterForm onSuccess={() => navigate('/dashboard')} />
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 mb-4">
            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}
          </p>

          <Button
            variant="outline"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full h-12 rounded-xl text-base font-medium"
          >
            {isLogin ? 'Create Account' : 'Login'}
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};