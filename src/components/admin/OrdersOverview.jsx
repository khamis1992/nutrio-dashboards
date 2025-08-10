import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  ShoppingBag,
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  MapPin, 
  Phone, 
  Mail, 
  Star, 
  TrendingUp, 
  TrendingDown,
  Users,
  Navigation,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreVertical,
  Download,
  RefreshCw,
  Car,
  Activity,
  Truck,
  Calendar,
  Package,
  Building2,
  Dumbbell,
  ArrowRight,
  Timer,
  XCircle
} from 'lucide-react'

const OrdersOverview = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [loading, setLoading] = useState(false)

  // بيانات تجريبية للطلبات
  const [orders, setOrders] = useState([
    {
      id: 'ORD-2024-001',
      customerName: 'أحمد محمد السالم',
      customerPhone: '+966501234567',
      type: 'restaurant',
      businessName: 'مطعم الذواقة',
      businessId: 1,
      status: 'preparing',
      priority: 'high',
      items: [
        { name: 'برجر لحم', quantity: 2, price: 45 },
        { name: 'بطاطس مقلية', quantity: 1, price: 15 },
        { name: 'مشروب غازي', quantity: 2, price: 10 }
      ],
      totalAmount: 115,
      deliveryFee: 15,
      finalAmount: 130,
      orderTime: '2024-01-15 14:30',
      estimatedDelivery: '2024-01-15 15:15',
      deliveryAddress: 'حي النرجس، الرياض',
      paymentMethod: 'credit_card',
      paymentStatus: 'paid',
      driverName: 'محمد أحمد السالم',
      driverId: 1,
      rating: null,
      notes: 'بدون بصل في البرجر',
      timeline: [
        { status: 'placed', time: '14:30', description: 'تم استلام الطلب' },
        { status: 'confirmed', time: '14:32', description: 'تم تأكيد الطلب' },
        { status: 'preparing', time: '14:35', description: 'جاري تحضير الطلب' }
      ]
    },
    {
      id: 'ORD-2024-002',
      customerName: 'فاطمة علي الأحمد',
      customerPhone: '+966509876543',
      type: 'restaurant',
      businessName: 'برجر هاوس',
      businessId: 2,
      status: 'out_for_delivery',
      priority: 'medium',
      items: [
        { name: 'شاورما دجاج', quantity: 1, price: 25 },
        { name: 'سلطة فتوش', quantity: 1, price: 20 }
      ],
      totalAmount: 45,
      deliveryFee: 12,
      finalAmount: 57,
      orderTime: '2024-01-15 13:45',
      estimatedDelivery: '2024-01-15 14:30',
      deliveryAddress: 'شارع التحلية، جدة',
      paymentMethod: 'cash',
      paymentStatus: 'pending',
      driverName: 'عبدالله خالد الرشيد',
      driverId: 2,
      rating: null,
      notes: '',
      timeline: [
        { status: 'placed', time: '13:45', description: 'تم استلام الطلب' },
        { status: 'confirmed', time: '13:47', description: 'تم تأكيد الطلب' },
        { status: 'preparing', time: '13:50', description: 'جاري تحضير الطلب' },
        { status: 'ready', time: '14:10', description: 'الطلب جاهز للتوصيل' },
        { status: 'out_for_delivery', time: '14:15', description: 'الطلب في الطريق' }
      ]
    },
    {
      id: 'GYM-2024-001',
      customerName: 'سارة محمد الرشيد',
      customerPhone: '+966512345678',
      type: 'gym',
      businessName: 'نادي الأبطال الرياضي',
      businessId: 1,
      status: 'completed',
      priority: 'low',
      items: [
        { name: 'اشتراك شهري - نساء', quantity: 1, price: 200 }
      ],
      totalAmount: 200,
      deliveryFee: 0,
      finalAmount: 200,
      orderTime: '2024-01-15 10:20',
      estimatedDelivery: null,
      deliveryAddress: null,
      paymentMethod: 'bank_transfer',
      paymentStatus: 'paid',
      driverName: null,
      driverId: null,
      rating: 5,
      notes: 'اشتراك للمنطقة النسائية',
      timeline: [
        { status: 'placed', time: '10:20', description: 'تم استلام الطلب' },
        { status: 'confirmed', time: '10:22', description: 'تم تأكيد الطلب' },
        { status: 'completed', time: '10:25', description: 'تم تفعيل الاشتراك' }
      ]
    },
    {
      id: 'ORD-2024-003',
      customerName: 'خالد سعد القحطاني',
      customerPhone: '+966555123456',
      type: 'restaurant',
      businessName: 'مطعم البحر الأبيض',
      businessId: 3,
      status: 'cancelled',
      priority: 'medium',
      items: [
        { name: 'سمك مشوي', quantity: 1, price: 65 },
        { name: 'أرز بريانى', quantity: 1, price: 30 }
      ],
      totalAmount: 95,
      deliveryFee: 18,
      finalAmount: 113,
      orderTime: '2024-01-15 12:15',
      estimatedDelivery: '2024-01-15 13:00',
      deliveryAddress: 'كورنيش الدمام',
      paymentMethod: 'credit_card',
      paymentStatus: 'refunded',
      driverName: null,
      driverId: null,
      rating: null,
      notes: 'العميل غير متواجد',
      timeline: [
        { status: 'placed', time: '12:15', description: 'تم استلام الطلب' },
        { status: 'confirmed', time: '12:17', description: 'تم تأكيد الطلب' },
        { status: 'preparing', time: '12:20', description: 'جاري تحضير الطلب' },
        { status: 'cancelled', time: '12:35', description: 'تم إلغاء الطلب - العميل غير متواجد' }
      ]
    }
  ])

  const [stats, setStats] = useState({
    totalOrders: 4,
    activeOrders: 2,
    completedOrders: 1,
    cancelledOrders: 1,
    totalRevenue: 500,
    avgDeliveryTime: 35,
    customerSatisfaction: 4.2,
    restaurantOrders: 3,
    gymOrders: 1
  })

  // تصفية الطلبات
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerPhone.includes(searchTerm)
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    const matchesType = filterType === 'all' || order.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'placed': return 'bg-blue-100 text-blue-800'
      case 'confirmed': return 'bg-yellow-100 text-yellow-800'
      case 'preparing': return 'bg-orange-100 text-orange-800'
      case 'ready': return 'bg-purple-100 text-purple-800'
      case 'out_for_delivery': return 'bg-indigo-100 text-indigo-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'placed': return 'مُستلم'
      case 'confirmed': return 'مؤكد'
      case 'preparing': return 'قيد التحضير'
      case 'ready': return 'جاهز'
      case 'out_for_delivery': return 'في الطريق'
      case 'completed': return 'مكتمل'
      case 'cancelled': return 'ملغى'
      default: return 'غير محدد'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high': return 'عالية'
      case 'medium': return 'متوسطة'
      case 'low': return 'منخفضة'
      default: return 'غير محدد'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'restaurant': return <Building2 className="h-4 w-4 text-blue-500" />
      case 'gym': return <Dumbbell className="h-4 w-4 text-purple-500" />
      default: return <Package className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeText = (type) => {
    switch (type) {
      case 'restaurant': return 'مطعم'
      case 'gym': return 'صالة جيم'
      default: return 'غير محدد'
    }
  }

  const refreshData = async () => {
    setLoading(true)
    // محاكاة تحديث البيانات
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const formatTime = (timeString) => {
    const time = new Date(`2024-01-15T${timeString}`)
    return time.toLocaleTimeString('ar-SA', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          {/* العنوان والإحصائيات */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الطلبات العامة</h1>
                <p className="text-gray-600">مراقبة وإدارة جميع الطلبات في الوقت الفعلي</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={refreshData}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  تحديث
                </button>
                
                <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-2" />
                  تصدير
                </button>
                
                <Link 
                  to="/admin/orders/tracking"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  تتبع الطلبات
                </Link>
              </div>
            </div>

            {/* بطاقات الإحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <ShoppingBag className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي الطلبات</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">الطلبات النشطة</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">الطلبات المكتملة</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue} ر.س</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* فلاتر البحث */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* البحث */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن رقم طلب، عميل، مطعم..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* فلتر الحالة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="placed">مُستلم</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="preparing">قيد التحضير</option>
                  <option value="ready">جاهز</option>
                  <option value="out_for_delivery">في الطريق</option>
                  <option value="completed">مكتمل</option>
                  <option value="cancelled">ملغى</option>
                </select>
              </div>

              {/* فلتر النوع */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع الأنواع</option>
                  <option value="restaurant">مطاعم</option>
                  <option value="gym">صالات جيم</option>
                </select>
              </div>
            </div>
          </div>

          {/* جدول الطلبات */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                قائمة الطلبات ({filteredOrders.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم الطلب
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العميل
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المتجر
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الأولوية
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المبلغ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      السائق
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الوقت
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTime(order.orderTime.split(' ')[1])}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customerName}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          {order.customerPhone}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getTypeIcon(order.type)}
                          <div className="mr-2">
                            <div className="text-sm font-medium text-gray-900">
                              {order.businessName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {getTypeText(order.type)}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(order.priority)}`}>
                          {getPriorityText(order.priority)}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.finalAmount} ر.س
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.paymentMethod === 'cash' ? 'نقدي' : 
                           order.paymentMethod === 'credit_card' ? 'بطاقة ائتمان' : 'تحويل بنكي'}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {order.driverName ? (
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.driverName}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Truck className="h-3 w-3 mr-1" />
                              متاح
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">لا يوجد</span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatTime(order.orderTime.split(' ')[1])}
                        </div>
                        {order.estimatedDelivery && (
                          <div className="text-xs text-gray-500">
                            متوقع: {formatTime(order.estimatedDelivery.split(' ')[1])}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/orders/${order.id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="عرض التفاصيل"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          
                          {order.driverName && (
                            <Link
                              to={`/admin/orders/${order.id}/tracking`}
                              className="text-green-600 hover:text-green-900"
                              title="تتبع"
                            >
                              <Navigation className="h-4 w-4" />
                            </Link>
                          )}
                          
                          <button
                            className="text-orange-600 hover:text-orange-900"
                            title="تعديل"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          
                          {order.status !== 'completed' && order.status !== 'cancelled' && (
                            <button
                              className="text-red-600 hover:text-red-900"
                              title="إلغاء"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          )}
                          
                          <button
                            className="text-gray-600 hover:text-gray-900"
                            title="المزيد"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد طلبات</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'لا توجد نتائج للبحث الحالي' : 'لا توجد طلبات حالياً'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default OrdersOverview