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
  Globe,
  Moon,
  Sun
} from 'lucide-react'

const AdminHeader = ({ title, onMenuToggle }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const notifications = [
    { id: 1, title: 'طلب انضمام مطعم جديد', time: 'منذ 5 دقائق', unread: true },
    { id: 2, title: 'تم إكمال طلب توصيل #1234', time: 'منذ 15 دقيقة', unread: true },
    { id: 3, title: 'مراجعة جديدة لصالة الجيم', time: 'منذ ساعة', unread: false }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
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
            <p className="text-sm text-gray-500">مرحباً بك في لوحة إدارة النظام</p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="البحث في النظام..."
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {/* Language Toggle */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Globe className="w-5 h-5 text-gray-600" />
          </button>

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

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
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <Link
                    to="/admin/notifications"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
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
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">أحمد محمد</p>
                <p className="text-xs text-gray-500">مدير النظام</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {showProfile && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-2">
                  <Link
                    to="/admin/profile"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <User className="w-4 h-4 ml-2" />
                    الملف الشخصي
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Settings className="w-4 h-4 ml-2" />
                    الإعدادات
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
    </header>
  )
}

export default AdminHeader

