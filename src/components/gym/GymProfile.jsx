import { useState } from 'react'
import GymSidebar from '@/components/layout/GymSidebar'
import GymHeader from '@/components/layout/GymHeader'

const GymProfile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <GymSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <GymHeader title="الملف الشخصي" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <div className="p-6 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">بيانات الصالة</h2>
              <p className="text-gray-600">حدّث بيانات الصالة وفريق العمل.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GymProfile
