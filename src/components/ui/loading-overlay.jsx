import React from 'react'
import { LoadingSpinner } from './loading'

export const LoadingOverlay = ({ isLoading, children, message = 'جاري التحميل...' }) => {
  if (!isLoading) return children

  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-sm font-medium text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay
