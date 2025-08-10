import { useState } from 'react'
import GymSidebar from '@/components/layout/GymSidebar'
import GymHeader from '@/components/layout/GymHeader'
import { 
  Clock, Users, Calendar, TrendingUp, CheckCircle, X, Search, Filter,
  Eye, Download, UserCheck, UserX, Activity, BarChart3, LogIn, LogOut
} from 'lucide-react'

const AttendanceTracking = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('today')
  const [searchQuery, setSearchQuery] = useState('')

  // بيانات الحضور
  const [attendanceData, setAttendanceData] = useState([
    {
      id: 1,
      memberId: 101,
      memberName: 'أحمد محمد',
      checkIn: '08:30',
      checkOut: '10:15',
      date: '2024-01-28',
      duration: 105,
      status: 'completed'
    },
    {
      id: 2,
      memberId: 102,
      memberName: 'سارة أحمد',
      checkIn: '09:15',
      checkOut: null,
      date: '2024-01-28',
      duration: null,
      status: 'active'
    },
    {
      id: 3,
      memberId: 103,
      memberName: 'محمد علي',
      checkIn: '07:45',
      checkOut: '09:30',
      date: '2024-01-28',
      duration: 125,
      status: 'completed'
    }
  ])

  const tabs = [
    { id: 'today', name: 'اليوم', icon: Clock },
    { id: 'week', name: 'هذا الأسبوع', icon: Calendar },
    { id: 'analytics', name: 'التحليلات', icon: BarChart3 },
    { id: 'reports', name: 'التقارير', icon: TrendingUp }
  ]

  const renderTodayAttendance = () => (
    <div className="space-y-6">
      {/* إحصائيات اليوم */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">إجمالي الحضور</p>
              <p className="text-2xl font-bold">{attendanceData.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">حالياً في الصالة</p>
              <p className="text-2xl font-bold">{attendanceData.filter(a => a.status === 'active').length}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">متوسط المدة</p>
              <p className="text-2xl font-bold">
                {Math.round(attendanceData.filter(a => a.duration).reduce((sum, a) => sum + a.duration, 0) / 
                attendanceData.filter(a => a.duration).length || 0)} دقيقة
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">الذروة</p>
              <p className="text-2xl font-bold">09:00</p>
            </div>
            <Activity className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* قائمة الحضور */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">حضور اليوم</h3>
            <div className="flex space-x-3 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="البحث عن عضو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                />
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center space-x-2 space-x-reverse">
                <Download className="h-4 w-4" />
                <span>تصدير</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العضو</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وقت الدخول</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">وقت الخروج</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المدة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendanceData.filter(member => 
                member.memberName.toLowerCase().includes(searchQuery.toLowerCase())
              ).map(member => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600">
                          {member.memberName.split(' ')[0][0]}{member.memberName.split(' ')[1]?.[0]}
                        </span>
                      </div>
                      <div className="mr-3">
                        <div className="text-sm font-medium text-gray-900">{member.memberName}</div>
                        <div className="text-sm text-gray-500">ID: {member.memberId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <LogIn className="h-4 w-4 text-green-500 ml-2" />
                      <span className="text-sm text-gray-900">{member.checkIn}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.checkOut ? (
                      <div className="flex items-center">
                        <LogOut className="h-4 w-4 text-red-500 ml-2" />
                        <span className="text-sm text-gray-900">{member.checkOut}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">لم يخرج بعد</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.duration ? (
                      <span className="text-sm text-gray-900">{member.duration} دقيقة</span>
                    ) : (
                      <span className="text-sm text-gray-500">جاري الحساب...</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status === 'active' ? 'في الصالة' : 'خرج'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderWeeklyAttendance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات الأسبوع</h3>
        <div className="grid grid-cols-7 gap-4">
          {['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, index) => (
            <div key={day} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-2">{day}</div>
              <div className="text-2xl font-bold text-purple-600">{Math.floor(Math.random() * 50) + 20}</div>
              <div className="text-xs text-gray-500">عضو</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">أوقات الذروة</h3>
        <div className="space-y-3">
          {[
            { time: '06:00 - 08:00', count: 25, percentage: 85 },
            { time: '17:00 - 19:00', count: 42, percentage: 95 },
            { time: '19:00 - 21:00', count: 38, percentage: 80 },
            { time: '21:00 - 23:00', count: 20, percentage: 45 }
          ].map((slot, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-20 text-sm text-gray-600">{slot.time}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${slot.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-900">{slot.count} عضو</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">معدل الحضور الشهري</h4>
          <div className="text-3xl font-bold text-purple-600 mb-2">82%</div>
          <div className="text-sm text-green-600">+5% من الشهر الماضي</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">متوسط المدة</h4>
          <div className="text-3xl font-bold text-blue-600 mb-2">95 دقيقة</div>
          <div className="text-sm text-green-600">+8 دقائق من الشهر الماضي</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-4">أكثر الأيام حضوراً</h4>
          <div className="text-3xl font-bold text-green-600 mb-2">الاثنين</div>
          <div className="text-sm text-gray-600">متوسط 65 عضو يومياً</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">الأعضاء الأكثر التزاماً</h3>
        <div className="space-y-3">
          {[
            { name: 'أحمد محمد', visits: 28, days: 30, percentage: 93 },
            { name: 'سارة أحمد', visits: 26, days: 30, percentage: 87 },
            { name: 'محمد علي', visits: 24, days: 30, percentage: 80 },
            { name: 'فاطمة خالد', visits: 22, days: 30, percentage: 73 }
          ].map((member, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center ml-3">
                  <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-600">{member.visits} زيارة من أصل {member.days} يوم</div>
                </div>
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-purple-600">{member.percentage}%</div>
                <div className="text-xs text-gray-500">معدل الحضور</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'today':
        return renderTodayAttendance()
      case 'week':
        return renderWeeklyAttendance()
      case 'analytics':
        return renderAnalytics()
      default:
        return renderTodayAttendance()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <GymSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <GymHeader title="تتبع الحضور" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
          <div className="p-6">
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

export default AttendanceTracking