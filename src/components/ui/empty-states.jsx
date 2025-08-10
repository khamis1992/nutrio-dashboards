import React from 'react'
import { 
  Package, 
  Users, 
  ShoppingBag, 
  Calendar, 
  FileText, 
  Search,
  Plus,
  AlertCircle,
  Database
} from 'lucide-react'

// Generic Empty State
export const EmptyState = ({ 
  icon: Icon = Database,
  title,
  description,
  action,
  actionText,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      
      {description && (
        <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
      )}
      
      {action && actionText && (
        <button
          onClick={action}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 ml-2" />
          {actionText}
        </button>
      )}
    </div>
  )
}

// No Data Found
export const NoDataFound = ({ 
  title = 'لا توجد بيانات',
  description = 'لم يتم العثور على أي بيانات لعرضها.',
  className = ''
}) => {
  return (
    <EmptyState
      icon={Database}
      title={title}
      description={description}
      className={className}
    />
  )
}

// No Search Results
export const NoSearchResults = ({ 
  searchTerm,
  onClearSearch,
  className = ''
}) => {
  return (
    <EmptyState
      icon={Search}
      title="لا توجد نتائج"
      description={searchTerm ? `لم يتم العثور على نتائج لـ "${searchTerm}"` : 'لم يتم العثور على نتائج مطابقة.'}
      action={onClearSearch}
      actionText="مسح البحث"
      className={className}
    />
  )
}

// No Users
export const NoUsers = ({ 
  onAddUser,
  userType = 'المستخدمين',
  className = ''
}) => {
  return (
    <EmptyState
      icon={Users}
      title={`لا يوجد ${userType}`}
      description={`لم يتم إضافة أي ${userType} بعد. ابدأ بإضافة ${userType} جدد.`}
      action={onAddUser}
      actionText={`إضافة ${userType}`}
      className={className}
    />
  )
}

// No Orders
export const NoOrders = ({ 
  onViewMenu,
  className = ''
}) => {
  return (
    <EmptyState
      icon={ShoppingBag}
      title="لا توجد طلبات"
      description="لم يتم استلام أي طلبات بعد. تأكد من أن القائمة متاحة للعملاء."
      action={onViewMenu}
      actionText="عرض القائمة"
      className={className}
    />
  )
}

// No Classes/Sessions
export const NoClasses = ({ 
  onAddClass,
  className = ''
}) => {
  return (
    <EmptyState
      icon={Calendar}
      title="لا توجد حصص"
      description="لم يتم جدولة أي حصص بعد. ابدأ بإضافة حصص جديدة للأعضاء."
      action={onAddClass}
      actionText="إضافة حصة"
      className={className}
    />
  )
}

// No Reports
export const NoReports = ({ 
  onGenerateReport,
  className = ''
}) => {
  return (
    <EmptyState
      icon={FileText}
      title="لا توجد تقارير"
      description="لم يتم إنشاء أي تقارير بعد. قم بإنشاء تقرير لعرض البيانات."
      action={onGenerateReport}
      actionText="إنشاء تقرير"
      className={className}
    />
  )
}

// No Inventory
export const NoInventory = ({ 
  onAddItem,
  className = ''
}) => {
  return (
    <EmptyState
      icon={Package}
      title="لا توجد عناصر في المخزون"
      description="المخزون فارغ. ابدأ بإضافة عناصر جديدة لتتبع المخزون."
      action={onAddItem}
      actionText="إضافة عنصر"
      className={className}
    />
  )
}

// Error State
export const ErrorState = ({ 
  title = 'حدث خطأ',
  description = 'عذراً، حدث خطأ أثناء تحميل البيانات.',
  onRetry,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      
      <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          المحاولة مرة أخرى
        </button>
      )}
    </div>
  )
}

// Coming Soon
export const ComingSoon = ({ 
  feature = 'هذه الميزة',
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <Package className="w-8 h-8 text-blue-500" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">قريباً</h3>
      
      <p className="text-gray-500 max-w-sm">
        {feature} قيد التطوير وستكون متاحة قريباً.
      </p>
    </div>
  )
}

