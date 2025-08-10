import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Menu,
  ChevronDown,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Power,
  PowerOff
} from 'lucide-react'

const RestaurantHeader = ({ title, onMenuToggle }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [isRestaurantOpen, setIsRestaurantOpen] = useState(true)

  const notifications = [
    { id: 1, title: 'طلب جديد #1234', time: 'منذ دقيقتين', unread: true, type: 'order' },
    { id: 2, title: 'تقييم جديد 5 نجوم', time: 'منذ 10 دقائق', unread: true, type: 'review' },
    { id: 3, title: 'نفاد مادة خام: الطماطم', time: 'منذ 30 دقيقة', unread: false, type: 'inventory' },
    { id: 4, title: 'تم إكمال طلب #1230', time: 'منذ ساعة', unread: false, type: 'order' }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  const quickStats = [
    { label: 'الطلبات اليوم', value: '45', icon: TrendingUp, color: 'text-green-600' },
    { label: 'الإيرادات', value: '2,340 ريال', icon: DollarSign, color: 'text-blue-600' },
    { label: 'متوسط التحضير', value: '12 دقيقة', icon: Clock, color: 'text-orange-600' }
  ]

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return '🛍️'
      case 'review': return '⭐'
      case 'inventory': return '📦'
      default: return '🔔'
    }
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div>
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">مرحباً بك في لوحة إدارة المطعم</p>
            </div>

            {/* Restaurant Status Toggle */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setIsRestaurantOpen(!isRestaurantOpen)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isRestaurantOpen 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {isRestaurantOpen ? (
                  <>
                    <Power className="w-4 h-4 ml-2" />
                    مفتوح
                  </>
                ) : (
                  <>
                    <PowerOff className="w-4 h-4 ml-2" />
                    مغلق
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="البحث في الطلبات والأصناف..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -left-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-medium text-gray-900">الإشعارات</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          notification.unread ? 'bg-green-50' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <span className="text-lg ml-3">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <Link
                      to="/restaurant/notifications"
                      className="text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      عرض جميع الإشعارات
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 space-x-reverse p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">مطعم البيت الشامي</p>
                  <p className="text-xs text-gray-500">مدير المطعم</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {showProfile && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <Link
                      to="/restaurant/profile"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <User className="w-4 h-4 ml-2" />
                      الملف الشخصي
                    </Link>
                    <Link
                      to="/restaurant/settings"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <Settings className="w-4 h-4 ml-2" />
                      إعدادات المطعم
                    </Link>
                    <hr className="my-2" />
                    <button className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      <LogOut className="w-4 h-4 ml-2" />
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6 space-x-reverse">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-center space-x-2 space-x-reverse">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-sm text-gray-600">{stat.label}:</span>
                  <span className="text-sm font-medium text-gray-900">{stat.value}</span>
                </div>
              )
            })}
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse text-sm">
            <div className={`flex items-center ${isRestaurantOpen ? 'text-green-600' : 'text-red-600'}`}>
              {isRestaurantOpen ? (
                <>
                  <CheckCircle className="w-4 h-4 ml-1" />
                  المطعم مفتوح
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 ml-1" />
                  المطعم مغلق
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default RestaurantHeader

