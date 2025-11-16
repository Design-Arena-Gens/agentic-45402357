"use client";

import React from 'react';
import { Bell, User } from 'lucide-react';
import { User as UserType } from '@/lib/types';

interface HeaderProps {
  user: UserType;
  notificationCount?: number;
}

export default function Header({ user, notificationCount = 0 }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user.name}</h2>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="relative p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ''}`}
          >
            <Bell size={24} />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <User size={20} className="text-primary-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
