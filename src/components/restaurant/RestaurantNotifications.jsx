import { useState } from 'react'
import RestaurantSidebar from '@/components/layout/RestaurantSidebar'
import RestaurantHeader from '@/components/layout/RestaurantHeader'

const RestaurantNotifications = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <RestaurantSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <RestaurantHeader title="الإشعارات" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">مركز إشعارات المطعم</h2>
              <p className="text-gray-600">اعرض وتابع تنبيهات الطلبات والمخزون.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantNotifications
