import { useState } from 'react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import AdminHeader from '@/components/layout/AdminHeader'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const SystemAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [period, setPeriod] = useState('month')

  const revenueData = [
    { name: 'يناير', revenue: 2100000, orders: 3400 },
    { name: 'فبراير', revenue: 2200000, orders: 3600 },
    { name: 'مارس', revenue: 2350000, orders: 3800 },
    { name: 'أبريل', revenue: 2450000, orders: 4100 },
    { name: 'مايو', revenue: 2600000, orders: 4350 },
    { name: 'يونيو', revenue: 2750000, orders: 4600 }
  ]

  const platformData = [
    { name: 'المطاعم', value: 65, color: '#10B981' },
    { name: 'صالات الجيم', value: 25, color: '#8B5CF6' },
    { name: 'التوصيل', value: 10, color: '#F59E0B' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <AdminHeader title="تحليلات النظام المتقدمة" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <div className="p-6 space-y-6">
            
            {/* المرشحات */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="text-sm font-medium text-gray-700">الفترة الزمنية:</label>
                <select 
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="week">أسبوع</option>
                  <option value="month">شهر</option>
                  <option value="quarter">ربع سنة</option>
                  <option value="year">سنة</option>
                </select>
              </div>
            </div>

            {/* مخطط الإيرادات */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">تطور الإيرادات والطلبات</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'revenue' ? `${value.toLocaleString()} ريال` : value,
                    name === 'revenue' ? 'الإيرادات' : 'الطلبات'
                  ]} />
                  <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} />
                  <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* توزيع المنصات */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع الإيرادات حسب المنصة</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* المقاييس الرئيسية */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">المقاييس الرئيسية</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">متوسط قيمة الطلب</span>
                    <span className="font-semibold text-green-600">127 ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">معدل الاحتفاظ بالعملاء</span>
                    <span className="font-semibold text-blue-600">%78</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">وقت الاستجابة المتوسط</span>
                    <span className="font-semibold text-orange-600">2.3 ثانية</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">معدل النمو الشهري</span>
                    <span className="font-semibold text-purple-600">%12.5</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemAnalytics
