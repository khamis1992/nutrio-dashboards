import { useState, useEffect } from 'react'
import RestaurantSidebar from '../layout/RestaurantSidebar'
import RestaurantHeader from '../layout/RestaurantHeader'
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  RefreshCw,
  Search,
  Plus,
  Users,
  Phone,
  MapPin,
  Timer,
  DollarSign,
  Truck,
  Star,
  Calendar,
  MoreVertical,
  PrinterIcon,
  SendIcon,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Package,
  MessageSquare,
  Bell,
  Activity
} from 'lucide-react'

const RestaurantOrdersManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedTab, setSelectedTab] = useState('active') // active, pending, completed, cancelled
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrders, setSelectedOrders] = useState([])
  const [showOrderDetails, setShowOrderDetails] = useState(null)
  const [showStatusUpdate, setShowStatusUpdate] = useState(null)

  // محاكاة البيانات الواقعية للطلبات
  const orders = [
    {
      id: '#ORD-2024-001',
      customer: {
        name: 'أحمد محمد السعد',
        phone: '0501234567',
        email: 'ahmed@example.com',
        address: 'حي النرجس، شارع الأمير سلطان، الرياض',
        coordinates: { lat: 24.7136, lng: 46.6753 }
      },
      items: [
        { name: 'شاورما دجاج', quantity: 2, price: 25, total: 50, notes: 'بدون ثوم' },
        { name: 'كولا', quantity: 2, price: 8, total: 16, notes: '' },
        { name: 'بطاطس محمرة', quantity: 1, price: 12, total: 12, notes: 'مقرمشة' }
      ],
      subtotal: 78,
      tax: 11.7,
      deliveryFee: 15,
      discount: 0,
      total: 104.7,
      status: 'جديد',
      priority: 'عادي',
      orderTime: '2024-01-15T14:30:00',
      estimatedTime: 20,
      preparationTime: 0,
      deliveryTime: null,
      paymentMethod: 'كاش',
      paymentStatus: 'معلق',
      driver: null,
      notes: 'يرجى الاتصال عند الوصول',
      rating: null,
      source: 'تطبيق'
    },
    {
      id: '#ORD-2024-002',
      customer: {
        name: 'فاطمة علي القحطاني',
        phone: '0507654321',
        email: 'fatma@example.com',
        address: 'حي الملز، شارع التحلية، الرياض',
        coordinates: { lat: 24.6877, lng: 46.7219 }
      },
      items: [
        { name: 'برجر لحم كلاسيك', quantity: 1, price: 35, total: 35, notes: 'متوسط الطبخ' },
        { name: 'عصير برتقال طازج', quantity: 1, price: 15, total: 15, notes: '' },
        { name: 'حلقات البصل', quantity: 1, price: 18, total: 18, notes: '' }
      ],
      subtotal: 68,
      tax: 10.2,
      deliveryFee: 12,
      discount: 5,
      total: 85.2,
      status: 'قيد التحضير',
      priority: 'عاجل',
      orderTime: '2024-01-15T14:25:00',
      estimatedTime: 25,
      preparationTime: 8,
      deliveryTime: null,
      paymentMethod: 'فيزا',
      paymentStatus: 'مدفوع',
      driver: null,
      notes: 'عميل VIP - معاملة خاصة',
      rating: null,
      source: 'موقع'
    },
    {
      id: '#ORD-2024-003',
      customer: {
        name: 'محمد عبدالله الأحمد',
        phone: '0551234567',
        email: 'mohammed@example.com',
        address: 'حي العليا، طريق الملك فهد، الرياض',
        coordinates: { lat: 24.6944, lng: 46.6850 }
      },
      items: [
        { name: 'بيتزا مارجريتا كبيرة', quantity: 1, price: 65, total: 65, notes: 'قطع رفيعة' },
        { name: 'سلطة يونانية', quantity: 1, price: 28, total: 28, notes: 'جبن إضافي' },
        { name: 'مياه معدنية', quantity: 2, price: 5, total: 10, notes: '' }
      ],
      subtotal: 103,
      tax: 15.45,
      deliveryFee: 20,
      discount: 10,
      total: 128.45,
      status: 'جاهز للتوصيل',
      priority: 'عادي',
      orderTime: '2024-01-15T14:15:00',
      estimatedTime: 30,
      preparationTime: 22,
      deliveryTime: null,
      paymentMethod: 'ماستركارد',
      paymentStatus: 'مدفوع',
      driver: 'أحمد محمد',
      notes: '',
      rating: null,
      source: 'هاتف'
    },
    {
      id: '#ORD-2024-004',
      customer: {
        name: 'سارة أحمد الشمري',
        phone: '0509876543',
        email: 'sara@example.com',
        address: 'حي الورود، شارع الأمير محمد بن سلمان، الرياض',
        coordinates: { lat: 24.7311, lng: 46.6239 }
      },
      items: [
        { name: 'مندي لحم', quantity: 1, price: 85, total: 85, notes: 'لحم طري' },
        { name: 'شوربة عدس', quantity: 1, price: 15, total: 15, notes: 'حارة' },
        { name: 'أرز بخاري', quantity: 1, price: 25, total: 25, notes: '' }
      ],
      subtotal: 125,
      tax: 18.75,
      deliveryFee: 18,
      discount: 15,
      total: 146.75,
      status: 'قيد التوصيل',
      priority: 'عادي',
      orderTime: '2024-01-15T13:45:00',
      estimatedTime: 35,
      preparationTime: 28,
      deliveryTime: '2024-01-15T14:35:00',
      paymentMethod: 'كاش',
      paymentStatus: 'معلق',
      driver: 'سعد علي',
      notes: 'طلب عائلي',
      rating: null,
      source: 'تطبيق'
    },
    {
      id: '#ORD-2024-005',
      customer: {
        name: 'خالد عبدالرحمن',
        phone: '0558887777',
        email: 'khalid@example.com',
        address: 'حي الصحافة، شارع عثمان بن عفان، الرياض',
        coordinates: { lat: 24.7543, lng: 46.6372 }
      },
      items: [
        { name: 'فراخ مشوية', quantity: 1, price: 45, total: 45, notes: 'مع الخضار' },
        { name: 'أرز أبيض', quantity: 2, price: 10, total: 20, notes: '' },
        { name: 'سلطة خضراء', quantity: 1, price: 18, total: 18, notes: 'بدون طماطم' }
      ],
      subtotal: 83,
      tax: 12.45,
      deliveryFee: 15,
      discount: 8,
      total: 102.45,
      status: 'مكتمل',
      priority: 'عادي',
      orderTime: '2024-01-15T13:30:00',
      estimatedTime: 25,
      preparationTime: 20,
      deliveryTime: '2024-01-15T14:15:00',
      paymentMethod: 'أبل بي',
      paymentStatus: 'مدفوع',
      driver: 'عبدالله سعد',
      notes: '',
      rating: 5,
      source: 'تطبيق'
    }
  ]

  // إحصائيات الطلبات
  const orderStats = [
    {
      title: 'الطلبات الجديدة',
      value: orders.filter(o => o.status === 'جديد').length,
      color: 'purple',
      icon: ShoppingBag,
      change: '+3'
    },
    {
      title: 'قيد التحضير',
      value: orders.filter(o => o.status === 'قيد التحضير').length,
      color: 'orange',
      icon: Clock,
      change: '+1'
    },
    {
      title: 'جاهز للتوصيل',
      value: orders.filter(o => o.status === 'جاهز للتوصيل').length,
      color: 'blue',
      icon: CheckCircle,
      change: '0'
    },
    {
      title: 'قيد التوصيل',
      value: orders.filter(o => o.status === 'قيد التوصيل').length,
      color: 'green',
      icon: Truck,
      change: '+2'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'مكتمل': return 'text-green-600 bg-green-100 border-green-200'
      case 'قيد التوصيل': return 'text-cyan-600 bg-cyan-100 border-cyan-200'
      case 'جاهز للتوصيل': return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'قيد التحضير': return 'text-orange-600 bg-orange-100 border-orange-200'
      case 'جديد': return 'text-purple-600 bg-purple-100 border-purple-200'
      case 'ملغي': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'عاجل': return 'text-red-600 bg-red-50 border-red-200'
      case 'مهم': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'عادي': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'مدفوع': return 'text-green-600 bg-green-50 border-green-200'
      case 'معلق': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'مرفوض': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('ar-SA', {
      timeZone: 'Asia/Riyadh',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatTimeAgo = (dateString) => {
    const now = new Date()
    const orderTime = new Date(dateString)
    const diffInMinutes = Math.floor((now - orderTime) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `منذ ${diffInMinutes} دقيقة`
    } else {
      const hours = Math.floor(diffInMinutes / 60)
      return `منذ ${hours} ساعة`
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesTab = selectedTab === 'all' || 
      (selectedTab === 'active' && ['جديد', 'قيد التحضير', 'جاهز للتوصيل', 'قيد التوصيل'].includes(order.status)) ||
      (selectedTab === 'pending' && ['جديد', 'قيد التحضير'].includes(order.status)) ||
      (selectedTab === 'completed' && order.status === 'مكتمل') ||
      (selectedTab === 'cancelled' && order.status === 'ملغي')
    
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'urgent' && order.priority === 'عاجل') ||
      (selectedFilter === 'cash' && order.paymentMethod === 'كاش') ||
      (selectedFilter === 'card' && ['فيزا', 'ماستركارد'].includes(order.paymentMethod))
    
    const matchesSearch = searchTerm === '' ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm)
    
    return matchesTab && matchesFilter && matchesSearch
  })

  const tabs = [
    { id: 'active', label: 'النشطة', count: orders.filter(o => ['جديد', 'قيد التحضير', 'جاهز للتوصيل', 'قيد التوصيل'].includes(o.status)).length },
    { id: 'pending', label: 'قيد المعالجة', count: orders.filter(o => ['جديد', 'قيد التحضير'].includes(o.status)).length },
    { id: 'completed', label: 'مكتملة', count: orders.filter(o => o.status === 'مكتمل').length },
    { id: 'cancelled', label: 'ملغية', count: orders.filter(o => o.status === 'ملغي').length }
  ]

  const OrderDetailsModal = ({ order, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">تفاصيل الطلب {order.id}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XCircle className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* معلومات العميل */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Users className="w-5 h-5 ml-2 text-blue-600" />
              معلومات العميل
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">الاسم</p>
                <p className="font-medium">{order.customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">رقم الهاتف</p>
                <p className="font-medium">{order.customer.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600 mb-1">العنوان</p>
                <p className="font-medium">{order.customer.address}</p>
              </div>
            </div>
          </div>

          {/* تفاصيل الطلب */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Package className="w-5 h-5 ml-2 text-green-600" />
              الأصناف المطلوبة
            </h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    {item.notes && <p className="text-sm text-gray-600">ملاحظة: {item.notes}</p>}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">الكمية: {item.quantity}</p>
                    <p className="text-sm text-gray-600">{item.price} ريال × {item.quantity} = {item.total} ريال</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الفاتورة */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <DollarSign className="w-5 h-5 ml-2 text-blue-600" />
              تفاصيل الفاتورة
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span>{order.subtotal} ريال</span>
              </div>
              <div className="flex justify-between">
                <span>الضريبة (15%):</span>
                <span>{order.tax} ريال</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم التوصيل:</span>
                <span>{order.deliveryFee} ريال</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>الخصم:</span>
                  <span>-{order.discount} ريال</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>المجموع الإجمالي:</span>
                <span>{order.total} ريال</span>
              </div>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">معلومات الطلب</h4>
              <div className="space-y-2 text-sm">
                <p>وقت الطلب: {formatTime(order.orderTime)}</p>
                <p>الوقت المقدر: {order.estimatedTime} دقيقة</p>
                <p>طريقة الدفع: {order.paymentMethod}</p>
                <p>مصدر الطلب: {order.source}</p>
              </div>
            </div>
            {order.driver && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">معلومات التوصيل</h4>
                <div className="space-y-2 text-sm">
                  <p>السائق: {order.driver}</p>
                  <p>وقت التحضير: {order.preparationTime} دقيقة</p>
                  {order.deliveryTime && <p>وقت التوصيل: {formatTime(order.deliveryTime)}</p>}
                </div>
              </div>
            )}
          </div>

          {order.notes && (
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <MessageSquare className="w-4 h-4 ml-2 text-yellow-600" />
                ملاحظات خاصة
              </h4>
              <p className="text-sm">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3 space-x-reverse">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            إغلاق
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <PrinterIcon className="w-4 h-4 ml-2" />
            طباعة
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <RestaurantSidebar 
        isCollapsed={sidebarCollapsed} 
        setIsCollapsed={setSidebarCollapsed} 
      />
      
      <div className="flex-1 flex flex-col">
        <RestaurantHeader 
          title="إدارة الطلبات"
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-6 space-y-6">
          {/* الإحصائيات السريعة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {orderStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    <div className="text-right">
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-xs text-green-600">{stat.change}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* أدوات التحكم */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-wrap items-center gap-4">
                {/* البحث */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="بحث برقم الطلب أو اسم العميل..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 w-64"
                  />
                </div>

                {/* الفلاتر */}
                <select 
                  value={selectedFilter} 
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">جميع الطلبات</option>
                  <option value="urgent">عاجل</option>
                  <option value="cash">دفع نقدي</option>
                  <option value="card">دفع بالبطاقة</option>
                </select>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Plus className="w-4 h-4 ml-2" />
                  طلب جديد
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 ml-2" />
                  تصدير
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-4 h-4 ml-2" />
                  تحديث
                </button>
              </div>
            </div>
          </div>

          {/* تبويبات الطلبات */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 space-x-reverse px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    <span className={`mr-2 px-2 py-1 text-xs rounded-full ${
                      selectedTab === tab.id
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* قائمة الطلبات */}
            <div className="p-6">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد طلبات</h3>
                  <p className="text-gray-500">لم يتم العثور على طلبات تطابق معايير البحث</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div>
                            <h3 className="font-semibold text-gray-900">{order.id}</h3>
                            <p className="text-sm text-gray-600">{formatTimeAgo(order.orderTime)}</p>
                          </div>
                          <div className="flex space-x-2 space-x-reverse">
                            <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            <span className={`px-3 py-1 text-sm rounded-full border ${getPriorityColor(order.priority)}`}>
                              {order.priority}
                            </span>
                            <span className={`px-3 py-1 text-sm rounded-full border ${getPaymentStatusColor(order.paymentStatus)}`}>
                              {order.paymentStatus}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button 
                            onClick={() => setShowOrderDetails(order)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => setShowStatusUpdate(order)}
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* معلومات العميل */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <Users className="w-4 h-4 ml-2 text-blue-600" />
                            العميل
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p className="font-medium">{order.customer.name}</p>
                            <p className="text-gray-600 flex items-center">
                              <Phone className="w-3 h-3 ml-1" />
                              {order.customer.phone}
                            </p>
                            <p className="text-gray-600 flex items-center">
                              <MapPin className="w-3 h-3 ml-1" />
                              {order.customer.address.substring(0, 30)}...
                            </p>
                          </div>
                        </div>

                        {/* تفاصيل الطلب */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <Package className="w-4 h-4 ml-2 text-green-600" />
                            الأصناف
                          </h4>
                          <div className="space-y-1 text-sm">
                            {order.items.slice(0, 2).map((item, index) => (
                              <p key={index} className="text-gray-600">
                                {item.quantity}× {item.name}
                              </p>
                            ))}
                            {order.items.length > 2 && (
                              <p className="text-gray-500">+{order.items.length - 2} أصناف أخرى</p>
                            )}
                          </div>
                        </div>

                        {/* معلومات إضافية */}
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                            <Activity className="w-4 h-4 ml-2 text-purple-600" />
                            التفاصيل
                          </h4>
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center justify-between">
                              <span>المبلغ:</span>
                              <span className="font-medium">{order.total} ريال</span>
                            </p>
                            <p className="flex items-center justify-between">
                              <span>الدفع:</span>
                              <span>{order.paymentMethod}</span>
                            </p>
                            <p className="flex items-center justify-between">
                              <span>الوقت المقدر:</span>
                              <span>{order.estimatedTime} دقيقة</span>
                            </p>
                            {order.driver && (
                              <p className="flex items-center justify-between">
                                <span>السائق:</span>
                                <span className="text-blue-600">{order.driver}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {order.notes && (
                        <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-yellow-800 flex items-start">
                            <MessageSquare className="w-4 h-4 ml-2 mt-0.5 text-yellow-600" />
                            {order.notes}
                          </p>
                        </div>
                      )}

                      {/* أزرار الإجراءات */}
                      <div className="mt-4 flex justify-end space-x-3 space-x-reverse">
                        {order.status === 'جديد' && (
                          <>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                              قبول الطلب
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                              رفض الطلب
                            </button>
                          </>
                        )}
                        {order.status === 'قيد التحضير' && (
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            جاهز للتوصيل
                          </button>
                        )}
                        {order.status === 'جاهز للتوصيل' && (
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                            تعيين سائق
                          </button>
                        )}
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center">
                          <Bell className="w-4 h-4 ml-2" />
                          إشعار العميل
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* التصفح */}
              {filteredOrders.length > 0 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    عرض {filteredOrders.length} من أصل {orders.length} طلب
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm">1</span>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* نافذة تفاصيل الطلب */}
      {showOrderDetails && (
        <OrderDetailsModal 
          order={showOrderDetails} 
          onClose={() => setShowOrderDetails(null)} 
        />
      )}
    </div>
  )
}

export default RestaurantOrdersManagement