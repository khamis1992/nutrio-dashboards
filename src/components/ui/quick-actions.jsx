import React from 'react'
import { Plus, Download, Filter, RefreshCw } from 'lucide-react'

export const QuickActions = ({ 
  onAdd, 
  onExport, 
  onFilter, 
  onRefresh,
  addLabel = 'إضافة جديد',
  exportLabel = 'تصدير',
  filterLabel = 'فلترة',
  refreshLabel = 'تحديث',
  className = ''
}) => {
  return (
    <div className={`flex items-center space-x-3 space-x-reverse ${className}`}>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 ml-2" />
          {addLabel}
        </button>
      )}
      
      {onExport && (
        <button
          onClick={onExport}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4 ml-2" />
          {exportLabel}
        </button>
      )}
      
      {onFilter && (
        <button
          onClick={onFilter}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Filter className="w-4 h-4 ml-2" />
          {filterLabel}
        </button>
      )}
      
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4 ml-2" />
          {refreshLabel}
        </button>
      )}
    </div>
  )
}

export default QuickActions
