import React from 'react'
import { ChevronLeft, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

export const BreadcrumbNav = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-2 space-x-reverse text-sm ${className}`}>
      <Link 
        to="/" 
        className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronLeft className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <Link 
              to={item.href}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default BreadcrumbNav
