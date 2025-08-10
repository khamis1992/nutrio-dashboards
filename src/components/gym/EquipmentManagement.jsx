import { useState } from 'react'
import GymSidebar from '@/components/layout/GymSidebar'
import GymHeader from '@/components/layout/GymHeader'
import { 
  Dumbbell,
  Plus, 
  Search, 
  Filter,
  MoreVertical,
  Edit, 
  Trash2, 
  Eye,
  Settings,
  Calendar,
  AlertTriangle,
  CheckCircle,
  X,
  Save,
  RefreshCw,
  Wrench,
  Package,
  Activity,
  MapPin,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  BarChart3,
  Users,
  Zap,
  Target,
  Heart
} from 'lucide-react'

const EquipmentManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [saving, setSaving] = useState(false)

  // بيانات المعدات
  const [equipment, setEquipment] = useState([
    {
      id: 1,
      name: 'جهاز المشي الكهربائي - تكنوجيم',
      category: 'كارديو',
      manufacturer: 'Technogym',
      model: 'Run Now 700',
      serialNumber: 'TG-RN700-001',
      purchaseDate: '2022-01-15',
      warranty: '3 سنوات',
      cost: 25000,
      location: 'منطقة الكارديو - الصف الأول',
      status: 'operational',
      condition: 'excellent',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      maintenanceFrequency: 90,
      usageHours: 2450,
      specifications: {
        maxSpeed: '25 km/h',
        maxWeight: '180 kg',
        dimensions: '220x90x160 cm',
        power: '4.0 HP'
      },
      maintenanceHistory: [
        { date: '2024-01-10', type: 'دورية', description: 'تنظيف وتشحيم', cost: 150, technician: 'أحمد محمد' },
        { date: '2023-10-15', type: 'إصلاح', description: 'استبدال حزام الجري', cost: 800, technician: 'محمد علي' }
      ]
    },
    {
      id: 2,
      name: 'مجموعة دمبل كاملة',
      category: 'أوزان حرة',
      manufacturer: 'Iron Grip',
      model: 'Professional Series',
      serialNumber: 'IG-DB-SET-001',
      purchaseDate: '2021-08-20',
      warranty: '5 سنوات',
      cost: 15000,
      location: 'منطقة الأوزان الحرة',
      status: 'operational',
      condition: 'good',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-07-05',
      maintenanceFrequency: 180,
      usageHours: 5200,
      specifications: {
        range: '2.5 - 50 kg',
        pieces: '20 زوج',
        material: 'حديد مطلي',
        rack: 'رف معدني'
      },
      maintenanceHistory: [
        { date: '2024-01-05', type: 'دورية', description: 'فحص وتنظيف', cost: 100, technician: 'سالم أحمد' }
      ]
    },
    {
      id: 3,
      name: 'جهاز القرفصاء المتعدد',
      category: 'آلات القوة',
      manufacturer: 'Life Fitness',
      model: 'Signature Series',
      serialNumber: 'LF-SS-SQ-003',
      purchaseDate: '2023-03-10',
      warranty: '2 سنة',
      cost: 18000,
      location: 'منطقة آلات القوة - الجهة الشرقية',
      status: 'maintenance',
      condition: 'fair',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-02-20',
      maintenanceFrequency: 60,
      usageHours: 1800,
      specifications: {
        maxWeight: '300 kg',
        adjustments: '12 مستوى',
        dimensions: '180x150x220 cm',
        safety: 'نظام أمان متقدم'
      },
      maintenanceHistory: [
        { date: '2024-01-20', type: 'إصلاح', description: 'استبدال كابل الأمان', cost: 450, technician: 'خالد عبدالله' },
        { date: '2023-12-10', type: 'دورية', description: 'صيانة شاملة', cost: 200, technician: 'أحمد محمد' }
      ]
    },
    {
      id: 4,
      name: 'دراجة ثابتة ذكية',
      category: 'كارديو',
      manufacturer: 'Peloton',
      model: 'Bike+',
      serialNumber: 'PL-BP-004',
      purchaseDate: '2023-06-15',
      warranty: '1 سنة',
      cost: 8500,
      location: 'استوديو التدريب الجماعي',
      status: 'operational',
      condition: 'excellent',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      maintenanceFrequency: 90,
      usageHours: 980,
      specifications: {
        resistance: 'مغناطيسي',
        screen: '22 بوصة تفاعلي',
        connectivity: 'WiFi + Bluetooth',
        maxWeight: '135 kg'
      },
      maintenanceHistory: [
        { date: '2024-01-15', type: 'دورية', description: 'تحديث البرمجيات وتنظيف', cost: 120, technician: 'فهد الخالد' }
      ]
    },
    {
      id: 5,
      name: 'آلة الضغط متعددة الاتجاهات',
      category: 'آلات القوة',
      manufacturer: 'Hammer Strength',
      model: 'Plate Loaded',
      serialNumber: 'HS-PL-MP-005',
      purchaseDate: '2022-11-30',
      warranty: '3 سنوات',
      cost: 22000,
      location: 'منطقة آلات القوة - الوسط',
      status: 'out_of_order',
      condition: 'poor',
      lastMaintenance: '2024-01-25',
      nextMaintenance: '2024-02-15',
      maintenanceFrequency: 60,
      usageHours: 3200,
      specifications: {
        loadCapacity: '450 kg',
        adjustments: '8 مواضع',
        dimensions: '200x180x200 cm',
        plates: 'غير مشملة'
      },
      maintenanceHistory: [
        { date: '2024-01-25', type: 'إصلاح كبير', description: 'استبدال النظام الهيدروليكي', cost: 2500, technician: 'مركز الصيانة المتخصص' },
        { date: '2023-11-20', type: 'دورية', description: 'صيانة عامة', cost: 300, technician: 'أحمد محمد' }
      ]
    }
  ])

  const categories = [
    'كارديو',
    'أوزان حرة', 
    'آلات القوة',
    'وظيفي',
    'تأهيل',
    'ملحقات'
  ]

  const statusOptions = [
    { value: 'operational', label: 'تشغيل', color: 'green' },
    { value: 'maintenance', label: 'صيانة', color: 'yellow' },
    { value: 'out_of_order', label: 'خارج الخدمة', color: 'red' },
    { value: 'retired', label: 'مُستبعد', color: 'gray' }
  ]

  const conditionOptions = [
    { value: 'excellent', label: 'ممتاز', color: 'green' },
    { value: 'good', label: 'جيد', color: 'blue' },
    { value: 'fair', label: 'مقبول', color: 'yellow' },
    { value: 'poor', label: 'ضعيف', color: 'red' }
  ]

  // تصفية البيانات
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status) => {
    const option = statusOptions.find(opt => opt.value === status)
    return option ? `bg-${option.color}-100 text-${option.color}-800` : 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status) => {
    const option = statusOptions.find(opt => opt.value === status)
    return option ? option.label : 'غير محدد'
  }

  const getConditionColor = (condition) => {
    const option = conditionOptions.find(opt => opt.value === condition)
    return option ? `bg-${option.color}-100 text-${option.color}-800` : 'bg-gray-100 text-gray-800'
  }

  const getConditionText = (condition) => {
    const option = conditionOptions.find(opt => opt.value === condition)
    return option ? option.label : 'غير محدد'
  }

  const handleAddEquipment = async (equipmentData) => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newEquipment = {
      id: equipment.length + 1,
      ...equipmentData,
      usageHours: 0,
      maintenanceHistory: []
    }
    
    setEquipment([...equipment, newEquipment])
    setShowAddModal(false)
    setSaving(false)
    alert('تم إضافة المعدة بنجاح')
  }

  const handleDeleteEquipment = (equipmentId) => {
    if (confirm('هل أنت متأكد من حذف هذه المعدة؟')) {
      setEquipment(equipment.filter(item => item.id !== equipmentId))
      alert('تم حذف المعدة بنجاح')
    }
  }

  const scheduleMaintenanceAlert = (item) => {
    const today = new Date()
    const nextMaintenance = new Date(item.nextMaintenance)
    const daysDiff = Math.ceil((nextMaintenance - today) / (1000 * 60 * 60 * 24))
    
    if (daysDiff <= 7) {
      return { urgent: true, days: daysDiff }
    } else if (daysDiff <= 30) {
      return { warning: true, days: daysDiff }
    }
    return { normal: true, days: daysDiff }
  }

  const renderEquipmentCard = (item) => {
    const maintenanceAlert = scheduleMaintenanceAlert(item)
    
    return (
      <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Dumbbell className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.manufacturer} - {item.model}</p>
              <p className="text-xs text-gray-500">{item.location}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
              {getStatusText(item.status)}
            </span>
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* تنبيه الصيانة */}
        {(maintenanceAlert.urgent || maintenanceAlert.warning) && (
          <div className={`p-3 rounded-lg mb-4 ${
            maintenanceAlert.urgent ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex items-center">
              <AlertTriangle className={`h-4 w-4 ml-2 ${
                maintenanceAlert.urgent ? 'text-red-600' : 'text-yellow-600'
              }`} />
              <span className={`text-sm font-medium ${
                maintenanceAlert.urgent ? 'text-red-800' : 'text-yellow-800'
              }`}>
                {maintenanceAlert.urgent ? 'صيانة عاجلة!' : 'صيانة مطلوبة قريباً'}
              </span>
            </div>
            <p className={`text-xs mt-1 ${
              maintenanceAlert.urgent ? 'text-red-600' : 'text-yellow-600'
            }`}>
              الصيانة التالية خلال {maintenanceAlert.days} أيام
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-blue-600">{item.usageHours}</div>
            <div className="text-xs text-gray-600">ساعات التشغيل</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className={`text-lg font-semibold ${getConditionColor(item.condition).includes('green') ? 'text-green-600' : 
              getConditionColor(item.condition).includes('red') ? 'text-red-600' : 'text-yellow-600'}`}>
              {getConditionText(item.condition)}
            </div>
            <div className="text-xs text-gray-600">الحالة العامة</div>
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          <p>الرقم التسلسلي: {item.serialNumber}</p>
          <p>آخر صيانة: {item.lastMaintenance}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">التكلفة: {item.cost.toLocaleString()} ر.س</span>
          <div className="flex space-x-2 space-x-reverse">
            <button 
              onClick={() => {
                setSelectedEquipment(item)
                setShowDetailsModal(true)
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              title="عرض التفاصيل"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button 
              onClick={() => {
                setSelectedEquipment(item)
                setShowMaintenanceModal(true)
              }}
              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
              title="جدولة صيانة"
            >
              <Wrench className="h-4 w-4" />
            </button>
            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="تحرير">
              <Edit className="h-4 w-4" />
            </button>
            <button 
              onClick={() => handleDeleteEquipment(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              title="حذف"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  const AddEquipmentModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: '',
      manufacturer: '',
      model: '',
      serialNumber: '',
      purchaseDate: '',
      warranty: '',
      cost: '',
      location: '',
      status: 'operational',
      condition: 'excellent',
      maintenanceFrequency: 90,
      specifications: {}
    })

    const handleSubmit = (e) => {
      e.preventDefault()
      handleAddEquipment({
        ...formData,
        cost: parseFloat(formData.cost),
        maintenanceFrequency: parseInt(formData.maintenanceFrequency),
        lastMaintenance: formData.purchaseDate,
        nextMaintenance: new Date(Date.now() + formData.maintenanceFrequency * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      })
    }

    if (!showAddModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">إضافة معدة جديدة</h2>
            <button 
              onClick={() => setShowAddModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  اسم المعدة
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
                  الفئة
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">اختر الفئة</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الشركة المصنعة
                </label>
                <input
                  type="text"
                  required
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الموديل
                </label>
                <input
                  type="text"
                  required
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الرقم التسلسلي
                </label>
                <input
                  type="text"
                  required
                  value={formData.serialNumber}
                  onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ الشراء
                </label>
                <input
                  type="date"
                  required
                  value={formData.purchaseDate}
                  onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  فترة الضمان
                </label>
                <input
                  type="text"
                  value={formData.warranty}
                  onChange={(e) => setFormData({...formData, warranty: e.target.value})}
                  placeholder="مثال: 3 سنوات"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  التكلفة (ريال سعودي)
                </label>
                <input
                  type="number"
                  required
                  value={formData.cost}
                  onChange={(e) => setFormData({...formData, cost: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تكرار الصيانة (بالأيام)
                </label>
                <input
                  type="number"
                  value={formData.maintenanceFrequency}
                  onChange={(e) => setFormData({...formData, maintenanceFrequency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الحالة
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الموقع في الصالة
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="مثال: منطقة الكارديو - الصف الأول"
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

  const EquipmentDetailsModal = () => {
    if (!showDetailsModal || !selectedEquipment) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">تفاصيل المعدة</h2>
            <button 
              onClick={() => setShowDetailsModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* المعلومات الأساسية */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedEquipment.name}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">الشركة المصنعة:</span>
                    <span className="mr-2 text-gray-600">{selectedEquipment.manufacturer}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">الموديل:</span>
                    <span className="mr-2 text-gray-600">{selectedEquipment.model}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">الرقم التسلسلي:</span>
                    <span className="mr-2 text-gray-600">{selectedEquipment.serialNumber}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">تاريخ الشراء:</span>
                    <span className="mr-2 text-gray-600">{selectedEquipment.purchaseDate}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">الضمان:</span>
                    <span className="mr-2 text-gray-600">{selectedEquipment.warranty}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">التكلفة:</span>
                    <span className="mr-2 text-gray-600">{selectedEquipment.cost.toLocaleString()} ر.س</span>
                  </div>
                </div>
              </div>

              {/* المواصفات التقنية */}
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">المواصفات التقنية</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(selectedEquipment.specifications).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium text-gray-700">{key}:</span>
                      <span className="mr-2 text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* تاريخ الصيانة */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">تاريخ الصيانة</h4>
                <div className="space-y-3">
                  {selectedEquipment.maintenanceHistory.map((maintenance, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-medium text-gray-900">{maintenance.type}</span>
                          <span className="mr-2 text-sm text-gray-600">{maintenance.date}</span>
                        </div>
                        <span className="text-lg font-semibold text-green-600">{maintenance.cost} ر.س</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{maintenance.description}</p>
                      <p className="text-xs text-gray-500">المختص: {maintenance.technician}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* الإحصائيات */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">{selectedEquipment.usageHours}</div>
                  <div className="text-sm text-gray-600">ساعات التشغيل</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-green-600">{getConditionText(selectedEquipment.condition)}</div>
                  <div className="text-sm text-gray-600">الحالة العامة</div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-lg font-bold text-blue-600">{getStatusText(selectedEquipment.status)}</div>
                  <div className="text-sm text-gray-600">حالة التشغيل</div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-2">الصيانة التالية</h5>
                  <p className="text-sm text-gray-600">{selectedEquipment.nextMaintenance}</p>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      scheduleMaintenanceAlert(selectedEquipment).urgent ? 'bg-red-100 text-red-800' :
                      scheduleMaintenanceAlert(selectedEquipment).warning ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      خلال {scheduleMaintenanceAlert(selectedEquipment).days} أيام
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-2">الموقع</h5>
                  <p className="text-sm text-gray-600">{selectedEquipment.location}</p>
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
          <GymHeader title="إدارة المعدات" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
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
                      placeholder="البحث عن معدة..."
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
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>

                  {/* فلتر الفئة */}
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">جميع الفئات</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center space-x-2 space-x-reverse"
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة معدة جديدة</span>
                </button>
              </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Package className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">إجمالي المعدات</p>
                    <p className="text-2xl font-bold text-gray-900">{equipment.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">تعمل بشكل سليم</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {equipment.filter(item => item.status === 'operational').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Wrench className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">تحتاج صيانة</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {equipment.filter(item => {
                        const alert = scheduleMaintenanceAlert(item)
                        return alert.urgent || alert.warning
                      }).length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-gray-600">خارج الخدمة</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {equipment.filter(item => item.status === 'out_of_order').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* قائمة المعدات */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEquipment.map(item => renderEquipmentCard(item))}
            </div>

            {filteredEquipment.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">لا توجد نتائج مطابقة لبحثك</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddEquipmentModal />
      <EquipmentDetailsModal />
    </div>
  )
}

export default EquipmentManagement