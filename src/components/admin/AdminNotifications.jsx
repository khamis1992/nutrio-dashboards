import { useState } from 'react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import AdminHeader from '@/components/layout/AdminHeader'

const AdminNotifications = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <AdminHeader title="الإشعارات" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">مركز الإشعارات</h2>
              <p className="text-gray-600">اعرض إدارة إشعارات النظام والتنبيهات.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNotifications
