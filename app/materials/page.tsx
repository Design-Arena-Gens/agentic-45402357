"use client";

import React, { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { mockMaterials, mockCourses } from '@/lib/mockData';
import { Upload, Folder, FileText, Download, Trash2, Search } from 'lucide-react';

export default function MaterialsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const folders = ['All', 'Lectures', 'Tutorials', 'Assignments', 'Reference Materials'];

  const filteredMaterials = mockMaterials.filter(material => {
    const matchesFolder = selectedFolder === 'All' || material.folder === selectedFolder;
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const getFileIcon = (fileType: string) => {
    return <FileText className="text-blue-600" size={24} />;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Knowledge Space</h1>
        <Button onClick={() => setShowUploadModal(true)}>
          <Upload size={20} className="mr-2" />
          Upload Material
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Folder size={20} />
              Folders
            </h3>
            <nav>
              <ul className="space-y-2">
                {folders.map((folder) => (
                  <li key={folder}>
                    <button
                      onClick={() => setSelectedFolder(folder)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedFolder === folder
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {folder}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold text-gray-800 mb-3">Storage</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Used</span>
                  <span className="font-medium">2.4 GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '48%' }}></div>
                </div>
                <p className="text-xs text-gray-500">2.6 GB remaining of 5 GB</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <Card className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </Card>

          {/* Materials List */}
          <Card>
            <h2 className="text-xl font-semibold mb-4">
              {selectedFolder === 'All' ? 'All Materials' : selectedFolder}
            </h2>

            {filteredMaterials.length === 0 ? (
              <div className="text-center py-12">
                <Folder className="mx-auto text-gray-300 mb-3" size={64} />
                <p className="text-gray-500">No materials found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMaterials.map((material) => {
                  const course = mockCourses.find(c => c.id === material.courseId);

                  return (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                          {getFileIcon(material.fileType)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{material.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-600">{course?.name}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-600">
                              {new Date(material.uploadDate).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {material.fileType.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                          aria-label={`Download ${material.title}`}
                        >
                          <Download size={20} />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                          aria-label={`Delete ${material.title}`}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Material"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>Cancel</Button>
            <Button onClick={() => setShowUploadModal(false)}>Upload</Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input
            id="material-title"
            label="Title"
            placeholder="e.g., Introduction to Linked Lists"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="material-course">
              Course
            </label>
            <select
              id="material-course"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select course</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>{course.name} ({course.code})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="material-folder">
              Folder
            </label>
            <select
              id="material-folder"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              <option value="">Select folder</option>
              {folders.filter(f => f !== 'All').map(folder => (
                <option key={folder} value={folder}>{folder}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="material-file">
              File
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-600 mb-2">Drop file here or click to browse</p>
              <input
                type="file"
                id="material-file"
                className="hidden"
              />
              <label htmlFor="material-file">
                <span className="inline-block">
                  <Button variant="outline" size="sm">
                    Choose File
                  </Button>
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="material-desc">
              Description (Optional)
            </label>
            <textarea
              id="material-desc"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Brief description of the material"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
