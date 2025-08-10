import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GymSidebar from '../layout/GymSidebar'
import GymHeader from '../layout/GymHeader'
import { 
  Dumbbell,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  Users,
  Calendar,
  User,
  UserCheck,
  Play,
  Pause,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Star,
  MapPin,
  Activity,
  Timer,
  Target
} from 'lucide-react'

const ClassesManagement = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedClasses, setSelectedClasses] = useState([])

  // إحصائيات الحصص
  const classStats = [
    {
      title: 'إجمالي الحصص',
      value: '48',
      change: '+12%',
      trend: 'up',
      icon: Dumbbell,
      color: 'purple'
    },
    {
      title: 'الحصص النشطة',
      value: '36',
      change: '+8%',
      trend: 'up',
      icon: Play,
      color: 'green'
    },
    {
      title: 'الحصص الخاصة',
      value: '15',
      change: '+25%',
      trend: 'up',
      icon: User,
      color: 'blue'
    },
    {
      title: 'متوسط الحضور',
      value: '85%',
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'orange'
    }
  ]

  // بيانات الحصص التجريبية
  const allClasses = [
    {
      id: 1,
      name: 'يوجا الصباح',
      trainer: 'سارة أحمد محمد',
      type: 'جماعية',
      level: 'مبتدئ',
      duration: '60 دقيقة',
      capacity: 20,
      enrolled: 15,
      price: 50,
      schedule: {
        days: ['الأحد', 'الثلاثاء', 'الخميس'],
        time: '08:00 - 09:00'
      },
      status: 'نشطة',
      nextSession: '2024-01-09 08:00',
      description: 'حصة يوجا مناسبة للمبتدئين لتحسين المرونة والتوازن'
    },
    {
      id: 2,
      name: 'تدريب الأثقال المتقدم',
      trainer: 'محمد علي الرياضي',
      type: 'جماعية',
      level: 'متقدم',
      duration: '90 دقيقة',
      capacity: 12,
      enrolled: 10,
      price: 80,
      schedule: {
        days: ['الاثنين', 'الأربعاء', 'الجمعة'],
        time: '19:00 - 20:30'
      },
      status: 'نشطة',
      nextSession: '2024-01-08 19:00',
      description: 'تدريب متقدم لبناء العضلات وزيادة القوة'
    },
    {
      id: 3,
      name: 'كارديو عالي الكثافة',
      trainer: 'فاطمة سالم الحربي',
      type: 'جماعية',
      level: 'متوسط',
      duration: '45 دقيقة',
      capacity: 25,
      enrolled: 22,
      price: 60,
      schedule: {
        days: ['السبت', 'الاثنين', 'الأربعاء'],
        time: '18:00 - 18:45'
      },
      status: 'نشطة',
      nextSession: '2024-01-08 18:00',
      description: 'تدريب كارديو مكثف لحرق السعرات وتحسين اللياقة'
    },
    {
      id: 4,
      name: 'تدريب شخصي - أحمد محمد',
      trainer: 'خالد سعد الدوسري',
      type: 'خاصة',
      level: 'مخصص',
      duration: '60 دقيقة',
      capacity: 1,
      enrolled: 1,
      price: 200,
      schedule: {
        days: ['حسب الاتفاق'],
        time: 'مرن'
      },
      status: 'نشطة',
      nextSession: '2024-01-09 16:00',
      description: 'تدريب شخصي مخصص حسب أهداف العضو'
    },
    {
      id: 5,
      name: 'بيلاتس المسائي',
      trainer: 'نورا عبدالله الرشيد',
      type: 'جماعية',
      level: 'مبتدئ',
      duration: '50 دقيقة',
      capacity: 15,
      enrolled: 8,
      price: 55,
      schedule: {
        days: ['الثلاثاء', 'الخميس'],
        time: '20:00 - 20:50'
      },
      status: 'متوقفة',
      nextSession: null,
      description: 'تدريب بيلاتس لتقوية العضلات الأساسية والمرونة'
    }
  ]

  // الحصص حسب الأيام للجدول الأسبوعي
  const weeklySchedule = {
    'السبت': [
      { id: 1, name: 'كارديو عالي الكثافة', time: '18:00-18:45', trainer: 'فاطمة سالم', capacity: 25, enrolled: 22 }
    ],
    'الأحد': [
      { id: 2, name: 'يوجا الصباح', time: '08:00-09:00', trainer: 'سارة أحمد', capacity: 20, enrolled: 15 }
    ],
    'الاثنين': [
      { id: 3, name: 'تدريب الأثقال المتقدم', time: '19:00-20:30', trainer: 'محمد علي', capacity: 12, enrolled: 10 },
      { id: 4, name: 'كارديو عالي الكثافة', time: '18:00-18:45', trainer: 'فاطمة سالم', capacity: 25, enrolled: 22 }
    ],
    'الثلاثاء': [
      { id: 5, name: 'يوجا الصباح', time: '08:00-09:00', trainer: 'سارة أحمد', capacity: 20, enrolled: 15 },
      { id: 6, name: 'بيلاتس المسائي', time: '20:00-20:50', trainer: 'نورا عبدالله', capacity: 15, enrolled: 8 }
    ],
    'الأربعاء': [
      { id: 7, name: 'تدريب الأثقال المتقدم', time: '19:00-20:30', trainer: 'محمد علي', capacity: 12, enrolled: 10 },
      { id: 8, name: 'كارديو عالي الكثافة', time: '18:00-18:45', trainer: 'فاطمة سالم', capacity: 25, enrolled: 22 }
    ],
    'الخميس': [
      { id: 9, name: 'يوجا الصباح', time: '08:00-09:00', trainer: 'سارة أحمد', capacity: 20, enrolled: 15 },
      { id: 10, name: 'بيلاتس المسائي', time: '20:00-20:50', trainer: 'نورا عبدالله', capacity: 15, enrolled: 8 }
    ],
    'الجمعة': [
      { id: 11, name: 'تدريب الأثقال المتقدم', time: '19:00-20:30', trainer: 'محمد علي', capacity: 12, enrolled: 10 }
    ]
  }

  // تصفية الحصص حسب التبويب النشط
  const getFilteredClasses = () => {
    let filtered = allClasses
    
    switch (activeTab) {
      case 'active':
        filtered = allClasses.filter(cls => cls.status === 'نشطة')
        break
      case 'private':
        filtered = allClasses.filter(cls => cls.type === 'خاصة')
        break
      case 'group':
        filtered = allClasses.filter(cls => cls.type === 'جماعية')
        break
      case 'schedule':
        return null // خاص بعرض الجدول
      default:
        filtered = allClasses
    }

    if (searchQuery) {
      filtered = filtered.filter(cls => 
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.level.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشطة': return 'bg-green-100 text-green-800'
      case 'متوقفة': return 'bg-red-100 text-red-800'
      case 'محجوزة بالكامل': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'جماعية': return 'bg-blue-100 text-blue-800'
      case 'خاصة': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'مبتدئ': return 'bg-green-100 text-green-800'
      case 'متوسط': return 'bg-yellow-100 text-yellow-800'
      case 'متقدم': return 'bg-red-100 text-red-800'
      case 'مخصص': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCapacityPercentage = (enrolled, capacity) => {
    return Math.round((enrolled / capacity) * 100)
  }

  const getCapacityColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const tabs = [
    { id: 'all', name: 'جميع الحصص', count: allClasses.length },
    { id: 'active', name: 'الحصص النشطة', count: allClasses.filter(c => c.status === 'نشطة').length },
    { id: 'schedule', name: 'جدول الحصص', count: null },
    { id: 'private', name: 'الحصص الخاصة', count: allClasses.filter(c => c.type === 'خاصة').length },
    { id: 'group', name: 'الحصص الجماعية', count: allClasses.filter(c => c.type === 'جماعية').length },
    { id: 'add', name: 'إضافة حصة جديدة', count: null }
  ]

  const days = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <GymSidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col">
        <GymHeader />
        
        <main className="flex-1 p-6">
          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {classStats.map((stat, index) => {
              const Icon = stat.icon
              const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <TrendIcon className="w-3 h-3" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* شريط التبويبات */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-wrap gap-2 p-4 border-b border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.name}
                  {tab.count !== null && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id ? 'bg-purple-200' : 'bg-gray-200'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* أدوات البحث والتصفية - تظهر للتبويبات ما عدا إضافة حصة والجدول */}
            {activeTab !== 'add' && activeTab !== 'schedule' && (
              <div className="p-4 flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* شريط البحث */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="البحث في الحصص..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-80"
                    />
                  </div>

                  {/* فلتر */}
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    تصفية
                  </button>
                </div>

                <div className="flex gap-2">
                  {/* تصدير البيانات */}
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    تصدير
                  </button>

                  {/* تحديث */}
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <RefreshCw className="w-4 h-4" />
                    تحديث
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* المحتوى حسب التبويب النشط */}
          {activeTab === 'add' ? (
            // نموذج إضافة حصة جديدة
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">إضافة حصة جديدة</h2>
                <p className="text-gray-600">املأ البيانات التالية لإضافة حصة تدريبية جديدة</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* اسم الحصة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم الحصة *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="أدخل اسم الحصة"
                    />
                  </div>

                  {/* المدرب */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      المدرب *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">اختر المدرب</option>
                      <option value="1">سارة أحمد محمد</option>
                      <option value="2">محمد علي الرياضي</option>
                      <option value="3">فاطمة سالم الحربي</option>
                      <option value="4">خالد سعد الدوسري</option>
                      <option value="5">نورا عبدالله الرشيد</option>
                    </select>
                  </div>

                  {/* نوع الحصة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع الحصة *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">اختر نوع الحصة</option>
                      <option value="group">جماعية</option>
                      <option value="private">خاصة</option>
                    </select>
                  </div>

                  {/* مستوى الصعوبة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مستوى الصعوبة *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">اختر المستوى</option>
                      <option value="beginner">مبتدئ</option>
                      <option value="intermediate">متوسط</option>
                      <option value="advanced">متقدم</option>
                      <option value="custom">مخصص</option>
                    </select>
                  </div>

                  {/* مدة الحصة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      مدة الحصة (دقيقة) *
                    </label>
                    <input
                      type="number"
                      min="30"
                      max="180"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="60"
                    />
                  </div>

                  {/* سعة الحصة */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السعة القصوى *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="20"
                    />
                  </div>

                  {/* السعر */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      السعر (ريال) *
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="50"
                    />
                  </div>

                  {/* وقت البداية */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      وقت البداية *
                    </label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* أيام الأسبوع */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    أيام الأسبوع *
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                    {days.map((day) => (
                      <label key={day} className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* وصف الحصة */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    وصف الحصة
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="وصف تفصيلي للحصة وأهدافها"
                  ></textarea>
                </div>

                {/* أزرار الحفظ */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    حفظ الحصة
                  </button>
                </div>
              </form>
            </div>
          ) : activeTab === 'schedule' ? (
            // جدول الحصص الأسبوعي
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">جدول الحصص الأسبوعي</h2>
                    <p className="text-gray-600 mt-1">عرض جميع الحصص موزعة على أيام الأسبوع</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <Plus className="w-4 h-4" />
                    إضافة حصة
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                  {days.map((day) => (
                    <div key={day} className="border border-gray-200 rounded-lg">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900 text-center">{day}</h3>
                      </div>
                      <div className="p-3 space-y-2">
                        {weeklySchedule[day]?.map((session) => {
                          const percentage = getCapacityPercentage(session.enrolled, session.capacity)
                          return (
                            <div key={session.id} className="bg-white border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow">
                              <div className="text-sm font-medium text-gray-900 mb-1">
                                {session.name}
                              </div>
                              <div className="text-xs text-gray-500 mb-2">
                                {session.time}
                              </div>
                              <div className="text-xs text-gray-600 mb-2">
                                {session.trainer}
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {session.enrolled}/{session.capacity}
                                </span>
                                <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full ${getCapacityColor(percentage)}`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )
                        }) || (
                          <div className="text-center text-gray-400 text-sm py-4">
                            لا توجد حصص
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // جدول الحصص
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">الحصة</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">المدرب</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">النوع والمستوى</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">التوقيت</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">الحضور</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">السعر</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">الحالة</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {getFilteredClasses()?.map((cls) => {
                      const percentage = getCapacityPercentage(cls.enrolled, cls.capacity)
                      return (
                        <tr key={cls.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <input type="checkbox" className="rounded border-gray-300" />
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <div className="font-semibold text-gray-900">{cls.name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <Timer className="w-3 h-3" />
                                {cls.duration}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-sm font-semibold">
                                  {cls.trainer.split(' ')[0].charAt(0)}
                                </span>
                              </div>
                              <span className="text-gray-900">{cls.trainer}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(cls.type)}`}>
                                {cls.type}
                              </span>
                              <div>
                                <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(cls.level)}`}>
                                  {cls.level}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm">
                              <div className="text-gray-900 font-medium">{cls.schedule.time}</div>
                              <div className="text-gray-500">{cls.schedule.days.join(', ')}</div>
                              {cls.nextSession && (
                                <div className="text-xs text-blue-600 mt-1">
                                  القادمة: {cls.nextSession}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{cls.enrolled}/{cls.capacity}</span>
                                <span className="text-gray-500">{percentage}%</span>
                              </div>
                              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${getCapacityColor(percentage)}`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-semibold text-gray-900">{cls.price} ريال</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(cls.status)}`}>
                              {cls.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                <Edit className="w-4 h-4" />
                              </button>
                              {cls.status === 'نشطة' && (
                                <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
                                  <Pause className="w-4 h-4" />
                                </button>
                              )}
                              {cls.status === 'متوقفة' && (
                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                  <Play className="w-4 h-4" />
                                </button>
                              )}
                              <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  عرض 1-{getFilteredClasses()?.length || 0} من {getFilteredClasses()?.length || 0} حصة
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                    السابق
                  </button>
                  <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                    التالي
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ClassesManagement