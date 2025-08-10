import { useState } from 'react'
import GymSidebar from '../layout/GymSidebar'
import GymHeader from '../layout/GymHeader'
import { 
  Users, 
  Dumbbell, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Clock,
  Star,
  Package,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  RefreshCw,
  MoreVertical,
  Phone,
  MapPin,
  Timer,
  Activity,
  Heart,
  Target,
  Trophy
} from 'lucide-react'

const GymDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // إحصائيات رئيسية
  const mainStats = [
    {
      title: 'إجمالي الأعضاء',
      value: '342',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'الأعضاء النشطين',
      value: '289',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'green'
    },
    {
      title: 'الإيرادات الشهرية',
      value: '45,600 ريال',
      change: '+22%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'الحضور اليوم',
      value: '78',
      change: '+5%',
      trend: 'up',
      icon: Calendar,
      color: 'orange'
    }
  ]

  // إحصائيات إضافية
  const additionalStats = [
    {
      title: 'المدربين النشطين',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: Dumbbell,
      color: 'indigo'
    },
    {
      title: 'الحصص اليوم',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: Clock,
      color: 'pink'
    },
    {
      title: 'تقييم الصالة',
      value: '4.9',
      change: '+0.1',
      trend: 'up',
      icon: Star,
      color: 'yellow'
    },
    {
      title: 'المعدات المتاحة',
      value: '95%',
      change: '-2%',
      trend: 'down',
      icon: Package,
      color: 'gray'
    }
  ]

  // حصص اليوم
  const todayClasses = [
    { 
      id: 1,
      name: 'يوجا صباحية', 
      trainer: 'سارة أحمد',
      time: '07:00 - 08:00',
      participants: 15,
      maxParticipants: 20,
      status: 'نشط',
      level: 'مبتدئ'
    },
    { 
      id: 2,
      name: 'تدريب القوة', 
      trainer: 'محمد علي',
      time: '09:00 - 10:30',
      participants: 8,
      maxParticipants: 12,
      status: 'نشط',
      level: 'متقدم'
    },
    { 
      id: 3,
      name: 'كارديو مكثف', 
      trainer: 'فاطمة سالم',
      time: '18:00 - 19:00',
      participants: 12,
      maxParticipants: 15,
      status: 'قادم',
      level: 'متوسط'
    },
    { 
      id: 4,
      name: 'بيلاتس مسائي', 
      trainer: 'نورا محمد',
      time: '20:00 - 21:00',
      participants: 6,
      maxParticipants: 10,
      status: 'قادم',
      level: 'مبتدئ'
    }
  ]

  // الأعضاء الجدد
  const newMembers = [
    { 
      name: 'أحمد محمد', 
      joinDate: '2024-08-08', 
      plan: 'شهري', 
      phone: '0501234567',
      status: 'نشط'
    },
    { 
      name: 'فاطمة علي', 
      joinDate: '2024-08-07', 
      plan: 'سنوي', 
      phone: '0507654321',
      status: 'نشط'
    },
    { 
      name: 'محمد عبدالله', 
      joinDate: '2024-08-06', 
      plan: 'ربع سنوي', 
      phone: '0551234567',
      status: 'نشط'
    },
    { 
      name: 'سارة أحمد', 
      joinDate: '2024-08-05', 
      plan: 'شهري', 
      phone: '0509876543',
      status: 'نشط'
    }
  ]

  // تنبيهات المعدات
  const equipmentAlerts = [
    { equipment: 'جهاز الجري #5', issue: 'يحتاج صيانة', priority: 'عالية', status: 'warning' },
    { equipment: 'أوزان حرة 20 كيلو', issue: 'مفقود', priority: 'متوسطة', status: 'danger' },
    { equipment: 'دراجة ثابتة #3', issue: 'عطل في الشاشة', priority: 'منخفضة', status: 'info' },
    { equipment: 'جهاز الضغط', issue: 'تم الإصلاح', priority: 'منخفضة', status: 'success' }
  ]

  // الاشتراكات المنتهية قريباً
  const expiringSubscriptions = [
    { member: 'خالد أحمد', expiryDate: '2024-08-15', plan: 'شهري', daysLeft: 5 },
    { member: 'منى سالم', expiryDate: '2024-08-18', plan: 'ربع سنوي', daysLeft: 8 },
    { member: 'عبدالله محمد', expiryDate: '2024-08-20', plan: 'شهري', daysLeft: 10 },
    { member: 'نورا علي', expiryDate: '2024-08-22', plan: 'سنوي', daysLeft: 12 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشط': return 'text-green-600 bg-green-100'
      case 'قادم': return 'text-blue-600 bg-blue-100'
      case 'مكتمل': return 'text-gray-600 bg-gray-100'
      case 'ملغي': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertColor = (status) => {
    switch (status) {
      case 'danger': return 'border-red-200 bg-red-50 text-red-800'
      case 'warning': return 'border-orange-200 bg-orange-50 text-orange-800'
      case 'info': return 'border-blue-200 bg-blue-50 text-blue-800'
      case 'success': return 'border-green-200 bg-green-50 text-green-800'
      default: return 'border-gray-200 bg-gray-50 text-gray-800'
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'مبتدئ': return 'text-green-600 bg-green-100'
      case 'متوسط': return 'text-orange-600 bg-orange-100'
      case 'متقدم': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <GymSidebar 
        isCollapsed={sidebarCollapsed} 
        setIsCollapsed={setSidebarCollapsed} 
      />
      
      <div className="flex-1 flex flex-col">
        <GymHeader 
          title="لوحة تحكم صالة الجيم"
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-6">
          {/* الإحصائيات الرئيسية */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">الإحصائيات الرئيسية</h2>
              <button className="flex items-center px-3 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <RefreshCw className="w-4 h-4 ml-2" />
                تحديث
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainStats.map((stat, index) => {
                const Icon = stat.icon
                const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <div className={`flex items-center text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendIcon className="w-4 h-4 ml-1" />
                        {stat.change}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* الإحصائيات الإضافية */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات إضافية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalStats.map((stat, index) => {
                const Icon = stat.icon
                const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
                return (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <div className={`flex items-center text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendIcon className="w-4 h-4 ml-1" />
                        {stat.change}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* حصص اليوم */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">حصص اليوم</h3>
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {todayClasses.map((classItem, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <h4 className="font-medium text-gray-900">{classItem.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(classItem.status)}`}>
                            {classItem.status}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getLevelColor(classItem.level)}`}>
                            {classItem.level}
                          </span>
                        </div>
                        <div className="flex space-x-2 space-x-reverse">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center mb-2">
                            <Dumbbell className="w-4 h-4 text-gray-400 ml-2" />
                            <span className="font-medium">المدرب: {classItem.trainer}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 text-gray-400 ml-2" />
                            <span className="text-gray-600">{classItem.time}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">المشاركين:</span>
                            <span className="font-medium text-gray-900">
                              {classItem.participants}/{classItem.maxParticipants}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${(classItem.participants / classItem.maxParticipants) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                    عرض جميع الحصص
                  </button>
                </div>
              </div>
            </div>

            {/* الأعضاء الجدد */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">الأعضاء الجدد</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {newMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.phone}</p>
                        <p className="text-xs text-gray-500">انضم في: {member.joinDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{member.plan}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(member.status)}`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                    عرض جميع الأعضاء
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* تنبيهات المعدات */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">تنبيهات المعدات</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {equipmentAlerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.status)}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{alert.equipment}</p>
                          <p className="text-sm">{alert.issue}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{alert.priority}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* الاشتراكات المنتهية قريباً */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">الاشتراكات المنتهية قريباً</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {expiringSubscriptions.map((subscription, index) => (
                    <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{subscription.member}</p>
                          <p className="text-sm text-gray-600">{subscription.plan}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-orange-600">
                            {subscription.daysLeft} أيام متبقية
                          </p>
                          <p className="text-xs text-gray-500">{subscription.expiryDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* الإجراءات السريعة */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">الإجراءات السريعة</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Plus className="w-8 h-8 text-purple-600 mb-2" />
                  <span className="text-sm font-medium text-purple-600">إضافة عضو جديد</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <Calendar className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-blue-600">جدولة حصة</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Package className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-green-600">إدارة المعدات</span>
                </button>
                <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                  <Trophy className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="text-sm font-medium text-orange-600">إنشاء تحدي</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default GymDashboard

