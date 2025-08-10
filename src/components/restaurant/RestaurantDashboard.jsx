import { useState, useEffect } from 'react'
import RestaurantSidebar from '../layout/RestaurantSidebar'
import RestaurantHeader from '../layout/RestaurantHeader'
import { 
  ShoppingBag, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Users,
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
  Calendar,
  Target,
  Award,
  TrendingUp as ArrowUp,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  Truck
} from 'lucide-react'

const RestaurantDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedPeriod, setSelectedPeriod] = useState('today')

  // تحديث الوقت كل دقيقة
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // إحصائيات رئيسية محسنة
  const mainStats = [
    {
      title: 'الطلبات اليوم',
      value: '47',
      change: '+18%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'green',
      description: '3 طلبات جديدة في آخر ساعة',
      target: '50',
      progress: 94
    },
    {
      title: 'الطلبات المعلقة',
      value: '6',
      change: '-2',
      trend: 'up',
      icon: Clock,
      color: 'orange',
      description: 'متوسط وقت الانتظار: 8 دقائق',
      target: '5',
      progress: 80
    },
    {
      title: 'الإيرادات اليوم',
      value: '2,540 ريال',
      change: '+25%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue',
      description: 'الهدف: 3,000 ريال',
      target: '3000',
      progress: 85
    },
    {
      title: 'الطلبات المكتملة',
      value: '41',
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
      description: 'معدل إكمال: 87%',
      target: '45',
      progress: 91
    }
  ]

  // إحصائيات إضافية محسنة
  const additionalStats = [
    {
      title: 'متوسط وقت التحضير',
      value: '11 دقيقة',
      change: '-2 دقيقة',
      trend: 'up',
      icon: Timer,
      color: 'purple',
      description: 'تحسن بـ 15% عن أمس'
    },
    {
      title: 'تقييم المطعم',
      value: '4.8',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'yellow',
      description: '127 تقييم هذا الأسبوع'
    },
    {
      title: 'العملاء النشطين',
      value: '234',
      change: '+12',
      trend: 'up',
      icon: Users,
      color: 'indigo',
      description: '15 عميل جديد اليوم'
    },
    {
      title: 'كفاءة المطبخ',
      value: '92%',
      change: '+5%',
      trend: 'up',
      icon: Activity,
      color: 'emerald',
      description: 'أداء ممتاز'
    }
  ]

  // إحصائيات التوصيل المتقدمة
  const deliveryStats = [
    {
      title: 'السائقين النشطين',
      value: '8',
      icon: Truck,
      color: 'blue',
      description: 'من أصل 12 سائق'
    },
    {
      title: 'متوسط وقت التوصيل',
      value: '22 دقيقة',
      icon: Clock,
      color: 'green',
      description: 'ضمن المعدل المطلوب'
    },
    {
      title: 'الطلبات قيد التوصيل',
      value: '14',
      icon: MapPin,
      color: 'orange',
      description: '6 في الطريق'
    },
    {
      title: 'رضا العملاء',
      value: '4.9',
      icon: Star,
      color: 'yellow',
      description: 'تقييم التوصيل'
    }
  ]

  // الطلبات الأخيرة مع تحديثات
  const recentOrders = [
    { 
      id: '#1238', 
      customer: 'خالد السعد', 
      phone: '0501234890',
      items: 'كباب مشكل، عصير ليمون، سلطة',
      amount: '75 ريال', 
      status: 'جديد', 
      time: 'منذ دقيقتين',
      address: 'حي النرجس، الرياض',
      priority: 'عادي',
      driver: null,
      estimatedTime: '15 دقيقة'
    },
    { 
      id: '#1237', 
      customer: 'نورا عبدالعزيز', 
      phone: '0507890123',
      items: 'شاورما لحم، بطاطس محمرة، بيبسي',
      amount: '52 ريال', 
      status: 'قيد التحضير', 
      time: 'منذ 7 دقائق',
      address: 'حي الياسمين، الرياض',
      priority: 'عاجل',
      driver: null,
      estimatedTime: '8 دقائق'
    },
    { 
      id: '#1236', 
      customer: 'محمد الأحمد', 
      phone: '0551234567',
      items: 'بيتزا مارجريتا كبيرة، سلطة يونانية',
      amount: '89 ريال', 
      status: 'جاهز للتوصيل', 
      time: 'منذ 3 دقائق',
      address: 'حي العليا، الرياض',
      priority: 'عادي',
      driver: 'أحمد محمد',
      estimatedTime: 'تم التسليم للسائق'
    },
    { 
      id: '#1235', 
      customer: 'فاطمة القحطاني', 
      phone: '0509876543',
      items: 'مندي دجاج، شوربة عدس، أرز',
      amount: '95 ريال', 
      status: 'قيد التوصيل', 
      time: 'منذ 15 دقيقة',
      address: 'حي الصحافة، الرياض',
      priority: 'عادي',
      driver: 'سعد علي',
      estimatedTime: '10 دقائق للوصول'
    }
  ]

  // الأصناف الأكثر طلباً مع تفاصيل إضافية
  const topItems = [
    { 
      name: 'شاورما دجاج', 
      orders: 18, 
      revenue: '540 ريال', 
      trend: 'up',
      percentage: '+25%',
      profit: '162 ريال',
      image: '🌯'
    },
    { 
      name: 'برجر لحم', 
      orders: 14, 
      revenue: '490 ريال', 
      trend: 'up',
      percentage: '+18%',
      profit: '147 ريال',
      image: '🍔'
    },
    { 
      name: 'بيتزا مارجريتا', 
      orders: 9, 
      revenue: '585 ريال', 
      trend: 'down',
      percentage: '-5%',
      profit: '175 ريال',
      image: '🍕'
    },
    { 
      name: 'مندي لحم', 
      orders: 7, 
      revenue: '665 ريال', 
      trend: 'up',
      percentage: '+12%',
      profit: '200 ريال',
      image: '🍛'
    }
  ]

  // تنبيهات المخزون المحسنة
  const inventoryAlerts = [
    { 
      item: 'الطماطم', 
      level: 'منخفض', 
      quantity: '2 كيلو', 
      status: 'warning',
      action: 'يحتاج طلب خلال 6 ساعات',
      supplier: 'مورد الخضار المركزي'
    },
    { 
      item: 'الخس', 
      level: 'نفد', 
      quantity: '0 كيلو', 
      status: 'danger',
      action: 'توقف بيع السلطات مؤقتاً',
      supplier: 'مورد الخضار المركزي'
    },
    { 
      item: 'الجبن المثلثات', 
      level: 'منخفض', 
      quantity: '8 قطع', 
      status: 'warning',
      action: 'يكفي ليوم واحد فقط',
      supplier: 'شركة الألبان السعودية'
    },
    { 
      item: 'الدجاج المتبل', 
      level: 'جيد', 
      quantity: '18 كيلو', 
      status: 'good',
      action: 'مخزون كافي لـ 3 أيام',
      supplier: 'مزارع الدواجن'
    }
  ]

  // إحصائيات الأداء اليومي
  const dailyPerformance = [
    { period: 'الفطار', orders: 12, revenue: '580 ريال', percentage: 23 },
    { period: 'الغداء', orders: 28, revenue: '1,240 ريال', percentage: 49 },
    { period: 'العشاء', orders: 7, revenue: '720 ريال', percentage: 28 }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل': return 'text-green-600 bg-green-100 border-green-200'
      case 'قيد التوصيل': return 'text-cyan-600 bg-cyan-100 border-cyan-200'
      case 'جاهز للتوصيل': return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'قيد التحضير': return 'text-orange-600 bg-orange-100 border-orange-200'
      case 'جديد': return 'text-purple-600 bg-purple-100 border-purple-200'
      case 'ملغي': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'عاجل': return 'text-red-600 bg-red-50 border-red-200'
      case 'مهم': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'عادي': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getAlertColor = (status) => {
    switch (status) {
      case 'danger': return 'border-red-200 bg-red-50 text-red-800'
      case 'warning': return 'border-orange-200 bg-orange-50 text-orange-800'
      case 'good': return 'border-green-200 bg-green-50 text-green-800'
      default: return 'border-gray-200 bg-gray-50 text-gray-800'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RestaurantSidebar 
        isCollapsed={sidebarCollapsed} 
        setIsCollapsed={setSidebarCollapsed} 
      />
      
      <div className="flex-1 flex flex-col">
        <RestaurantHeader 
          title="لوحة تحكم المطعم"
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-6 space-y-6">
          {/* شريط المعلومات العلوي */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">مرحباً بك في مطعم الذوق الأصيل</h1>
                <p className="text-green-100">
                  آخر تحديث: {currentTime.toLocaleString('ar-SA', { 
                    timeZone: 'Asia/Riyadh',
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {currentTime.toLocaleString('ar-SA', { 
                    timeZone: 'Asia/Riyadh',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="text-green-100">توقيت الرياض</div>
              </div>
            </div>
          </div>

          {/* فلاتر الفترة الزمنية */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">إحصائيات الأداء</h2>
              <div className="flex space-x-2 space-x-reverse">
                <select 
                  value={selectedPeriod} 
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="today">اليوم</option>
                  <option value="week">هذا الأسبوع</option>
                  <option value="month">هذا الشهر</option>
                  <option value="year">هذا العام</option>
                </select>
                <button className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <RefreshCw className="w-4 h-4 ml-2" />
                  تحديث
                </button>
              </div>
            </div>
          </div>

          {/* الإحصائيات الرئيسية المحسنة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainStats.map((stat, index) => {
              const Icon = stat.icon
              const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
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
                  <p className="text-sm text-gray-600 mb-3">{stat.title}</p>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>التقدم</span>
                      <span>{stat.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${stat.color}-500 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${stat.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              )
            })}
          </div>

          {/* إحصائيات التوصيل */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Truck className="w-5 h-5 ml-2 text-blue-600" />
                إحصائيات التوصيل
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {deliveryStats.map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="text-center">
                      <div className={`p-3 rounded-lg bg-${stat.color}-100 mx-auto w-fit mb-3`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{stat.value}</h4>
                      <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* الإحصائيات الإضافية */}
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
                  <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </div>
              )
            })}
          </div>

          {/* الأداء اليومي */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <PieChart className="w-5 h-5 ml-2 text-purple-600" />
                توزيع الطلبات حسب الوجبة
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {dailyPerformance.map((period, index) => (
                  <div key={index} className="text-center">
                    <div className="relative mb-4">
                      <div className="w-20 h-20 rounded-full border-8 border-gray-200 mx-auto relative">
                        <div 
                          className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-green-500"
                          style={{
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + (period.percentage * 0.5)}% 0%, 100% 100%, 0% 100%)`
                          }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-gray-900">{period.percentage}%</span>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{period.period}</h4>
                    <p className="text-sm text-gray-600 mb-1">{period.orders} طلب</p>
                    <p className="text-sm font-medium text-green-600">{period.revenue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* الطلبات الأخيرة المحسنة */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Activity className="w-5 h-5 ml-2 text-orange-600" />
                    الطلبات النشطة
                  </h3>
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <span className="font-medium text-gray-900">{order.id}</span>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(order.priority)}`}>
                            {order.priority}
                          </span>
                        </div>
                        <div className="flex space-x-2 space-x-reverse">
                          <button className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center mb-2">
                            <Users className="w-4 h-4 text-gray-400 ml-2" />
                            <span className="font-medium">{order.customer}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <Phone className="w-4 h-4 text-gray-400 ml-2" />
                            <span className="text-gray-600">{order.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 ml-2" />
                            <span className="text-gray-600">{order.address}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-2">{order.items}</p>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">{order.amount}</span>
                            <span className="text-xs text-gray-500">{order.time}</span>
                          </div>
                          {order.driver && (
                            <div className="flex items-center text-xs text-blue-600">
                              <Truck className="w-3 h-3 ml-1" />
                              السائق: {order.driver}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            {order.estimatedTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm hover:bg-green-50 px-4 py-2 rounded-lg transition-colors">
                    عرض جميع الطلبات النشطة (12)
                  </button>
                </div>
              </div>
            </div>

            {/* الأصناف الأكثر طلباً المحسنة */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Target className="w-5 h-5 ml-2 text-green-600" />
                  الأكثر مبيعاً اليوم
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="text-2xl">{item.image}</div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.orders} طلب</p>
                          <p className="text-xs text-gray-500">ربح: {item.profit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{item.revenue}</p>
                        <div className={`flex items-center text-xs ${
                          item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 ml-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 ml-1" />
                          )}
                          {item.percentage}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm hover:bg-green-50 px-4 py-2 rounded-lg transition-colors">
                    عرض تحليل المبيعات
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* تنبيهات المخزون والإجراءات السريعة */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* تنبيهات المخزون المحسنة */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Package className="w-5 h-5 ml-2 text-orange-600" />
                  تنبيهات المخزون
                  <span className="mr-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                    عاجل: 2
                  </span>
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {inventoryAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.status)}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {alert.status === 'danger' && <AlertTriangle className="w-4 h-4 ml-2" />}
                          {alert.status === 'warning' && <AlertTriangle className="w-4 h-4 ml-2" />}
                          {alert.status === 'good' && <CheckCircle className="w-4 h-4 ml-2" />}
                          <span className="font-medium">{alert.item}</span>
                        </div>
                        <span className="text-sm font-medium">{alert.level}</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p>الكمية: <span className="font-medium">{alert.quantity}</span></p>
                        <p className="text-xs">{alert.action}</p>
                        <p className="text-xs opacity-75">المورد: {alert.supplier}</p>
                      </div>
                      {alert.status !== 'good' && (
                        <div className="mt-3">
                          <button className="text-xs bg-white bg-opacity-50 hover:bg-opacity-75 px-3 py-1 rounded-full transition-colors">
                            طلب الآن
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-orange-600 hover:text-orange-700 font-medium text-sm hover:bg-orange-50 px-4 py-2 rounded-lg transition-colors">
                    إدارة المخزون الكامل
                  </button>
                </div>
              </div>
            </div>

            {/* الإجراءات السريعة المحسنة */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Settings className="w-5 h-5 ml-2 text-purple-600" />
                  الإجراءات السريعة
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
                    <Plus className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-green-700">إضافة صنف جديد</span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                    <ShoppingBag className="w-8 h-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-blue-700">إدارة الطلبات</span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
                    <Package className="w-8 h-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-purple-700">تحديث المخزون</span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                    <BarChart3 className="w-8 h-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-orange-700">عرض التقارير</span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors group">
                    <Star className="w-8 h-8 text-yellow-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-yellow-700">التقييمات</span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors group">
                    <Users className="w-8 h-8 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-indigo-700">إدارة الموظفين</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default RestaurantDashboard

