import { useState } from 'react'
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  DollarSign, 
  Package, 
  CheckCircle, 
  XCircle,
  Star,
  User,
  Car,
  Fuel,
  Settings,
  Bell,
  Menu,
  Home,
  List,
  TrendingUp,
  Calendar,
  Target,
  Activity,
  Wallet,
  Route,
  Timer,
  AlertCircle,
  MessageSquare,
  Camera,
  Smartphone,
  Battery,
  Signal,
  Wifi
} from 'lucide-react'

const DriverApp = () => {
  const [currentView, setCurrentView] = useState('dashboard')
  const [isOnline, setIsOnline] = useState(true)
  const [currentLocation] = useState('الرياض، حي النخيل')
  const [batteryLevel] = useState(85)
  const [signalStrength] = useState(4)

  // إحصائيات السائق
  const driverStats = [
    { title: 'الطلبات اليوم', value: '12', icon: Package, color: 'blue' },
    { title: 'الأرباح اليوم', value: '240 ريال', icon: DollarSign, color: 'green' },
    { title: 'التقييم', value: '4.8', icon: Star, color: 'yellow' },
    { title: 'المسافة', value: '85 كم', icon: Route, color: 'purple' }
  ]

  // الطلبات المتاحة
  const availableOrders = [
    {
      id: '#1234',
      restaurant: 'مطعم البيت الشامي',
      customer: 'أحمد محمد',
      pickup: 'حي الملز، الرياض',
      delivery: 'حي النخيل، الرياض',
      distance: '3.2 كم',
      earnings: '15 ريال',
      time: '25 دقيقة',
      items: 3,
      priority: 'عادي'
    },
    {
      id: '#1235',
      restaurant: 'مطعم الكبسة الملكية',
      customer: 'فاطمة علي',
      pickup: 'حي العليا، الرياض',
      delivery: 'حي الورود، الرياض',
      distance: '5.1 كم',
      earnings: '22 ريال',
      time: '35 دقيقة',
      items: 2,
      priority: 'عاجل'
    }
  ]

  // الطلبات النشطة
  const activeOrders = [
    {
      id: '#1236',
      restaurant: 'مطعم البرجر الذهبي',
      customer: 'محمد عبدالله',
      customerPhone: '0551234567',
      pickup: 'حي الملز، الرياض',
      delivery: 'حي السليمانية، الرياض',
      status: 'في الطريق للاستلام',
      earnings: '18 ريال',
      estimatedTime: '15 دقيقة',
      orderValue: '65 ريال'
    }
  ]

  // إحصائيات الأسبوع
  const weeklyStats = [
    { day: 'السبت', orders: 15, earnings: 280 },
    { day: 'الأحد', orders: 18, earnings: 320 },
    { day: 'الاثنين', orders: 12, earnings: 220 },
    { day: 'الثلاثاء', orders: 16, earnings: 290 },
    { day: 'الأربعاء', orders: 14, earnings: 250 },
    { day: 'الخميس', orders: 19, earnings: 340 },
    { day: 'الجمعة', orders: 12, earnings: 240 }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'عاجل': return 'text-red-600 bg-red-100'
      case 'عادي': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'في الطريق للاستلام': return 'text-orange-600 bg-orange-100'
      case 'تم الاستلام': return 'text-blue-600 bg-blue-100'
      case 'في الطريق للتسليم': return 'text-purple-600 bg-purple-100'
      case 'تم التسليم': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  // Dashboard View
  const DashboardView = () => (
    <div className="space-y-6">
      {/* حالة السائق */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">حالة السائق</h3>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isOnline 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              {isOnline ? 'متصل' : 'غير متصل'}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 space-x-reverse">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{currentLocation}</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-2 gap-4">
        {driverStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{stat.value}</h3>
              <p className="text-xs text-gray-600">{stat.title}</p>
            </div>
          )
        })}
      </div>

      {/* الطلبات المتاحة */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">الطلبات المتاحة</h3>
        </div>
        <div className="p-4 space-y-4">
          {availableOrders.map((order, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(order.priority)}`}>
                    {order.priority}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{order.earnings}</p>
                  <p className="text-xs text-gray-500">{order.time}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{order.restaurant}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{order.customer}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{order.pickup} → {order.delivery}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{order.distance} • {order.items} أصناف</span>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2 space-x-reverse">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  قبول الطلب
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  تفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Active Orders View
  const ActiveOrdersView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">الطلبات النشطة</h3>
        </div>
        <div className="p-4 space-y-4">
          {activeOrders.map((order, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="font-medium text-gray-900">{order.id}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{order.earnings}</p>
                  <p className="text-xs text-gray-500">{order.estimatedTime}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{order.restaurant}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{order.customer}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{order.customerPhone}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{order.pickup} → {order.delivery}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <Navigation className="w-4 h-4 ml-2" />
                  التنقل
                </button>
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Phone className="w-4 h-4 ml-2" />
                  اتصال
                </button>
                <button className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 ml-2" />
                  تم الاستلام
                </button>
                <button className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 ml-2" />
                  تم التسليم
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Earnings View
  const EarningsView = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات الأرباح</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">1,680 ريال</p>
            <p className="text-sm text-gray-600">إجمالي الأسبوع</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">106</p>
            <p className="text-sm text-gray-600">إجمالي الطلبات</p>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">تفصيل الأسبوع</h4>
          {weeklyStats.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{day.day}</p>
                <p className="text-sm text-gray-600">{day.orders} طلب</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">{day.earnings} ريال</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">تطبيق التوصيل</h1>
                <p className="text-sm text-gray-500">مرحباً، أحمد السائق</p>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="flex items-center space-x-1 space-x-reverse">
                <Battery className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-600">{batteryLevel}%</span>
              </div>
              <div className="flex items-center">
                {[...Array(signalStrength)].map((_, i) => (
                  <div key={i} className="w-1 h-3 bg-green-500 ml-0.5 rounded-full"></div>
                ))}
              </div>
              <Wifi className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'orders' && <ActiveOrdersView />}
        {currentView === 'earnings' && <EarningsView />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentView === 'dashboard' 
                ? 'text-green-600 bg-green-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">الرئيسية</span>
          </button>
          
          <button
            onClick={() => setCurrentView('orders')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentView === 'orders' 
                ? 'text-green-600 bg-green-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-5 h-5" />
            <span className="text-xs mt-1">الطلبات</span>
          </button>
          
          <button
            onClick={() => setCurrentView('earnings')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentView === 'earnings' 
                ? 'text-green-600 bg-green-50' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs mt-1">الأرباح</span>
          </button>
          
          <button className="flex flex-col items-center p-2 rounded-lg text-gray-600 hover:text-gray-900 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="text-xs mt-1">الإعدادات</span>
          </button>
        </div>
      </nav>

      {/* Floating Action Button */}
      {isOnline && (
        <button className="fixed bottom-20 left-4 w-14 h-14 bg-green-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-green-700 transition-colors">
          <Bell className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

export default DriverApp

