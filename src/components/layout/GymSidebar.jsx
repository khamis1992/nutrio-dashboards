import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home,
  Dumbbell, 
  Users, 
  Calendar, 
  CreditCard, 
  UserCheck, 
  BarChart3, 
  Settings, 
  Bell, 
  FileText, 
  Package,
  Clock,
  Trophy,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Target,
  Activity,
  Heart,
  Zap
} from 'lucide-react'

const GymSidebar = ({ isCollapsed, setIsCollapsed }) => {
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
      path: '/gym',
      exact: true
    },
    {
      key: 'members',
      title: 'إدارة الأعضاء',
      icon: Users,
      path: '/gym/members',
      submenu: [
        { title: 'جميع الأعضاء', path: '/gym/members' },
        { title: 'إضافة عضو جديد', path: '/gym/members/add' },
        { title: 'الأعضاء النشطين', path: '/gym/members/active' },
        { title: 'الأعضاء المنتهية اشتراكاتهم', path: '/gym/members/expired' },
        { title: 'طلبات العضوية', path: '/gym/members/requests' },
        { title: 'الأعضاء المجمدين', path: '/gym/members/frozen' }
      ]
    },
    {
      key: 'classes',
      title: 'إدارة الحصص',
      icon: Dumbbell,
      path: '/gym/classes',
      submenu: [
        { title: 'جميع الحصص', path: '/gym/classes' },
        { title: 'إضافة حصة جديدة', path: '/gym/classes/add' },
        { title: 'الحصص النشطة', path: '/gym/classes/active' },
        { title: 'جدول الحصص', path: '/gym/classes/schedule' },
        { title: 'الحصص الخاصة', path: '/gym/classes/private' },
        { title: 'الحصص الجماعية', path: '/gym/classes/group' }
      ]
    },
    {
      key: 'trainers',
      title: 'إدارة المدربين',
      icon: UserCheck,
      submenu: [
        { title: 'جميع المدربين', path: '/gym/trainers' },
        { title: 'إضافة مدرب جديد', path: '/gym/trainers/add' },
        { title: 'المدربين النشطين', path: '/gym/trainers/active' },
        { title: 'تقييمات المدربين', path: '/gym/trainers/reviews' },
        { title: 'جداول المدربين', path: '/gym/trainers/schedules' },
        { title: 'عمولات المدربين', path: '/gym/trainers/commissions' }
      ]
    },
    {
      key: 'subscriptions',
      title: 'إدارة الاشتراكات',
      icon: CreditCard,
      submenu: [
        { title: 'جميع الاشتراكات', path: '/gym/subscriptions' },
        { title: 'الاشتراكات النشطة', path: '/gym/subscriptions/active' },
        { title: 'الاشتراكات المنتهية', path: '/gym/subscriptions/expired' },
        { title: 'خطط الاشتراك', path: '/gym/subscriptions/plans' },
        { title: 'تجديد الاشتراكات', path: '/gym/subscriptions/renewals' },
        { title: 'العروض والخصومات', path: '/gym/subscriptions/offers' }
      ]
    },
    {
      key: 'equipment',
      title: 'إدارة المعدات',
      icon: Package,
      submenu: [
        { title: 'جميع المعدات', path: '/gym/equipment' },
        { title: 'إضافة معدة جديدة', path: '/gym/equipment/add' },
        { title: 'المعدات المتاحة', path: '/gym/equipment/available' },
        { title: 'المعدات قيد الصيانة', path: '/gym/equipment/maintenance' },
        { title: 'جدولة الصيانة', path: '/gym/equipment/schedule' },
        { title: 'تقارير الأعطال', path: '/gym/equipment/reports' }
      ]
    },
    {
      key: 'attendance',
      title: 'الحضور والانصراف',
      icon: Clock,
      submenu: [
        { title: 'سجل الحضور اليومي', path: '/gym/attendance/daily' },
        { title: 'إحصائيات الحضور', path: '/gym/attendance/stats' },
        { title: 'تقارير الحضور', path: '/gym/attendance/reports' },
        { title: 'أوقات الذروة', path: '/gym/attendance/peak' }
      ]
    },
    {
      key: 'nutrition',
      title: 'التغذية والمكملات',
      icon: Heart,
      submenu: [
        { title: 'خطط التغذية', path: '/gym/nutrition/plans' },
        { title: 'المكملات الغذائية', path: '/gym/nutrition/supplements' },
        { title: 'استشارات التغذية', path: '/gym/nutrition/consultations' },
        { title: 'متابعة الوزن', path: '/gym/nutrition/weight-tracking' }
      ]
    },
    {
      key: 'challenges',
      title: 'التحديات والمسابقات',
      icon: Trophy,
      submenu: [
        { title: 'التحديات النشطة', path: '/gym/challenges/active' },
        { title: 'إنشاء تحدي جديد', path: '/gym/challenges/create' },
        { title: 'المسابقات', path: '/gym/challenges/competitions' },
        { title: 'الجوائز والمكافآت', path: '/gym/challenges/rewards' }
      ]
    },
    {
      key: 'analytics',
      title: 'التقارير والإحصائيات',
      icon: BarChart3,
      submenu: [
        { title: 'تقرير الإيرادات', path: '/gym/analytics/revenue' },
        { title: 'إحصائيات الأعضاء', path: '/gym/analytics/members' },
        { title: 'أداء المدربين', path: '/gym/analytics/trainers' },
        { title: 'استخدام المعدات', path: '/gym/analytics/equipment' },
        { title: 'تحليل الحضور', path: '/gym/analytics/attendance' }
      ]
    },
    {
      key: 'payments',
      title: 'إدارة المدفوعات',
      icon: CreditCard,
      submenu: [
        { title: 'جميع المعاملات', path: '/gym/payments' },
        { title: 'المدفوعات المعلقة', path: '/gym/payments/pending' },
        { title: 'المبالغ المستردة', path: '/gym/payments/refunds' },
        { title: 'طرق الدفع', path: '/gym/payments/methods' }
      ]
    },
    {
      key: 'notifications',
      title: 'الإشعارات',
      icon: Bell,
      submenu: [
        { title: 'إرسال إشعار', path: '/gym/notifications/send' },
        { title: 'الإشعارات المرسلة', path: '/gym/notifications/sent' },
        { title: 'قوالب الإشعارات', path: '/gym/notifications/templates' },
        { title: 'تذكيرات الاشتراك', path: '/gym/notifications/reminders' }
      ]
    },
    {
      key: 'settings',
      title: 'إعدادات الصالة',
      icon: Settings,
      submenu: [
        { title: 'معلومات الصالة', path: '/gym/settings/info' },
        { title: 'ساعات العمل', path: '/gym/settings/hours' },
        { title: 'إعدادات العضوية', path: '/gym/settings/membership' },
        { title: 'إعدادات الدفع', path: '/gym/settings/payment' },
        { title: 'إعدادات الإشعارات', path: '/gym/settings/notifications' }
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
              <h2 className="text-lg font-bold text-purple-600">لوحة الصالة</h2>
              <p className="text-sm text-gray-500">إدارة صالات الجيم</p>
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
                        ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600' 
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
                              ? 'bg-purple-100 text-purple-600 font-medium'
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
                      ? 'bg-purple-50 text-purple-600 border-r-2 border-purple-600' 
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

export default GymSidebar

