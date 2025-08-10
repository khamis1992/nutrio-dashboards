import { useState, useEffect } from 'react'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  Users, 
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Shield,
  Settings,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Ban,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Upload,
  RefreshCw,
  Building2,
  Dumbbell,
  Truck,
  Crown,
  Star,
  ChevronDown
} from 'lucide-react'

const UserManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddUser, setShowAddUser] = useState(false)
  const [showUserDetails, setShowUserDetails] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  // بيانات المستخدمين (محاكاة)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'أحمد محمد العلي',
      email: 'ahmed.ali@example.com',
      phone: '+966501234567',
      role: 'super_admin',
      status: 'active',
      avatar: null,
      lastLogin: '2025-01-10 14:30',
      joinDate: '2024-01-15',
      location: 'الرياض',
      permissions: ['all'],
      businessId: null,
      businessName: null,
      loginCount: 245,
      rating: 5.0
    },
    {
      id: 2,
      name: 'فاطمة عبدالرحمن',
      email: 'fatima.abdulrahman@example.com',
      phone: '+966502345678',
      role: 'restaurant_manager',
      status: 'active',
      avatar: null,
      lastLogin: '2025-01-10 12:15',
      joinDate: '2024-03-20',
      location: 'جدة',
      permissions: ['restaurant_management', 'orders', 'menu'],
      businessId: 101,
      businessName: 'مطعم البيت الشامي',
      loginCount: 156,
      rating: 4.8
    },
    {
      id: 3,
      name: 'محمد خالد السعيد',
      email: 'mohammed.said@example.com',
      phone: '+966503456789',
      role: 'gym_manager',
      status: 'active',
      avatar: null,
      lastLogin: '2025-01-10 09:45',
      joinDate: '2024-05-10',
      location: 'الدمام',
      permissions: ['gym_management', 'members', 'trainers'],
      businessId: 201,
      businessName: 'صالة فتنس بلس',
      loginCount: 89,
      rating: 4.6
    },
    {
      id: 4,
      name: 'سارة أحمد النمر',
      email: 'sara.alnamir@example.com',
      phone: '+966504567890',
      role: 'restaurant_staff',
      status: 'inactive',
      avatar: null,
      lastLogin: '2025-01-08 16:20',
      joinDate: '2024-07-25',
      location: 'مكة',
      permissions: ['orders', 'kitchen'],
      businessId: 102,
      businessName: 'مطعم الأصالة',
      loginCount: 67,
      rating: 4.2
    },
    {
      id: 5,
      name: 'عبدالله المطيري',
      email: 'abdullah.mutairi@example.com',
      phone: '+966505678901',
      role: 'driver',
      status: 'active',
      avatar: null,
      lastLogin: '2025-01-10 15:00',
      joinDate: '2024-09-12',
      location: 'الرياض',
      permissions: ['delivery'],
      businessId: null,
      businessName: null,
      loginCount: 234,
      rating: 4.9
    },
    {
      id: 6,
      name: 'نورا عبدالعزيز',
      email: 'nora.abdelaziz@example.com',
      phone: '+966506789012',
      role: 'trainer',
      status: 'active',
      avatar: null,
      lastLogin: '2025-01-10 11:30',
      joinDate: '2024-11-05',
      location: 'جدة',
      permissions: ['training', 'members'],
      businessId: 202,
      businessName: 'صالة الطاقة',
      loginCount: 45,
      rating: 4.7
    },
    {
      id: 7,
      name: 'خالد الأحمد',
      email: 'khaled.ahmad@example.com',
      phone: '+966507890123',
      role: 'driver',
      status: 'blocked',
      avatar: null,
      lastLogin: '2025-01-09 20:15',
      joinDate: '2024-06-18',
      location: 'الدمام',
      permissions: ['delivery'],
      businessId: null,
      businessName: null,
      loginCount: 178,
      rating: 3.8
    },
    {
      id: 8,
      name: 'رنا محمد الزهراني',
      email: 'rana.alzahrani@example.com',
      phone: '+966508901234',
      role: 'admin',
      status: 'active',
      avatar: null,
      lastLogin: '2025-01-10 13:45',
      joinDate: '2024-02-28',
      location: 'مكة',
      permissions: ['user_management', 'reports', 'settings'],
      businessId: null,
      businessName: null,
      loginCount: 198,
      rating: 4.5
    }
  ])

  // الأدوار والصلاحيات
  const roles = {
    super_admin: {
      name: 'مدير عام',
      icon: Crown,
      color: 'purple',
      description: 'صلاحيات كاملة لجميع أجزاء النظام'
    },
    admin: {
      name: 'مدير',
      icon: Shield,
      color: 'blue',
      description: 'صلاحيات إدارية محدودة'
    },
    restaurant_manager: {
      name: 'مدير مطعم',
      icon: Building2,
      color: 'green',
      description: 'إدارة مطعم واحد'
    },
    gym_manager: {
      name: 'مدير صالة جيم',
      icon: Dumbbell,
      color: 'orange',
      description: 'إدارة صالة جيم واحدة'
    },
    restaurant_staff: {
      name: 'موظف مطعم',
      icon: Building2,
      color: 'gray',
      description: 'موظف في المطعم'
    },
    trainer: {
      name: 'مدرب',
      icon: Dumbbell,
      color: 'indigo',
      description: 'مدرب في صالة الجيم'
    },
    driver: {
      name: 'سائق',
      icon: Truck,
      color: 'yellow',
      description: 'سائق توصيل'
    }
  }

  // إحصائيات المستخدمين
  const userStats = [
    {
      title: 'إجمالي المستخدمين',
      value: users.length,
      icon: Users,
      color: 'blue',
      description: 'مستخدم مسجل'
    },
    {
      title: 'المستخدمين النشطين',
      value: users.filter(u => u.status === 'active').length,
      icon: UserCheck,
      color: 'green',
      description: 'مستخدم نشط'
    },
    {
      title: 'المستخدمين غير النشطين',
      value: users.filter(u => u.status === 'inactive').length,
      icon: UserX,
      color: 'orange',
      description: 'مستخدم غير نشط'
    },
    {
      title: 'المستخدمين المحظورين',
      value: users.filter(u => u.status === 'blocked').length,
      icon: Ban,
      color: 'red',
      description: 'مستخدم محظور'
    }
  ]

  // تصفية المستخدمين
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm)
    
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-orange-600 bg-orange-100'
      case 'blocked': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle
      case 'inactive': return XCircle
      case 'blocked': return Ban
      default: return AlertTriangle
    }
  }

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId)
      } else {
        return [...prev, userId]
      }
    })
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(currentUsers.map(user => user.id))
    }
  }

  const handleViewUser = (user) => {
    setSelectedUser(user)
    setShowUserDetails(true)
  }

  const handleDeleteUser = (userId) => {
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      setUsers(prev => prev.filter(user => user.id !== userId))
    }
  }

  const handleBulkAction = (action) => {
    if (selectedUsers.length === 0) return

    switch (action) {
      case 'activate':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? {...user, status: 'active'} : user
        ))
        break
      case 'deactivate':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? {...user, status: 'inactive'} : user
        ))
        break
      case 'block':
        setUsers(prev => prev.map(user => 
          selectedUsers.includes(user.id) ? {...user, status: 'blocked'} : user
        ))
        break
      case 'delete':
        if (confirm(`هل أنت متأكد من حذف ${selectedUsers.length} مستخدم؟`)) {
          setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)))
        }
        break
    }
    setSelectedUsers([])
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar 
        isCollapsed={sidebarCollapsed} 
        setIsCollapsed={setSidebarCollapsed} 
      />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="إدارة المستخدمين"
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 p-6 space-y-6">
          {/* إحصائيات المستخدمين */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* أدوات التحكم */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <h2 className="text-lg font-semibold text-gray-900">جميع المستخدمين</h2>
                  <span className="text-sm text-gray-500">({filteredUsers.length} مستخدم)</span>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <button 
                    onClick={() => setShowAddUser(true)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مستخدم
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Upload className="w-4 h-4 ml-2" />
                    استيراد
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4 ml-2" />
                    تصدير
                  </button>
                </div>
              </div>
            </div>

            {/* البحث والفلترة */}
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="البحث في المستخدمين..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">جميع الأدوار</option>
                  {Object.entries(roles).map(([key, role]) => (
                    <option key={key} value={key}>{role.name}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                  <option value="blocked">محظور</option>
                </select>

                <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4 ml-2" />
                  فلاتر متقدمة
                </button>
              </div>
            </div>

            {/* الإجراءات المجمعة */}
            {selectedUsers.length > 0 && (
              <div className="p-4 bg-blue-50 border-b border-blue-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600">
                    تم اختيار {selectedUsers.length} مستخدم
                  </span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button 
                      onClick={() => handleBulkAction('activate')}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded"
                    >
                      تفعيل
                    </button>
                    <button 
                      onClick={() => handleBulkAction('deactivate')}
                      className="px-3 py-1 text-sm bg-orange-600 text-white rounded"
                    >
                      إلغاء تفعيل
                    </button>
                    <button 
                      onClick={() => handleBulkAction('block')}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                    >
                      حظر
                    </button>
                    <button 
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1 text-sm bg-gray-600 text-white rounded"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* جدول المستخدمين */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-right">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-gray-300"
                      />
                    </th>
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
                      آخر تسجيل دخول
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التقييم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((user) => {
                    const role = roles[user.role]
                    const RoleIcon = role?.icon || Users
                    const StatusIcon = getStatusIcon(user.status)
                    
                    return (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleSelectUser(user.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center ml-3">
                              <span className="text-blue-600 font-medium">
                                {user.name.split(' ')[0].charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                              <div className="text-xs text-gray-400">{user.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className={`p-1 rounded bg-${role?.color || 'gray'}-100 ml-2`}>
                              <RoleIcon className={`w-4 h-4 text-${role?.color || 'gray'}-600`} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{role?.name}</div>
                              {user.businessName && (
                                <div className="text-xs text-gray-500">{user.businessName}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <StatusIcon className="w-4 h-4 ml-2" />
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                              {user.status === 'active' ? 'نشط' : 
                               user.status === 'inactive' ? 'غير نشط' : 'محظور'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 ml-1" />
                            <span className="text-sm text-gray-900">{user.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <button 
                              onClick={() => handleViewUser(user)}
                              className="p-1 text-gray-400 hover:text-blue-600"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1 text-gray-400 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    عرض {indexOfFirstUser + 1} إلى {Math.min(indexOfLastUser, filteredUsers.length)} من {filteredUsers.length} مستخدم
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                    >
                      السابق
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 border rounded ${
                          currentPage === page 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                    >
                      التالي
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal تفاصيل المستخدم */}
      {showUserDetails && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">تفاصيل المستخدم</h3>
                <button 
                  onClick={() => setShowUserDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* معلومات شخصية */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">المعلومات الشخصية</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">الاسم</label>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">البريد الإلكتروني</label>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">رقم الهاتف</label>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">الموقع</label>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.location}</p>
                  </div>
                </div>
              </div>

              {/* معلومات الحساب */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">معلومات الحساب</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">الدور</label>
                    <p className="text-sm font-medium text-gray-900">{roles[selectedUser.role]?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">الحالة</label>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status === 'active' ? 'نشط' : 
                       selectedUser.status === 'inactive' ? 'غير نشط' : 'محظور'}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">تاريخ التسجيل</label>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.joinDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">آخر تسجيل دخول</label>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.lastLogin}</p>
                  </div>
                </div>
              </div>

              {/* إحصائيات */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">الإحصائيات</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">عدد تسجيلات الدخول</label>
                    <p className="text-sm font-medium text-gray-900">{selectedUser.loginCount}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">التقييم</label>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 ml-1" />
                      <span className="text-sm font-medium text-gray-900">{selectedUser.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* الصلاحيات */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-4">الصلاحيات</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.permissions.map((permission, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement