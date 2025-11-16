"use client";

import React, { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { mockCourses, mockBatches, mockStudents } from '@/lib/mockData';
import { BookOpen, Users, Plus, Edit } from 'lucide-react';

export default function CoursesPage() {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Courses & Batches</h1>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowAddBatchModal(true)}>
            <Plus size={20} className="mr-2" />
            Add Batch
          </Button>
          <Button onClick={() => setShowAddCourseModal(true)}>
            <Plus size={20} className="mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Courses */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCourses.map((course) => {
            const batches = mockBatches.filter(b => b.courseId === course.id);
            const totalStudents = batches.reduce((sum, b) => sum + b.students.length, 0);

            return (
              <Card key={course.id}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-primary-600" size={24} />
                  </div>
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    aria-label={`Edit ${course.name}`}
                  >
                    <Edit size={16} />
                  </button>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.code}</p>
                <p className="text-sm text-gray-700 mb-4">{course.description}</p>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users size={16} />
                    <span>{totalStudents} students</span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {batches.length} {batches.length === 1 ? 'batch' : 'batches'}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Batches */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Batches</h2>
        <div className="grid grid-cols-1 gap-4">
          {mockBatches.map((batch) => {
            const course = mockCourses.find(c => c.id === batch.courseId);

            return (
              <Card key={batch.id}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800">{batch.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Year {batch.year}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      Course: <span className="font-medium">{course?.name} ({course?.code})</span>
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-700">
                      <Users size={16} />
                      <span>{batch.students.length} students enrolled</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Students</Button>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add Course Modal */}
      <Modal
        isOpen={showAddCourseModal}
        onClose={() => setShowAddCourseModal(false)}
        title="Add New Course"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowAddCourseModal(false)}>Cancel</Button>
            <Button onClick={() => setShowAddCourseModal(false)}>Add Course</Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input id="course-name" label="Course Name" placeholder="e.g., Data Structures" required />
          <Input id="course-code" label="Course Code" placeholder="e.g., CS301" required />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="course-desc">
              Description
            </label>
            <textarea
              id="course-desc"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Brief course description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="course-teacher">
              Assign Teacher
            </label>
            <select
              id="course-teacher"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select teacher</option>
              <option value="2">John Teacher</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Add Batch Modal */}
      <Modal
        isOpen={showAddBatchModal}
        onClose={() => setShowAddBatchModal(false)}
        title="Add New Batch"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowAddBatchModal(false)}>Cancel</Button>
            <Button onClick={() => setShowAddBatchModal(false)}>Add Batch</Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input id="batch-name" label="Batch Name" placeholder="e.g., CS 2024 Batch A" required />
          <Input id="batch-year" type="number" label="Year" placeholder="2024" required />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="batch-course">
              Course
            </label>
            <select
              id="batch-course"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select course</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>{course.name} ({course.code})</option>
              ))}
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
