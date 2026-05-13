import React, { useState } from 'react';
import { DashboardLayout } from '../components/Layout';
import { Card, CardHeader, CardBody, CardFooter } from '../components/Card';
import { Button } from '../components/Button';
import { Input, Select } from '../components/Form';
import { Avatar, Badge } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { addToast } = useUI();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
    preferredTherapyType: user?.preferredTherapyType || 'supportive',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile(formData);
      addToast('Profile updated successfully!', 'success');
    } catch (error: any) {
      addToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <DashboardLayout><div>Loading...</div></DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardBody className="text-center">
              <Avatar name={`${user.firstName} ${user.lastName}`} size="lg" />
              <h2 className="text-2xl font-bold mt-4">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
              <div className="mt-4 flex justify-center">
                <Badge variant="primary">{user.preferredTherapyType}</Badge>
              </div>
              {user.bio && <p className="text-gray-600 mt-4 italic">"{user.bio}"</p>}
            </CardBody>
          </Card>
        </div>

        {/* Edit Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Edit Profile</h3>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardBody className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  value={user.email}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
                <Input
                  label="Bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  maxLength={160}
                />
                <Select
                  label="Preferred Therapy Type"
                  value={formData.preferredTherapyType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredTherapyType: e.target.value,
                    })
                  }
                  options={[
                    { value: 'cognitive', label: 'Cognitive Therapy' },
                    { value: 'mindfulness', label: 'Mindfulness & Meditation' },
                    { value: 'supportive', label: 'Supportive Counseling' },
                    { value: 'general', label: 'General Support' },
                  ]}
                />
              </CardBody>
              <CardFooter>
                <Button type="submit" isLoading={isLoading} className="ml-auto">
                  Save Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Settings Info */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Account Settings</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <h4 className="font-semibold">Account Type</h4>
                  <p className="text-sm text-gray-500">Free User</p>
                </div>
                <Badge variant="secondary">Free</Badge>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div>
                  <h4 className="font-semibold">Data & Privacy</h4>
                  <p className="text-sm text-gray-500">
                    Your data is encrypted and secure
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">About Mently</h4>
                <p className="text-sm text-gray-500">
                  Mently is an AI-powered mental health companion designed to provide
                  support, guidance, and coping strategies. Remember, Mently is not a
                  substitute for professional medical advice.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
