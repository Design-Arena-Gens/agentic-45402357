"use client";

import React, { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { mockMarks, mockStudents, mockCourses, mockBatches } from '@/lib/mockData';
import { Upload, Download, CheckCircle, AlertCircle, FileSpreadsheet } from 'lucide-react';

export default function MarksPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStep, setUploadStep] = useState<'template' | 'validate' | 'confirm'>('template');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedExamType, setSelectedExamType] = useState('');

  const handleUploadComplete = () => {
    setShowUploadModal(false);
    setUploadStep('template');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Marks Management</h1>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download size={20} className="mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowUploadModal(true)}>
            <Upload size={20} className="mr-2" />
            Upload Marks
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Entries</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{mockMarks.length}</p>
            </div>
            <FileSpreadsheet className="text-blue-600" size={32} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Acknowledged</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {mockMarks.filter(m => m.acknowledged).length}
              </p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">
                {mockMarks.filter(m => !m.acknowledged).length}
              </p>
            </div>
            <AlertCircle className="text-orange-600" size={32} />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Score</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">84%</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold">A</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Marks Table */}
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Marks</h2>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option value="">All Courses</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Course</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Exam Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Marks</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Percentage</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockMarks.map((mark) => {
                const student = mockStudents.find(s => s.id === mark.studentId);
                const course = mockCourses.find(c => c.id === mark.courseId);
                const percentage = Math.round((mark.marks / mark.maxMarks) * 100);

                return (
                  <tr key={mark.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{student?.name}</td>
                    <td className="py-3 px-4">{course?.name}</td>
                    <td className="py-3 px-4">{mark.examType}</td>
                    <td className="py-3 px-4">{mark.marks}/{mark.maxMarks}</td>
                    <td className="py-3 px-4">
                      <span className={`font-semibold ${
                        percentage >= 85 ? 'text-green-600' :
                        percentage >= 70 ? 'text-blue-600' :
                        percentage >= 50 ? 'text-orange-600' :
                        'text-red-600'
                      }`}>
                        {percentage}%
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(mark.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      {mark.acknowledged ? (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded flex items-center gap-1 w-fit">
                          <CheckCircle size={12} />
                          Acknowledged
                        </span>
                      ) : (
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded flex items-center gap-1 w-fit">
                          <AlertCircle size={12} />
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload Marks Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => {
          setShowUploadModal(false);
          setUploadStep('template');
        }}
        title="Upload Marks"
      >
        {uploadStep === 'template' && (
          <div>
            <p className="text-gray-700 mb-4">
              Select the course and exam type, then download the template to fill in marks.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="upload-course">
                  Course
                </label>
                <select
                  id="upload-course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select course</option>
                  {mockCourses.map(course => (
                    <option key={course.id} value={course.id}>{course.name} ({course.code})</option>
                  ))}
                </select>
              </div>

              <Input
                id="exam-type"
                label="Exam Type"
                placeholder="e.g., Midterm, Quiz 1, Final"
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
              />

              <Input
                id="max-marks"
                type="number"
                label="Maximum Marks"
                placeholder="100"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Template Format</h4>
              <p className="text-sm text-blue-800 mb-2">
                The template will include: Roll Number, Student Name, Marks
              </p>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Download Template
              </Button>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUploadModal(false)}>Cancel</Button>
              <Button onClick={() => setUploadStep('validate')}>Next: Upload File</Button>
            </div>
          </div>
        )}

        {uploadStep === 'validate' && (
          <div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <Upload className="mx-auto text-gray-400 mb-3" size={48} />
              <p className="text-gray-700 mb-2">Drop your CSV file here or click to browse</p>
              <input
                type="file"
                accept=".csv,.xlsx"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <span className="inline-block">
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </span>
              </label>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Validation Successful</h4>
                  <p className="text-sm text-green-800">25 records found, no errors detected</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUploadStep('template')}>Back</Button>
              <Button onClick={() => setUploadStep('confirm')}>Next: Confirm</Button>
            </div>
          </div>
        )}

        {uploadStep === 'confirm' && (
          <div>
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Review Upload</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Course:</span>
                  <span className="font-medium">Data Structures (CS301)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exam Type:</span>
                  <span className="font-medium">Midterm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Records:</span>
                  <span className="font-medium">25 students</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maximum Marks:</span>
                  <span className="font-medium">100</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-600 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-1">Confirm Upload</h4>
                  <p className="text-sm text-yellow-800">
                    This action will add marks for 25 students. Parents will be notified for acknowledgment.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setUploadStep('validate')}>Back</Button>
              <Button onClick={handleUploadComplete}>Confirm & Upload</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
