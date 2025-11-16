"use client";

import React, { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { mockStudents, mockBatches, mockAttendance } from '@/lib/mockData';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export default function AttendancePage() {
  const [selectedBatch, setSelectedBatch] = useState(mockBatches[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sessionType, setSessionType] = useState<'morning' | 'afternoon'>('morning');
  const [viewMode, setViewMode] = useState<'session' | 'calendar'>('session');

  const batch = mockBatches.find(b => b.id === selectedBatch);
  const students = mockStudents.filter(s => batch?.students.includes(s.id));

  // Mock attendance state
  const [attendanceState, setAttendanceState] = useState<Record<string, 'present' | 'absent' | 'late'>>({});

  const toggleAttendance = (studentId: string) => {
    setAttendanceState(prev => {
      const current = prev[studentId] || 'absent';
      const next = current === 'present' ? 'absent' : current === 'absent' ? 'late' : 'present';
      return { ...prev, [studentId]: next };
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'late':
        return <Clock className="text-orange-600" size={20} />;
      default:
        return <XCircle className="text-red-600" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const classes = {
      present: 'bg-green-100 text-green-700',
      late: 'bg-orange-100 text-orange-700',
      absent: 'bg-red-100 text-red-700',
    };
    return (
      <span className={`text-xs px-2 py-1 rounded capitalize ${classes[status as keyof typeof classes]}`}>
        {status}
      </span>
    );
  };

  // Calendar view logic
  const currentMonth = new Date(selectedDate);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Attendance Management</h1>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'session' ? 'primary' : 'outline'}
            onClick={() => setViewMode('session')}
          >
            Session View
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'primary' : 'outline'}
            onClick={() => setViewMode('calendar')}
          >
            Calendar View
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="batch-select">
              Select Batch
            </label>
            <select
              id="batch-select"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {mockBatches.map(batch => (
                <option key={batch.id} value={batch.id}>{batch.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date-select">
              Date
            </label>
            <input
              id="date-select"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          {viewMode === 'session' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="session-select">
                Session
              </label>
              <select
                id="session-select"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value as 'morning' | 'afternoon')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
              </select>
            </div>
          )}
        </div>
      </Card>

      {viewMode === 'session' ? (
        // Session View
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {batch?.name} - {format(new Date(selectedDate), 'MMMM d, yyyy')} ({sessionType})
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => {
                const newState: Record<string, 'present' | 'absent' | 'late'> = {};
                students.forEach(s => newState[s.id] = 'present');
                setAttendanceState(newState);
              }}>
                Mark All Present
              </Button>
              <Button onClick={() => alert('Attendance saved!')}>
                Save Attendance
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Roll Number</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const status = attendanceState[student.id] || 'absent';
                  return (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{student.rollNumber}</td>
                      <td className="py-3 px-4 font-medium">{student.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(status)}
                          {getStatusBadge(status)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" onClick={() => toggleAttendance(student.id)}>
                          Toggle Status
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Present</p>
                <p className="text-2xl font-bold text-green-700">
                  {Object.values(attendanceState).filter(s => s === 'present').length}
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Late</p>
                <p className="text-2xl font-bold text-orange-700">
                  {Object.values(attendanceState).filter(s => s === 'late').length}
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600">Absent</p>
                <p className="text-2xl font-bold text-red-700">
                  {students.length - Object.keys(attendanceState).length + Object.values(attendanceState).filter(s => s === 'absent').length}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        // Calendar View
        <Card>
          <h2 className="text-xl font-semibold mb-6">
            {batch?.name} - {format(currentMonth, 'MMMM yyyy')}
          </h2>

          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-700 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Calendar days */}
            {daysInMonth.map(day => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const dayAttendance = mockAttendance.filter(
                a => a.batchId === selectedBatch && a.date === dateStr
              );
              const presentCount = dayAttendance.filter(a => a.status === 'present').length;
              const totalCount = students.length;
              const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`aspect-square p-2 border rounded-lg hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    isSameDay(day, new Date(selectedDate)) ? 'border-primary-500 bg-primary-50' : ''
                  }`}
                >
                  <div className="text-sm font-medium">{format(day, 'd')}</div>
                  {dayAttendance.length > 0 && (
                    <div className={`text-xs mt-1 ${
                      attendanceRate >= 90 ? 'text-green-600' :
                      attendanceRate >= 75 ? 'text-orange-600' :
                      'text-red-600'
                    }`}>
                      {attendanceRate}%
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold mb-3">Legend</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                <span>≥90% attendance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-600 rounded"></div>
                <span>75-89% attendance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded"></div>
                <span>&lt;75% attendance</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
