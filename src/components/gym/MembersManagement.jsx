import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GymSidebar from '../layout/GymSidebar'
import GymHeader from '../layout/GymHeader'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Eye,
  Edit,
  Trash2,
  Clock,
  UserCheck,
  UserX,
  Calendar,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from 'lucide-react'

const MembersManagement = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMembers, setSelectedMembers] = useState([])
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)

  // إحصائيات الأعضاء
  const memberStats = [
    {
      title: 'إجمالي الأعضاء',
      value: '342',
      change: '+15%',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'الأعضاء النشطين',
      value: '289',
      change: '+8%',
      trend: 'up',
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'اشتراكات منتهية',
      value: '43',
      change: '+12%',
      trend: 'up',
      icon: Clock,
      color: 'orange'
    },
    {
      title: 'أعضاء مجمدين',
      value: '10',
      change: '-5%',
      trend: 'down',
      icon: Pause,
      color: 'gray'
    }
  ]

  // بيانات الأعضاء التجريبية
  const allMembers = [
    {
      id: 1,
      name: 'أحمد محمد علي',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      membershipType: 'ذهبية',
      status: 'نشط',
      joinDate: '2024-01-15',
      expiryDate: '2024-07-15',
      lastVisit: '2024-01-08',
      avatar: null,
      address: 'الرياض، حي النرجس'
    },
    {
      id: 2,
      name: 'فاطمة أحمد سالم',
      email: 'fatima@example.com',
      phone: '+966507654321',
      membershipType: 'فضية',
      status: 'نشط',
      joinDate: '2024-02-01',
      expiryDate: '2024-08-01',
      lastVisit: '2024-01-07',
      avatar: null,
      address: 'الرياض، حي العليا'
    },
    {
      id: 3,
      name: 'محمد عبدالله الحربي',
      email: 'mohammed@example.com',
      phone: '+966509876543',
      membershipType: 'برونزية',
      status: 'منتهي',
      joinDate: '2023-08-10',
      expiryDate: '2024-01-10',
      lastVisit: '2024-01-05',
      avatar: null,
      address: 'الرياض، حي الملز'
    },
    {
      id: 4,
      name: 'سارة عبدالرحمن الشهري',
      email: 'sara@example.com',
      phone: '+966502468135',
      membershipType: 'ذهبية',
      status: 'مجمد',
      joinDate: '2023-12-01',
      expiryDate: '2024-06-01',
      lastVisit: '2023-12-28',
      avatar: null,
      address: 'الرياض، حي الورود'
    },
    {
      id: 5,
      name: 'خالد سعد الدوسري',
      email: 'khalid@example.com',
      phone: '+966503691470',
      membershipType: 'فضية',
      status: 'نشط',
      joinDate: '2024-01-01',
      expiryDate: '2024-07-01',
      lastVisit: '2024-01-08',
      avatar: null,
      address: 'الرياض، حي السليمانية'
    }
  ]

  // طلبات العضوية الجديدة
  const membershipRequests = [
    {
      id: 1,
      name: 'عبدالعزيز محمد القحطاني',
      email: 'abdulaziz@example.com',
      phone: '+966501357924',
      requestedType: 'ذهبية',
      requestDate: '2024-01-08',
      status: 'معلق'
    },
    {
      id: 2,
      name: 'نورا عبدالله الرشيد',
      email: 'nora@example.com',
      phone: '+966507531864',
      requestedType: 'فضية',
      requestDate: '2024-01-07',
      status: 'معلق'
    }
  ]

  // تصفية الأعضاء حسب التبويب النشط
  const getFilteredMembers = () => {
    let filtered = allMembers
    
    switch (activeTab) {
      case 'active':
        filtered = allMembers.filter(member => member.status === 'نشط')
        break
      case 'expired':
        filtered = allMembers.filter(member => member.status === 'منتهي')
        break
      case 'frozen':
        filtered = allMembers.filter(member => member.status === 'مجمد')
        break
      case 'requests':
        return membershipRequests
      default:
        filtered = allMembers
    }

    if (searchQuery) {
      filtered = filtered.filter(member => 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.phone.includes(searchQuery)
      )
    }

    return filtered
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800'
      case 'منتهي': return 'bg-red-100 text-red-800'
      case 'مجمد': return 'bg-gray-100 text-gray-800'
      case 'معلق': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMembershipTypeColor = (type) => {
    switch (type) {
      case 'ذهبية': return 'bg-yellow-100 text-yellow-800'
      case 'فضية': return 'bg-gray-100 text-gray-800'
      case 'برونزية': return 'bg-orange-100 text-orange-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const tabs = [
    { id: 'all', name: 'جميع الأعضاء', count: allMembers.length },
    { id: 'active', name: 'الأعضاء النشطين', count: allMembers.filter(m => m.status === 'نشط').length },
    { id: 'expired', name: 'اشتراكات منتهية', count: allMembers.filter(m => m.status === 'منتهي').length },
    { id: 'frozen', name: 'أعضاء مجمدين', count: allMembers.filter(m => m.status === 'مجمد').length },
    { id: 'requests', name: 'طلبات العضوية', count: membershipRequests.length },
    { id: 'add', name: 'إضافة عضو جديد', count: null }
  ]

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <GymSidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col">
        <GymHeader />
        
        <main className="flex-1 p-6">
          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {memberStats.map((stat, index) => {
              const Icon = stat.icon
              const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                      <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <TrendIcon className="w-3 h-3" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* شريط التبويبات */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="flex flex-wrap gap-2 p-4 border-b border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.name}
                  {tab.count !== null && (
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id ? 'bg-purple-200' : 'bg-gray-200'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* أدوات البحث والتصفية - تظهر لجميع التبويبات عدا إضافة عضو */}
            {activeTab !== 'add' && (
              <div className="p-4 flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* شريط البحث */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="البحث في الأعضاء..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-80"
                    />
                  </div>

                  {/* فلتر */}
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    تصفية
                  </button>
                </div>

                <div className="flex gap-2">
                  {/* تصدير البيانات */}
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    تصدير
                  </button>

                  {/* تحديث */}
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <RefreshCw className="w-4 h-4" />
                    تحديث
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* المحتوى حسب التبويب النشط */}
          {activeTab === 'add' ? (
            // نموذج إضافة عضو جديد
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">إضافة عضو جديد</h2>
                <p className="text-gray-600">املأ البيانات التالية لإضافة عضو جديد للصالة</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* الاسم الكامل */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الكامل *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="أدخل الاسم الكامل"
                    />
                  </div>

                  {/* البريد الإلكتروني */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني *
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="أدخل البريد الإلكتروني"
                    />
                  </div>

                  {/* رقم الهاتف */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف *
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+966xxxxxxxxx"
                    />
                  </div>

                  {/* نوع العضوية */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع العضوية *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">اختر نوع العضوية</option>
                      <option value="bronze">برونزية - 200 ريال/شهر</option>
                      <option value="silver">فضية - 300 ريال/شهر</option>
                      <option value="gold">ذهبية - 500 ريال/شهر</option>
                    </select>
                  </div>

                  {/* تاريخ الميلاد */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ الميلاد
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  {/* الجنس */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الجنس
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">اختر الجنس</option>
                      <option value="male">ذكر</option>
                      <option value="female">أنثى</option>
                    </select>
                  </div>
                </div>

                {/* العنوان */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="أدخل العنوان التفصيلي"
                  ></textarea>
                </div>

                {/* أزرار الحفظ */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    حفظ العضو
                  </button>
                </div>
              </form>
            </div>
          ) : activeTab === 'requests' ? (
            // طلبات العضوية
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">طلبات العضوية الجديدة</h2>
                <p className="text-gray-600 mt-1">راجع واعتمد طلبات العضوية الجديدة</p>
              </div>

              <div className="divide-y divide-gray-100">
                {membershipRequests.map((request) => (
                  <div key={request.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{request.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {request.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {request.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className={`px-3 py-1 rounded-full text-sm ${getMembershipTypeColor(request.requestedType)}`}>
                            {request.requestedType}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{request.requestDate}</div>
                        </div>

                        <div className="flex gap-2">
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // جدول الأعضاء
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">العضو</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">معلومات التواصل</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">نوع العضوية</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">الحالة</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">تاريخ الانتهاء</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">آخر زيارة</th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-gray-700">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {getFilteredMembers().map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 font-semibold">
                                {member.name.split(' ')[0].charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {member.address}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="text-sm text-gray-900 flex items-center gap-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              {member.email}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              {member.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm ${getMembershipTypeColor(member.membershipType)}`}>
                            {member.membershipType}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(member.status)}`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900">{member.expiryDate}</div>
                          <div className="text-xs text-gray-500">
                            انضم في {member.joinDate}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900">{member.lastVisit}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => navigate(`/gym/members/${member.id}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                              <Edit className="w-4 h-4" />
                            </button>
                            {member.status === 'نشط' && (
                              <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg">
                                <Pause className="w-4 h-4" />
                              </button>
                            )}
                            {member.status === 'مجمد' && (
                              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                                <Play className="w-4 h-4" />
                              </button>
                            )}
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  عرض 1-{getFilteredMembers().length} من {getFilteredMembers().length} عضو
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                    السابق
                  </button>
                  <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm hover:bg-gray-50">
                    التالي
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default MembersManagement