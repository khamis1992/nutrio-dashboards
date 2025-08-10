import { useState } from 'react'
import GymSidebar from '@/components/layout/GymSidebar'
import GymHeader from '@/components/layout/GymHeader'
import { 
  Apple,
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
  Heart,
  Activity,
  Zap,
  Award,
  BookOpen,
  PieChart,
  Download,
  Upload,
  Clock,
  AlertCircle,
  AlertTriangle,
  Star
} from 'lucide-react'

const NutritionManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('plans')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [saving, setSaving] = useState(false)

  // خطط التغذية
  const [nutritionPlans, setNutritionPlans] = useState([
    {
      id: 1,
      name: 'خطة بناء العضلات المتقدمة',
      category: 'بناء العضلات',
      description: 'خطة غذائية عالية البروتين لبناء كتلة عضلية',
      duration: '12 أسبوع',
      calories: 3200,
      protein: 180,
      carbs: 350,
      fat: 110,
      meals: 6,
      assignedMembers: 24,
      created: '2024-01-10',
      trainer: 'أحمد محمد',
      status: 'active',
      goals: ['زيادة الكتلة العضلية', 'تحسين الأداء', 'زيادة القوة'],
      restrictions: ['خالي من الجلوتين'],
      mealPlan: [
        { time: '07:00', meal: 'الإفطار', calories: 650, items: ['شوفان مع موز', 'بيض مسلوق', 'عصير برتقال'] },
        { time: '10:00', meal: 'وجبة خفيفة', calories: 300, items: ['مكسرات متنوعة', 'تفاحة'] },
        { time: '13:00', meal: 'الغداء', calories: 800, items: ['دجاج مشوي', 'أرز بني', 'سلطة خضار'] },
        { time: '16:00', meal: 'قبل التمرين', calories: 400, items: ['موزة', 'بروتين شيك'] },
        { time: '19:00', meal: 'بعد التمرين', calories: 500, items: ['تونة', 'خبز أسمر', 'خضار'] },
        { time: '21:00', meal: 'العشاء', calories: 550, items: ['سمك مشوي', 'بطاطا حلوة', 'سلطة'] }
      ]
    },
    {
      id: 2,
      name: 'خطة خسارة الوزن السريعة',
      category: 'خسارة الوزن',
      description: 'نظام غذائي منخفض السعرات لخسارة الوزن الصحية',
      duration: '8 أسابيع',
      calories: 1800,
      protein: 140,
      carbs: 150,
      fat: 60,
      meals: 5,
      assignedMembers: 35,
      created: '2024-01-05',
      trainer: 'سارة أحمد',
      status: 'active',
      goals: ['خسارة الوزن', 'حرق الدهون', 'تحسين الصحة'],
      restrictions: ['قليل الكربوهيدرات'],
      mealPlan: [
        { time: '07:00', meal: 'الإفطار', calories: 400, items: ['بيض مخفوق', 'خضار', 'شاي أخضر'] },
        { time: '10:30', meal: 'وجبة خفيفة', calories: 200, items: ['يوجرت يوناني', 'توت'] },
        { time: '13:00', meal: 'الغداء', calories: 500, items: ['سلطة دجاج', 'خس', 'طماطم'] },
        { time: '16:00', meal: 'وجبة خفيفة', calories: 250, items: ['خضار مقطعة', 'حمص'] },
        { time: '19:00', meal: 'العشاء', calories: 450, items: ['سمك مشوي', 'بروكلي', 'كينوا'] }
      ]
    }
  ])

  // المكملات الغذائية
  const [supplements, setSupplements] = useState([
    {
      id: 1,
      name: 'بروتين مصل اللبن',
      brand: 'Optimum Nutrition',
      category: 'بروتين',
      servingSize: '30g',
      servingsPerContainer: 75,
      price: 250,
      inStock: 45,
      lowStockAlert: 10,
      benefits: ['بناء العضلات', 'استشفاء سريع', 'سهل الهضم'],
      ingredients: ['مصل اللبن المعزول', 'نكهات طبيعية', 'ليسيثين الصويا'],
      instructions: 'ملعقة واحدة مع 250مل ماء بعد التمرين',
      contraindications: ['حساسية اللاكتوز'],
      rating: 4.8,
      reviews: 156
    },
    {
      id: 2,
      name: 'كرياتين مونوهيدرات',
      brand: 'Creatine Power',
      category: 'كرياتين',
      servingSize: '5g',
      servingsPerContainer: 60,
      price: 120,
      inStock: 32,
      lowStockAlert: 15,
      benefits: ['زيادة القوة', 'تحسين الأداء', 'نمو العضلات'],
      ingredients: ['كرياتين مونوهيدرات نقي 100%'],
      instructions: '5 جرام يومياً مع الماء',
      contraindications: ['أمراض الكلى'],
      rating: 4.6,
      reviews: 89
    }
  ])

  // تتبع التغذية للأعضاء
  const [memberNutrition, setMemberNutrition] = useState([
    {
      id: 1,
      memberId: 101,
      memberName: 'محمد علي',
      currentPlan: 'خطة بناء العضلات المتقدمة',
      startDate: '2024-01-15',
      progress: 65,
      currentWeight: 78,
      targetWeight: 85,
      caloriesConsumed: 2950,
      caloriesTarget: 3200,
      proteinConsumed: 165,
      proteinTarget: 180,
      compliance: 85,
      lastUpdate: '2024-01-28'
    }
  ])

  const tabs = [
    { id: 'plans', name: 'خطط التغذية', icon: BookOpen },
    { id: 'supplements', name: 'المكملات الغذائية', icon: Zap },
    { id: 'tracking', name: 'تتبع الأعضاء', icon: Activity },
    { id: 'analytics', name: 'التحليلات', icon: PieChart }
  ]

  const nutritionCategories = [
    'بناء العضلات',
    'خسارة الوزن',
    'تحسين الأداء',
    'صحة عامة',
    'تأهيل'
  ]

  const supplementCategories = [
    'بروتين',
    'كرياتين',
    'فيتامينات',
    'أحماض أمينية',
    'حوارق الدهون',
    'طاقة'
  ]

  const renderNutritionPlans = () => (
    <div className="space-y-6">
      {/* أدوات التحكم */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="البحث عن خطة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">جميع الفئات</option>
            {nutritionCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center space-x-2 space-x-reverse"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة خطة جديدة</span>
        </button>
      </div>

      {/* قائمة الخطط */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {nutritionPlans.map(plan => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.category}</p>
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full mt-2">
                  {plan.status === 'active' ? 'نشط' : 'غير نشط'}
                </span>
              </div>
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-semibold text-purple-600">{plan.calories}</div>
                <div className="text-xs text-gray-600">سعرة حرارية</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-semibold text-blue-600">{plan.protein}g</div>
                <div className="text-xs text-gray-600">بروتين</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-lg font-semibold text-green-600">{plan.assignedMembers}</div>
                <div className="text-xs text-gray-600">أعضاء</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>المدة: {plan.duration}</span>
              <span>الوجبات: {plan.meals}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">بواسطة: {plan.trainer}</span>
              <div className="flex space-x-2 space-x-reverse">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSupplements = () => (
    <div className="space-y-6">
      {/* أدوات التحكم */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex space-x-4 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="البحث عن مكمل..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">جميع الفئات</option>
            {supplementCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center space-x-2 space-x-reverse"
        >
          <Plus className="h-4 w-4" />
          <span>إضافة مكمل جديد</span>
        </button>
      </div>

      {/* قائمة المكملات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {supplements.map(supplement => (
          <div key={supplement.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{supplement.name}</h3>
                <p className="text-sm text-gray-600">{supplement.brand}</p>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1">
                  {supplement.category}
                </span>
              </div>
              <div className="relative">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* تنبيه المخزون المنخفض */}
            {supplement.inStock <= supplement.lowStockAlert && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-red-600 ml-2" />
                  <span className="text-sm font-medium text-red-800">مخزون منخفض!</span>
                </div>
                <p className="text-xs text-red-600 mt-1">
                  متبقي {supplement.inStock} قطعة فقط
                </p>
              </div>
            )}

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">السعر:</span>
                <span className="font-semibold">{supplement.price} ر.س</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">في المخزون:</span>
                <span className={`font-semibold ${supplement.inStock <= supplement.lowStockAlert ? 'text-red-600' : 'text-green-600'}`}>
                  {supplement.inStock}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">حجم الحصة:</span>
                <span className="text-gray-900">{supplement.servingSize}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(supplement.rating) ? 'fill-current' : ''}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 mr-1">({supplement.reviews})</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{supplement.rating}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{supplement.servingsPerContainer} حصة</span>
              <div className="flex space-x-2 space-x-reverse">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderMemberTracking = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">تتبع تغذية الأعضاء</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  العضو
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الخطة الحالية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التقدم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  السعرات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الوزن
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الالتزام
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {memberNutrition.map(member => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{member.memberName}</div>
                    <div className="text-sm text-gray-500">ID: {member.memberId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.currentPlan}</div>
                    <div className="text-sm text-gray-500">بدأ في: {member.startDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full" 
                          style={{ width: `${member.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{member.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.caloriesConsumed}/{member.caloriesTarget}</div>
                    <div className="text-xs text-gray-500">سعرة حرارية</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.currentWeight} كجم</div>
                    <div className="text-xs text-gray-500">الهدف: {member.targetWeight} كجم</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.compliance >= 80 ? 'bg-green-100 text-green-800' :
                      member.compliance >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {member.compliance}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2 space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">خطط التغذية</p>
              <p className="text-2xl font-bold text-gray-900">{nutritionPlans.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">أعضاء متابعون</p>
              <p className="text-2xl font-bold text-gray-900">{memberNutrition.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">معدل الالتزام</p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">المكملات</p>
              <p className="text-2xl font-bold text-gray-900">{supplements.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء الخطط الغذائية</h3>
        <div className="space-y-4">
          {nutritionPlans.map(plan => (
            <div key={plan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{plan.name}</h4>
                <p className="text-sm text-gray-600">{plan.assignedMembers} عضو مسجل</p>
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold text-purple-600">{plan.assignedMembers}</div>
                <div className="text-xs text-gray-500">أعضاء نشطين</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'plans':
        return renderNutritionPlans()
      case 'supplements':
        return renderSupplements()
      case 'tracking':
        return renderMemberTracking()
      case 'analytics':
        return renderAnalytics()
      default:
        return renderNutritionPlans()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <GymSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <GymHeader title="إدارة التغذية" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
          <div className="p-6">
            {/* علامات التبويب */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 space-x-reverse px-6" aria-label="Tabs">
                  {tabs.map((tab) => {
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

              {/* محتوى التبويب */}
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NutritionManagement