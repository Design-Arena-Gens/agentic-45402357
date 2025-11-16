"use client";

import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import Card from '@/components/Card';
import { Users, BookOpen, Calendar, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { mockStudents, mockCourses, mockAttendance, mockMarks } from '@/lib/mockData';

export default function DashboardPage() {
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) return null;

  // Admin Dashboard
  if (user.role === 'admin') {
    const totalStudents = mockStudents.length;
    const totalCourses = mockCourses.length;
    const todayAttendance = mockAttendance.filter(a => a.date === '2024-11-15');
    const presentToday = todayAttendance.filter(a => a.status === 'present').length;
    const attendanceRate = todayAttendance.length > 0 ? Math.round((presentToday / todayAttendance.length) * 100) : 0;

    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{totalStudents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Courses</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{totalCourses}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <BookOpen className="text-green-600" size={24} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance Today</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{attendanceRate}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Calendar className="text-purple-600" size={24} />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Performance</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">84%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={24} />
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-xl font-semibold mb-4">Recent Students</h3>
            <div className="space-y-3">
              {mockStudents.slice(0, 5).map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.rollNumber}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
                <p className="font-medium text-primary-700">Add New Student</p>
                <p className="text-sm text-gray-600">Register a new student</p>
              </button>
              <button className="w-full text-left p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
                <p className="font-medium text-primary-700">Create Course</p>
                <p className="text-sm text-gray-600">Add a new course or batch</p>
              </button>
              <button className="w-full text-left p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors">
                <p className="font-medium text-primary-700">View Reports</p>
                <p className="text-sm text-gray-600">Analytics and insights</p>
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Teacher Dashboard
  if (user.role === 'teacher') {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">My Courses</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{mockCourses.length}</p>
              </div>
              <BookOpen className="text-blue-600" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{mockStudents.length}</p>
              </div>
              <Users className="text-green-600" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Classes Today</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">3</p>
              </div>
              <Clock className="text-purple-600" size={32} />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-xl font-semibold mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-medium">Data Structures - Batch A</p>
                <p className="text-sm text-gray-600">9:00 AM - 10:30 AM</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="font-medium">Database Systems - Batch A</p>
                <p className="text-sm text-gray-600">11:00 AM - 12:30 PM</p>
              </div>
              <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                <p className="font-medium">Data Structures - Lab</p>
                <p className="text-sm text-gray-600">2:00 PM - 4:00 PM</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-4">Pending Tasks</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="text-yellow-600 mt-1" size={20} />
                <div>
                  <p className="font-medium">Mark Attendance</p>
                  <p className="text-sm text-gray-600">2 sessions pending</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="text-orange-600 mt-1" size={20} />
                <div>
                  <p className="font-medium">Upload Marks</p>
                  <p className="text-sm text-gray-600">Midterm results for CS301</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="text-red-600 mt-1" size={20} />
                <div>
                  <p className="font-medium">Review Assignments</p>
                  <p className="text-sm text-gray-600">15 submissions pending</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Student Dashboard
  if (user.role === 'student') {
    const myMarks = mockMarks.filter(m => m.studentId === 's1');
    const avgPercentage = myMarks.length > 0
      ? Math.round(myMarks.reduce((sum, m) => sum + (m.marks / m.maxMarks * 100), 0) / myMarks.length)
      : 0;

    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">My Courses</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">3</p>
              </div>
              <BookOpen className="text-blue-600" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Attendance</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">92%</p>
              </div>
              <CheckCircle className="text-green-600" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Performance</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{avgPercentage}%</p>
              </div>
              <TrendingUp className="text-purple-600" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assignments</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">2</p>
              </div>
              <AlertCircle className="text-orange-600" size={32} />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-xl font-semibold mb-4">Recent Marks</h3>
            <div className="space-y-3">
              {myMarks.map((mark) => {
                const course = mockCourses.find(c => c.id === mark.courseId);
                const percentage = Math.round((mark.marks / mark.maxMarks) * 100);
                return (
                  <div key={mark.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{course?.name}</p>
                      <p className="text-sm text-gray-600">{mark.examType}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{mark.marks}/{mark.maxMarks}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        percentage >= 85 ? 'bg-green-100 text-green-700' :
                        percentage >= 70 ? 'bg-blue-100 text-blue-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-4">Upcoming Classes</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                <p className="font-medium">Data Structures</p>
                <p className="text-sm text-gray-600">Today, 9:00 AM - Room 101</p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="font-medium">Database Systems</p>
                <p className="text-sm text-gray-600">Today, 11:00 AM - Room 203</p>
              </div>
              <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                <p className="font-medium">Data Structures Lab</p>
                <p className="text-sm text-gray-600">Today, 2:00 PM - Lab 1</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Parent Dashboard
  if (user.role === 'parent') {
    const children = mockStudents.filter(s => s.parentId === 'p1');

    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Parent Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">My Children</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{children.length}</p>
              </div>
              <Users className="text-blue-600" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Attendance</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">95%</p>
              </div>
              <CheckCircle className="text-green-600" size={32} />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alerts</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">2</p>
              </div>
              <AlertCircle className="text-orange-600" size={32} />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {children.map((child) => {
            const childMarks = mockMarks.filter(m => m.studentId === child.id);
            const avgPercentage = childMarks.length > 0
              ? Math.round(childMarks.reduce((sum, m) => sum + (m.marks / m.maxMarks * 100), 0) / childMarks.length)
              : 0;

            return (
              <Card key={child.id}>
                <h3 className="text-xl font-semibold mb-4">{child.name} - {child.rollNumber}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Attendance This Month</p>
                    <p className="text-2xl font-bold text-blue-700 mt-1">95%</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Average Performance</p>
                    <p className="text-2xl font-bold text-green-700 mt-1">{avgPercentage}%</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Pending Acknowledgments</p>
                    <p className="text-2xl font-bold text-purple-700 mt-1">
                      {childMarks.filter(m => !m.acknowledged).length}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}

          <Card>
            <h3 className="text-xl font-semibold mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="text-yellow-600 mt-1" size={20} />
                <div>
                  <p className="font-medium">Exam Results Posted</p>
                  <p className="text-sm text-gray-600">Midterm results for Alice Student</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-medium">Parent Meeting Scheduled</p>
                  <p className="text-sm text-gray-600">November 20, 2024 at 3:00 PM</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
