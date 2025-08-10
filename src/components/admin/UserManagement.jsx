import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  Users,
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
  Flag,
  Shield,
  ShieldCheck,
  UserPlus,
  UserMinus,
  Crown,
  Key,
  Lock,
  Unlock,
  Ban,
  UserX,
  Calendar as CalendarIcon,
  Globe,
  Smartphone as SmartphoneIcon
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const UserManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterRegistrationDate, setFilterRegistrationDate] = useState('all')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('users')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showBulkActions, setShowBulkActions] = useState(false)

  // بيانات تجريبية للمستخدمين
  const [users, setUsers] = useState([
    {
      id: 'USR-2024-001',
      name: 'أحمد محمد السالم',
      email: 'ahmed.salem@email.com',
      phone: '+966501234567',
      role: 'customer',
      status: 'active',
      avatar: '/api/placeholder/40/40',
      registrationDate: '2024-01-15',
      lastLogin: '2024-01-15 14:30',
      totalOrders: 125,
      totalSpent: 4250,
      loyaltyPoints: 850,
      businessType: null,
      businessName: null,
      location: 'الرياض',
      verified: true,
      suspended: false,
      notes: '',
      permissions: ['place_orders', 'view_history']
    },
    {
      id: 'USR-2024-002',
      name: 'سارة أحمد الرشيد',
      email: 'sara.rashid@email.com',
      phone: '+966509876543',
      role: 'gym_owner',
      status: 'active',
      avatar: '/api/placeholder/40/40',
      registrationDate: '2024-01-10',
      lastLogin: '2024-01-15 09:15',
      totalOrders: 0,
      totalSpent: 0,
      loyaltyPoints: 0,
      businessType: 'gym',
      businessName: 'نادي الأبطال الرياضي',
      location: 'جدة',
      verified: true,
      suspended: false,
      notes: 'شريك متميز',
      permissions: ['manage_gym', 'view_analytics', 'manage_classes']
    },
    {
      id: 'USR-2024-003',
      name: 'محمد عبدالله الأحمد',
      email: 'mohammed.ahmed@email.com',
      phone: '+966512345678',
      role: 'restaurant_owner',
      status: 'active',
      avatar: '/api/placeholder/40/40',
      registrationDate: '2024-01-08',
      lastLogin: '2024-01-15 11:45',
      totalOrders: 0,
      totalSpent: 0,
      loyaltyPoints: 0,
      businessType: 'restaurant',
      businessName: 'مطعم الذواقة',
      location: 'الدمام',
      verified: true,
      suspended: false,
      notes: '',
      permissions: ['manage_restaurant', 'view_orders', 'manage_menu']
    },
    {
      id: 'USR-2024-004',
      name: 'خالد سعد المطيري',
      email: 'khalid.mutairi@email.com',
      phone: '+966555123456',
      role: 'driver',
      status: 'active',
      avatar: '/api/placeholder/40/40',
      registrationDate: '2024-01-12',
      lastLogin: '2024-01-15 16:20',
      totalOrders: 0,
      totalSpent: 0,
      loyaltyPoints: 0,
      businessType: 'driver',
      businessName: null,
      location: 'الرياض',
      verified: true,
      suspended: false,
      notes: 'سائق ممتاز',
      permissions: ['accept_deliveries', 'view_routes', 'update_status']
    },
    {
      id: 'USR-2024-005',
      name: 'فاطمة علي الزهراني',
      email: 'fatima.zahrani@email.com',
      phone: '+966544332211',
      role: 'admin',
      status: 'active',
      avatar: '/api/placeholder/40/40',
      registrationDate: '2024-01-05',
      lastLogin: '2024-01-15 08:00',
      totalOrders: 0,
      totalSpent: 0,
      loyaltyPoints: 0,
      businessType: null,
      businessName: null,
      location: 'الرياض',
      verified: true,
      suspended: false,
      notes: 'مدير النظام',
      permissions: ['full_access', 'manage_users', 'system_settings']
    },
    {
      id: 'USR-2024-006',
      name: 'نورا محمد العتيبي',
      email: 'nora.otaibi@email.com',
      phone: '+966533445566',
      role: 'customer',
      status: 'suspended',
      avatar: '/api/placeholder/40/40',
      registrationDate: '2024-01-14',
      lastLogin: '2024-01-14 20:30',
      totalOrders: 15,
      totalSpent: 450,
      loyaltyPoints: 90,
      businessType: null,
      businessName: null,
      location: 'مكة',
      verified: false,
      suspended: true,
      notes: 'موقوف مؤقتاً - شكاوى متعددة',
      permissions: []
    }
  ])

  // إحصائيات المستخدمين
  const [userStats, setUserStats] = useState({
    totalUsers: 8945,
    activeUsers: 8234,
    newUsersToday: 45,
    suspendedUsers: 56,
    verifiedUsers: 8456,
    unverifiedUsers: 489,
    customerCount: 7200,
    businessOwnerCount: 385,
    driverCount: 1250,
    adminCount: 110
  })

  // بيانات نمو المستخدمين
  const userGrowthData = [
    { month: 'يناير', total: 7800, customers: 6240, businesses: 320, drivers: 1100, admins: 140 },
    { month: 'فبراير', total: 8100, customers: 6480, businesses: 335, drivers: 1150, admins: 135 },
    { month: 'مارس', total: 8350, customers: 6680, businesses: 350, drivers: 1180, admins: 140 },
    { month: 'أبريل', total: 8450, customers: 6760, businesses: 360, drivers: 1200, admins: 130 },
    { month: 'مايو', total: 8750, customers: 7000, businesses: 375, drivers: 1225, admins: 150 },
    { month: 'يونيو', total: 8945, customers: 7200, businesses: 385, drivers: 1250, admins: 110 }
  ]

  // بيانات توزيع المستخدمين حسب المناطق
  const userLocationData = [
    { region: 'الرياض', users: 3578, percentage: 40 },
    { region: 'جدة', users: 2506, percentage: 28 },
    { region: 'الدمام', users: 1252, percentage: 14 },
    { region: 'مكة', users: 894, percentage: 10 },
    { region: 'أخرى', users: 715, percentage: 8 }
  ]

  // بيانات نشاط المستخدمين
  const userActivityData = [
    { day: 'السبت', active: 6500, new: 45 },
    { day: 'الأحد', active: 7200, new: 52 },
    { day: 'الاثنين', active: 8100, new: 38 },
    { day: 'الثلاثاء', active: 7800, new: 41 },
    { day: 'الأربعاء', active: 7600, new: 47 },
    { day: 'الخميس', active: 8200, new: 55 },
    { day: 'الجمعة', active: 6800, new: 48 }
  ]

  // الأدوار والصلاحيات
  const [roles, setRoles] = useState([
    {
      id: 'customer',
      name: 'عميل',
      description: 'المستخدمين العاديين الذين يطلبون الخدمات',
      userCount: 7200,
      permissions: ['place_orders', 'view_history', 'rate_service', 'contact_support'],
      color: '#3B82F6'
    },
    {
      id: 'restaurant_owner',
      name: 'صاحب مطعم',
      description: 'أصحاب المطاعم المسجلين في النظام',
      userCount: 280,
      permissions: ['manage_restaurant', 'view_orders', 'manage_menu', 'view_analytics', 'manage_staff'],
      color: '#10B981'
    },
    {
      id: 'gym_owner',
      name: 'صاحب صالة جيم',
      description: 'أصحاب صالات الجيم المسجلين في النظام',
      userCount: 105,
      permissions: ['manage_gym', 'view_analytics', 'manage_classes', 'manage_members', 'view_reports'],
      color: '#8B5CF6'
    },
    {
      id: 'driver',
      name: 'سائق',
      description: 'السائقين المسؤولين عن التوصيل',
      userCount: 1250,
      permissions: ['accept_deliveries', 'view_routes', 'update_status', 'contact_customers'],
      color: '#F59E0B'
    },
    {
      id: 'support',
      name: 'دعم فني',
      description: 'فريق الدعم الفني وخدمة العملاء',
      userCount: 45,
      permissions: ['view_tickets', 'respond_tickets', 'access_knowledge_base', 'escalate_issues'],
      color: '#EF4444'
    },
    {
      id: 'admin',
      name: 'مدير النظام',
      description: 'مديري النظام مع صلاحيات كاملة',
      userCount: 65,
      permissions: ['full_access', 'manage_users', 'system_settings', 'view_all_analytics', 'manage_roles'],
      color: '#DC2626'
    }
  ])

  // تصفية المستخدمين
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    
    const registrationDate = new Date(user.registrationDate)
    const now = new Date()
    const daysDiff = Math.floor((now - registrationDate) / (1000 * 60 * 60 * 24))
    
    let matchesRegistration = true
    if (filterRegistrationDate === 'today') matchesRegistration = daysDiff === 0
    else if (filterRegistrationDate === 'week') matchesRegistration = daysDiff <= 7
    else if (filterRegistrationDate === 'month') matchesRegistration = daysDiff <= 30
    
    return matchesSearch && matchesRole && matchesStatus && matchesRegistration
  })

  const getRoleColor = (role) => {
    const roleData = roles.find(r => r.id === role)
    return roleData ? roleData.color : '#6B7280'
  }

  const getRoleName = (role) => {
    const roleData = roles.find(r => r.id === role)
    return roleData ? roleData.name : role
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'نشط'
      case 'inactive': return 'غير نشط'
      case 'suspended': return 'موقوف'
      case 'pending': return 'قيد الانتظار'
      default: return 'غير محدد'
    }
  }

  const handleUserSelection = (userId) => {
    setSelectedUsers(prev => {
      const newSelection = prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
      setShowBulkActions(newSelection.length > 0)
      return newSelection
    })
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
      setShowBulkActions(false)
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id))
      setShowBulkActions(true)
    }
  }

  const refreshData = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return '-'
    return new Date(timestamp).toLocaleString('ar-SA', {
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المستخدمين</h1>
                <p className="text-gray-600">نظام شامل لإدارة المستخدمين والأدوار والصلاحيات</p>
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
                  to="/admin/users/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  مستخدم جديد
                </Link>
              </div>
            </div>

            {/* بطاقات الإحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.totalUsers.toLocaleString()}</p>
                    <div className="flex items-center text-sm text-blue-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+5.2%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">نشطين</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.activeUsers.toLocaleString()}</p>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <UserCheck className="h-3 w-3 mr-1" />
                      <span>{((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">جدد اليوم</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.newUsersToday}</p>
                    <div className="flex items-center text-sm text-purple-600 mt-1">
                      <UserPlus className="h-3 w-3 mr-1" />
                      <span>+12 أمس</span>
                    </div>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <UserPlus className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">موقوفين</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.suspendedUsers}</p>
                    <div className="flex items-center text-sm text-red-600 mt-1">
                      <Ban className="h-3 w-3 mr-1" />
                      <span>{((userStats.suspendedUsers / userStats.totalUsers) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Ban className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">موثقين</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.verifiedUsers.toLocaleString()}</p>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <ShieldCheck className="h-3 w-3 mr-1" />
                      <span>{((userStats.verifiedUsers / userStats.totalUsers) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <ShieldCheck className="h-6 w-6 text-yellow-600" />
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
                  onClick={() => setActiveTab('users')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'users'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  المستخدمين
                </button>
                <button
                  onClick={() => setActiveTab('roles')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'roles'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  الأدوار والصلاحيات
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

          {/* محتوى المستخدمين */}
          {activeTab === 'users' && (
            <>
              {/* الإجراءات المجمعة */}
              {showBulkActions && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-blue-800">
                        تم تحديد {selectedUsers.length} مستخدم
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                        <UserCheck className="h-4 w-4 mr-1" />
                        تفعيل
                      </button>
                      <button className="inline-flex items-center px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        <Ban className="h-4 w-4 mr-1" />
                        إيقاف
                      </button>
                      <button className="inline-flex items-center px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
                        <Send className="h-4 w-4 mr-1" />
                        رسالة
                      </button>
                      <button 
                        onClick={() => {setSelectedUsers([]); setShowBulkActions(false)}}
                        className="inline-flex items-center px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        إلغاء
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* فلاتر البحث */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">البحث</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="ابحث عن مستخدم..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الدور</label>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">جميع الأدوار</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">جميع الحالات</option>
                      <option value="active">نشط</option>
                      <option value="inactive">غير نشط</option>
                      <option value="suspended">موقوف</option>
                      <option value="pending">قيد الانتظار</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ التسجيل</label>
                    <select
                      value={filterRegistrationDate}
                      onChange={(e) => setFilterRegistrationDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">جميع التواريخ</option>
                      <option value="today">اليوم</option>
                      <option value="week">هذا الأسبوع</option>
                      <option value="month">هذا الشهر</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* جدول المستخدمين */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                      onChange={handleSelectAll}
                      className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <h2 className="text-lg font-semibold text-gray-900">
                      المستخدمين ({filteredUsers.length})
                    </h2>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          المستخدم
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الدور
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الحالة
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          النشاط
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الموقع
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          تاريخ التسجيل
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleUserSelection(user.id)}
                                className="mr-3 h-4 w-4 text-blue-600 rounded border-gray-300"
                              />
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="h-10 w-10 rounded-full object-cover mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900 flex items-center">
                                  {user.name}
                                  {user.verified && (
                                    <ShieldCheck className="h-4 w-4 text-green-500 mr-1" />
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                                <div className="text-xs text-gray-400">{user.phone}</div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span 
                              className="inline-flex px-2 py-1 text-xs font-semibold rounded-full text-white"
                              style={{backgroundColor: getRoleColor(user.role)}}
                            >
                              {getRoleName(user.role)}
                            </span>
                            {user.businessName && (
                              <div className="text-xs text-gray-500 mt-1">{user.businessName}</div>
                            )}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                              {getStatusText(user.status)}
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="text-sm text-gray-900">
                              آخر دخول: {formatTime(user.lastLogin)}
                            </div>
                            {user.role === 'customer' && (
                              <div className="text-xs text-gray-500">
                                {user.totalOrders} طلب • {user.loyaltyPoints} نقطة
                              </div>
                            )}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                              {user.location}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(user.registrationDate)}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/admin/users/${user.id}`}
                                className="text-blue-600 hover:text-blue-900"
                                title="عرض التفاصيل"
                              >
                                <Eye className="h-4 w-4" />
                              </Link>
                              
                              <button
                                className="text-green-600 hover:text-green-900"
                                title="تعديل"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              
                              {user.status === 'active' ? (
                                <button
                                  className="text-orange-600 hover:text-orange-900"
                                  title="إيقاف"
                                >
                                  <Lock className="h-4 w-4" />
                                </button>
                              ) : (
                                <button
                                  className="text-green-600 hover:text-green-900"
                                  title="تفعيل"
                                >
                                  <Unlock className="h-4 w-4" />
                                </button>
                              )}
                              
                              <button
                                className="text-blue-600 hover:text-blue-900"
                                title="رسالة"
                              >
                                <Send className="h-4 w-4" />
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

                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد مستخدمين</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm ? 'لا توجد نتائج للبحث الحالي' : 'لا توجد مستخدمين حالياً'}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* محتوى الأدوار */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">الأدوار والصلاحيات</h2>
                <Link 
                  to="/admin/users/roles/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  دور جديد
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role) => (
                  <div key={role.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div 
                          className="p-2 rounded-lg mr-3"
                          style={{backgroundColor: `${role.color}20`}}
                        >
                          <Shield className="h-6 w-6" style={{color: role.color}} />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                          <p className="text-sm text-gray-500">{role.userCount} مستخدم</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">الصلاحيات:</h4>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <span key={index} className="inline-flex px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                            {permission}
                          </span>
                        ))}
                        {role.permissions.length > 3 && (
                          <span className="inline-flex px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                            +{role.permissions.length - 3} أخرى
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-2">
                      <button className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                        <Edit className="h-4 w-4 mr-1" />
                        تعديل
                      </button>
                      <button className="inline-flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* محتوى التحليلات */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* نمو المستخدمين */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">نمو المستخدمين الشهري</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="total" stroke="#3B82F6" name="إجمالي" strokeWidth={3} />
                    <Line type="monotone" dataKey="customers" stroke="#10B981" name="عملاء" />
                    <Line type="monotone" dataKey="businesses" stroke="#F59E0B" name="أعمال" />
                    <Line type="monotone" dataKey="drivers" stroke="#8B5CF6" name="سائقين" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* توزيع المستخدمين حسب المناطق */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع المستخدمين حسب المناطق</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={userLocationData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="users"
                        nameKey="region"
                        label={({ region, percentage }) => `${region} ${percentage}%`}
                      >
                        {userLocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${index * 72}, 70%, 60%)`} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* نشاط المستخدمين الأسبوعي */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">نشاط المستخدمين الأسبوعي</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="active" fill="#3B82F6" name="نشطين" />
                      <Bar dataKey="new" fill="#10B981" name="جدد" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default UserManagement