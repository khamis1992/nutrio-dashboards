import { useState } from 'react'
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
  Timer
} from 'lucide-react'

const RestaurantDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // إحصائيات رئيسية
  const mainStats = [
    {
      title: 'الطلبات اليوم',
      value: '45',
      change: '+18%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'green'
    },
    {
      title: 'الطلبات المعلقة',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'الإيرادات اليوم',
      value: '2,340 ريال',
      change: '+25%',
      trend: 'up',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'الطلبات المكتملة',
      value: '37',
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    }
  ]

  // إحصائيات إضافية
  const additionalStats = [
    {
      title: 'متوسط وقت التحضير',
      value: '12 دقيقة',
      change: '-2 دقيقة',
      trend: 'up',
      icon: Timer,
      color: 'purple'
    },
    {
      title: 'تقييم المطعم',
      value: '4.8',
      change: '+0.2',
      trend: 'up',
      icon: Star,
      color: 'yellow'
    },
    {
      title: 'العملاء الجدد',
      value: '12',
      change: '+5',
      trend: 'up',
      icon: Users,
      color: 'indigo'
    },
    {
      title: 'الأصناف المتوفرة',
      value: '85',
      change: '-3',
      trend: 'down',
      icon: Package,
      color: 'gray'
    }
  ]

  // الطلبات الأخيرة
  const recentOrders = [
    { 
      id: '#1234', 
      customer: 'أحمد محمد', 
      phone: '0501234567',
      items: 'شاورما دجاج، كولا، بطاطس',
      amount: '45 ريال', 
      status: 'قيد التحضير', 
      time: 'منذ 5 دقائق',
      address: 'حي النخيل، الرياض'
    },
    { 
      id: '#1235', 
      customer: 'فاطمة علي', 
      phone: '0507654321',
      items: 'برجر لحم، عصير برتقال',
      amount: '35 ريال', 
      status: 'جديد', 
      time: 'منذ 8 دقائق',
      address: 'حي الملز، الرياض'
    },
    { 
      id: '#1236', 
      customer: 'محمد عبدالله', 
      phone: '0551234567',
      items: 'بيتزا مارجريتا، سلطة',
      amount: '65 ريال', 
      status: 'جاهز للتوصيل', 
      time: 'منذ 12 دقيقة',
      address: 'حي العليا، الرياض'
    },
    { 
      id: '#1237', 
      customer: 'سارة أحمد', 
      phone: '0509876543',
      items: 'مندي لحم، شوربة',
      amount: '85 ريال', 
      status: 'مكتمل', 
      time: 'منذ 20 دقيقة',
      address: 'حي الورود، الرياض'
    }
  ]

  // الأصناف الأكثر طلباً
  const topItems = [
    { name: 'شاورما دجاج', orders: 15, revenue: '450 ريال', trend: 'up' },
    { name: 'برجر لحم', orders: 12, revenue: '420 ريال', trend: 'up' },
    { name: 'بيتزا مارجريتا', orders: 8, revenue: '520 ريال', trend: 'down' },
    { name: 'مندي لحم', orders: 6, revenue: '510 ريال', trend: 'up' }
  ]

  // تنبيهات المخزون
  const inventoryAlerts = [
    { item: 'الطماطم', level: 'منخفض', quantity: '2 كيلو', status: 'warning' },
    { item: 'الخس', level: 'نفد', quantity: '0 كيلو', status: 'danger' },
    { item: 'الجبن', level: 'منخفض', quantity: '1.5 كيلو', status: 'warning' },
    { item: 'الدجاج', level: 'جيد', quantity: '15 كيلو', status: 'good' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل': return 'text-green-600 bg-green-100'
      case 'جاهز للتوصيل': return 'text-blue-600 bg-blue-100'
      case 'قيد التحضير': return 'text-orange-600 bg-orange-100'
      case 'جديد': return 'text-purple-600 bg-purple-100'
      case 'ملغي': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
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
        
        <main className="flex-1 p-6">
          {/* الإحصائيات الرئيسية */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">الإحصائيات الرئيسية</h2>
              <button className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
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

          {/* الإحصائيات الإضافية */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">إحصائيات إضافية</h2>
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
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
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
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <span className="font-medium text-gray-900">{order.id}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex space-x-2 space-x-reverse">
                          <button className="p-1 text-gray-400 hover:text-blue-600">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
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
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{order.amount}</span>
                            <span className="text-xs text-gray-500">{order.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm">
                    عرض جميع الطلبات
                  </button>
                </div>
              </div>
            </div>

            {/* الأصناف الأكثر طلباً */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">الأصناف الأكثر طلباً</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-600">{item.orders} طلب</p>
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* تنبيهات المخزون والإجراءات السريعة */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* تنبيهات المخزون */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">تنبيهات المخزون</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {inventoryAlerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.status)}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{alert.item}</p>
                          <p className="text-sm">{alert.quantity}</p>
                        </div>
                        <div className="flex items-center">
                          {alert.status === 'danger' && <AlertTriangle className="w-4 h-4" />}
                          {alert.status === 'warning' && <AlertTriangle className="w-4 h-4" />}
                          {alert.status === 'good' && <CheckCircle className="w-4 h-4" />}
                          <span className="text-sm font-medium mr-2">{alert.level}</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <Plus className="w-8 h-8 text-green-600 mb-2" />
                    <span className="text-sm font-medium text-green-600">إضافة صنف جديد</span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <ShoppingBag className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="text-sm font-medium text-blue-600">إدارة الطلبات</span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <Package className="w-8 h-8 text-purple-600 mb-2" />
                    <span className="text-sm font-medium text-purple-600">إدارة المخزون</span>
                  </button>
                  <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                    <Star className="w-8 h-8 text-orange-600 mb-2" />
                    <span className="text-sm font-medium text-orange-600">التقييمات</span>
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

