import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminSidebar from '../layout/AdminSidebar'
import AdminHeader from '../layout/AdminHeader'
import { 
  BarChart3,
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
  Truck,
  Calendar,
  Package,
  Building2,
  Dumbbell,
  ArrowRight,
  Timer,
  XCircle,
  Send,
  MessageSquare,
  Smartphone,
  AtSign,
  BellRing,
  Zap,
  Target,
  FileText,
  Settings,
  Pause,
  Play,
  RotateCcw,
  UserCheck,
  BookOpen,
  MessageCircle,
  AlertTriangle,
  CheckCircle2,
  User,
  Archive,
  Flag,
  PieChart,
  LineChart,
  BarChart,
  TrendingUpIcon,
  Calendar as CalendarIcon,
  Filter as FilterIcon,
  Share,
  Printer,
  Maximize2
} from 'lucide-react'
import { 
  LineChart as RechartsLineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart as RechartsBarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  ComposedChart,
  Scatter,
  ScatterChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts'

const AdvancedAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('30days')
  const [selectedKPIs, setSelectedKPIs] = useState(['revenue', 'orders', 'users', 'satisfaction'])

  // KPIs الرئيسية
  const [kpiData, setKpiData] = useState({
    revenue: {
      current: 2450000,
      previous: 2180000,
      target: 2500000,
      growth: 12.4,
      trend: 'up'
    },
    orders: {
      current: 15680,
      previous: 14230,
      target: 16000,
      growth: 10.2,
      trend: 'up'
    },
    users: {
      current: 8945,
      previous: 8120,
      target: 9000,
      growth: 10.2,
      trend: 'up'
    },
    satisfaction: {
      current: 4.7,
      previous: 4.5,
      target: 4.8,
      growth: 4.4,
      trend: 'up'
    },
    delivery_time: {
      current: 28,
      previous: 32,
      target: 25,
      growth: -12.5,
      trend: 'down'
    },
    conversion_rate: {
      current: 3.2,
      previous: 2.8,
      target: 3.5,
      growth: 14.3,
      trend: 'up'
    }
  })

  // بيانات الإيرادات الشهرية
  const revenueData = [
    { month: 'يناير', revenue: 1800000, orders: 12500, users: 7800, restaurants: 245, gyms: 89 },
    { month: 'فبراير', revenue: 1950000, orders: 13200, users: 8100, restaurants: 251, gyms: 92 },
    { month: 'مارس', revenue: 2100000, orders: 14100, users: 8350, restaurants: 258, gyms: 95 },
    { month: 'أبريل', revenue: 2180000, orders: 14230, users: 8450, restaurants: 264, gyms: 97 },
    { month: 'مايو', revenue: 2350000, orders: 15200, users: 8750, restaurants: 272, gyms: 101 },
    { month: 'يونيو', revenue: 2450000, orders: 15680, users: 8945, restaurants: 280, gyms: 105 }
  ]

  // بيانات توزيع المستخدمين
  const userDistributionData = [
    { segment: 'عملاء فرديين', value: 65, count: 5814, color: '#3B82F6' },
    { segment: 'شركات صغيرة', value: 20, count: 1789, color: '#10B981' },
    { segment: 'شركات متوسطة', value: 10, count: 894, color: '#F59E0B' },
    { segment: 'مؤسسات كبيرة', value: 5, count: 447, color: '#EF4444' }
  ]

  // بيانات الأداء حسب المنطقة
  const regionPerformanceData = [
    { region: 'الرياض', revenue: 980000, orders: 6250, growth: 15.2, population: 3500000 },
    { region: 'جدة', revenue: 750000, orders: 4800, growth: 12.8, population: 2800000 },
    { region: 'الدمام', revenue: 420000, orders: 2650, growth: 18.5, population: 1200000 },
    { region: 'مكة', revenue: 300000, orders: 1980, growth: 8.9, population: 900000 }
  ]

  // بيانات أداء الشركاء
  const partnerPerformanceData = [
    { type: 'مطاعم', revenue: 1680000, orders: 11200, partners: 280, avgRating: 4.6, commission: 15 },
    { type: 'صالات جيم', revenue: 770000, orders: 4480, partners: 105, avgRating: 4.8, commission: 12 }
  ]

  // بيانات قمع التحويل
  const conversionFunnelData = [
    { stage: 'زيارات الموقع', value: 100000, percentage: 100 },
    { stage: 'التسجيل', value: 25000, percentage: 25 },
    { stage: 'أول طلب', value: 8000, percentage: 8 },
    { stage: 'طلب ثاني', value: 5600, percentage: 5.6 },
    { stage: 'عملاء مخلصين', value: 3200, percentage: 3.2 }
  ]

  // بيانات الاتجاهات التنبؤية
  const predictiveData = [
    { month: 'يونيو', actual: 2450000, predicted: null },
    { month: 'يوليو', actual: null, predicted: 2580000 },
    { month: 'أغسطس', actual: null, predicted: 2720000 },
    { month: 'سبتمبر', actual: null, predicted: 2890000 },
    { month: 'أكتوبر', actual: null, predicted: 3100000 },
    { month: 'نوفمبر', actual: null, predicted: 3350000 },
    { month: 'ديسمبر', actual: null, predicted: 3650000 }
  ]

  // بيانات أداء السائقين
  const driverPerformanceData = [
    { hour: '06:00', activeDrivers: 45, avgDeliveryTime: 35, completionRate: 92 },
    { hour: '08:00', activeDrivers: 78, avgDeliveryTime: 32, completionRate: 94 },
    { hour: '12:00', activeDrivers: 120, avgDeliveryTime: 28, completionRate: 96 },
    { hour: '14:00', activeDrivers: 95, avgDeliveryTime: 30, completionRate: 95 },
    { hour: '18:00', activeDrivers: 135, avgDeliveryTime: 25, completionRate: 98 },
    { hour: '20:00', activeDrivers: 110, avgDeliveryTime: 27, completionRate: 97 },
    { hour: '22:00', activeDrivers: 85, avgDeliveryTime: 29, completionRate: 95 }
  ]

  // بيانات رادار المؤشرات
  const radarData = [
    { metric: 'الإيرادات', current: 85, target: 90, competitor: 75 },
    { metric: 'رضا العملاء', current: 94, target: 96, competitor: 88 },
    { metric: 'سرعة التوصيل', current: 90, target: 95, competitor: 82 },
    { metric: 'نمو المستخدمين', current: 88, target: 92, competitor: 85 },
    { metric: 'الاحتفاظ', current: 82, target: 87, competitor: 78 },
    { metric: 'الجودة', current: 91, target: 95, competitor: 86 }
  ]

  // التقارير المُجدولة
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 'RPT-001',
      name: 'تقرير الإيرادات الشهري',
      frequency: 'monthly',
      recipients: ['admin@nutrio.com', 'finance@nutrio.com'],
      lastSent: '2024-01-01',
      nextSend: '2024-02-01',
      status: 'active'
    },
    {
      id: 'RPT-002',
      name: 'تقرير أداء الشركاء',
      frequency: 'weekly',
      recipients: ['partnerships@nutrio.com'],
      lastSent: '2024-01-15',
      nextSend: '2024-01-22',
      status: 'active'
    },
    {
      id: 'RPT-003',
      name: 'تحليل رضا العملاء',
      frequency: 'daily',
      recipients: ['support@nutrio.com', 'quality@nutrio.com'],
      lastSent: '2024-01-15',
      nextSend: '2024-01-16',
      status: 'paused'
    }
  ])

  const refreshData = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatPercentage = (value) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
  }

  const getKPICard = (key, data, title, unit = '') => {
    const isGood = data.trend === 'up' ? data.growth > 0 : data.growth < 0
    return (
      <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
          <div className={`flex items-center text-sm ${isGood ? 'text-green-600' : 'text-red-600'}`}>
            {isGood ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
            {formatPercentage(data.growth)}
          </div>
        </div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gray-900">
            {unit === 'currency' ? formatCurrency(data.current) : data.current.toLocaleString()}{unit && unit !== 'currency' && ` ${unit}`}
          </div>
          <div className="text-sm text-gray-500">
            الهدف: {unit === 'currency' ? formatCurrency(data.target) : data.target.toLocaleString()}{unit && unit !== 'currency' && ` ${unit}`}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${isGood ? 'bg-green-500' : 'bg-red-500'}`} 
              style={{width: `${Math.min((data.current / data.target) * 100, 100)}%`}}
            ></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 p-6">
          {/* العنوان والتحكم */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">التحليلات المتقدمة</h1>
                <p className="text-gray-600">تحليل شامل للأداء مع رؤى ذكية وتنبؤات مستقبلية</p>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7days">آخر 7 أيام</option>
                  <option value="30days">آخر 30 يوم</option>
                  <option value="90days">آخر 3 أشهر</option>
                  <option value="1year">آخر سنة</option>
                  <option value="custom">مخصص</option>
                </select>
                
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
                
                <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Share className="h-4 w-4 mr-2" />
                  مشاركة
                </button>
              </div>
            </div>

            {/* التبويبات */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  نظرة عامة
                </button>
                <button
                  onClick={() => setActiveTab('revenue')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'revenue'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  الإيرادات
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'users'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  المستخدمين
                </button>
                <button
                  onClick={() => setActiveTab('operations')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'operations'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  العمليات
                </button>
                <button
                  onClick={() => setActiveTab('predictive')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'predictive'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  التنبؤات
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reports'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  التقارير
                </button>
              </nav>
            </div>
          </div>

          {/* نظرة عامة */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* مؤشرات الأداء الرئيسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getKPICard('revenue', kpiData.revenue, 'إجمالي الإيرادات', 'currency')}
                {getKPICard('orders', kpiData.orders, 'إجمالي الطلبات')}
                {getKPICard('users', kpiData.users, 'المستخدمين النشطين')}
                {getKPICard('satisfaction', kpiData.satisfaction, 'رضا العملاء', '/5')}
                {getKPICard('delivery_time', kpiData.delivery_time, 'متوسط التوصيل', 'دقيقة')}
                {getKPICard('conversion_rate', kpiData.conversion_rate, 'معدل التحويل', '%')}
              </div>

              {/* الرسوم البيانية الرئيسية */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* نمو الإيرادات */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">نمو الإيرادات الشهري</h3>
                    <Maximize2 className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'الإيرادات']} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* أداء المناطق */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">أداء المناطق</h3>
                    <Maximize2 className="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={regionPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value) => [formatCurrency(value), 'الإيرادات']} />
                      <Bar dataKey="revenue" fill="#10B981" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* مقارنة الأداء مع الأهداف */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">مقارنة الأداء مع المنافسين</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="الأداء الحالي" dataKey="current" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                    <Radar name="الهدف" dataKey="target" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                    <Radar name="المنافسين" dataKey="competitor" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* تحليل الإيرادات */}
          {activeTab === 'revenue' && (
            <div className="space-y-6">
              {/* توزيع الإيرادات */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع الإيرادات حسب النوع</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={partnerPerformanceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="revenue"
                        nameKey="type"
                        label={({ type, percentage }) => `${type} ${(percentage * 100).toFixed(0)}%`}
                      >
                        {partnerPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#3B82F6' : '#10B981'} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">نمو الشركاء</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="restaurants" stroke="#3B82F6" name="المطاعم" />
                      <Line type="monotone" dataKey="gyms" stroke="#10B981" name="صالات الجيم" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* تفاصيل أداء الشركاء */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">تفاصيل أداء الشركاء</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النوع</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإيرادات</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلبات</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد الشركاء</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">متوسط التقييم</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العمولة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {partnerPerformanceData.map((partner, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {partner.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(partner.revenue)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {partner.orders.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {partner.partners}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm text-gray-900">{partner.avgRating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {partner.commission}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* تحليل المستخدمين */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* توزيع شرائح المستخدمين */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع شرائح المستخدمين</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={userDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        nameKey="segment"
                        label={({ segment, value }) => `${segment} ${value}%`}
                      >
                        {userDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>

                {/* قمع التحويل */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">قمع التحويل</h3>
                  <div className="space-y-4">
                    {conversionFunnelData.map((stage, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
                          <span className="text-sm text-gray-500">{stage.value.toLocaleString()} ({stage.percentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-8 relative">
                          <div 
                            className="h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium"
                            style={{width: `${stage.percentage}%`}}
                          >
                            {stage.percentage >= 10 && `${stage.percentage}%`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* نمو المستخدمين */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">نمو المستخدمين الشهري</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="users" fill="#3B82F6" name="المستخدمين" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10B981" name="الطلبات" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* تحليل العمليات */}
          {activeTab === 'operations' && (
            <div className="space-y-6">
              {/* أداء السائقين */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء السائقين خلال اليوم</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={driverPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="activeDrivers" fill="#3B82F6" name="السائقين النشطين" />
                    <Line yAxisId="right" type="monotone" dataKey="avgDeliveryTime" stroke="#F59E0B" name="متوسط التوصيل (دقيقة)" />
                    <Line yAxisId="right" type="monotone" dataKey="completionRate" stroke="#10B981" name="معدل الإكمال %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* تحليل المناطق */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">أداء المناطق التفصيلي</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المنطقة</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإيرادات</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الطلبات</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">معدل النمو</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">عدد السكان</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الاختراق</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {regionPerformanceData.map((region, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {region.region}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(region.revenue)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {region.orders.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              region.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {formatPercentage(region.growth)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {region.population.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {((region.orders / region.population) * 100).toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* التنبؤات */}
          {activeTab === 'predictive' && (
            <div className="space-y-6">
              {/* التنبؤ بالإيرادات */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">التنبؤ بالإيرادات للأشهر القادمة</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <RechartsLineChart data={[...revenueData.slice(-1), ...predictiveData]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value) => [formatCurrency(value), value ? 'متوقع' : 'فعلي']} />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      name="الإيرادات الفعلية"
                      connectNulls={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="التنبؤات"
                      connectNulls={false}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-md font-semibold text-blue-900 mb-2">رؤى التنبؤ</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• متوقع نمو الإيرادات بنسبة 49% خلال الـ 6 أشهر القادمة</li>
                    <li>• ذروة الإيرادات متوقعة في ديسمبر بـ {formatCurrency(3650000)}</li>
                    <li>• معدل النمو الشهري المتوقع: 5.8%</li>
                    <li>• الثقة في التنبؤ: 87%</li>
                  </ul>
                </div>
              </div>

              {/* مؤشرات التحذير المبكر */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">التحذيرات المبكرة</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800">انخفاض محتمل في الطلبات</p>
                        <p className="text-xs text-yellow-600">متوقع انخفاض 3% في منطقة مكة الأسبوع القادم</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-green-800">نمو متوقع في صالات الجيم</p>
                        <p className="text-xs text-green-600">زيادة 15% في الاشتراكات خلال الشهر القادم</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-red-50 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-red-800">حاجة لمزيد من السائقين</p>
                        <p className="text-xs text-red-600">نقص متوقع في السائقين خلال فترة الذروة</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">توصيات ذكية</h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-800 mb-1">زيادة الاستثمار في الرياض</p>
                      <p className="text-xs text-blue-600">معدل النمو العالي يبرر توسيع الخدمات</p>
                    </div>
                    
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm font-medium text-purple-800 mb-1">تحسين خدمة العملاء</p>
                      <p className="text-xs text-purple-600">تركيز على تقليل أوقات الاستجابة</p>
                    </div>
                    
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <p className="text-sm font-medium text-indigo-800 mb-1">إطلاق حملة تسويقية</p>
                      <p className="text-xs text-indigo-600">استهداف شرائح المؤسسات الصغيرة</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* التقارير */}
          {activeTab === 'reports' && (
            <div className="space-y-6">
              {/* التقارير المُجدولة */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">التقارير المُجدولة</h3>
                  <Link 
                    to="/admin/analytics/reports/create"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-medium hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    تقرير جديد
                  </Link>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">اسم التقرير</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التكرار</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المستلمين</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">آخر إرسال</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإرسال التالي</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {scheduledReports.map((report) => (
                        <tr key={report.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {report.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.frequency === 'daily' ? 'يومي' : 
                             report.frequency === 'weekly' ? 'أسبوعي' : 'شهري'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.recipients.length} مستلم
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.lastSent}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {report.nextSend}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {report.status === 'active' ? 'نشط' : 'متوقف'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* قوالب التقارير السريعة */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">تقرير الأداء الشامل</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">تقرير شامل عن جميع مؤشرات الأداء والإيرادات</p>
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    تنزيل الآن
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <Users className="h-8 w-8 text-green-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">تقرير العملاء</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">تحليل مفصل لسلوك العملاء ومعدلات الاحتفاظ</p>
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    تنزيل الآن
                  </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <DollarSign className="h-8 w-8 text-purple-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-900">تقرير مالي</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">تقرير مفصل عن الإيرادات والأرباح والتكاليف</p>
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                    <Download className="h-4 w-4 mr-2" />
                    تنزيل الآن
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

export default AdvancedAnalytics