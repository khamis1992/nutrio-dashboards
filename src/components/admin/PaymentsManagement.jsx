import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  CreditCard,
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
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Banknote,
  Wallet,
  Receipt,
  TrendingDown as RefundIcon
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts'

const PaymentsManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterMethod, setFilterMethod] = useState('all')
  const [loading, setLoading] = useState(false)
  const [dateRange, setDateRange] = useState('today')

  // بيانات تجريبية للمعاملات المالية
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-2024-001',
      orderId: 'ORD-2024-001',
      customerName: 'أحمد محمد السالم',
      businessName: 'مطعم الذواقة',
      businessType: 'restaurant',
      amount: 130,
      commission: 19.5, // 15%
      netAmount: 110.5,
      paymentMethod: 'credit_card',
      status: 'completed',
      type: 'payment',
      timestamp: '2024-01-15 14:45',
      cardLast4: '4532',
      cardType: 'visa',
      gatewayFee: 3.9,
      refundAmount: 0,
      notes: ''
    },
    {
      id: 'TXN-2024-002',
      orderId: 'ORD-2024-002',
      customerName: 'فاطمة علي الأحمد',
      businessName: 'برجر هاوس',
      businessType: 'restaurant',
      amount: 57,
      commission: 6.84, // 12%
      netAmount: 50.16,
      paymentMethod: 'cash',
      status: 'pending',
      type: 'payment',
      timestamp: '2024-01-15 14:20',
      cardLast4: null,
      cardType: null,
      gatewayFee: 0,
      refundAmount: 0,
      notes: 'دفع نقدي - في انتظار تأكيد السائق'
    },
    {
      id: 'TXN-2024-003',
      orderId: 'GYM-2024-001',
      customerName: 'سارة محمد الرشيد',
      businessName: 'نادي الأبطال الرياضي',
      businessType: 'gym',
      amount: 200,
      commission: 24, // 12%
      netAmount: 176,
      paymentMethod: 'bank_transfer',
      status: 'completed',
      type: 'payment',
      timestamp: '2024-01-15 10:25',
      cardLast4: null,
      cardType: null,
      gatewayFee: 2,
      refundAmount: 0,
      notes: 'اشتراك شهري'
    },
    {
      id: 'TXN-2024-004',
      orderId: 'ORD-2024-003',
      customerName: 'خالد سعد القحطاني',
      businessName: 'مطعم البحر الأبيض',
      businessType: 'restaurant',
      amount: 113,
      commission: 11.3, // 10%
      netAmount: 101.7,
      paymentMethod: 'credit_card',
      status: 'refunded',
      type: 'refund',
      timestamp: '2024-01-15 12:45',
      cardLast4: '1234',
      cardType: 'mastercard',
      gatewayFee: 3.39,
      refundAmount: 113,
      notes: 'استرداد كامل - العميل غير متواجد'
    },
    {
      id: 'TXN-2024-005',
      orderId: 'DRV-2024-001',
      customerName: null,
      businessName: 'محمد أحمد السالم',
      businessType: 'driver',
      amount: 450,
      commission: 90, // 20%
      netAmount: 360,
      paymentMethod: 'bank_transfer',
      status: 'completed',
      type: 'driver_payout',
      timestamp: '2024-01-15 16:00',
      cardLast4: null,
      cardType: null,
      gatewayFee: 5,
      refundAmount: 0,
      notes: 'مدفوعات أسبوعية للسائق'
    }
  ])

  // بيانات الإحصائيات المالية
  const [financialStats, setFinancialStats] = useState({
    totalRevenue: 500,
    totalCommissions: 151.64,
    netRevenue: 348.36,
    totalRefunds: 113,
    avgTransactionValue: 100,
    transactionCount: 5,
    successRate: 80,
    pendingAmount: 57
  })

  // بيانات الرسوم البيانية
  const revenueData = [
    { name: 'السبت', revenue: 2400, commission: 360 },
    { name: 'الأحد', revenue: 1398, commission: 210 },
    { name: 'الاثنين', revenue: 9800, commission: 1470 },
    { name: 'الثلاثاء', revenue: 3908, commission: 586 },
    { name: 'الأربعاء', revenue: 4800, commission: 720 },
    { name: 'الخميس', revenue: 3800, commission: 570 },
    { name: 'الجمعة', revenue: 4300, commission: 645 }
  ]

  const paymentMethodsData = [
    { name: 'بطاقة ائتمان', value: 343, color: '#3B82F6' },
    { name: 'تحويل بنكي', value: 200, color: '#10B981' },
    { name: 'نقدي', value: 57, color: '#F59E0B' }
  ]

  const commissionData = [
    { name: 'مطاعم', commission: 37.64, percentage: 14.2 },
    { name: 'صالات جيم', commission: 24, percentage: 12 },
    { name: 'سائقين', commission: 90, percentage: 20 }
  ]

  // تصفية المعاملات
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus
    const matchesType = filterType === 'all' || transaction.type === filterType
    const matchesMethod = filterMethod === 'all' || transaction.paymentMethod === filterMethod
    
    return matchesSearch && matchesStatus && matchesType && matchesMethod
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'refunded': return 'bg-purple-100 text-purple-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'مكتمل'
      case 'pending': return 'قيد الانتظار'
      case 'failed': return 'فشل'
      case 'refunded': return 'مسترد'
      case 'processing': return 'قيد المعالجة'
      default: return 'غير محدد'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'payment': return 'bg-green-100 text-green-800'
      case 'refund': return 'bg-red-100 text-red-800'
      case 'driver_payout': return 'bg-blue-100 text-blue-800'
      case 'commission': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeText = (type) => {
    switch (type) {
      case 'payment': return 'دفعة'
      case 'refund': return 'استرداد'
      case 'driver_payout': return 'مدفوعات سائق'
      case 'commission': return 'عمولة'
      default: return 'غير محدد'
    }
  }

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'credit_card': return <CreditCard className="h-4 w-4 text-blue-500" />
      case 'bank_transfer': return <Banknote className="h-4 w-4 text-green-500" />
      case 'cash': return <Wallet className="h-4 w-4 text-orange-500" />
      default: return <Receipt className="h-4 w-4 text-gray-500" />
    }
  }

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'credit_card': return 'بطاقة ائتمان'
      case 'bank_transfer': return 'تحويل بنكي'
      case 'cash': return 'نقدي'
      default: return 'غير محدد'
    }
  }

  const getBusinessIcon = (type) => {
    switch (type) {
      case 'restaurant': return <Building2 className="h-4 w-4 text-blue-500" />
      case 'gym': return <Dumbbell className="h-4 w-4 text-purple-500" />
      case 'driver': return <Truck className="h-4 w-4 text-orange-500" />
      default: return <Package className="h-4 w-4 text-gray-500" />
    }
  }

  const refreshData = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المدفوعات</h1>
                <p className="text-gray-600">نظام شامل لإدارة المعاملات المالية والعمولات</p>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="today">اليوم</option>
                  <option value="week">هذا الأسبوع</option>
                  <option value="month">هذا الشهر</option>
                  <option value="quarter">هذا الربع</option>
                </select>
                
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
                  to="/admin/payments/reconcile"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  تسوية حسابات
                </Link>
              </div>
            </div>

            {/* بطاقات الإحصائيات المالية */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialStats.totalRevenue)}</p>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>+12.5%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي العمولات</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialStats.totalCommissions)}</p>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>+8.3%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Receipt className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">صافي الإيرادات</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialStats.netRevenue)}</p>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>+15.2%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Banknote className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">المبالغ المستردة</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(financialStats.totalRefunds)}</p>
                    <div className="flex items-center text-sm text-red-600 mt-1">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      <span>-5.7%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <RefundIcon className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* الرسوم البيانية */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* رسم بياني للإيرادات */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">الإيرادات والعمولات الأسبوعية</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      formatCurrency(value), 
                      name === 'revenue' ? 'الإيرادات' : 'العمولات'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1"
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="commission" 
                    stackId="1"
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* طرق الدفع */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع طرق الدفع</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentMethodsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* فلاتر البحث */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* البحث */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ابحث عن معاملة، عميل، أو رقم طلب..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* فلتر الحالة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="completed">مكتمل</option>
                  <option value="pending">قيد الانتظار</option>
                  <option value="failed">فشل</option>
                  <option value="refunded">مسترد</option>
                  <option value="processing">قيد المعالجة</option>
                </select>
              </div>

              {/* فلتر النوع */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">جميع الأنواع</option>
                  <option value="payment">دفعة</option>
                  <option value="refund">استرداد</option>
                  <option value="driver_payout">مدفوعات سائق</option>
                  <option value="commission">عمولة</option>
                </select>
              </div>

              {/* فلتر طريقة الدفع */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">طريقة الدفع</label>
                <select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="all">جميع الطرق</option>
                  <option value="credit_card">بطاقة ائتمان</option>
                  <option value="bank_transfer">تحويل بنكي</option>
                  <option value="cash">نقدي</option>
                </select>
              </div>
            </div>
          </div>

          {/* جدول المعاملات */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                المعاملات المالية ({filteredTransactions.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم المعاملة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العميل/الشريك
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      النوع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المبلغ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العمولة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      طريقة الدفع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التاريخ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.id}
                        </div>
                        <div className="text-xs text-gray-500">
                          {transaction.orderId}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getBusinessIcon(transaction.businessType)}
                          <div className="mr-2">
                            <div className="text-sm font-medium text-gray-900">
                              {transaction.customerName || transaction.businessName}
                            </div>
                            <div className="text-xs text-gray-500">
                              {transaction.businessName}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
                          {getTypeText(transaction.type)}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(transaction.amount)}
                        </div>
                        {transaction.refundAmount > 0 && (
                          <div className="text-xs text-red-600">
                            مسترد: {formatCurrency(transaction.refundAmount)}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(transaction.commission)}
                        </div>
                        <div className="text-xs text-gray-500">
                          صافي: {formatCurrency(transaction.netAmount)}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getPaymentMethodIcon(transaction.paymentMethod)}
                          <div className="mr-2">
                            <div className="text-sm text-gray-900">
                              {getPaymentMethodText(transaction.paymentMethod)}
                            </div>
                            {transaction.cardLast4 && (
                              <div className="text-xs text-gray-500">
                                **** {transaction.cardLast4}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                          {getStatusText(transaction.status)}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatTime(transaction.timestamp)}
                        </div>
                        {transaction.gatewayFee > 0 && (
                          <div className="text-xs text-gray-500">
                            رسوم: {formatCurrency(transaction.gatewayFee)}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/payments/${transaction.id}`}
                            className="text-green-600 hover:text-green-900"
                            title="عرض التفاصيل"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          
                          {transaction.status === 'completed' && (
                            <button
                              className="text-blue-600 hover:text-blue-900"
                              title="إنشاء فاتورة"
                            >
                              <Receipt className="h-4 w-4" />
                            </button>
                          )}
                          
                          {transaction.status === 'completed' && transaction.type === 'payment' && (
                            <button
                              className="text-red-600 hover:text-red-900"
                              title="استرداد"
                            >
                              <RefundIcon className="h-4 w-4" />
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

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد معاملات</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'لا توجد نتائج للبحث الحالي' : 'لا توجد معاملات مالية حالياً'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default PaymentsManagement