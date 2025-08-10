import { useState } from 'react'
import GymSidebar from '@/components/layout/GymSidebar'
import GymHeader from '@/components/layout/GymHeader'
import { 
  UserCheck, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  Edit, 
  Trash2, 
  Eye,
  Star,
  Calendar,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  X,
  Save,
  RefreshCw,
  Camera,
  Download,
  Upload,
  Heart,
  ThumbsUp,
  MessageSquare,
  DollarSign
} from 'lucide-react'

const TrainersManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterSpecialty, setFilterSpecialty] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState(null)
  const [saving, setSaving] = useState(false)

  // بيانات المدربين
  const [trainers, setTrainers] = useState([
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed@gym.com',
      phone: '+966501234567',
      photo: '/api/placeholder/150/150',
      specialty: 'كمال أجسام',
      experience: '5 سنوات',
      certification: 'مدرب معتمد - NASM',
      rating: 4.8,
      totalClients: 45,
      activeClients: 32,
      monthlyEarnings: 8500,
      status: 'active',
      joinDate: '2020-01-15',
      bio: 'مدرب متخصص في كمال الأجسام واللياقة البدنية مع خبرة 5 سنوات',
      availability: {
        saturday: { start: '06:00', end: '14:00', available: true },
        sunday: { start: '06:00', end: '14:00', available: true },
        monday: { start: '06:00', end: '14:00', available: true },
        tuesday: { start: '06:00', end: '14:00', available: true },
        wednesday: { start: '06:00', end: '14:00', available: true },
        thursday: { start: '06:00', end: '14:00', available: true },
        friday: { start: '14:00', end: '22:00', available: true }
      },
      performance: {
        clientRetention: 85,
        sessionCompletion: 95,
        punctuality: 98,
        clientSatisfaction: 4.8
      }
    },
    {
      id: 2,
      name: 'فاطمة الأحمد',
      email: 'fatima@gym.com',
      phone: '+966507654321',
      photo: '/api/placeholder/150/150',
      specialty: 'يوجا وبيلاتس',
      experience: '3 سنوات',
      certification: 'مدربة يوجا معتمدة - RYT 200',
      rating: 4.9,
      totalClients: 38,
      activeClients: 35,
      monthlyEarnings: 7200,
      status: 'active',
      joinDate: '2021-06-10',
      bio: 'مدربة متخصصة في اليوجا والبيلاتس مع التركيز على الصحة النفسية والجسدية',
      availability: {
        saturday: { start: '16:00', end: '22:00', available: true },
        sunday: { start: '16:00', end: '22:00', available: true },
        monday: { start: '16:00', end: '22:00', available: true },
        tuesday: { start: '16:00', end: '22:00', available: true },
        wednesday: { start: '16:00', end: '22:00', available: true },
        thursday: { start: '16:00', end: '22:00', available: true },
        friday: { start: '09:00', end: '13:00', available: true }
      },
      performance: {
        clientRetention: 92,
        sessionCompletion: 98,
        punctuality: 100,
        clientSatisfaction: 4.9
      }
    },
    {
      id: 3,
      name: 'خالد السعد',
      email: 'khalid@gym.com',
      phone: '+966509876543',
      photo: '/api/placeholder/150/150',
      specialty: 'تدريب وظيفي',
      experience: '7 سنوات',
      certification: 'مدرب معتمد - ACSM',
      rating: 4.7,
      totalClients: 52,
      activeClients: 40,
      monthlyEarnings: 9800,
      status: 'active',
      joinDate: '2018-03-22',
      bio: 'مدرب خبير في التدريب الوظيفي وإعادة التأهيل الرياضي',
      availability: {
        saturday: { start: '08:00', end: '16:00', available: true },
        sunday: { start: '08:00', end: '16:00', available: true },
        monday: { start: '08:00', end: '16:00', available: true },
        tuesday: { start: '08:00', end: '16:00', available: true },
        wednesday: { start: '08:00', end: '16:00', available: true },
        thursday: { start: '08:00', end: '16:00', available: false },
        friday: { start: '08:00', end: '16:00', available: true }
      },
      performance: {
        clientRetention: 88,
        sessionCompletion: 93,
        punctuality: 96,
        clientSatisfaction: 4.7
      }
    }
  ])

  const specialties = [
    'كمال أجسام',
    'يوجا وبيلاتس',
    'تدريب وظيفي',
    'كارديو',
    'تدريب القوة',
    'إعادة التأهيل',
    'تدريب شخصي',
    'تدريب جماعي'
  ]

  const dayNames = {
    saturday: 'السبت',
    sunday: 'الأحد',
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة'
  }

  // تصفية البيانات
  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || trainer.status === filterStatus
    const matchesSpecialty = filterSpecialty === 'all' || trainer.specialty === filterSpecialty
    
    return matchesSearch && matchesStatus && matchesSpecialty
  })

  const handleAddTrainer = async (trainerData) => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newTrainer = {
      id: trainers.length + 1,
      ...trainerData,
      rating: 0,
      totalClients: 0,
      activeClients: 0,
      monthlyEarnings: 0,
      joinDate: new Date().toISOString().split('T')[0],
      performance: {
        clientRetention: 0,
        sessionCompletion: 0,
        punctuality: 0,
        clientSatisfaction: 0
      }
    }
    
    setTrainers([...trainers, newTrainer])
    setShowAddModal(false)
    setSaving(false)
    alert('تم إضافة المدرب بنجاح')
  }

  const handleDeleteTrainer = (trainerId) => {
    if (confirm('هل أنت متأكد من حذف هذا المدرب؟')) {
      setTrainers(trainers.filter(trainer => trainer.id !== trainerId))
      alert('تم حذف المدرب بنجاح')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'vacation':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'نشط'
      case 'inactive':
        return 'غير نشط'
      case 'vacation':
        return 'في إجازة'
      default:
        return 'غير محدد'
    }
  }

  const renderTrainerCard = (trainer) => (
    <div key={trainer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <img 
            src={trainer.photo} 
            alt={trainer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{trainer.name}</h3>
            <p className="text-sm text-gray-600">{trainer.specialty}</p>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 mr-1">{trainer.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 space-x-reverse">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trainer.status)}`}>
            {getStatusText(trainer.status)}
          </span>
          <div className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-purple-600">{trainer.activeClients}</div>
          <div className="text-xs text-gray-600">عملاء نشطين</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-semibold text-green-600">{trainer.monthlyEarnings} ر.س</div>
          <div className="text-xs text-gray-600">أرباح شهرية</div>
        </div>
      </div>

      <div className="flex items-center space-x-3 space-x-reverse text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <Phone className="h-4 w-4 ml-1" />
          {trainer.phone}
        </div>
        <div className="flex items-center">
          <Mail className="h-4 w-4 ml-1" />
          {trainer.email}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">الخبرة: {trainer.experience}</span>
        <div className="flex space-x-2 space-x-reverse">
          <button 
            onClick={() => {
              setSelectedTrainer(trainer)
              setShowDetailsModal(true)
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
            <Edit className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleDeleteTrainer(trainer.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )

  const AddTrainerModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      specialty: '',
      experience: '',
      certification: '',
      bio: '',
      status: 'active',
      photo: '/api/placeholder/150/150'
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      handleAddTrainer(formData)
    }

    if (!showAddModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">إضافة مدرب جديد</h2>
            <button 
              onClick={() => setShowAddModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  التخصص
                </label>
                <select
                  required
                  value={formData.specialty}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">اختر التخصص</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سنوات الخبرة
                </label>
                <input
                  type="text"
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  placeholder="مثال: 5 سنوات"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الشهادات
                </label>
                <input
                  type="text"
                  required
                  value={formData.certification}
                  onChange={(e) => setFormData({...formData, certification: e.target.value})}
                  placeholder="مثال: مدرب معتمد - NASM"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نبذة شخصية
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="وصف موجز عن المدرب وخبراته..."
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
                disabled={saving}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center space-x-2 space-x-reverse"
              >
                {saving ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{saving ? 'جاري الحفظ...' : 'حفظ'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  const TrainerDetailsModal = () => {
    if (!showDetailsModal || !selectedTrainer) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">تفاصيل المدرب</h2>
            <button 
              onClick={() => setShowDetailsModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* المعلومات الأساسية */}
            <div className="lg:col-span-1">
              <div className="text-center mb-6">
                <img 
                  src={selectedTrainer.photo} 
                  alt={selectedTrainer.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900">{selectedTrainer.name}</h3>
                <p className="text-gray-600">{selectedTrainer.specialty}</p>
                <div className="flex items-center justify-center mt-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold mr-1">{selectedTrainer.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 ml-2" />
                  {selectedTrainer.phone}
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 ml-2" />
                  {selectedTrainer.email}
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="h-4 w-4 ml-2" />
                  {selectedTrainer.certification}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 ml-2" />
                  انضم في {selectedTrainer.joinDate}
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">نبذة شخصية</h4>
                <p className="text-sm text-gray-600">{selectedTrainer.bio}</p>
              </div>
            </div>

            {/* الإحصائيات والأداء */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedTrainer.activeClients}</div>
                  <div className="text-sm text-gray-600">عملاء نشطين</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedTrainer.monthlyEarnings}</div>
                  <div className="text-sm text-gray-600">أرباح شهرية (ر.س)</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{selectedTrainer.totalClients}</div>
                  <div className="text-sm text-gray-600">إجمالي العملاء</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">{selectedTrainer.experience}</div>
                  <div className="text-sm text-gray-600">سنوات الخبرة</div>
                </div>
              </div>

              {/* مؤشرات الأداء */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">مؤشرات الأداء</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">معدل الاحتفاظ بالعملاء</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${selectedTrainer.performance.clientRetention}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedTrainer.performance.clientRetention}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">إتمام الجلسات</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${selectedTrainer.performance.sessionCompletion}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedTrainer.performance.sessionCompletion}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">الالتزام بالمواعيد</span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${selectedTrainer.performance.punctuality}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedTrainer.performance.punctuality}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* جدول المواعيد */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">جدول المواعيد الأسبوعي</h4>
                <div className="space-y-2">
                  {Object.entries(selectedTrainer.availability).map(([day, schedule]) => (
                    <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900 w-20">{dayNames[day]}</span>
                      {schedule.available ? (
                        <span className="text-green-600 text-sm">
                          {schedule.start} - {schedule.end}
                        </span>
                      ) : (
                        <span className="text-red-600 text-sm">غير متاح</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <GymSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <GymHeader title="إدارة المدربين" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
          <div className="p-6">
            {/* أدوات التحكم */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:space-x-reverse">
                  {/* شريط البحث */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="البحث عن مدرب..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
                    />
                  </div>

                  {/* فلتر الحالة */}
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">جميع الحالات</option>
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                    <option value="vacation">في إجازة</option>
                  </select>

                  {/* فلتر التخصص */}
                  <select
                    value={filterSpecialty}
                    onChange={(e) => setFilterSpecialty(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">جميع التخصصات</option>
                    {specialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center space-x-2 space-x-reverse"
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة مدرب جديد</span>
                </button>
              </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <UserCheck className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي المدربين</p>
                    <p className="text-2xl font-bold text-gray-900">{trainers.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">مدربين نشطين</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {trainers.filter(t => t.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {trainers.reduce((sum, trainer) => sum + trainer.activeClients, 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">متوسط التقييم</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {(trainers.reduce((sum, trainer) => sum + trainer.rating, 0) / trainers.length).toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* قائمة المدربين */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrainers.map(trainer => renderTrainerCard(trainer))}
            </div>

            {filteredTrainers.length === 0 && (
              <div className="text-center py-12">
                <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">لا توجد نتائج مطابقة لبحثك</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddTrainerModal />
      <TrainerDetailsModal />
    </div>
  )
}

export default TrainersManagement