"use client";

import React, { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import { mockNotifications, mockAnnouncements } from '@/lib/mockData';
import { Bell, CheckCircle, AlertCircle, Info, Megaphone, X } from 'lucide-react';

export default function NotificationsPage() {
  const [showAcknowledgmentModal, setShowAcknowledgmentModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'acknowledgment'>('all');

  const filteredNotifications = mockNotifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'acknowledgment') return notif.requiresAcknowledgment && !notif.acknowledged;
    return true;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'warning':
        return <AlertCircle className="text-orange-600" size={24} />;
      case 'error':
        return <AlertCircle className="text-red-600" size={24} />;
      default:
        return <Info className="text-blue-600" size={24} />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <Button variant="outline">
          <CheckCircle size={20} className="mr-2" />
          Mark All as Read
        </Button>
      </div>

      {/* Filter Tabs */}
      <Card className="mb-6">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({mockNotifications.length})
          </Button>
          <Button
            variant={filter === 'unread' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread ({mockNotifications.filter(n => !n.read).length})
          </Button>
          <Button
            variant={filter === 'acknowledgment' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setFilter('acknowledgment')}
          >
            Needs Acknowledgment ({mockNotifications.filter(n => n.requiresAcknowledgment && !n.acknowledged).length})
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Inbox</h2>

          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border ${getNotificationBgColor(notification.type)} ${
                !notification.read ? 'border-l-4' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-3">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(notification.date).toLocaleString()}
                    </span>
                    {notification.requiresAcknowledgment && !notification.acknowledged && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedNotification(notification);
                          setShowAcknowledgmentModal(true);
                        }}
                      >
                        Acknowledge
                      </Button>
                    )}
                    {notification.acknowledged && (
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle size={16} />
                        Acknowledged
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="mx-auto text-gray-300 mb-3" size={64} />
              <p className="text-gray-500">No notifications to display</p>
            </div>
          )}
        </div>

        {/* Announcements Sidebar */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Megaphone size={24} />
            Announcements
          </h2>

          <div className="space-y-4">
            {mockAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="border-l-4 border-l-primary-500">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{announcement.title}</h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">{announcement.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>By {announcement.authorName}</span>
                  <span>{new Date(announcement.date).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Acknowledgment Modal */}
      <Modal
        isOpen={showAcknowledgmentModal}
        onClose={() => {
          setShowAcknowledgmentModal(false);
          setSelectedNotification(null);
        }}
        title="Acknowledge Notification"
      >
        {selectedNotification && (
          <div>
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">{selectedNotification.title}</h3>
              <p className="text-gray-700 mb-4">{selectedNotification.message}</p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-yellow-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">Important</h4>
                    <p className="text-sm text-yellow-800">
                      By acknowledging this notification, you confirm that you have read and understood the information.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-6">
              <input
                type="checkbox"
                id="acknowledge-checkbox"
                className="mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="acknowledge-checkbox" className="text-sm text-gray-700">
                I confirm that I have read and understood this notification
              </label>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAcknowledgmentModal(false);
                  setSelectedNotification(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowAcknowledgmentModal(false);
                  setSelectedNotification(null);
                }}
              >
                Acknowledge
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
