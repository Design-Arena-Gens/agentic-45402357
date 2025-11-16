"use client";

import React, { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { getCurrentUser } from '@/lib/auth';
import { User, Lock, Bell, Shield, Globe } from 'lucide-react';

export default function SettingsPage() {
  const [user, setUser] = useState(getCurrentUser());
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) return null;

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <User size={20} /> },
    { id: 'security', name: 'Security', icon: <Lock size={20} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={20} /> },
    { id: 'privacy', name: 'Privacy', icon: <Shield size={20} /> },
  ];

  if (user.role === 'admin') {
    tabs.push({ id: 'system', name: 'System', icon: <Globe size={20} /> });
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <Card>
            <nav>
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card>
              <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
              <form className="space-y-4">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                    <User size={48} className="text-primary-600" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <Input
                  id="profile-name"
                  label="Full Name"
                  defaultValue={user.name}
                  required
                />

                <Input
                  id="profile-email"
                  type="email"
                  label="Email Address"
                  defaultValue={user.email}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="profile-role">
                    Role
                  </label>
                  <input
                    id="profile-role"
                    type="text"
                    value={user.role}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                  />
                </div>

                <Input
                  id="profile-phone"
                  type="tel"
                  label="Phone Number"
                  placeholder="+1 (555) 000-0000"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="profile-bio">
                    Bio
                  </label>
                  <textarea
                    id="profile-bio"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell us about yourself"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card>
              <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Change Password</h3>
                  <form className="space-y-4">
                    <Input
                      id="current-password"
                      type="password"
                      label="Current Password"
                      required
                    />
                    <Input
                      id="new-password"
                      type="password"
                      label="New Password"
                      required
                    />
                    <Input
                      id="confirm-password"
                      type="password"
                      label="Confirm New Password"
                      required
                    />
                    <div className="flex justify-end">
                      <Button>Update Password</Button>
                    </div>
                  </form>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Enable 2FA</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">Current Session</p>
                        <p className="text-sm text-gray-600">Chrome on Windows • Last active: Now</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'email-marks', label: 'New marks posted', description: 'Get notified when new marks are uploaded' },
                      { id: 'email-attendance', label: 'Attendance alerts', description: 'Receive attendance-related notifications' },
                      { id: 'email-announcements', label: 'Announcements', description: 'Stay updated with school announcements' },
                      { id: 'email-materials', label: 'New materials', description: 'Get notified when new study materials are uploaded' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Push Notifications</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'push-urgent', label: 'Urgent alerts', description: 'Critical notifications that require immediate attention' },
                      { id: 'push-reminders', label: 'Reminders', description: 'Get reminded about important events and deadlines' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer ml-4">
                          <input type="checkbox" defaultChecked className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Preferences</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'privacy' && (
            <Card>
              <h2 className="text-2xl font-semibold mb-6">Privacy Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Profile Visibility</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'privacy-email', label: 'Email address', description: 'Who can see your email address' },
                      { id: 'privacy-phone', label: 'Phone number', description: 'Who can see your phone number' },
                      { id: 'privacy-activity', label: 'Activity status', description: 'Show when you\'re online' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{item.label}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <select className="ml-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                          <option>Everyone</option>
                          <option>My Organization</option>
                          <option>Only Me</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Data & Privacy</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      View Privacy Policy
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button>Save Settings</Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'system' && user.role === 'admin' && (
            <Card>
              <h2 className="text-2xl font-semibold mb-6">System Settings</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Role-Based Access Control</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">Admin</span>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Full Access</span>
                      </div>
                      <p className="text-sm text-gray-600">Complete system access and configuration</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">Teacher</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Limited Access</span>
                      </div>
                      <p className="text-sm text-gray-600">Course management, attendance, and marks</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">Student</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">View Only</span>
                      </div>
                      <p className="text-sm text-gray-600">View courses, marks, and materials</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">Parent</span>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">View Only</span>
                      </div>
                      <p className="text-sm text-gray-600">View child progress and acknowledge notifications</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">System Preferences</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="academic-year">
                        Academic Year
                      </label>
                      <select
                        id="academic-year"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option>2024-2025</option>
                        <option>2023-2024</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="timezone">
                        Timezone
                      </label>
                      <select
                        id="timezone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option>UTC-5 (Eastern Time)</option>
                        <option>UTC-6 (Central Time)</option>
                        <option>UTC-7 (Mountain Time)</option>
                        <option>UTC-8 (Pacific Time)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline">Reset</Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
