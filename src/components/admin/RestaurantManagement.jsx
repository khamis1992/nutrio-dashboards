import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  Building2,
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
  ShoppingBag,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreVertical,
  Download,
  RefreshCw
} from 'lucide-react'

const RestaurantManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCity, setFilterCity] = useState('all')
  const [loading, setLoading] = useState(false)

  // بيانات تجريبية للمطاعم
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'مطعم الذواقة',
      nameEn: 'Al Zawaqah Restaurant',
      email: 'info@alzawaqah.com',
      phone: '+966501234567',
      address: 'طريق الملك فهد، الرياض',
      city: 'الرياض',
      status: 'active',
      rating: 4.5,
      totalOrders: 1250,
      monthlyRevenue: 125000,
      commission: 15,
      registrationDate: '2023-01-15',
      category: 'مأكولات عربية',
      image: '/api/placeholder/80/80',
      owner: 'أحمد محمد السالم',
      ownerPhone: '+966501234567',
      subscriptionPlan: 'premium',
      lastActive: '2024-01-15 10:30',
      performance: {
        orderGrowth: 12.5,
        revenueGrowth: 8.3,
        customerSatisfaction: 4.5
      }
    },
    {
      id: 2,
      name: 'برجر هاوس',
      nameEn: 'Burger House',
      email: 'contact@burgerhouse.com',
      phone: '+966509876543',
      address: 'شارع التحلية، جدة',
      city: 'جدة',
      status: 'active',
      rating: 4.2,
      totalOrders: 980,
      monthlyRevenue: 95000,
      commission: 12,
      registrationDate: '2023-03-20',
      category: 'وجبات سريعة',
      image: '/api/placeholder/80/80',
      owner: 'سارة علي الأحمد',
      ownerPhone: '+966509876543',
      subscriptionPlan: 'standard',
      lastActive: '2024-01-15 09:15',
      performance: {
        orderGrowth: -2.1,
        revenueGrowth: 5.7,
        customerSatisfaction: 4.2
      }
    },
    {
      id: 3,
      name: 'مطعم البحر الأبيض',
      nameEn: 'White Sea Restaurant',
      email: 'info@whitesea.com',
      phone: '+966512345678',
      address: 'كورنيش الدمام',
      city: 'الدمام',
      status: 'pending',
      rating: 4.0,
      totalOrders: 450,
      monthlyRevenue: 52000,
      commission: 10,
      registrationDate: '2024-01-10',
      category: 'مأكولات بحرية',
      image: '/api/placeholder/80/80',
      owner: 'محمد عبدالله الخالد',
      ownerPhone: '+966512345678',
      subscriptionPlan: 'basic',
      lastActive: '2024-01-14 16:45',
      performance: {
        orderGrowth: 25.3,
        revenueGrowth: 18.9,
        customerSatisfaction: 4.0
      }
    },
    {
      id: 4,
      name: 'كافيه الياسمين',
      nameEn: 'Jasmine Cafe',
      email: 'hello@jasminecafe.com',
      phone: '+966555123456',
      address: 'حي النرجس، الرياض',
      city: 'الرياض',
      status: 'suspended',
      rating: 3.8,
      totalOrders: 320,
      monthlyRevenue: 28000,
      commission: 15,
      registrationDate: '2023-11-05',
      category: 'مشروبات ومقبلات',
      image: '/api/placeholder/80/80',
      owner: 'فاطمة سالم المطيري',
      ownerPhone: '+966555123456',
      subscriptionPlan: 'standard',
      lastActive: '2024-01-12 14:20',
      performance: {
        orderGrowth: -15.2,
        revenueGrowth: -8.4,
        customerSatisfaction: 3.8
      }
    }
  ])

  const [stats, setStats] = useState({
    totalRestaurants: 4,
    activeRestaurants: 2,
    pendingRestaurants: 1,
    suspendedRestaurants: 1,
    totalRevenue: 300000,
    averageRating: 4.1,
    totalOrders: 3000
  })

  // تصفية المطاعم
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.owner.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || restaurant.status === filterStatus
    const matchesCity = filterCity === 'all' || restaurant.city === filterCity
    
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة المطاعم</h1>
                <p className="text-gray-600">إدارة شاملة لجميع المطاعم المسجلة في النظام</p>
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
                  to="/admin/restaurants/add"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة مطعم جديد
                </Link>
              </div>
            </div>

            {/* بطاقات الإحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي المطاعم</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalRestaurants}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">المطاعم النشطة</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeRestaurants}</p>
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

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">متوسط التقييم</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
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
                    placeholder="ابحث عن مطعم، مالك، أو رقم هاتف..."
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع المدن</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="الدمام">الدمام</option>
                </select>
              </div>
            </div>
          </div>

          {/* جدول المطاعم */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                قائمة المطاعم ({filteredRestaurants.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المطعم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      صاحب المطعم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الخطة
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
                  {filteredRestaurants.map((restaurant) => (
                    <tr key={restaurant.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">
                              {restaurant.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {restaurant.nameEn}
                            </div>
                            <div className="flex items-center mt-1">
                              <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">{restaurant.city}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {restaurant.owner}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          {restaurant.ownerPhone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-3 w-3 mr-1" />
                          {restaurant.email}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(restaurant.status)}`}>
                          {getStatusText(restaurant.status)}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanColor(restaurant.subscriptionPlan)}`}>
                          {getPlanText(restaurant.subscriptionPlan)}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {restaurant.rating}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {restaurant.totalOrders} طلب
                        </div>
                        <div className="flex items-center text-xs">
                          {restaurant.performance.orderGrowth > 0 ? (
                            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                          )}
                          <span className={restaurant.performance.orderGrowth > 0 ? 'text-green-600' : 'text-red-600'}>
                            {restaurant.performance.orderGrowth > 0 ? '+' : ''}{restaurant.performance.orderGrowth}%
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {restaurant.monthlyRevenue.toLocaleString()} ر.س
                        </div>
                        <div className="text-xs text-gray-500">
                          عمولة {restaurant.commission}%
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/restaurants/${restaurant.id}`}
                            className="text-blue-600 hover:text-blue-900"
                            title="عرض التفاصيل"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          
                          <Link
                            to={`/admin/restaurants/${restaurant.id}/edit`}
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

            {filteredRestaurants.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">لا توجد مطاعم</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'لا توجد نتائج للبحث الحالي' : 'ابدأ بإضافة أول مطعم'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default RestaurantManagement