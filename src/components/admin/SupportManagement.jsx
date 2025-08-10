import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  Headphones,
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
  RotateCcw,
  UserCheck,
  BookOpen,
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  User,
  Archive,
  Flag
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

const SupportManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterAssignee, setFilterAssignee] = useState('all')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('tickets')

  // بيانات تجريبية للتذاكر
  const [tickets, setTickets] = useState([
    {
      id: 'TKT-2024-001',
      title: 'مشكلة في استلام الطلبات',
      description: 'لا أستطيع استلام الطلبات الجديدة في التطبيق منذ هذا الصباح',
      customerName: 'أحمد محمد السالم',
      customerEmail: 'ahmed@example.com',
      customerPhone: '+966501234567',
      businessType: 'restaurant',
      businessName: 'مطعم الذواقة',
      status: 'open',
      priority: 'high',
      category: 'technical',
      assignedTo: 'محمد علي',
      assigneeId: 'agent_1',
      createdAt: '2024-01-15 10:30',
      updatedAt: '2024-01-15 14:45',
      responseTime: 240, // minutes
      resolutionTime: null,
      satisfaction: null,
      tags: ['طلبات', 'تطبيق', 'مطاعم'],
      lastMessage: 'تم تحديث إعدادات التطبيق، يرجى المحاولة مرة أخرى',
      messageCount: 5
    },
    {
      id: 'TKT-2024-002',
      title: 'طلب تغيير خطة الاشتراك',
      description: 'أريد ترقية خطة الاشتراك من الأساسية إلى البريميوم',
      customerName: 'سارة أحمد الرشيد',
      customerEmail: 'sara@example.com',
      customerPhone: '+966509876543',
      businessType: 'gym',
      businessName: 'نادي الأبطال الرياضي',
      status: 'in_progress',
      priority: 'medium',
      category: 'billing',
      assignedTo: 'فاطمة خالد',
      assigneeId: 'agent_2',
      createdAt: '2024-01-15 09:15',
      updatedAt: '2024-01-15 13:20',
      responseTime: 45,
      resolutionTime: null,
      satisfaction: null,
      tags: ['اشتراك', 'ترقية', 'صالات جيم'],
      lastMessage: 'تم بدء عملية ترقية الخطة، ستكتمل خلال 24 ساعة',
      messageCount: 3
    },
    {
      id: 'TKT-2024-003',
      title: 'استفسار عن عمولة التوصيل',
      description: 'لم أفهم كيفية حساب عمولة التوصيل الجديدة',
      customerName: 'خالد محمد العتيبي',
      customerEmail: 'khalid@example.com',
      customerPhone: '+966512345678',
      businessType: 'driver',
      businessName: null,
      status: 'resolved',
      priority: 'low',
      category: 'general',
      assignedTo: 'عبدالله سعد',
      assigneeId: 'agent_3',
      createdAt: '2024-01-14 16:00',
      updatedAt: '2024-01-15 08:30',
      responseTime: 30,
      resolutionTime: 960, // 16 hours
      satisfaction: 5,
      tags: ['عمولة', 'سائقين', 'استفسار'],
      lastMessage: 'شكراً لك، تم توضيح طريقة الحساب بالتفصيل',
      messageCount: 7
    },
    {
      id: 'TKT-2024-004',
      title: 'مشكلة في الدفع الإلكتروني',
      description: 'العملاء يشتكون من فشل المدفوعات عبر البطاقات الائتمانية',
      customerName: 'نورا سالم الدوسري',
      customerEmail: 'nora@example.com',
      customerPhone: '+966555123456',
      businessType: 'restaurant',
      businessName: 'برجر هاوس',
      status: 'escalated',
      priority: 'critical',
      category: 'technical',
      assignedTo: 'فريق التقنية',
      assigneeId: 'tech_team',
      createdAt: '2024-01-15 14:00',
      updatedAt: '2024-01-15 15:30',
      responseTime: 15,
      resolutionTime: null,
      satisfaction: null,
      tags: ['دفع', 'تقني', 'عاجل'],
      lastMessage: 'تم تصعيد المشكلة لفريق التقنية للحل السريع',
      messageCount: 8
    },
    {
      id: 'TKT-2024-005',
      title: 'طلب إضافة ميزة جديدة',
      description: 'نريد إضافة ميزة الحجز المسبق للحصص الرياضية',
      customerName: 'محمد عبدالرحمن',
      customerEmail: 'mohammed@example.com',
      customerPhone: '+966544332211',
      businessType: 'gym',
      businessName: 'فيتنس لايف',
      status: 'closed',
      priority: 'low',
      category: 'feature_request',
      assignedTo: 'منال أحمد',
      assigneeId: 'agent_4',
      createdAt: '2024-01-13 11:00',
      updatedAt: '2024-01-14 16:45',
      responseTime: 120,
      resolutionTime: 1785, // ~30 hours
      satisfaction: 4,
      tags: ['ميزة جديدة', 'حجز', 'صالات جيم'],
      lastMessage: 'تم إضافة الطلب لقائمة الميزات المستقبلية',
      messageCount: 4
    }
  ])

  // فريق الدعم
  const [supportTeam, setSupportTeam] = useState([
    {
      id: 'agent_1',
      name: 'محمد علي الأحمد',
      email: 'mohammed@support.com',
      role: 'senior_agent',
      specialization: 'technical',
      status: 'online',
      avatar: '/api/placeholder/40/40',
      activeTickets: 8,
      resolvedToday: 5,
      avgResponseTime: 18, // minutes
      avgResolutionTime: 240, // minutes
      satisfaction: 4.7,
      totalResolved: 1250
    },
    {
      id: 'agent_2',
      name: 'فاطمة خالد السالم',
      email: 'fatima@support.com',
      role: 'agent',
      specialization: 'billing',
      status: 'online',
      avatar: '/api/placeholder/40/40',
      activeTickets: 6,
      resolvedToday: 3,
      avgResponseTime: 25,
      avgResolutionTime: 180,
      satisfaction: 4.8,
      totalResolved: 980
    },
    {
      id: 'agent_3',
      name: 'عبدالله سعد الرشيد',
      email: 'abdullah@support.com',
      role: 'agent',
      specialization: 'general',
      status: 'away',
      avatar: '/api/placeholder/40/40',
      activeTickets: 4,
      resolvedToday: 7,
      avgResponseTime: 15,
      avgResolutionTime: 120,
      satisfaction: 4.6,
      totalResolved: 1580
    }
  ])

  // قاعدة المعرفة
  const [knowledgeBase, setKnowledgeBase] = useState([
    {
      id: 'kb_1',
      title: 'كيفية تسجيل مطعم جديد',
      content: 'دليل شامل لتسجيل مطعم جديد في النظام خطوة بخطوة',
      category: 'getting_started',
      views: 1250,
      helpful: 45,
      notHelpful: 3,
      lastUpdated: '2024-01-10',
      tags: ['تسجيل', 'مطاعم', 'دليل']
    },
    {
      id: 'kb_2',
      title: 'حل مشاكل الدفع الشائعة',
      content: 'الأخطاء الشائعة في نظام الدفع وطرق حلها',
      category: 'payments',
      views: 890,
      helpful: 38,
      notHelpful: 5,
      lastUpdated: '2024-01-12',
      tags: ['دفع', 'مشاكل', 'حلول']
    },
    {
      id: 'kb_3',
      title: 'إعداد التطبيق للسائقين',
      content: 'كيفية تنزيل وإعداد تطبيق السائقين لأول مرة',
      category: 'drivers',
      views: 650,
      helpful: 28,
      notHelpful: 2,
      lastUpdated: '2024-01-08',
      tags: ['سائقين', 'تطبيق', 'إعداد']
    }
  ])

  // إحصائيات الدعم
  const [supportStats, setSupportStats] = useState({
    totalTickets: 156,
    openTickets: 23,
    inProgressTickets: 15,
    resolvedToday: 18,
    avgResponseTime: 22, // minutes
    avgResolutionTime: 4.5, // hours
    customerSatisfaction: 4.6,
    firstContactResolution: 78.5
  })

  // بيانات الرسوم البيانية
  const ticketTrendData = [
    { name: 'السبت', created: 24, resolved: 18, pending: 6 },
    { name: 'الأحد', created: 18, resolved: 22, pending: 2 },
    { name: 'الاثنين', created: 35, resolved: 28, pending: 9 },
    { name: 'الثلاثاء', created: 28, resolved: 32, pending: 5 },
    { name: 'الأربعاء', created: 32, resolved: 29, pending: 8 },
    { name: 'الخميس', created: 25, resolved: 27, pending: 6 },
    { name: 'الجمعة', created: 20, resolved: 23, pending: 3 }
  ]

  const categoryData = [
    { name: 'تقني', value: 45, color: '#EF4444' },
    { name: 'الفواتير', value: 25, color: '#3B82F6' },
    { name: 'عام', value: 20, color: '#10B981' },
    { name: 'طلب ميزة', value: 10, color: '#F59E0B' }
  ]

  const responseTimeData = [
    { hour: '00:00', avgTime: 15 },
    { hour: '04:00', avgTime: 8 },
    { hour: '08:00', avgTime: 25 },
    { hour: '12:00', avgTime: 35 },
    { hour: '16:00', avgTime: 28 },
    { hour: '20:00', avgTime: 18 }
  ]

  // تصفية التذاكر
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority
    const matchesAssignee = filterAssignee === 'all' || ticket.assigneeId === filterAssignee
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      case 'escalated': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'مفتوح'
      case 'in_progress': return 'قيد المعالجة'
      case 'resolved': return 'محلول'
      case 'closed': return 'مغلق'
      case 'escalated': return 'مُصعد'
      default: return 'غير محدد'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'critical': return 'حرجة'
      case 'high': return 'عالية'
      case 'medium': return 'متوسطة'
      case 'low': return 'منخفضة'
      default: return 'غير محدد'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'technical': return <Settings className="h-4 w-4 text-red-500" />
      case 'billing': return <DollarSign className="h-4 w-4 text-blue-500" />
      case 'general': return <MessageCircle className="h-4 w-4 text-green-500" />
      case 'feature_request': return <Zap className="h-4 w-4 text-purple-500" />
      default: return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getBusinessIcon = (type) => {
    switch (type) {
      case 'restaurant': return <Building2 className="h-4 w-4 text-blue-500" />
      case 'gym': return <Dumbbell className="h-4 w-4 text-purple-500" />
      case 'driver': return <Truck className="h-4 w-4 text-orange-500" />
      default: return <User className="h-4 w-4 text-gray-500" />
    }
  }

  const refreshData = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
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

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} دقيقة`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours} ساعة ${mins > 0 ? `و ${mins} دقيقة` : ''}`
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الدعم الفني</h1>
                <p className="text-gray-600">نظام شامل لإدارة التذاكر وخدمة العملاء</p>
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
                  to="/admin/support/tickets/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  تذكرة جديدة
                </Link>
              </div>
            </div>

            {/* بطاقات الإحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي التذاكر</p>
                    <p className="text-2xl font-bold text-gray-900">{supportStats.totalTickets}</p>
                    <div className="flex items-center text-sm text-blue-600 mt-1">
                      <FileText className="h-3 w-3 mr-1" />
                      <span>مفتوحة: {supportStats.openTickets}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Headphones className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">متوسط الاستجابة</p>
                    <p className="text-2xl font-bold text-gray-900">{supportStats.avgResponseTime} دقيقة</p>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>تحسن 15%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Timer className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">رضا العملاء</p>
                    <p className="text-2xl font-bold text-gray-900">{supportStats.customerSatisfaction}/5</p>
                    <div className="flex items-center text-sm text-yellow-600 mt-1">
                      <Star className="h-3 w-3 mr-1" />
                      <span>ممتاز</span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">محلولة اليوم</p>
                    <p className="text-2xl font-bold text-gray-900">{supportStats.resolvedToday}</p>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      <span>معدل الحل: {supportStats.firstContactResolution}%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
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
                  onClick={() => setActiveTab('tickets')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'tickets'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  التذاكر
                </button>
                <button
                  onClick={() => setActiveTab('team')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'team'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  فريق الدعم
                </button>
                <button
                  onClick={() => setActiveTab('knowledge')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'knowledge'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  قاعدة المعرفة
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

          {/* محتوى التذاكر */}
          {activeTab === 'tickets' && (
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
                        placeholder="ابحث عن تذكرة..."
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
                      <option value="open">مفتوح</option>
                      <option value="in_progress">قيد المعالجة</option>
                      <option value="resolved">محلول</option>
                      <option value="closed">مغلق</option>
                      <option value="escalated">مُصعد</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الأولوية</label>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">جميع الأولويات</option>
                      <option value="critical">حرجة</option>
                      <option value="high">عالية</option>
                      <option value="medium">متوسطة</option>
                      <option value="low">منخفضة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">المُعين</label>
                    <select
                      value={filterAssignee}
                      onChange={(e) => setFilterAssignee(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">جميع الموظفين</option>
                      {supportTeam.map(agent => (
                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* جدول التذاكر */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    التذاكر ({filteredTickets.length})
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          التذكرة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          العميل
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الفئة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الحالة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الأولوية
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المُعين إليه
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          آخر تحديث
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mr-3">
                                {getCategoryIcon(ticket.category)}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {ticket.title}
                                </div>
                                <div className="text-sm text-gray-500 max-w-md truncate">
                                  {ticket.description}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  {ticket.id} • {ticket.messageCount} رسائل
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {getBusinessIcon(ticket.businessType)}
                              <div className="mr-2">
                                <div className="text-sm font-medium text-gray-900">
                                  {ticket.customerName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {ticket.businessName || 'مستخدم فردي'}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {ticket.customerEmail}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {ticket.category === 'technical' ? 'تقني' :
                               ticket.category === 'billing' ? 'فواتير' :
                               ticket.category === 'general' ? 'عام' : 'طلب ميزة'}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {ticket.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="inline-flex px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                              {getStatusText(ticket.status)}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                              {getPriorityText(ticket.priority)}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {ticket.assignedTo}
                            </div>
                            <div className="text-xs text-gray-500">
                              استجابة: {formatDuration(ticket.responseTime)}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatTime(ticket.updatedAt)}
                            </div>
                            {ticket.satisfaction && (
                              <div className="flex items-center text-xs text-yellow-600">
                                <Star className="h-3 w-3 mr-1" />
                                {ticket.satisfaction}/5
                              </div>
                            )}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/admin/support/tickets/${ticket.id}`}
                                className="text-blue-600 hover:text-blue-900"
                                title="عرض التفاصيل"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                              
                              <button
                                className="text-green-600 hover:text-green-900"
                                title="رد"
                              >
                                <MessageCircle className="h-4 w-4" />
                              </button>
                              
                              {ticket.status === 'open' && (
                                <button
                                  className="text-orange-600 hover:text-orange-900"
                                  title="تصعيد"
                                >
                                  <Flag className="h-4 w-4" />
                                </button>
                              )}
                              
                              {ticket.status === 'resolved' && (
                                <button
                                  className="text-gray-600 hover:text-gray-900"
                                  title="أرشفة"
                                >
                                  <Archive className="h-4 w-4" />
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

                {filteredTickets.length === 0 && (
                  <div className="text-center py-12">
                    <Headphones className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد تذاكر</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm ? 'لا توجد نتائج للبحث الحالي' : 'لا توجد تذاكر دعم حالياً'}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* محتوى فريق الدعم */}
          {activeTab === 'team' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {supportTeam.map((agent) => (
                <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="mr-4 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{agent.name}</h3>
                      <p className="text-sm text-gray-500">{agent.email}</p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          agent.status === 'online' ? 'bg-green-100 text-green-800' :
                          agent.status === 'away' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-1 ${
                            agent.status === 'online' ? 'bg-green-500' :
                            agent.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`} />
                          {agent.status === 'online' ? 'متصل' :
                           agent.status === 'away' ? 'بعيد' : 'غير متصل'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">التذاكر النشطة</span>
                      <span className="text-sm font-medium text-gray-900">{agent.activeTickets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">محلولة اليوم</span>
                      <span className="text-sm font-medium text-gray-900">{agent.resolvedToday}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">متوسط الاستجابة</span>
                      <span className="text-sm font-medium text-gray-900">{agent.avgResponseTime} دقيقة</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">رضا العملاء</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">{agent.satisfaction}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">إجمالي محلولة</span>
                      <span className="text-sm font-medium text-gray-900">{agent.totalResolved}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">التخصص: {
                      agent.specialization === 'technical' ? 'تقني' :
                      agent.specialization === 'billing' ? 'فواتير' : 'عام'
                    }</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* محتوى قاعدة المعرفة */}
          {activeTab === 'knowledge' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  قاعدة المعرفة ({knowledgeBase.length})
                </h2>
                <Link 
                  to="/admin/support/knowledge/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  مقال جديد
                </Link>
              </div>

              <div className="divide-y divide-gray-200">
                {knowledgeBase.map((article) => (
                  <div key={article.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                            <p className="text-sm text-gray-500">{article.content}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-6">
                          <span className="text-xs text-gray-500">
                            الفئة: {article.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            المشاهدات: {article.views}
                          </span>
                          <span className="text-xs text-gray-500">
                            مفيد: {article.helpful}/{article.helpful + article.notHelpful}
                          </span>
                          <span className="text-xs text-gray-500">
                            آخر تحديث: {article.lastUpdated}
                          </span>
                        </div>
                        <div className="mt-2 flex gap-1">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="inline-flex px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
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

          {/* محتوى التحليلات */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* الرسوم البيانية */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* اتجاه التذاكر */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">اتجاه التذاكر الأسبوعي</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={ticketTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="created" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="منشأة" />
                      <Area type="monotone" dataKey="resolved" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="محلولة" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* توزيع الفئات */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع فئات التذاكر</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* أوقات الاستجابة */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">متوسط أوقات الاستجابة حسب الساعة</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} دقيقة`, 'متوسط الاستجابة']} />
                    <Line type="monotone" dataKey="avgTime" stroke="#F59E0B" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default SupportManagement