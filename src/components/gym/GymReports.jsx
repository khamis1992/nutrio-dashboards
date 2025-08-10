import { useState } from 'react'
import GymSidebar from '@/components/layout/GymSidebar'
import GymHeader from '@/components/layout/GymHeader'
import { 
  BarChart3, TrendingUp, Download, Calendar, Users, DollarSign, Activity,
  Target, Clock, FileText, PieChart, Settings, Filter, Search
} from 'lucide-react'

const GymReports = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('month')

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: BarChart3 },
    { id: 'financial', name: 'التقارير المالية', icon: DollarSign },
    { id: 'membership', name: 'تقارير العضوية', icon: Users },
    { id: 'attendance', name: 'تقارير الحضور', icon: Clock },
    { id: 'performance', name: 'تقارير الأداء', icon: Target }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPIs الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">إجمالي الأعضاء</p>
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-blue-200 text-sm">+12% هذا الشهر</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">الإيرادات الشهرية</p>
              <p className="text-2xl font-bold">485,200 ر.س</p>
              <p className="text-green-200 text-sm">+8.5% هذا الشهر</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">معدل الحضور</p>
              <p className="text-2xl font-bold">78%</p>
              <p className="text-purple-200 text-sm">+3.2% هذا الشهر</p>
            </div>
            <Activity className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">معدل الاحتفاظ</p>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-orange-200 text-sm">+1.8% هذا الشهر</p>
            </div>
            <Target className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">نمو العضوية</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">رسم بياني لنمو العضوية على مدار السنة</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">الإيرادات الشهرية</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">رسم بياني للإيرادات على مدار 12 شهر</p>
            </div>
          </div>
        </div>
      </div>

      {/* ملخص الأداء */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص الأداء</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">156</div>
            <div className="text-sm text-gray-600">عضو جديد هذا الشهر</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">24</div>
            <div className="text-sm text-gray-600">جلسة تدريب شخصي</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-2">92%</div>
            <div className="text-sm text-gray-600">رضا الأعضاء</div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderFinancialReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">إجمالي الإيرادات</h4>
          <div className="text-3xl font-bold text-green-600 mb-2">485,200 ر.س</div>
          <div className="text-sm text-green-600">+8.5% من الشهر الماضي</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">المصروفات</h4>
          <div className="text-3xl font-bold text-red-600 mb-2">125,800 ر.س</div>
          <div className="text-sm text-green-600">-3.2% من الشهر الماضي</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">صافي الربح</h4>
          <div className="text-3xl font-bold text-blue-600 mb-2">359,400 ر.س</div>
          <div className="text-sm text-green-600">+12.1% من الشهر الماضي</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">تفصيل الإيرادات</h3>
        <div className="space-y-4">
          {[
            { source: 'اشتراكات العضوية', amount: 385200, percentage: 79.4 },
            { source: 'التدريب الشخصي', amount: 65000, percentage: 13.4 },
            { source: 'المكملات الغذائية', amount: 25000, percentage: 5.2 },
            { source: 'خدمات أخرى', amount: 10000, percentage: 2.0 }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-32 text-sm text-gray-700">{item.source}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-900">{item.amount.toLocaleString()} ر.س</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderMembershipReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع أنواع العضوية</h3>
          <div className="space-y-3">
            {[
              { type: 'العضوية الذهبية', count: 485, percentage: 38.9 },
              { type: 'العضوية الفضية', count: 356, percentage: 28.5 },
              { type: 'العضوية البرونزية', count: 406, percentage: 32.6 }
            ].map((membership, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-24 text-sm text-gray-700">{membership.type}</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${membership.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900">{membership.count} عضو</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">معدل التجديد</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-sm text-gray-600 mb-4">معدل تجديد العضوية الشهرية</div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>تجديدات ناجحة</span>
                <span className="font-semibold">1,058</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>عضويات منتهية</span>
                <span className="font-semibold">189</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">الأعضاء الجدد مقابل المنسحبين</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">رسم بياني لحركة العضوية الشهرية</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'financial':
        return renderFinancialReports()
      case 'membership':
        return renderMembershipReports()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <GymSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <GymHeader title="التقارير والإحصائيات" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
          <div className="p-6">
            {/* أدوات التحكم */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="week">هذا الأسبوع</option>
                    <option value="month">هذا الشهر</option>
                    <option value="quarter">هذا الربع</option>
                    <option value="year">هذا العام</option>
                  </select>
                  <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="flex space-x-3 space-x-reverse">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center space-x-2 space-x-reverse">
                    <Download className="h-4 w-4" />
                    <span>تصدير PDF</span>
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2 space-x-reverse">
                    <FileText className="h-4 w-4" />
                    <span>تصدير Excel</span>
                  </button>
                </div>
              </div>
            </div>

            {/* التبويبات */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 space-x-reverse px-6" aria-label="Tabs">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                          activeTab === tab.id
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GymReports