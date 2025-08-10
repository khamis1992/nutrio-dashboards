import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  Truck,
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
  Shield,
  Calendar
} from 'lucide-react'

const DriversManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCity, setFilterCity] = useState('all')
  const [loading, setLoading] = useState(false)

  // بيانات تجريبية للسائقين
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'محمد أحمد السالم',
      nameEn: 'Mohammed Ahmed Al-Salem',
      email: 'mohammed.salem@email.com',
      phone: '+966501234567',
      nationalId: '1234567890',
      city: 'الرياض',
      status: 'active',
      availability: 'available',
      rating: 4.8,
      totalDeliveries: 485,
      monthlyEarnings: 8500,
      commission: 20,
      joinDate: '2023-03-15',
      vehicleType: 'دراجة نارية',
      vehicleModel: 'هوندا 150',
      plateNumber: 'أ ب ج 1234',
      image: '/api/placeholder/80/80',
      licenseExpiry: '2025-12-31',
      lastDelivery: '2024-01-15 14:30',
      performance: {
        deliverySuccess: 97.5,
        onTimeDelivery: 92.3,
        customerSatisfaction: 4.8,
        earnings: 8500
      },
      documents: {
        license: 'verified',
        registration: 'verified',
        insurance: 'pending'
      }
    },
    {
      id: 2,
      name: 'عبدالله خالد الرشيد',
      nameEn: 'Abdullah Khalid Al-Rashid',
      email: 'abdullah.rashid@email.com',
      phone: '+966509876543',
      nationalId: '2345678901',
      city: 'جدة',
      status: 'active',
      availability: 'busy',
      rating: 4.6,
      totalDeliveries: 320,
      monthlyEarnings: 6200,
      commission: 18,
      joinDate: '2023-07-20',
      vehicleType: 'سيارة صغيرة',
      vehicleModel: 'تويوتا يارس',
      plateNumber: 'د هـ و 5678',
      image: '/api/placeholder/80/80',
      licenseExpiry: '2024-08-15',
      lastDelivery: '2024-01-15 16:45',
      performance: {
        deliverySuccess: 95.2,
        onTimeDelivery: 88.7,
        customerSatisfaction: 4.6,
        earnings: 6200
      },
      documents: {
        license: 'verified',
        registration: 'verified',
        insurance: 'verified'
      }
    },
    {
      id: 3,
      name: 'سالم محمد العتيبي',
      nameEn: 'Salem Mohammed Al-Otaibi',
      email: 'salem.otaibi@email.com',
      phone: '+966512345678',
      nationalId: '3456789012',
      city: 'الدمام',
      status: 'pending',
      availability: 'offline',
      rating: 4.2,
      totalDeliveries: 125,
      monthlyEarnings: 2800,
      commission: 15,
      joinDate: '2024-01-05',
      vehicleType: 'دراجة نارية',
      vehicleModel: 'ياماها 125',
      plateNumber: 'ز ح ط 9012',
      image: '/api/placeholder/80/80',
      licenseExpiry: '2025-03-20',
      lastDelivery: '2024-01-14 12:15',
      performance: {
        deliverySuccess: 89.5,
        onTimeDelivery: 85.2,
        customerSatisfaction: 4.2,
        earnings: 2800
      },
      documents: {
        license: 'pending',
        registration: 'verified',
        insurance: 'pending'
      }
    },
    {
      id: 4,
      name: 'فهد علي الدوسري',
      nameEn: 'Fahad Ali Al-Dosari',
      email: 'fahad.dosari@email.com',
      phone: '+966555123456',
      nationalId: '4567890123',
      city: 'الرياض',
      status: 'suspended',
      availability: 'offline',
      rating: 3.8,
      totalDeliveries: 89,
      monthlyEarnings: 1200,
      commission: 12,
      joinDate: '2023-11-10',
      vehicleType: 'دراجة نارية',
      vehicleModel: 'سوزوكي 100',
      plateNumber: 'ي ك ل 3456',
      image: '/api/placeholder/80/80',
      licenseExpiry: '2024-06-30',
      lastDelivery: '2024-01-08 09:20',
      performance: {
        deliverySuccess: 82.1,
        onTimeDelivery: 75.8,
        customerSatisfaction: 3.8,
        earnings: 1200
      },
      documents: {
        license: 'expired',
        registration: 'verified',
        insurance: 'expired'
      }
    }
  ])

  const [stats, setStats] = useState({
    totalDrivers: 4,
    activeDrivers: 2,
    availableDrivers: 1,
    busyDrivers: 1,
    totalDeliveries: 1019,
    totalEarnings: 18700,
    averageRating: 4.35,
    successRate: 91
  })

  // تصفية السائقين
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm) ||
                         driver.plateNumber.includes(searchTerm)
    
    const matchesStatus = filterStatus === 'all' || driver.status === filterStatus
    const matchesCity = filterCity === 'all' || driver.city === filterCity
    
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

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-orange-100 text-orange-800'
      case 'offline': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'available': return 'متاح'
      case 'busy': return 'مشغول'
      case 'offline': return 'غير متصل'
      default: return 'غير محدد'
    }
  }

  const getVehicleIcon = (vehicleType) => {
    if (vehicleType.includes('دراجة')) {
      return <Navigation className="h-4 w-4 text-blue-500" />
    }
    return <Car className="h-4 w-4 text-blue-500" />
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة السائقين</h1>
                <p className="text-gray-600">إدارة شاملة لجميع السائقين وعمليات التوصيل</p>
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
                  to="/admin/drivers/add"
                  className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-orange-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة سائق جديد
                </Link>
              </div>
            </div>

            {/* بطاقات الإحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Truck className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي السائقين</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalDrivers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">السائقون النشطون</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeDrivers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Navigation className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي التوصيلات</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalDeliveries}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي الأرباح</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalEarnings.toLocaleString()} ر.س</p>
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
                    placeholder="ابحث عن سائق، رقم هاتف، أو رقم لوحة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* فلتر الحالة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="all">جميع المدن</option>
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="الدمام">الدمام</option>
                </select>
              </div>
            </div>
          </div>

          {/* جدول السائقين */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                قائمة السائقين ({filteredDrivers.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      السائق
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      معلومات الاتصال
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المركبة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الأداء
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الأرباح
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المستندات
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDrivers.map((driver) => (
                    <tr key={driver.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={driver.image}
                            alt={driver.name}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">
                              {driver.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {driver.nameEn}
                            </div>
                            <div className="flex items-center mt-1">
                              <MapPin className="h-3 w-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">{driver.city}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          {driver.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-3 w-3 mr-1" />
                          {driver.email}
                        </div>
                        <div className="text-xs text-gray-500">
                          هوية: {driver.nationalId}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(driver.status)}`}>
                            {getStatusText(driver.status)}
                          </span>
                          <div>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAvailabilityColor(driver.availability)}`}>
                              {getAvailabilityText(driver.availability)}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm">
                          {getVehicleIcon(driver.vehicleType)}
                          <span className="mr-2 font-medium text-gray-900">
                            {driver.vehicleType}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {driver.vehicleModel}
                        </div>
                        <div className="text-xs text-gray-500">
                          {driver.plateNumber}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900">
                            {driver.rating}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {driver.totalDeliveries} توصيلة
                        </div>
                        <div className="text-xs text-green-600">
                          نجاح {driver.performance.deliverySuccess}%
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {driver.monthlyEarnings.toLocaleString()} ر.س
                        </div>
                        <div className="text-xs text-gray-500">
                          عمولة {driver.commission}%
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                            driver.documents.license === 'verified' ? 'bg-green-100 text-green-800' :
                            driver.documents.license === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            <Shield className="h-3 w-3 mr-1" />
                            رخصة
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${
                            driver.documents.insurance === 'verified' ? 'bg-green-100 text-green-800' :
                            driver.documents.insurance === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            <Shield className="h-3 w-3 mr-1" />
                            تأمين
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/drivers/${driver.id}`}
                            className="text-orange-600 hover:text-orange-900"
                            title="عرض التفاصيل"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                          
                          <Link
                            to={`/admin/drivers/${driver.id}/edit`}
                            className="text-green-600 hover:text-green-900"
                            title="تعديل"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          
                          <Link
                            to={`/admin/drivers/${driver.id}/tracking`}
                            className="text-blue-600 hover:text-blue-900"
                            title="تتبع"
                          >
                            <Navigation className="h-4 w-4" />
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

            {filteredDrivers.length === 0 && (
              <div className="text-center py-12">
                <Truck className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">لا يوجد سائقون</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm ? 'لا توجد نتائج للبحث الحالي' : 'ابدأ بإضافة أول سائق'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DriversManagement