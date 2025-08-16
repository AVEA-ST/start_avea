import React, { useState } from 'react';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'course',
      message: 'New lesson available in React Fundamentals',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'achievement',
      message: 'Congratulations! You earned the "Week Warrior" badge',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      message: 'Don\'t forget to continue your Python course',
      time: '2 days ago',
      read: true
    },
    {
      id: 4,
      type: 'certificate',
      message: 'Your JavaScript certificate is ready for download',
      time: '3 days ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const getNotificationAction = (notification) => {
    switch (notification.type) {
      case 'course':
        return () => window.location.href = '/dashboard';
      case 'achievement':
        return () => window.location.href = '/dashboard?tab=achievements';
      case 'certificate':
        return () => window.location.href = '/dashboard?tab=certificates';
      default:
        return () => {};
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'course': return '📚';
      case 'achievement': return '🏆';
      case 'reminder': return '⏰';
      case 'certificate': return '📜';
      default: return '🔔';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'course': return 'var(--primary-color)';
      case 'achievement': return 'var(--accent-color)';
      case 'reminder': return 'var(--warning-color)';
      case 'certificate': return 'var(--success-color)';
      default: return 'var(--info-color)';
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          position: 'relative',
          padding: '0.5rem',
          borderRadius: '50%',
          transition: 'background-color 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-tertiary)'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '0',
            right: '0',
            background: 'var(--danger-color)',
            color: 'white',
            borderRadius: '50%',
            width: '18px',
            height: '18px',
            fontSize: 'var(--font-size-xs)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          width: '350px',
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          marginTop: '0.5rem'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: '600', color: 'var(--text-primary)' }}>
              Notifications
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-color)',
                    fontSize: 'var(--font-size-sm)',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Mark all as read
                </button>
              )}
              <button
                onClick={clearAllNotifications}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--danger-color)',
                  fontSize: 'var(--font-size-sm)',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Clear all
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔕</div>
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid var(--border-color)',
                    transition: 'background-color 0.2s ease',
                    background: notification.read ? 'var(--bg-primary)' : 'var(--bg-secondary)',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-tertiary)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = notification.read ? 'var(--bg-primary)' : 'var(--bg-secondary)'}
                >
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      right: '0.5rem',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-light)',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-sm)',
                      padding: '0.25rem'
                    }}
                  >
                    ✕
                  </button>
                                    <div 
                    onClick={() => markAsRead(notification.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--font-size-sm)',
                        background: getNotificationColor(notification.type),
                        color: 'white',
                        flexShrink: 0
                      }}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: 'var(--font-size-sm)',
                          color: notification.read ? 'var(--text-secondary)' : 'var(--text-primary)',
                          marginBottom: '0.25rem',
                          lineHeight: '1.4'
                        }}>
                          {notification.message}
                        </p>
                        <p style={{
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--text-light)'
                        }}>
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: 'var(--primary-color)',
                          flexShrink: 0,
                          marginTop: '0.25rem'
                        }}></div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: '1rem',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-color)',
                fontSize: 'var(--font-size-sm)',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              View all notifications
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default NotificationBell;
