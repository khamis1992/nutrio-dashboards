import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  Dumbbell,
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
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreVertical,
  Download,
  RefreshCw,
  UserCheck,
  Activity
} from 'lucide-react'

const GymManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCity, setFilterCity] = useState('all')
  const [loading, setLoading] = useState(false)

  // بيانات تجريبية للصالات
  const [gyms, setGyms] = useState([
    {
      id: 1,
      name: 'نادي الأبطال الرياضي',
      nameEn: 'Champions Fitness Club',
      email: 'info@championsfitness.com',
      phone: '+966501234567',
      address: 'طريق الملك عبدالعزيز، الرياض',
      city: 'الرياض',
      status: 'active',
      rating: 4.6,
      totalMembers: 450,
      activeMembers: 380,
      monthlyRevenue: 85000,
      commission: 12,
      registrationDate: '2023-02-10',
      category: 'صالة متكاملة',
      image: '/api/placeholder/80/80',
      owner: 'خالد أحمد الرشيد',
      ownerPhone: '+966501234567',
      subscriptionPlan: 'premium',
      lastActive: '2024-01-15 11:20',
      facilities: ['أوزان حرة', 'آلات كارديو', 'حصص جماعية', 'ساونا'],
      performance: {
        memberGrowth: 15.5,
        revenueGrowth: 12.3,
        retentionRate: 85.2,
        classAttendance: 78
      }
    },
    {
      id: 2,
      name: 'فيتنس لايف',
      nameEn: 'Fitness Life',
      email: 'contact@fitnesslife.com',
      phone: '+966509876543',
      address: 'شارع الأمير سلطان، جدة',
      city: 'جدة',
      status: 'active',
      rating: 4.3,
      totalMembers: 320,
      activeMembers: 280,
      monthlyRevenue: 62000,
      commission: 10,
      registrationDate: '2023-05-15',
      category: 'صالة نسائية',
      image: '/api/placeholder/80/80',
      owner: 'نورا محمد العتيبي',
      ownerPhone: '+966509876543',
      subscriptionPlan: 'standard',
      lastActive: '2024-01-15 09:45',
      facilities: ['آلات كارديو', 'يوغا', 'زومبا', 'تدريب شخصي'],
      performance: {
        memberGrowth: 8.7,
        revenueGrowth: 6.5,
        retentionRate: 82.1,
        classAttendance: 65
      }
    },
    {
      id: 3,
      name: 'باور جيم',
      nameEn: 'Power Gym',
      email: 'info@powergym.com',
      phone: '+966512345678',
      address: 'شارع الخبر، الخبر',
      city: 'الخبر',
      status: 'pending',
      rating: 4.1,
      totalMembers: 180,
      activeMembers: 150,
      monthlyRevenue: 35000,
      commission: 8,
      registrationDate: '2024-01-05',
      category: 'كمال أجسام',
      image: '/api/placeholder/80/80',
      owner: 'عبدالرحمن سعد القحطاني',
      ownerPhone: '+966512345678',
      subscriptionPlan: 'basic',
      lastActive: '2024-01-14 15:30',
      facilities: ['أوزان حرة', 'آلات قوة', 'مكملات غذائية'],
      performance: {
        memberGrowth: 22.8,
        revenueGrowth: 18.4,
        retentionRate: 75.5,
        classAttendance: 45
      }
    },
    {
      id: 4,
      name: 'أكتيف زون',
      nameEn: 'Active Zone',
      email: 'hello@activezone.com',
      phone: '+966555123456',
      address: 'حي الصحافة، الرياض',
      city: 'الرياض',
      status: 'suspended',
      rating: 3.9,
      totalMembers: 95,
      activeMembers: 45,
      monthlyRevenue: 18000,
      commission: 15,
      registrationDate: '2023-09-20',
      category: 'صالة صغيرة',
      image: '/api/placeholder/80/80',
      owner: 'سلطان علي الدوسري',
      ownerPhone: '+966555123456',
      subscriptionPlan: 'basic',
      lastActive: '2024-01-10 13:15',
      facilities: ['آلات كارديو', 'أوزان أساسية'],
      performance: {
        memberGrowth: -12.5,
        revenueGrowth: -8.9,
        retentionRate: 45.2,
        classAttendance: 25
      }
    }
  ])

  const [stats, setStats] = useState({
    totalGyms: 4,
    activeGyms: 2,
    pendingGyms: 1,
    suspendedGyms: 1,
    totalMembers: 1045,
    totalRevenue: 200000,
    averageRating: 4.2,
    averageRetention: 72
  })

  // تصفية الصالات
  const filteredGyms = gyms.filter(gym => {
    const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gym.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gym.owner.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || gym.status === filterStatus
    const matchesCity = filterCity === 'all' || gym.city === filterCity
    
    return matchesSearch && matchesStatus && matchesCity
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'نشط'
      case 'pending': return 'قيد المراجعة'
      case 'suspended': return 'معلق'
      default: return 'غير محدد'
    }
  }

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'premium': return 'bg-purple-100 text-purple-800'
      case 'standard': return 'bg-blue-100 text-blue-800'
      case 'basic': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanText = (plan) => {
    switch (plan) {
      case 'premium': return 'بريميوم'
      case 'standard': return 'قياسي'
      case 'basic': return 'أساسي'
      default: return 'غير محدد'
    }
  }

  const refreshData = async () => {
    setLoading(true)
    // محاكاة تحديث البيانات
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة صالات الجيم</h1>
                <p className="text-gray-600">إدارة شاملة لجميع صالات الجيم المسجلة في النظام</p>
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
                  to="/admin/gyms/add"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-purple-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة صالة جديدة
                </Link>
              </div>
            </div>

            {/* بطاقات الإحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Dumbbell className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي الصالات</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalGyms}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">الصالات النشطة</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeGyms}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي الأعضاء</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()} ر.س</p>
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
                    placeholder="ابحث عن صالة، مالك، أو رقم هاتف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* فلتر الحالة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="active">نشط</option>
                  <option value="pending">قيد المراجعة</option>
                  <option value="suspended">معلق</option>
                </select>
              </div>

              {/* فلتر المدينة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المدينة</label>
                <select
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">جميع المدن</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="الخبر">الخبر</option>
                </select>
              </div>
            </div>
          </div>

          {/* جدول الصالات */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                قائمة صالات الجيم ({filteredGyms.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الصالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      صاحب الصالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الخطة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الأعضاء
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الأداء
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإيرادات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredGyms.map((gym) => (
                    <tr key={gym.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={gym.image}
                            alt={gym.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">
                              {gym.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {gym.nameEn}
                            </div>
                            <div className="flex items-center mt-1">
                              <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">{gym.city}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {gym.owner}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          {gym.ownerPhone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-3 w-3 mr-1" />
                          {gym.email}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(gym.status)}`}>
                          {getStatusText(gym.status)}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(gym.subscriptionPlan)}`}>
                          {getPlanText(gym.subscriptionPlan)}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-blue-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {gym.activeMembers}/{gym.totalMembers}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {gym.category}
                        </div>
                        <div className="flex items-center text-xs">
                          {gym.performance.memberGrowth > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                          )}
                          <span className={gym.performance.memberGrowth > 0 ? 'text-green-600' : 'text-red-600'}>
                            {gym.performance.memberGrowth > 0 ? '+' : ''}{gym.performance.memberGrowth}%
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {gym.rating}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          احتفاظ {gym.performance.retentionRate}%
                        </div>
                        <div className="text-xs text-gray-500">
                          حضور {gym.performance.classAttendance}%
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {gym.monthlyRevenue.toLocaleString()} ر.س
                        </div>
                        <div className="text-xs text-gray-500">
                          عمولة {gym.commission}%
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/gyms/${gym.id}`}
                            className="text-purple-600 hover:text-purple-900"
                            title="عرض التفاصيل"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          
                          <Link
                            to={`/admin/gyms/${gym.id}/edit`}
                            className="text-green-600 hover:text-green-900"
                            title="تعديل"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          
                          <button
                            className="text-red-600 hover:text-red-900"
                            title="حذف"
                          >
                            <Trash2 className="h-4 w-4" />
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

            {filteredGyms.length === 0 && (
              <div className="text-center py-12">
                <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد صالات جيم</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'لا توجد نتائج للبحث الحالي' : 'ابدأ بإضافة أول صالة جيم'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default GymManagement