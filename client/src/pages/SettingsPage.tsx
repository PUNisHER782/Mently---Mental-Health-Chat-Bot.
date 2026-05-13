import React from 'react';
import { DashboardLayout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Bell, Lock, Moon, Shield } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Settings
          </h1>

          <p className="text-gray-500 text-lg">
            Manage your account preferences and privacy
          </p>
        </div>

        {/* SETTINGS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ACCOUNT */}
          <Card className="p-6 rounded-3xl shadow-lg border border-gray-100">

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
                <Lock className="text-indigo-600" size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Account Security
                </h2>

                <p className="text-gray-500">
                  Update your password and security settings
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full rounded-2xl h-12">
                Change Password
              </Button>

              <Button
                variant="outline"
                className="w-full rounded-2xl h-12"
              >
                Two-Factor Authentication
              </Button>
            </div>
          </Card>

          {/* NOTIFICATIONS */}
          <Card className="p-6 rounded-3xl shadow-lg border border-gray-100">

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center">
                <Bell className="text-pink-600" size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Notifications
                </h2>

                <p className="text-gray-500">
                  Customize alerts and reminders
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full rounded-2xl h-12">
                Mood Reminders
              </Button>

              <Button
                variant="outline"
                className="w-full rounded-2xl h-12"
              >
                Email Notifications
              </Button>
            </div>
          </Card>

          {/* APPEARANCE */}
          <Card className="p-6 rounded-3xl shadow-lg border border-gray-100">

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
                <Moon className="text-purple-600" size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Appearance
                </h2>

                <p className="text-gray-500">
                  Personalize your dashboard experience
                </p>
              </div>
            </div>

            <Button className="w-full rounded-2xl h-12">
              Dark Mode
            </Button>
          </Card>

          {/* PRIVACY */}
          <Card className="p-6 rounded-3xl shadow-lg border border-gray-100">

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                <Shield className="text-green-600" size={28} />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Privacy
                </h2>

                <p className="text-gray-500">
                  Control your personal data
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full rounded-2xl h-12"
            >
              Download My Data
            </Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};