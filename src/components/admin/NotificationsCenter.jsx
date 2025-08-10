import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  Bell,
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
  Send,
  MessageSquare,
  Smartphone,
  AtSign,
  BellRing,
  Zap,
  Target,
  FileText,
  Settings,
  Pause,
  Play,
  RotateCcw
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const NotificationsCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterChannel, setFilterChannel] = useState('all')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('notifications')

  // بيانات تجريبية للإشعارات
  const [notifications, setNotifications] = useState([
    {
      id: 'NOT-2024-001',
      title: 'طلب جديد تم استلامه',
      message: 'تم استلام طلب جديد من أحمد محمد السالم بقيمة 130 ر.س',
      type: 'order_received',
      priority: 'high',
      recipients: ['restaurant:1', 'admin'],
      channels: ['push', 'app'],
      status: 'sent',
      sentAt: '2024-01-15 14:30',
      deliveredCount: 2,
      readCount: 1,
      clickCount: 1,
      targetAudience: 'restaurant_owners',
      template: 'order_notification',
      scheduledFor: null,
      createdBy: 'system',
      businessType: 'restaurant'
    },
    {
      id: 'NOT-2024-002',
      title: 'تذكير بانتهاء الاشتراك',
      message: 'اشتراكك في النظام سينتهي خلال 3 أيام. يرجى التجديد.',
      type: 'subscription_reminder',
      priority: 'medium',
      recipients: ['gym:1', 'gym:2'],
      channels: ['email', 'sms', 'app'],
      status: 'scheduled',
      sentAt: null,
      deliveredCount: 0,
      readCount: 0,
      clickCount: 0,
      targetAudience: 'gym_owners',
      template: 'subscription_reminder',
      scheduledFor: '2024-01-16 09:00',
      createdBy: 'admin_user',
      businessType: 'gym'
    },
    {
      id: 'NOT-2024-003',
      title: 'مكافأة السائق',
      message: 'تهانينا! لقد أكملت 50 توصيلة هذا الأسبوع وحصلت على مكافأة 100 ر.س',
      type: 'driver_reward',
      priority: 'high',
      recipients: ['driver:1'],
      channels: ['push', 'sms'],
      status: 'sent',
      sentAt: '2024-01-15 16:00',
      deliveredCount: 1,
      readCount: 1,
      clickCount: 0,
      targetAudience: 'drivers',
      template: 'driver_achievement',
      scheduledFor: null,
      createdBy: 'system',
      businessType: 'driver'
    },
    {
      id: 'NOT-2024-004',
      title: 'عرض خاص للمطاعم',
      message: 'خصم 50% على رسوم التسجيل للمطاعم الجديدة لفترة محدودة',
      type: 'promotion',
      priority: 'medium',
      recipients: ['all_restaurants'],
      channels: ['email', 'app'],
      status: 'draft',
      sentAt: null,
      deliveredCount: 0,
      readCount: 0,
      clickCount: 0,
      targetAudience: 'all_restaurants',
      template: 'promotion_offer',
      scheduledFor: '2024-01-17 10:00',
      createdBy: 'marketing_team',
      businessType: 'restaurant'
    },
    {
      id: 'NOT-2024-005',
      title: 'صيانة النظام المجدولة',
      message: 'سيكون النظام تحت الصيانة يوم الجمعة من 2:00 ص إلى 4:00 ص',
      type: 'system_maintenance',
      priority: 'high',
      recipients: ['all_users'],
      channels: ['email', 'app', 'sms'],
      status: 'failed',
      sentAt: '2024-01-15 12:00',
      deliveredCount: 150,
      readCount: 120,
      clickCount: 45,
      targetAudience: 'all_users',
      template: 'system_announcement',
      scheduledFor: null,
      createdBy: 'tech_team',
      businessType: 'system'
    }
  ])

  // قوالب الإشعارات
  const [templates, setTemplates] = useState([
    {
      id: 'order_notification',
      name: 'إشعار طلب جديد',
      subject: 'طلب جديد تم استلامه - رقم {ORDER_ID}',
      content: 'تم استلام طلب جديد من {CUSTOMER_NAME} بقيمة {AMOUNT} ر.س. يرجى تأكيد الطلب.',
      type: 'order',
      variables: ['ORDER_ID', 'CUSTOMER_NAME', 'AMOUNT', 'RESTAURANT_NAME'],
      channels: ['push', 'app'],
      category: 'transactional',
      isActive: true
    },
    {
      id: 'subscription_reminder',
      name: 'تذكير انتهاء الاشتراك',
      subject: 'تذكير: اشتراكك سينتهي قريباً',
      content: 'عزيزي {USER_NAME}، اشتراكك في النظام سينتهي في {DAYS_LEFT} أيام. يرجى التجديد لضمان عدم انقطاع الخدمة.',
      type: 'subscription',
      variables: ['USER_NAME', 'DAYS_LEFT', 'EXPIRY_DATE'],
      channels: ['email', 'sms', 'app'],
      category: 'reminder',
      isActive: true
    },
    {
      id: 'driver_achievement',
      name: 'إنجاز السائق',
      subject: 'مبروك! لقد حققت إنجازاً جديداً',
      content: 'تهانينا {DRIVER_NAME}! لقد أكملت {DELIVERY_COUNT} توصيلة وحصلت على مكافأة {REWARD_AMOUNT} ر.س',
      type: 'achievement',
      variables: ['DRIVER_NAME', 'DELIVERY_COUNT', 'REWARD_AMOUNT'],
      channels: ['push', 'sms'],
      category: 'reward',
      isActive: true
    }
  ])

  // إحصائيات الإشعارات
  const [notificationStats, setNotificationStats] = useState({
    totalSent: 1500,
    deliveryRate: 95.2,
    openRate: 78.5,
    clickRate: 23.4,
    todaySent: 156,
    pendingScheduled: 12,
    activeCampaigns: 3,
    failedDeliveries: 8
  })

  // بيانات الرسوم البيانية
  const deliveryData = [
    { name: 'السبت', sent: 240, delivered: 228, opened: 189 },
    { name: 'الأحد', sent: 139, delivered: 132, opened: 104 },
    { name: 'الاثنين', sent: 380, delivered: 361, opened: 284 },
    { name: 'الثلاثاء', sent: 308, delivered: 293, opened: 230 },
    { name: 'الأربعاء', sent: 280, delivered: 266, opened: 209 },
    { name: 'الخميس', sent: 200, delivered: 190, opened: 149 },
    { name: 'الجمعة', sent: 156, delivered: 148, opened: 116 }
  ]

  const channelData = [
    { name: 'تطبيق الجوال', value: 45, color: '#3B82F6' },
    { name: 'الإيميل', value: 30, color: '#10B981' },
    { name: 'الرسائل النصية', value: 25, color: '#F59E0B' }
  ]

  const typeData = [
    { type: 'الطلبات', count: 450, rate: 89.2 },
    { type: 'التذكيرات', count: 280, rate: 76.5 },
    { type: 'العروض', count: 320, rate: 68.3 },
    { type: 'النظام', count: 150, rate: 95.1 }
  ]

  // تصفية الإشعارات
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.type.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || notification.status === filterStatus
    const matchesType = filterType === 'all' || notification.type === filterType
    const matchesChannel = filterChannel === 'all' || notification.channels.includes(filterChannel)
    
    return matchesSearch && matchesStatus && matchesType && matchesChannel
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'sent': return 'تم الإرسال'
      case 'scheduled': return 'مجدول'
      case 'draft': return 'مسودة'
      case 'failed': return 'فشل'
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
      case 'order_received': return <Package className="h-4 w-4 text-blue-500" />
      case 'subscription_reminder': return <Clock className="h-4 w-4 text-orange-500" />
      case 'driver_reward': return <Star className="h-4 w-4 text-yellow-500" />
      case 'promotion': return <Zap className="h-4 w-4 text-purple-500" />
      case 'system_maintenance': return <Settings className="h-4 w-4 text-gray-500" />
      default: return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'push': return <Smartphone className="h-3 w-3" />
      case 'email': return <AtSign className="h-3 w-3" />
      case 'sms': return <MessageSquare className="h-3 w-3" />
      case 'app': return <BellRing className="h-3 w-3" />
      default: return <Bell className="h-3 w-3" />
    }
  }

  const refreshData = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return '-'
    return new Date(timestamp).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateEngagementRate = (notification) => {
    if (notification.deliveredCount === 0) return 0
    return ((notification.readCount / notification.deliveredCount) * 100).toFixed(1)
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">مركز الإشعارات</h1>
                <p className="text-gray-600">إدارة وإرسال الإشعارات عبر جميع القنوات</p>
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
                  to="/admin/notifications/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  إنشاء إشعار
                </Link>
              </div>
            </div>

            {/* بطاقات الإحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي المُرسل</p>
                    <p className="text-2xl font-bold text-gray-900">{notificationStats.totalSent.toLocaleString()}</p>
                    <div className="flex items-center text-sm text-blue-600 mt-1">
                      <Send className="h-3 w-3 mr-1" />
                      <span>اليوم: {notificationStats.todaySent}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Bell className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">معدل التسليم</p>
                    <p className="text-2xl font-bold text-gray-900">{notificationStats.deliveryRate}%</p>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+2.3%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">معدل الفتح</p>
                    <p className="text-2xl font-bold text-gray-900">{notificationStats.openRate}%</p>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+5.7%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">معدل النقر</p>
                    <p className="text-2xl font-bold text-gray-900">{notificationStats.clickRate}%</p>
                    <div className="flex items-center text-sm text-orange-600 mt-1">
                      <Activity className="h-3 w-3 mr-1" />
                      <span>المتوسط: 21.8%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Activity className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* التبويبات */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'notifications'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  الإشعارات
                </button>
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'templates'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  القوالب
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  التحليلات
                </button>
              </nav>
            </div>
          </div>

          {/* محتوى الإشعارات */}
          {activeTab === 'notifications' && (
            <>
              {/* فلاتر البحث */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="ابحث عن إشعار..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">جميع الحالات</option>
                      <option value="sent">تم الإرسال</option>
                      <option value="scheduled">مجدول</option>
                      <option value="draft">مسودة</option>
                      <option value="failed">فشل</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">جميع الأنواع</option>
                      <option value="order_received">طلبات</option>
                      <option value="subscription_reminder">تذكيرات</option>
                      <option value="promotion">عروض</option>
                      <option value="system_maintenance">نظام</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">القناة</label>
                    <select
                      value={filterChannel}
                      onChange={(e) => setFilterChannel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">جميع القنوات</option>
                      <option value="push">إشعارات فورية</option>
                      <option value="email">إيميل</option>
                      <option value="sms">رسائل نصية</option>
                      <option value="app">التطبيق</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* جدول الإشعارات */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    الإشعارات ({filteredNotifications.length})
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الإشعار
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الجمهور المستهدف
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          القنوات
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الحالة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الأولوية
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          معدل التفاعل
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
                      {filteredNotifications.map((notification) => (
                        <tr key={notification.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-3">
                                {getTypeIcon(notification.type)}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </div>
                                <div className="text-sm text-gray-500 max-w-md truncate">
                                  {notification.message}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  {notification.id}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {notification.targetAudience}
                            </div>
                            <div className="text-xs text-gray-500">
                              {notification.recipients.length} مستلم
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              {notification.channels.map((channel, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                  {getChannelIcon(channel)}
                                  <span className="mr-1">
                                    {channel === 'push' ? 'فوري' :
                                     channel === 'email' ? 'إيميل' :
                                     channel === 'sms' ? 'رسائل' : 'تطبيق'}
                                  </span>
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(notification.status)}`}>
                              {getStatusText(notification.status)}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(notification.priority)}`}>
                              {getPriorityText(notification.priority)}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {calculateEngagementRate(notification)}%
                            </div>
                            <div className="text-xs text-gray-500">
                              {notification.readCount}/{notification.deliveredCount} فتح
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatTime(notification.sentAt || notification.scheduledFor)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {notification.sentAt ? 'تم الإرسال' : 'مجدول'}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/admin/notifications/${notification.id}`}
                                className="text-blue-600 hover:text-blue-900"
                                title="عرض التفاصيل"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                              
                              {notification.status === 'draft' && (
                                <button
                                  className="text-green-600 hover:text-green-900"
                                  title="إرسال"
                                >
                                  <Send className="h-4 w-4" />
                                </button>
                              )}
                              
                              {notification.status === 'scheduled' && (
                                <button
                                  className="text-orange-600 hover:text-orange-900"
                                  title="إيقاف مؤقت"
                                >
                                  <Pause className="h-4 w-4" />
                                </button>
                              )}
                              
                              <button
                                className="text-gray-600 hover:text-gray-900"
                                title="نسخ"
                              >
                                <RotateCcw className="h-4 w-4" />
                              </button>
                              
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

                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12">
                    <Bell className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد إشعارات</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm ? 'لا توجد نتائج للبحث الحالي' : 'لا توجد إشعارات حالياً'}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* محتوى التحليلات */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* الرسوم البيانية */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* رسم بياني لمعدلات التسليم */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">معدلات التسليم والفتح</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={deliveryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="sent" stroke="#3B82F6" name="المُرسل" />
                      <Line type="monotone" dataKey="delivered" stroke="#10B981" name="المُسلم" />
                      <Line type="monotone" dataKey="opened" stroke="#F59E0B" name="المفتوح" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* توزيع القنوات */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع القنوات</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* أداء أنواع الإشعارات */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء أنواع الإشعارات</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={typeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" name="العدد" />
                    <Bar dataKey="rate" fill="#10B981" name="معدل النجاح %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* محتوى القوالب */}
          {activeTab === 'templates' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  قوالب الإشعارات ({templates.length})
                </h2>
                <Link 
                  to="/admin/notifications/templates/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  قالب جديد
                </Link>
              </div>

              <div className="divide-y divide-gray-200">
                {templates.map((template) => (
                  <div key={template.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <FileText className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                            <p className="text-sm text-gray-500">{template.subject}</p>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          {template.content}
                        </div>
                        <div className="mt-3 flex items-center gap-4">
                          <span className="text-xs text-gray-500">
                            النوع: {template.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            المتغيرات: {template.variables.join(', ')}
                          </span>
                          <div className="flex gap-1">
                            {template.channels.map((channel, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                {getChannelIcon(channel)}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {template.isActive ? 'نشط' : 'معطل'}
                        </span>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default NotificationsCenter