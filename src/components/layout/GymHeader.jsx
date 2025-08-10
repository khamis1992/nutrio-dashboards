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
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Power,
  PowerOff,
  Activity,
  Dumbbell
} from 'lucide-react'

const GymHeader = ({ title, onMenuToggle }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [isGymOpen, setIsGymOpen] = useState(true)

  const notifications = [
    { id: 1, title: 'انتهاء اشتراك العضو أحمد محمد', time: 'منذ 5 دقائق', unread: true, type: 'subscription' },
    { id: 2, title: 'حجز حصة جديدة - يوجا صباحية', time: 'منذ 15 دقيقة', unread: true, type: 'booking' },
    { id: 3, title: 'عطل في جهاز الجري رقم 5', time: 'منذ 30 دقيقة', unread: false, type: 'equipment' },
    { id: 4, title: 'تقييم جديد 5 نجوم للمدرب سالم', time: 'منذ ساعة', unread: false, type: 'review' }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  const quickStats = [
    { label: 'الأعضاء الحاضرين', value: '45', icon: Users, color: 'text-purple-600' },
    { label: 'الحصص اليوم', value: '12', icon: Dumbbell, color: 'text-blue-600' },
    { label: 'معدل الحضور', value: '78%', icon: TrendingUp, color: 'text-green-600' }
  ]

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'subscription': return '💳'
      case 'booking': return '📅'
      case 'equipment': return '🔧'
      case 'review': return '⭐'
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
              <p className="text-sm text-gray-500">مرحباً بك في لوحة إدارة صالة الجيم</p>
            </div>

            {/* Gym Status Toggle */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setIsGymOpen(!isGymOpen)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isGymOpen 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {isGymOpen ? (
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
                placeholder="البحث في الأعضاء والحصص..."
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                          notification.unread ? 'bg-purple-50' : ''
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
                      to="/gym/notifications"
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
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
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">صالة فيتنس بلس</p>
                  <p className="text-xs text-gray-500">مدير الصالة</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {showProfile && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-2">
                    <Link
                      to="/gym/profile"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <User className="w-4 h-4 ml-2" />
                      الملف الشخصي
                    </Link>
                    <Link
                      to="/gym/settings"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <Settings className="w-4 h-4 ml-2" />
                      إعدادات الصالة
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
          
          <div className="flex items-center space-x-4 space-x-reverse text-sm">
            <div className={`flex items-center ${isGymOpen ? 'text-green-600' : 'text-red-600'}`}>
              {isGymOpen ? (
                <>
                  <CheckCircle className="w-4 h-4 ml-1" />
                  الصالة مفتوحة
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 ml-1" />
                  الصالة مغلقة
                </>
              )}
            </div>
            
            <div className="flex items-center text-gray-600">
              <Activity className="w-4 h-4 ml-1" />
              <span>الساعة: {new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default GymHeader

