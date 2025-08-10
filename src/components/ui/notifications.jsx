import React, { createContext, useContext, useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react'

// Notification Context
const NotificationContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

// Notification Provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    }
    
    setNotifications(prev => [...prev, newNotification])
    
    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const success = (message, options = {}) => {
    return addNotification({
      type: 'success',
      message,
      ...options
    })
  }

  const error = (message, options = {}) => {
    return addNotification({
      type: 'error',
      message,
      duration: 0, // Don't auto-remove error notifications
      ...options
    })
  }

  const warning = (message, options = {}) => {
    return addNotification({
      type: 'warning',
      message,
      ...options
    })
  }

  const info = (message, options = {}) => {
    return addNotification({
      type: 'info',
      message,
      ...options
    })
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll,
      success,
      error,
      warning,
      info
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

// Notification Container
const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2 max-w-md">
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

// Notification Item
const NotificationItem = ({ notification, onClose }) => {
  const { type, message, title } = notification

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-600" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  return (
    <div className={`flex items-start p-4 rounded-lg border shadow-lg transition-all duration-300 ${getBackgroundColor()}`}>
      <div className="flex-shrink-0 ml-3">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
        )}
        <p className="text-sm text-gray-700">{message}</p>
      </div>
      
      <button
        onClick={onClose}
        className="flex-shrink-0 mr-2 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

// Toast Hook for easy usage
export const useToast = () => {
  const { success, error, warning, info } = useNotifications()
  
  return {
    toast: {
      success: (message) => success(message),
      error: (message) => error(message),
      warning: (message) => warning(message),
      info: (message) => info(message)
    }
  }
}

