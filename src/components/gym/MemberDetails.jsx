import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import GymSidebar from '../layout/GymSidebar'
import GymHeader from '../layout/GymHeader'
import { 
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  CreditCard,
  Clock,
  Activity,
  TrendingUp,
  TrendingDown,
  Star,
  Users,
  Dumbbell,
  Heart,
  Target,
  CheckCircle,
  XCircle,
  AlertCircle,
  Pause,
  Play,
  RefreshCw
} from 'lucide-react'

const MemberDetails = () => {
  const { memberId } = useParams()
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // بيانات العضو التفصيلية (محاكاة)
  const member = {
    id: memberId || 1,
    name: 'أحمد محمد علي',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    membershipType: 'ذهبية',
    status: 'نشط',
    joinDate: '2024-01-15',
    expiryDate: '2024-07-15',
    lastVisit: '2024-01-08',
    avatar: null,
    address: 'الرياض، حي النرجس، شارع الأمير محمد بن عبدالعزيز',
    dateOfBirth: '1990-05-15',
    gender: 'ذكر',
    emergencyContact: '+966507654321',
    notes: 'عضو مميز، يحتاج لمتابعة خاصة مع أخصائي التغذية',
    goals: ['فقدان الوزن', 'بناء العضلات', 'تحسين اللياقة'],
    medicalConditions: ['لا يوجد'],
    personalTrainer: 'محمد أحمد الرياضي'
  }

  // إحصائيات العضو
  const memberStats = [
    {
      title: 'إجمالي الزيارات',
      value: '124',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'الزيارات هذا الشهر',
      value: '18',
      change: '+12%',
      trend: 'up',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'إجمالي المدفوعات',
      value: '2,400 ريال',
      change: '+0%',
      trend: 'neutral',
      icon: CreditCard,
      color: 'purple'
    },
    {
      title: 'متوسط الزيارات أسبوعياً',
      value: '4.2',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'orange'
    }
  ]

  // سجل المدفوعات
  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 500,
      type: 'اشتراك شهري',
      method: 'بطاقة ائتمان',
      status: 'مكتمل'
    },
    {
      id: 2,
      date: '2023-12-15',
      amount: 500,
      type: 'اشتراك شهري',
      method: 'نقداً',
      status: 'مكتمل'
    },
    {
      id: 3,
      date: '2023-11-15',
      amount: 500,
      type: 'اشتراك شهري',
      method: 'تحويل بنكي',
      status: 'مكتمل'
    }
  ]

  // سجل الحضور
  const attendanceHistory = [
    { date: '2024-01-08', checkIn: '07:30', checkOut: '09:15', duration: '1 ساعة 45 دقيقة' },
    { date: '2024-01-06', checkIn: '18:00', checkOut: '19:30', duration: '1 ساعة 30 دقيقة' },
    { date: '2024-01-04', checkIn: '07:45', checkOut: '09:00', duration: '1 ساعة 15 دقيقة' },
    { date: '2024-01-02', checkIn: '17:30', checkOut: '19:00', duration: '1 ساعة 30 دقيقة' },
    { date: '2023-12-30', checkIn: '08:00', checkOut: '09:45', duration: '1 ساعة 45 دقيقة' }
  ]

  // سجل الحصص المحجوزة
  const classHistory = [
    {
      id: 1,
      name: 'يوجا الصباح',
      trainer: 'سارة أحمد',
      date: '2024-01-10',
      time: '08:00 - 09:00',
      status: 'حضر'
    },
    {
      id: 2,
      name: 'تدريب الأثقال',
      trainer: 'محمد علي',
      date: '2024-01-08',
      time: '19:00 - 20:00',
      status: 'حضر'
    },
    {
      id: 3,
      name: 'كارديو متقدم',
      trainer: 'فاطمة سالم',
      date: '2024-01-05',
      time: '18:30 - 19:30',
      status: 'غاب'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800'
      case 'منتهي': return 'bg-red-100 text-red-800'
      case 'مجمد': return 'bg-gray-100 text-gray-800'
      case 'مكتمل': return 'bg-green-100 text-green-800'
      case 'حضر': return 'bg-green-100 text-green-800'
      case 'غاب': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMembershipTypeColor = (type) => {
    switch (type) {
      case 'ذهبية': return 'bg-yellow-100 text-yellow-800'
      case 'فضية': return 'bg-gray-100 text-gray-800'
      case 'برونزية': return 'bg-orange-100 text-orange-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: Users },
    { id: 'attendance', name: 'سجل الحضور', icon: Clock },
    { id: 'payments', name: 'المدفوعات', icon: CreditCard },
    { id: 'classes', name: 'الحصص', icon: Dumbbell },
    { id: 'health', name: 'الصحة واللياقة', icon: Heart }
  ]

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <GymSidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col">
        <GymHeader />
        
        <main className="flex-1 p-6">
          {/* رأس الصفحة */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/gym/members')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">تفاصيل العضو</h1>
              <p className="text-gray-600">معلومات شاملة عن العضو وسجل نشاطه</p>
            </div>
          </div>

          {/* معلومات العضو الأساسية */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-2xl">
                    {member.name.split(' ')[0].charAt(0)}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getMembershipTypeColor(member.membershipType)}`}>
                        {member.membershipType}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {member.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      انضم في {member.joinDate}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      آخر زيارة {member.lastVisit}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-5 h-5" />
                </button>
                {member.status === 'نشط' && (
                  <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
                    <Pause className="w-5 h-5" />
                  </button>
                )}
                {member.status === 'مجمد' && (
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <Play className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* إحصائيات العضو */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {memberStats.map((stat, index) => {
              const Icon = stat.icon
              const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Activity
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    {stat.trend !== 'neutral' && (
                      <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                        stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <TrendIcon className="w-3 h-3" />
                        <span>{stat.change}</span>
                      </div>
                    )}
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
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.name}
                  </button>
                )
              })}
            </div>

            {/* محتوى التبويبات */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* المعلومات الشخصية */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">المعلومات الشخصية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">تاريخ الميلاد</label>
                        <p className="text-gray-900">{member.dateOfBirth}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">الجنس</label>
                        <p className="text-gray-900">{member.gender}</p>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-gray-500">العنوان</label>
                        <p className="text-gray-900 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {member.address}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">جهة الاتصال للطوارئ</label>
                        <p className="text-gray-900">{member.emergencyContact}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">المدرب الشخصي</label>
                        <p className="text-gray-900">{member.personalTrainer}</p>
                      </div>
                    </div>
                  </div>

                  {/* الأهداف والحالة الصحية */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">الأهداف</h4>
                      <div className="space-y-2">
                        {member.goals.map((goal, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-purple-600" />
                            <span className="text-gray-700">{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">الحالة الصحية</h4>
                      <div className="space-y-2">
                        {member.medicalConditions.map((condition, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-red-600" />
                            <span className="text-gray-700">{condition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ملاحظات */}
                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-3">ملاحظات</h4>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-gray-700">{member.notes}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'attendance' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">سجل الحضور</h3>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <RefreshCw className="w-4 h-4" />
                      تحديث
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">التاريخ</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">وقت الدخول</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">وقت الخروج</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المدة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {attendanceHistory.map((record, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-900">{record.date}</td>
                            <td className="py-3 px-4 text-gray-600">{record.checkIn}</td>
                            <td className="py-3 px-4 text-gray-600">{record.checkOut}</td>
                            <td className="py-3 px-4 text-gray-900 font-medium">{record.duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'payments' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">سجل المدفوعات</h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      <CreditCard className="w-4 h-4" />
                      إضافة دفعة
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">التاريخ</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المبلغ</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">النوع</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">طريقة الدفع</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الحالة</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {paymentHistory.map((payment) => (
                          <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-900">{payment.date}</td>
                            <td className="py-3 px-4 text-gray-900 font-semibold">{payment.amount} ريال</td>
                            <td className="py-3 px-4 text-gray-600">{payment.type}</td>
                            <td className="py-3 px-4 text-gray-600">{payment.method}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(payment.status)}`}>
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'classes' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">سجل الحصص</h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                      <Dumbbell className="w-4 h-4" />
                      حجز حصة
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {classHistory.map((classItem) => (
                      <div key={classItem.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">{classItem.name}</h4>
                            <p className="text-sm text-gray-600">مع المدرب: {classItem.trainer}</p>
                            <p className="text-sm text-gray-500">{classItem.date} • {classItem.time}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(classItem.status)}`}>
                            {classItem.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-4">القياسات الجسدية</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-blue-700">الوزن:</span>
                          <span className="font-semibold text-blue-900">75 كيلو</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">الطول:</span>
                          <span className="font-semibold text-blue-900">175 سم</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-700">مؤشر كتلة الجسم:</span>
                          <span className="font-semibold text-blue-900">24.5</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 mb-4">الأهداف الصحية</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-700">فقدان 5 كيلو</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-yellow-600" />
                          <span className="text-green-700">زيادة الكتلة العضلية</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-blue-600" />
                          <span className="text-green-700">تحسين القدرة على التحمل</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-semibold text-red-900 mb-4">تحذيرات صحية</h4>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-red-700">ينصح بمراجعة أخصائي التغذية لوضع برنامج غذائي مناسب للهدف.</p>
                        <p className="text-red-600 text-sm mt-1">آخر مراجعة: 2023-12-15</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MemberDetails