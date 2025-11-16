"use client";

import React, { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { mockStudents, mockBatches } from '@/lib/mockData';
import { Search, Plus, Edit, Trash2, Mail, Phone } from 'lucide-react';

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const filteredStudents = mockStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Students</h1>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={20} className="mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, roll number, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </Card>

      {/* Students Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Roll Number</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Batch</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const batch = mockBatches.find(b => b.id === student.batchId);
                return (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{student.rollNumber}</td>
                    <td className="py-3 px-4 font-medium">{student.name}</td>
                    <td className="py-3 px-4">{student.email}</td>
                    <td className="py-3 px-4">{batch?.name || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Active</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setShowEditModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          aria-label={`Edit ${student.name}`}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                          aria-label={`Delete ${student.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Student Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Student"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={() => setShowAddModal(false)}>Add Student</Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input id="add-name" label="Full Name" placeholder="Enter student name" required />
          <Input id="add-email" type="email" label="Email" placeholder="student@school.com" required />
          <Input id="add-roll" label="Roll Number" placeholder="CS2024001" required />
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="add-batch">
              Batch
            </label>
            <select
              id="add-batch"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select a batch</option>
              {mockBatches.map(batch => (
                <option key={batch.id} value={batch.id}>{batch.name}</option>
              ))}
            </select>
          </div>
        </form>
      </Modal>

      {/* Edit Student Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedStudent(null);
        }}
        title="Edit Student"
        footer={
          <>
            <Button variant="outline" onClick={() => {
              setShowEditModal(false);
              setSelectedStudent(null);
            }}>Cancel</Button>
            <Button onClick={() => {
              setShowEditModal(false);
              setSelectedStudent(null);
            }}>Save Changes</Button>
          </>
        }
      >
        {selectedStudent && (
          <form className="space-y-4">
            <Input
              id="edit-name"
              label="Full Name"
              defaultValue={selectedStudent.name}
              required
            />
            <Input
              id="edit-email"
              type="email"
              label="Email"
              defaultValue={selectedStudent.email}
              required
            />
            <Input
              id="edit-roll"
              label="Roll Number"
              defaultValue={selectedStudent.rollNumber}
              required
            />
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="edit-batch">
                Batch
              </label>
              <select
                id="edit-batch"
                defaultValue={selectedStudent.batchId}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {mockBatches.map(batch => (
                  <option key={batch.id} value={batch.id}>{batch.name}</option>
                ))}
              </select>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
