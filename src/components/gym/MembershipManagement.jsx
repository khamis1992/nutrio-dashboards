import React, { useState } from 'react'
import { 
  Users, 
  CreditCard, 
  Calendar, 
  Clock, 
  DollarSign,
  TrendingUp,
  UserPlus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Activity,
  Award,
  AlertCircle,
  CheckCircle,
  Pause,
  Play
} from 'lucide-react'
import { LoadingSpinner, CardSkeleton } from '../ui/loading'
import { NoUsers, NoSearchResults } from '../ui/empty-states'
import { useToast } from '../ui/notifications'

const MembershipManagement = () => {
  const [loading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [_selectedMembers] = useState([])
  const { toast } = useToast()

  // Mock members data
  const [members] = useState([
    {
      id: 1,
      name: 'أحمد محمد علي',
      email: 'ahmed@example.com',
      phone: '0501234567',
      joinDate: '2024-01-15',
      membershipType: 'premium',
      status: 'active',
      expiryDate: '2024-12-15',
      lastVisit: '2024-08-09',
      totalVisits: 45,
      avatar: null,
      address: 'الرياض، حي النخيل',
      emergencyContact: '0509876543',
      birthDate: '1990-05-20',
      goals: ['فقدان الوزن', 'بناء العضلات'],
      trainer: 'محمد أحمد',
      paymentStatus: 'paid',
      monthlyFee: 300
    },
    {
      id: 2,
      name: 'فاطمة أحمد',
      email: 'fatima@example.com',
      phone: '0507654321',
      joinDate: '2024-02-20',
      membershipType: 'basic',
      status: 'active',
      expiryDate: '2024-11-20',
      lastVisit: '2024-08-08',
      totalVisits: 32,
      avatar: null,
      address: 'الرياض، حي الملز',
      emergencyContact: '0501112233',
      birthDate: '1985-08-15',
      goals: ['اللياقة العامة', 'تحسين الصحة'],
      trainer: 'سارة محمد',
      paymentStatus: 'paid',
      monthlyFee: 200
    },
    {
      id: 3,
      name: 'محمد علي',
      email: 'mohammed@example.com',
      phone: '0509876543',
      joinDate: '2024-03-10',
      membershipType: 'premium',
      status: 'frozen',
      expiryDate: '2024-10-10',
      lastVisit: '2024-07-15',
      totalVisits: 28,
      avatar: null,
      address: 'الرياض، حي العليا',
      emergencyContact: '0507778899',
      birthDate: '1992-12-03',
      goals: ['بناء العضلات', 'زيادة القوة'],
      trainer: 'خالد أحمد',
      paymentStatus: 'overdue',
      monthlyFee: 300
    },
    {
      id: 4,
      name: 'نورا سالم',
      email: 'nora@example.com',
      phone: '0502223344',
      joinDate: '2024-04-05',
      membershipType: 'basic',
      status: 'expired',
      expiryDate: '2024-07-05',
      lastVisit: '2024-07-01',
      totalVisits: 15,
      avatar: null,
      address: 'الرياض، حي الورود',
      emergencyContact: '0505556677',
      birthDate: '1988-03-25',
      goals: ['فقدان الوزن', 'تحسين اللياقة'],
      trainer: 'ليلى محمد',
      paymentStatus: 'unpaid',
      monthlyFee: 200
    }
  ])

  const membershipTypes = {
    basic: { name: 'أساسية', color: 'bg-blue-100 text-blue-800', price: 200 },
    premium: { name: 'مميزة', color: 'bg-purple-100 text-purple-800', price: 300 },
    vip: { name: 'VIP', color: 'bg-gold-100 text-gold-800', price: 500 }
  }

  const statusTypes = {
    active: { name: 'نشط', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    frozen: { name: 'مجمد', color: 'bg-blue-100 text-blue-800', icon: Pause },
    expired: { name: 'منتهي', color: 'bg-red-100 text-red-800', icon: AlertCircle },
    pending: { name: 'معلق', color: 'bg-yellow-100 text-yellow-800', icon: Clock }
  }

  const paymentStatusTypes = {
    paid: { name: 'مدفوع', color: 'bg-green-100 text-green-800' },
    overdue: { name: 'متأخر', color: 'bg-red-100 text-red-800' },
    unpaid: { name: 'غير مدفوع', color: 'bg-gray-100 text-gray-800' }
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm)
    
    const matchesFilter = filterStatus === 'all' || member.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const stats = {
    totalMembers: members.length,
    activeMembers: members.filter(m => m.status === 'active').length,
    expiringSoon: members.filter(m => {
      const expiryDate = new Date(m.expiryDate)
      const thirtyDaysFromNow = new Date()
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
      return expiryDate <= thirtyDaysFromNow && m.status === 'active'
    }).length,
    monthlyRevenue: members.filter(m => m.paymentStatus === 'paid').reduce((sum, m) => sum + m.monthlyFee, 0)
  }

  const handleMemberAction = (action) => {
    switch (action) {
      case 'activate':
        toast.success('تم تفعيل العضوية بنجاح')
        break
      case 'freeze':
        toast.success('تم تجميد العضوية بنجاح')
        break
      case 'renew':
        toast.success('تم تجديد العضوية بنجاح')
        break
      case 'delete':
        toast.success('تم حذف العضو بنجاح')
        break
      default:
        break
    }
  }

  const getDaysUntilExpiry = (expiryDate) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">إجمالي الأعضاء</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMembers}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">الأعضاء النشطين</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeMembers}</p>
            </div>
            <Activity className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">تنتهي قريباً</p>
              <p className="text-2xl font-bold text-orange-600">{stats.expiringSoon}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">الإيرادات الشهرية</p>
              <p className="text-2xl font-bold text-purple-600">{stats.monthlyRevenue.toLocaleString()} ريال</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="البحث عن عضو..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="frozen">مجمد</option>
              <option value="expired">منتهي</option>
              <option value="pending">معلق</option>
            </select>
          </div>

          <div className="flex space-x-2 space-x-reverse">
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              <UserPlus className="w-4 h-4 ml-2" />
              إضافة عضو
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-6">
            <CardSkeleton />
          </div>
        ) : filteredMembers.length === 0 ? (
          searchTerm ? (
            <NoSearchResults searchTerm={searchTerm} onClearSearch={() => setSearchTerm('')} />
          ) : (
            <NoUsers userType="الأعضاء" />
          )
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    العضو
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    نوع العضوية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الانتهاء
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    حالة الدفع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    آخر زيارة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => {
                  const StatusIcon = statusTypes[member.status].icon
                  const daysUntilExpiry = getDaysUntilExpiry(member.expiryDate)
                  
                  return (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-medium">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                            <div className="text-sm text-gray-500">{member.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${membershipTypes[member.membershipType].color}`}>
                          {membershipTypes[member.membershipType].name}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {member.monthlyFee} ريال/شهر
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <StatusIcon className="w-4 h-4 ml-2" />
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusTypes[member.status].color}`}>
                            {statusTypes[member.status].name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(member.expiryDate).toLocaleDateString('ar-SA')}
                        </div>
                        <div className={`text-xs ${daysUntilExpiry <= 30 ? 'text-red-600' : 'text-gray-500'}`}>
                          {daysUntilExpiry > 0 ? `${daysUntilExpiry} يوم متبقي` : 'منتهية'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${paymentStatusTypes[member.paymentStatus].color}`}>
                          {paymentStatusTypes[member.paymentStatus].name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(member.lastVisit).toLocaleDateString('ar-SA')}
                        <div className="text-xs text-gray-500">
                          {member.totalVisits} زيارة إجمالية
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2 space-x-reverse">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          {member.status === 'active' ? (
                            <button 
                              onClick={() => handleMemberAction('freeze', member.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Pause className="w-4 h-4" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleMemberAction('activate', member.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                          <button 
                            onClick={() => handleMemberAction('delete', member.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default MembershipManagement

