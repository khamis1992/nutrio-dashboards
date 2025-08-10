import { useState } from 'react'
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
  RefreshCw
} from 'lucide-react'

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // إحصائيات رئيسية
  const mainStats = [
    {
      title: 'إجمالي المستخدمين',
      value: '12,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'المطاعم النشطة',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: Building2,
      color: 'green'
    },
    {
      title: 'صالات الجيم',
      value: '89',
      change: '+15%',
      trend: 'up',
      icon: Dumbbell,
      color: 'purple'
    },
    {
      title: 'السائقين النشطين',
      value: '234',
      change: '-3%',
      trend: 'down',
      icon: Truck,
      color: 'orange'
    }
  ]

  // إحصائيات مالية
  const financialStats = [
    {
      title: 'الإيرادات الشهرية',
      value: '2,450,000 ريال',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'إجمالي الطلبات',
      value: '45,678',
      change: '+25%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'blue'
    },
    {
      title: 'متوسط وقت التوصيل',
      value: '28 دقيقة',
      change: '-5%',
      trend: 'up',
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'معدل الرضا',
      value: '94.5%',
      change: '+2%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    }
  ]

  // الطلبات الأخيرة
  const recentOrders = [
    { id: '#12345', customer: 'أحمد محمد', restaurant: 'مطعم البيت الشامي', amount: '85 ريال', status: 'مكتمل', time: 'منذ 5 دقائق' },
    { id: '#12346', customer: 'فاطمة علي', restaurant: 'مطعم الأصالة', amount: '120 ريال', status: 'قيد التوصيل', time: 'منذ 10 دقائق' },
    { id: '#12347', customer: 'محمد عبدالله', restaurant: 'مطعم الفردوس', amount: '95 ريال', status: 'قيد التحضير', time: 'منذ 15 دقيقة' },
    { id: '#12348', customer: 'سارة أحمد', restaurant: 'مطعم الزعفران', amount: '150 ريال', status: 'مكتمل', time: 'منذ 20 دقيقة' }
  ]

  // التنبيهات المهمة
  const alerts = [
    { type: 'warning', message: '5 طلبات انضمام مطاعم في انتظار المراجعة', action: 'مراجعة' },
    { type: 'error', message: 'مشكلة في خدمة الدفع - يتطلب تدخل فوري', action: 'حل المشكلة' },
    { type: 'info', message: '12 سائق جديد تم تسجيلهم اليوم', action: 'عرض' },
    { type: 'success', message: 'تم تحديث النظام بنجاح إلى الإصدار 2.1.0', action: 'تفاصيل' }
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
        
        <main className="flex-1 p-6">
          {/* التنبيهات المهمة */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">التنبيهات المهمة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {alerts.map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <button className="text-sm font-medium underline hover:no-underline">
                      {alert.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الإحصائيات الرئيسية */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">الإحصائيات الرئيسية</h2>
              <button className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <RefreshCw className="w-4 h-4 ml-2" />
                تحديث
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainStats.map((stat, index) => {
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
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* الإحصائيات المالية */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">الإحصائيات المالية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financialStats.map((stat, index) => {
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
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* الطلبات الأخيرة */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
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
                        <p className="text-sm text-gray-600">{order.customer} - {order.restaurant}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-gray-900">{order.amount}</span>
                          <span className="text-xs text-gray-500">{order.time}</span>
                        </div>
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
                    <span className="text-sm font-medium text-green-600">إضافة صالة جيم</span>
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
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard

