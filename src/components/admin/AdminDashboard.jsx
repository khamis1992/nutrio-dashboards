import { useState, useEffect } from 'react'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  Users, 
  Building2, 
  Dumbbell, 
  Truck, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  RefreshCw,
  Activity,
  Calendar,
  BarChart3,
  Star,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  Server,
  Database,
  Wifi,
  Target,
  ThumbsUp,
  Coffee,
  Package,
  CreditCard
} from 'lucide-react'

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTimeRange, setActiveTimeRange] = useState('week')
  const [refreshing, setRefreshing] = useState(false)

  // محاكاة تحديث البيانات
  const refreshData = async () => {
    setRefreshing(true)
    // محاكاة API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setRefreshing(false)
  }

  // إحصائيات النظام الأساسية
  const systemStats = [
    {
      title: 'إجمالي المستخدمين',
      value: '12,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      description: 'مستخدم نشط'
    },
    {
      title: 'المطاعم النشطة',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: Building2,
      color: 'green',
      description: 'مطعم مفعل'
    },
    {
      title: 'صالات الجيم',
      value: '89',
      change: '+15%',
      trend: 'up',
      icon: Dumbbell,
      color: 'purple',
      description: 'صالة نشطة'
    },
    {
      title: 'السائقين المتاحين',
      value: '234',
      change: '-3%',
      trend: 'down',
      icon: Truck,
      color: 'orange',
      description: 'سائق متاح الآن'
    }
  ]

  // إحصائيات الأداء والمبيعات
  const performanceStats = [
    {
      title: 'الإيرادات الشهرية',
      value: '2,450,000 ريال',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      description: 'إجمالي هذا الشهر'
    },
    {
      title: 'الطلبات اليوم',
      value: '1,234',
      change: '+25%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'blue',
      description: 'طلب اليوم'
    },
    {
      title: 'معدل وقت التوصيل',
      value: '28 دقيقة',
      change: '-5%',
      trend: 'up',
      icon: Clock,
      color: 'orange',
      description: 'متوسط الوقت'
    },
    {
      title: 'معدل رضا العملاء',
      value: '94.5%',
      change: '+2%',
      trend: 'up',
      icon: Star,
      color: 'yellow',
      description: 'من التقييمات'
    }
  ]

  // إحصائيات صحة النظام
  const systemHealthStats = [
    {
      title: 'حالة الخوادم',
      value: '99.9%',
      status: 'excellent',
      icon: Server,
      description: 'وقت التشغيل'
    },
    {
      title: 'قاعدة البيانات',
      value: '1.2ms',
      status: 'good',
      icon: Database,
      description: 'زمن الاستجابة'
    },
    {
      title: 'سرعة الشبكة',
      value: '45ms',
      status: 'good',
      icon: Wifi,
      description: 'ping متوسط'
    },
    {
      title: 'استخدام الذاكرة',
      value: '67%',
      status: 'warning',
      icon: Activity,
      description: 'من المساحة الكلية'
    }
  ]

  // النشاطات الأخيرة
  const recentActivities = [
    {
      id: 1,
      type: 'user_registered',
      title: 'تسجيل مستخدم جديد',
      description: 'تم تسجيل أحمد محمد كمدير مطعم',
      time: 'منذ 5 دقائق',
      icon: Users,
      color: 'blue'
    },
    {
      id: 2,
      type: 'restaurant_added',
      title: 'إضافة مطعم جديد',
      description: 'تم إضافة مطعم البيت الشامي بنجاح',
      time: 'منذ 15 دقيقة',
      icon: Building2,
      color: 'green'
    },
    {
      id: 3,
      type: 'payment_completed',
      title: 'دفعة مكتملة',
      description: 'تم استلام دفعة بقيمة 2,500 ريال من مطعم الأصالة',
      time: 'منذ 30 دقيقة',
      icon: CreditCard,
      color: 'purple'
    },
    {
      id: 4,
      type: 'gym_joined',
      title: 'انضمام صالة جيم',
      description: 'طلب انضمام من صالة فتنس بلس',
      time: 'منذ 45 دقيقة',
      icon: Dumbbell,
      color: 'orange'
    }
  ]

  // الطلبات الأخيرة
  const recentOrders = [
    { 
      id: '#12345', 
      customer: 'أحمد محمد', 
      restaurant: 'مطعم البيت الشامي', 
      amount: '85 ريال', 
      status: 'مكتمل', 
      time: 'منذ 5 دقائق',
      driver: 'خالد الأحمد'
    },
    { 
      id: '#12346', 
      customer: 'فاطمة علي', 
      restaurant: 'مطعم الأصالة', 
      amount: '120 ريال', 
      status: 'قيد التوصيل', 
      time: 'منذ 10 دقائق',
      driver: 'محمد السعيد'
    },
    { 
      id: '#12347', 
      customer: 'محمد عبدالله', 
      restaurant: 'مطعم الفردوس', 
      amount: '95 ريال', 
      status: 'قيد التحضير', 
      time: 'منذ 15 دقيقة',
      driver: null
    },
    { 
      id: '#12348', 
      customer: 'سارة أحمد', 
      restaurant: 'مطعم الزعفران', 
      amount: '150 ريال', 
      status: 'مكتمل', 
      time: 'منذ 20 دقيقة',
      driver: 'عبدالله المطيري'
    }
  ]

  // التنبيهات المهمة
  const alerts = [
    { 
      type: 'warning', 
      title: 'طلبات انضمام مطاعم',
      message: '5 طلبات انضمام مطاعم في انتظار المراجعة', 
      action: 'مراجعة',
      priority: 'متوسط'
    },
    { 
      type: 'error', 
      title: 'مشكلة في نظام الدفع',
      message: 'مشكلة في خدمة الدفع - يتطلب تدخل فوري', 
      action: 'حل المشكلة',
      priority: 'عاجل'
    },
    { 
      type: 'info', 
      title: 'سائقين جدد',
      message: '12 سائق جديد تم تسجيلهم اليوم', 
      action: 'عرض',
      priority: 'منخفض'
    },
    { 
      type: 'success', 
      title: 'تحديث النظام',
      message: 'تم تحديث النظام بنجاح إلى الإصدار 2.1.0', 
      action: 'تفاصيل',
      priority: 'معلوماتي'
    }
  ]

  // أهم المطاعم
  const topRestaurants = [
    { name: 'مطعم البيت الشامي', orders: 45, revenue: '2,340 ريال', rating: 4.8 },
    { name: 'مطعم الأصالة', orders: 38, revenue: '1,890 ريال', rating: 4.6 },
    { name: 'مطعم الفردوس', orders: 32, revenue: '1,650 ريال', rating: 4.7 },
    { name: 'مطعم الزعفران', orders: 28, revenue: '1,420 ريال', rating: 4.5 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل': return 'text-green-600 bg-green-100'
      case 'قيد التوصيل': return 'text-blue-600 bg-blue-100'
      case 'قيد التحضير': return 'text-orange-600 bg-orange-100'
      case 'ملغي': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'border-orange-200 bg-orange-50 text-orange-800'
      case 'error': return 'border-red-200 bg-red-50 text-red-800'
      case 'info': return 'border-blue-200 bg-blue-50 text-blue-800'
      case 'success': return 'border-green-200 bg-green-50 text-green-800'
      default: return 'border-gray-200 bg-gray-50 text-gray-800'
    }
  }

  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'warning': return 'text-orange-600 bg-orange-100'
      case 'critical': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed} 
        setIsCollapsed={setSidebarCollapsed} 
      />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="لوحة التحكم الرئيسية"
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-6 space-y-6">
          {/* شريط التحكم العلوي */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-2xl font-bold text-gray-900">مرحباً بك في لوحة التحكم</h1>
              <span className="text-sm text-gray-500">آخر تحديث: {new Date().toLocaleString('ar-SA')}</span>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['day', 'week', 'month'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setActiveTimeRange(range)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      activeTimeRange === range 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range === 'day' ? 'اليوم' : range === 'week' ? 'الأسبوع' : 'الشهر'}
                  </button>
                ))}
              </div>
              <button 
                onClick={refreshData}
                disabled={refreshing}
                className="flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ml-2 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'جاري التحديث...' : 'تحديث البيانات'}
              </button>
            </div>
          </div>

          {/* التنبيهات المهمة */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="w-5 h-5 ml-2 text-orange-500" />
                  التنبيهات المهمة
                </h2>
                <span className="text-sm text-gray-500">{alerts.length} تنبيه نشط</span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{alert.title}</h4>
                        <p className="text-sm mb-2">{alert.message}</p>
                        <span className="text-xs opacity-75">الأولوية: {alert.priority}</span>
                      </div>
                      <button className="text-sm font-medium underline hover:no-underline ml-3">
                        {alert.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* الإحصائيات الأساسية */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart3 className="w-5 h-5 ml-2 text-blue-500" />
                إحصائيات النظام الأساسية
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systemStats.map((stat, index) => {
                  const Icon = stat.icon
                  const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
                  return (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
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
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* إحصائيات الأداء */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Target className="w-5 h-5 ml-2 text-green-500" />
                إحصائيات الأداء والمبيعات
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceStats.map((stat, index) => {
                  const Icon = stat.icon
                  const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
                  return (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
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
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* صحة النظام */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Activity className="w-5 h-5 ml-2 text-purple-500" />
                  صحة النظام
                </h2>
                <span className="text-sm text-green-600 font-medium">كل شيء يعمل بشكل طبيعي</span>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {systemHealthStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-3">
                        <div className={`p-3 rounded-full ${getHealthStatusColor(stat.status)}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* الطلبات الأخيرة */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">الطلبات الأخيرة</h3>
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{order.id}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{order.customer} - {order.restaurant}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-900">{order.amount}</span>
                          <span className="text-gray-500">{order.time}</span>
                        </div>
                        {order.driver && (
                          <p className="text-xs text-blue-600 mt-1">السائق: {order.driver}</p>
                        )}
                      </div>
                      <div className="flex space-x-2 space-x-reverse mr-4">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    عرض جميع الطلبات
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* الإجراءات السريعة */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">الإجراءات السريعة</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <Plus className="w-8 h-8 text-blue-600 mb-2" />
                      <span className="text-sm font-medium text-blue-600">إضافة مطعم</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <Plus className="w-8 h-8 text-green-600 mb-2" />
                      <span className="text-sm font-medium text-green-600">إضافة صالة</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                      <Plus className="w-8 h-8 text-purple-600 mb-2" />
                      <span className="text-sm font-medium text-purple-600">إضافة سائق</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                      <Users className="w-8 h-8 text-orange-600 mb-2" />
                      <span className="text-sm font-medium text-orange-600">إدارة المستخدمين</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* أهم المطاعم */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">أهم المطاعم اليوم</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topRestaurants.map((restaurant, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{restaurant.name}</h4>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">{restaurant.orders} طلب</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400 ml-1" />
                              <span className="text-xs text-gray-500">{restaurant.rating}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-green-600">{restaurant.revenue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* النشاطات الأخيرة */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">النشاطات الأخيرة</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivities.slice(0, 4).map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start space-x-3 space-x-reverse">
                          <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
                            <Icon className={`w-4 h-4 text-${activity.color}-600`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      عرض جميع النشاطات
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard

