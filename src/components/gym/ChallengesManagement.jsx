import { useState } from 'react'
import GymSidebar from '@/components/layout/GymSidebar'
import GymHeader from '@/components/layout/GymHeader'
import { 
  Trophy,
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Users,
  Target,
  TrendingUp,
  CheckCircle,
  X,
  Save,
  RefreshCw,
  Star,
  Award,
  Medal,
  Clock,
  Play,
  Pause,
  Flag,
  Crown,
  Zap,
  Activity
} from 'lucide-react'

const ChallengesManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [saving, setSaving] = useState(false)

  // التحديات والمسابقات
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'تحدي خسارة الوزن الشتوي',
      description: 'مسابقة شهرية لخسارة الوزن مع جوائز قيمة للفائزين',
      type: 'weight_loss',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      status: 'active',
      participants: 45,
      maxParticipants: 50,
      entryFee: 100,
      totalPrizePool: 4500,
      prizes: {
        first: { amount: 2000, type: 'cash' },
        second: { amount: 1500, type: 'cash' },
        third: { amount: 1000, type: 'cash' }
      },
      rules: [
        'يجب فقدان الوزن بطريقة صحية',
        'قياس الوزن أسبوعياً',
        'حضور 3 جلسات تدريب أسبوعياً كحد أدنى'
      ],
      metrics: ['weight_loss_percentage', 'attendance'],
      leaderboard: [
        { rank: 1, memberId: 101, memberName: 'أحمد محمد', progress: 8.5, unit: 'كجم' },
        { rank: 2, memberId: 102, memberName: 'سارة أحمد', progress: 7.2, unit: 'كجم' },
        { rank: 3, memberId: 103, memberName: 'محمد علي', progress: 6.8, unit: 'كجم' }
      ],
      createdBy: 'أحمد المدرب',
      createdAt: '2024-01-25'
    },
    {
      id: 2,
      title: 'مسابقة القوة البدنية',
      description: 'تحدي شهري لزيادة القوة في التمارين الأساسية',
      type: 'strength',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      status: 'active',
      participants: 32,
      maxParticipants: 40,
      entryFee: 150,
      totalPrizePool: 4800,
      prizes: {
        first: { amount: 2500, type: 'cash' },
        second: { amount: 1500, type: 'voucher' },
        third: { amount: 800, type: 'supplement' }
      },
      rules: [
        'تسجيل أقصى وزن في 3 تمارين أساسية',
        'يجب وجود مدرب أثناء الاختبار',
        'محاولة واحدة فقط كل أسبوع'
      ],
      metrics: ['bench_press', 'squat', 'deadlift'],
      leaderboard: [
        { rank: 1, memberId: 104, memberName: 'خالد أحمد', progress: 320, unit: 'كجم مجموع' },
        { rank: 2, memberId: 105, memberName: 'فهد محمد', progress: 295, unit: 'كجم مجموع' },
        { rank: 3, memberId: 106, memberName: 'عبدالله سالم', progress: 280, unit: 'كجم مجموع' }
      ],
      createdBy: 'خالد المدرب',
      createdAt: '2024-01-20'
    },
    {
      id: 3,
      title: 'تحدي الحضور الشهري',
      description: 'مسابقة للأعضاء الأكثر التزاماً بالحضور',
      type: 'attendance',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'completed',
      participants: 89,
      maxParticipants: 100,
      entryFee: 0,
      totalPrizePool: 3000,
      prizes: {
        first: { amount: 1500, type: 'voucher' },
        second: { amount: 1000, type: 'voucher' },
        third: { amount: 500, type: 'supplement' }
      },
      rules: [
        'الحد الأدنى 20 يوم حضور في الشهر',
        'لا تحتسب أيام الجمعة والعطل',
        'يجب تسجيل الدخول والخروج'
      ],
      metrics: ['attendance_days'],
      leaderboard: [
        { rank: 1, memberId: 107, memberName: 'نورا أحمد', progress: 28, unit: 'يوم' },
        { rank: 2, memberId: 108, memberName: 'ريم محمد', progress: 27, unit: 'يوم' },
        { rank: 3, memberId: 109, memberName: 'سلمان علي', progress: 26, unit: 'يوم' }
      ],
      createdBy: 'إدارة الصالة',
      createdAt: '2023-12-25'
    }
  ])

  const challengeTypes = [
    { value: 'weight_loss', label: 'خسارة الوزن', icon: Target },
    { value: 'strength', label: 'القوة', icon: Zap },
    { value: 'cardio', label: 'الكارديو', icon: Activity },
    { value: 'attendance', label: 'الحضور', icon: Calendar },
    { value: 'custom', label: 'مخصص', icon: Star }
  ]

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    upcoming: 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  }

  const statusLabels = {
    active: 'نشط',
    upcoming: 'قادم',
    completed: 'مكتمل',
    cancelled: 'ملغي'
  }

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || challenge.type === filterType
    const matchesTab = activeTab === 'all' || challenge.status === activeTab
    
    return matchesSearch && matchesType && matchesTab
  })

  const renderChallengeCard = (challenge) => (
    <div key={challenge.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3 space-x-reverse">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Trophy className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
            <p className="text-sm text-gray-600">{challenge.description}</p>
            <div className="flex items-center space-x-2 space-x-reverse mt-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[challenge.status]}`}>
                {statusLabels[challenge.status]}
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {challengeTypes.find(t => t.value === challenge.type)?.label}
              </span>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-purple-600">{challenge.participants}</div>
          <div className="text-xs text-gray-600">مشارك</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-green-600">{challenge.totalPrizePool}</div>
          <div className="text-xs text-gray-600">ر.س جوائز</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-blue-600">{challenge.entryFee}</div>
          <div className="text-xs text-gray-600">ر.س اشتراك</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-orange-600">
            {Math.ceil((new Date(challenge.endDate) - new Date()) / (1000 * 60 * 60 * 24))}
          </div>
          <div className="text-xs text-gray-600">يوم متبقي</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>المشاركة ({challenge.participants}/{challenge.maxParticipants})</span>
          <span>{Math.round((challenge.participants / challenge.maxParticipants) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full" 
            style={{ width: `${(challenge.participants / challenge.maxParticipants) * 100}%` }}
          ></div>
        </div>
      </div>

      {challenge.leaderboard && challenge.leaderboard.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">المتصدرون</h4>
          <div className="space-y-2">
            {challenge.leaderboard.slice(0, 3).map((leader) => (
              <div key={leader.rank} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    leader.rank === 1 ? 'bg-yellow-500 text-white' :
                    leader.rank === 2 ? 'bg-gray-400 text-white' :
                    'bg-orange-500 text-white'
                  }`}>
                    {leader.rank}
                  </div>
                  <span className="text-sm font-medium">{leader.memberName}</span>
                </div>
                <span className="text-sm text-gray-600">{leader.progress} {leader.unit}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>بدأ في: {challenge.startDate}</span>
        <div className="flex space-x-2 space-x-reverse">
          <button 
            onClick={() => setSelectedChallenge(challenge)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            title="عرض التفاصيل"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="تحرير">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="حذف">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const AddChallengeModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      type: '',
      startDate: '',
      endDate: '',
      maxParticipants: '',
      entryFee: '',
      prizes: {
        first: { amount: '', type: 'cash' },
        second: { amount: '', type: 'cash' },
        third: { amount: '', type: 'cash' }
      },
      rules: [''],
      metrics: []
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      // معالجة إضافة التحدي
      console.log('إضافة تحدي جديد:', formData)
      setShowAddModal(false)
    }

    if (!showAddModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">إضافة تحدي جديد</h2>
            <button 
              onClick={() => setShowAddModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عنوان التحدي
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  نوع التحدي
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">اختر النوع</option>
                  {challengeTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ البداية
                </label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ النهاية
                </label>
                <input
                  type="date"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الحد الأقصى للمشاركين
                </label>
                <input
                  type="number"
                  required
                  value={formData.maxParticipants}
                  onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رسوم الاشتراك (ريال)
                </label>
                <input
                  type="number"
                  value={formData.entryFee}
                  onChange={(e) => setFormData({...formData, entryFee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وصف التحدي
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex justify-end space-x-3 space-x-reverse pt-4">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center space-x-2 space-x-reverse"
              >
                <Save className="h-4 w-4" />
                <span>إنشاء التحدي</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <GymSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <GymHeader title="إدارة التحديات والمسابقات" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
          <div className="p-6">
            {/* علامات التبويب */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 space-x-reverse px-6" aria-label="Tabs">
                  {[
                    { id: 'active', name: 'نشط', icon: Play },
                    { id: 'upcoming', name: 'قادم', icon: Clock },
                    { id: 'completed', name: 'مكتمل', icon: CheckCircle },
                    { id: 'all', name: 'الكل', icon: Trophy }
                  ].map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                          activeTab === tab.id
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 space-x-reverse`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* أدوات التحكم */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
                  <div className="flex space-x-4 space-x-reverse">
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="text"
                        placeholder="البحث عن تحدي..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                      />
                    </div>
                    
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="all">جميع الأنواع</option>
                      {challengeTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center space-x-2 space-x-reverse"
                  >
                    <Plus className="h-4 w-4" />
                    <span>إضافة تحدي جديد</span>
                  </button>
                </div>

                {/* إحصائيات سريعة */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">إجمالي التحديات</p>
                        <p className="text-2xl font-bold">{challenges.length}</p>
                      </div>
                      <Trophy className="h-8 w-8 text-purple-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">تحديات نشطة</p>
                        <p className="text-2xl font-bold">{challenges.filter(c => c.status === 'active').length}</p>
                      </div>
                      <Play className="h-8 w-8 text-green-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">إجمالي المشاركين</p>
                        <p className="text-2xl font-bold">{challenges.reduce((sum, c) => sum + c.participants, 0)}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-200" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-lg text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-100">إجمالي الجوائز</p>
                        <p className="text-2xl font-bold">{challenges.reduce((sum, c) => sum + c.totalPrizePool, 0)} ر.س</p>
                      </div>
                      <Award className="h-8 w-8 text-yellow-200" />
                    </div>
                  </div>
                </div>

                {/* قائمة التحديات */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredChallenges.map(challenge => renderChallengeCard(challenge))}
                </div>

                {filteredChallenges.length === 0 && (
                  <div className="text-center py-12">
                    <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">لا توجد تحديات مطابقة للبحث</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddChallengeModal />
    </div>
  )
}

export default ChallengesManagement