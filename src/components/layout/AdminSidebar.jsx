import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Users, 
  Building2, 
  Dumbbell, 
  Truck, 
  Settings, 
  BarChart3, 
  Shield, 
  CreditCard, 
  Bell, 
  FileText, 
  Database,
  UserCheck,
  MapPin,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Home
} from 'lucide-react'

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState({})

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }))
  }

  const menuItems = [
    {
      key: 'dashboard',
      title: 'لوحة التحكم',
      icon: Home,
      path: '/admin',
      exact: true
    },
    {
      key: 'users',
      title: 'إدارة المستخدمين',
      icon: Users,
      submenu: [
        { title: 'جميع المستخدمين', path: '/admin/users' },
        { title: 'إضافة مستخدم', path: '/admin/users/add' },
        { title: 'الأدوار والصلاحيات', path: '/admin/users/roles' },
        { title: 'المستخدمين المحظورين', path: '/admin/users/blocked' }
      ]
    },
    {
      key: 'restaurants',
      title: 'إدارة المطاعم',
      icon: Building2,
      submenu: [
        { title: 'جميع المطاعم', path: '/admin/restaurants' },
        { title: 'إضافة مطعم', path: '/admin/restaurants/add' },
        { title: 'طلبات الانضمام', path: '/admin/restaurants/requests' },
        { title: 'تقييمات المطاعم', path: '/admin/restaurants/reviews' }
      ]
    },
    {
      key: 'gyms',
      title: 'إدارة صالات الجيم',
      icon: Dumbbell,
      submenu: [
        { title: 'جميع الصالات', path: '/admin/gyms' },
        { title: 'إضافة صالة', path: '/admin/gyms/add' },
        { title: 'طلبات الانضمام', path: '/admin/gyms/requests' },
        { title: 'المدربين', path: '/admin/gyms/trainers' }
      ]
    },
    {
      key: 'drivers',
      title: 'إدارة السائقين',
      icon: Truck,
      submenu: [
        { title: 'جميع السائقين', path: '/admin/drivers' },
        { title: 'إضافة سائق', path: '/admin/drivers/add' },
        { title: 'طلبات التوظيف', path: '/admin/drivers/applications' },
        { title: 'تتبع المواقع', path: '/admin/drivers/tracking' }
      ]
    },
    {
      key: 'orders',
      title: 'إدارة الطلبات',
      icon: FileText,
      submenu: [
        { title: 'جميع الطلبات', path: '/admin/orders' },
        { title: 'الطلبات النشطة', path: '/admin/orders/active' },
        { title: 'الطلبات المكتملة', path: '/admin/orders/completed' },
        { title: 'الطلبات الملغية', path: '/admin/orders/cancelled' }
      ]
    },
    {
      key: 'payments',
      title: 'إدارة المدفوعات',
      icon: CreditCard,
      submenu: [
        { title: 'جميع المعاملات', path: '/admin/payments' },
        { title: 'المدفوعات المعلقة', path: '/admin/payments/pending' },
        { title: 'المبالغ المستردة', path: '/admin/payments/refunds' },
        { title: 'تقارير مالية', path: '/admin/payments/reports' }
      ]
    },
    {
      key: 'analytics',
      title: 'التقارير والإحصائيات',
      icon: BarChart3,
      submenu: [
        { title: 'تقرير شامل', path: '/admin/analytics' },
        { title: 'إحصائيات المبيعات', path: '/admin/analytics/sales' },
        { title: 'تحليل المستخدمين', path: '/admin/analytics/users' },
        { title: 'أداء المطاعم', path: '/admin/analytics/restaurants' }
      ]
    },
    {
      key: 'notifications',
      title: 'إدارة الإشعارات',
      icon: Bell,
      submenu: [
        { title: 'إرسال إشعار', path: '/admin/notifications/send' },
        { title: 'الإشعارات المرسلة', path: '/admin/notifications/sent' },
        { title: 'قوالب الإشعارات', path: '/admin/notifications/templates' }
      ]
    },
    {
      key: 'support',
      title: 'الدعم الفني',
      icon: MessageSquare,
      submenu: [
        { title: 'التذاكر المفتوحة', path: '/admin/support/tickets' },
        { title: 'الأسئلة الشائعة', path: '/admin/support/faq' },
        { title: 'تقييمات الدعم', path: '/admin/support/reviews' }
      ]
    },
    {
      key: 'system',
      title: 'إعدادات النظام',
      icon: Settings,
      submenu: [
        { title: 'الإعدادات العامة', path: '/admin/system/general' },
        { title: 'إعدادات الأمان', path: '/admin/system/security' },
        { title: 'النسخ الاحتياطي', path: '/admin/system/backup' },
        { title: 'سجل النشاطات', path: '/admin/system/logs' }
      ]
    }
  ]

  const isActiveMenu = (item) => {
    if (item.exact) {
      return location.pathname === item.path
    }
    if (item.submenu) {
      return item.submenu.some(subItem => location.pathname === subItem.path)
    }
    return location.pathname === item.path
  }

  const isActiveSubMenu = (path) => {
    return location.pathname === path
  }

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen border-r border-gray-200`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="text-lg font-bold text-blue-600">لوحة الإدارة</h2>
              <p className="text-sm text-gray-500">إدارة النظام</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`} />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = isActiveMenu(item)
          const isExpanded = expandedMenus[item.key]

          return (
            <div key={item.key} className="mb-1">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.key)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon className="w-5 h-5 ml-3" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>
                  
                  {!isCollapsed && isExpanded && (
                    <div className="mr-8 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={`block p-2 rounded-lg text-sm transition-colors ${
                            isActiveSubMenu(subItem.path)
                              ? 'bg-blue-100 text-blue-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 ml-3" />
                  {!isCollapsed && <span className="font-medium">{item.title}</span>}
                </Link>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

export default AdminSidebar

