"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Bell,
  Settings,
  LogOut,
  GraduationCap,
  UserCheck,
  Upload,
} from 'lucide-react';
import { UserRole } from '@/lib/types';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} />, roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'Students', href: '/students', icon: <Users size={20} />, roles: ['admin', 'teacher'] },
  { name: 'Courses', href: '/courses', icon: <BookOpen size={20} />, roles: ['admin', 'teacher', 'student'] },
  { name: 'Attendance', href: '/attendance', icon: <Calendar size={20} />, roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'Marks', href: '/marks', icon: <GraduationCap size={20} />, roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'Materials', href: '/materials', icon: <FileText size={20} />, roles: ['admin', 'teacher', 'student'] },
  { name: 'Notifications', href: '/notifications', icon: <Bell size={20} />, roles: ['admin', 'teacher', 'student', 'parent'] },
  { name: 'Settings', href: '/settings', icon: <Settings size={20} />, roles: ['admin', 'teacher', 'student', 'parent'] },
];

interface SidebarProps {
  userRole: UserRole;
  onLogout: () => void;
}

export default function Sidebar({ userRole, onLogout }: SidebarProps) {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0 flex flex-col" role="navigation">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-primary-600">School MS</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
