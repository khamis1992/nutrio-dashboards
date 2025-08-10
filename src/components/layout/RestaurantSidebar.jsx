import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home,
  ShoppingBag, 
  UtensilsCrossed, 
  Clock, 
  Users, 
  Star, 
  BarChart3, 
  Settings, 
  CreditCard, 
  Bell, 
  FileText, 
  Package,
  Truck,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Eye,
  TrendingUp,
  MapPin
} from 'lucide-react'

const RestaurantSidebar = ({ isCollapsed, setIsCollapsed }) => {
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
      path: '/restaurant',
      exact: true
    },
    {
      key: 'orders',
      title: 'إدارة الطلبات',
      icon: ShoppingBag,
      submenu: [
        { title: 'جميع الطلبات', path: '/restaurant/orders' },
        { title: 'الطلبات الجديدة', path: '/restaurant/orders/new' },
        { title: 'قيد التحضير', path: '/restaurant/orders/preparing' },
        { title: 'جاهز للتوصيل', path: '/restaurant/orders/ready' },
        { title: 'الطلبات المكتملة', path: '/restaurant/orders/completed' },
        { title: 'الطلبات الملغية', path: '/restaurant/orders/cancelled' }
      ]
    },
    {
      key: 'menu',
      title: 'إدارة القائمة',
      icon: UtensilsCrossed,
      submenu: [
        { title: 'جميع الأصناف', path: '/restaurant/menu' },
        { title: 'إضافة صنف جديد', path: '/restaurant/menu/add' },
        { title: 'الفئات', path: '/restaurant/menu/categories' },
        { title: 'الأصناف المتوفرة', path: '/restaurant/menu/available' },
        { title: 'الأصناف غير المتوفرة', path: '/restaurant/menu/unavailable' },
        { title: 'العروض الخاصة', path: '/restaurant/menu/offers' }
      ]
    },
    {
      key: 'delivery',
      title: 'إدارة التوصيل',
      icon: Truck,
      submenu: [
        { title: 'السائقين المتاحين', path: '/restaurant/delivery/drivers' },
        { title: 'طلبات التوصيل النشطة', path: '/restaurant/delivery/active' },
        { title: 'تتبع الطلبات', path: '/restaurant/delivery/tracking' },
        { title: 'مناطق التوصيل', path: '/restaurant/delivery/areas' },
        { title: 'أسعار التوصيل', path: '/restaurant/delivery/pricing' }
      ]
    },
    {
      key: 'customers',
      title: 'إدارة العملاء',
      icon: Users,
      submenu: [
        { title: 'جميع العملاء', path: '/restaurant/customers' },
        { title: 'العملاء المميزين', path: '/restaurant/customers/vip' },
        { title: 'تقييمات العملاء', path: '/restaurant/customers/reviews' },
        { title: 'شكاوى العملاء', path: '/restaurant/customers/complaints' },
        { title: 'برنامج الولاء', path: '/restaurant/customers/loyalty' }
      ]
    },
    {
      key: 'inventory',
      title: 'إدارة المخزون',
      icon: Package,
      submenu: [
        { title: 'المواد الخام', path: '/restaurant/inventory' },
        { title: 'إضافة مادة خام', path: '/restaurant/inventory/add' },
        { title: 'تنبيهات النفاد', path: '/restaurant/inventory/alerts' },
        { title: 'طلبات الشراء', path: '/restaurant/inventory/purchase' },
        { title: 'الموردين', path: '/restaurant/inventory/suppliers' }
      ]
    },
    {
      key: 'staff',
      title: 'إدارة الموظفين',
      icon: Users,
      submenu: [
        { title: 'جميع الموظفين', path: '/restaurant/staff' },
        { title: 'إضافة موظف', path: '/restaurant/staff/add' },
        { title: 'المناوبات', path: '/restaurant/staff/shifts' },
        { title: 'الحضور والانصراف', path: '/restaurant/staff/attendance' },
        { title: 'الرواتب', path: '/restaurant/staff/payroll' }
      ]
    },
    {
      key: 'analytics',
      title: 'التقارير والإحصائيات',
      icon: BarChart3,
      submenu: [
        { title: 'تقرير المبيعات', path: '/restaurant/analytics/sales' },
        { title: 'أداء الأصناف', path: '/restaurant/analytics/items' },
        { title: 'تحليل العملاء', path: '/restaurant/analytics/customers' },
        { title: 'تقرير الأرباح', path: '/restaurant/analytics/profits' },
        { title: 'إحصائيات التوصيل', path: '/restaurant/analytics/delivery' }
      ]
    },
    {
      key: 'payments',
      title: 'إدارة المدفوعات',
      icon: CreditCard,
      submenu: [
        { title: 'جميع المعاملات', path: '/restaurant/payments' },
        { title: 'المدفوعات المعلقة', path: '/restaurant/payments/pending' },
        { title: 'المبالغ المستردة', path: '/restaurant/payments/refunds' },
        { title: 'طرق الدفع', path: '/restaurant/payments/methods' }
      ]
    },
    {
      key: 'promotions',
      title: 'العروض والخصومات',
      icon: Star,
      submenu: [
        { title: 'العروض النشطة', path: '/restaurant/promotions/active' },
        { title: 'إنشاء عرض جديد', path: '/restaurant/promotions/create' },
        { title: 'كوبونات الخصم', path: '/restaurant/promotions/coupons' },
        { title: 'عروض الوقت المحدود', path: '/restaurant/promotions/limited' }
      ]
    },
    {
      key: 'notifications',
      title: 'الإشعارات',
      icon: Bell,
      submenu: [
        { title: 'إرسال إشعار', path: '/restaurant/notifications/send' },
        { title: 'الإشعارات المرسلة', path: '/restaurant/notifications/sent' },
        { title: 'قوالب الإشعارات', path: '/restaurant/notifications/templates' }
      ]
    },
    {
      key: 'settings',
      title: 'إعدادات المطعم',
      icon: Settings,
      submenu: [
        { title: 'معلومات المطعم', path: '/restaurant/settings/info' },
        { title: 'ساعات العمل', path: '/restaurant/settings/hours' },
        { title: 'إعدادات التوصيل', path: '/restaurant/settings/delivery' },
        { title: 'إعدادات الدفع', path: '/restaurant/settings/payment' },
        { title: 'إعدادات الإشعارات', path: '/restaurant/settings/notifications' }
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
              <h2 className="text-lg font-bold text-green-600">لوحة المطعم</h2>
              <p className="text-sm text-gray-500">إدارة المطاعم</p>
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
      <nav className="p-2 max-h-[calc(100vh-100px)] overflow-y-auto">
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
                        ? 'bg-green-50 text-green-600 border-r-2 border-green-600' 
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
                              ? 'bg-green-100 text-green-600 font-medium'
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
                      ? 'bg-green-50 text-green-600 border-r-2 border-green-600' 
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

export default RestaurantSidebar

