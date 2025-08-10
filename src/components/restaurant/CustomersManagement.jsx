import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantSidebar from '../layout/RestaurantSidebar'
import RestaurantHeader from '../layout/RestaurantHeader'
import { 
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  Crown,
  Gift,
  MessageSquare,
  MoreVertical,
  UserPlus,
  Download,
  Upload,
  RefreshCw,
  Heart,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

const CustomersManagement = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSegment, setSelectedSegment] = useState('all')
  const [sortBy, setSortBy] = useState('lastOrder')
  const [activeTab, setActiveTab] = useState('all')
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  // بيانات تجريبية للعملاء
  const mockCustomers = [
    {
      id: 1,
      name: 'أحمد محمد',
      email: 'ahmed.mohamed@email.com',
      phone: '+966501234567',
      avatar: null,
      address: 'الرياض، حي النخيل، شارع الملك فهد',
      joinDate: '2023-06-15',
      lastOrderDate: '2024-01-25',
      totalOrders: 45,
      totalSpent: 2850.75,
      averageOrderValue: 63.35,
      loyaltyPoints: 285,
      loyaltyTier: 'gold',
      rating: 4.8,
      status: 'active',
      tags: ['frequent', 'high-value'],
      notes: 'عميل مميز، يفضل الطلبات الكبيرة',
      lastOrderItems: ['برجر كلاسيك', 'بيتزا مارجريتا', 'عصير طبيعي'],
      favoriteItems: ['برجر كلاسيك', 'سلطة قيصر'],
      complaints: 1,
      compliments: 8
    },
    {
      id: 2,
      name: 'فاطمة العلي',
      email: 'fatima.ali@email.com',
      phone: '+966507654321',
      avatar: null,
      address: 'جدة، حي الزهراء، شارع التحلية',
      joinDate: '2023-09-22',
      lastOrderDate: '2024-01-24',
      totalOrders: 32,
      totalSpent: 1680.50,
      averageOrderValue: 52.52,
      loyaltyPoints: 168,
      loyaltyTier: 'silver',
      rating: 4.6,
      status: 'active',
      tags: ['regular'],
      notes: 'تفضل الأطباق الصحية',
      lastOrderItems: ['سلطة قيصر', 'شوربة عدس'],
      favoriteItems: ['سلطة قيصر', 'عصير طبيعي'],
      complaints: 0,
      compliments: 5
    },
    {
      id: 3,
      name: 'محمد السعدي',
      email: 'mohammed.saadi@email.com',
      phone: '+966509876543',
      avatar: null,
      address: 'الدمام، حي الفيصلية، شارع الأمير محمد',
      joinDate: '2023-12-10',
      lastOrderDate: '2024-01-20',
      totalOrders: 18,
      totalSpent: 945.25,
      averageOrderValue: 52.51,
      loyaltyPoints: 94,
      loyaltyTier: 'bronze',
      rating: 4.3,
      status: 'active',
      tags: ['new'],
      notes: '',
      lastOrderItems: ['بيتزا مارجريتا', 'تشيز كيك'],
      favoriteItems: ['بيتزا مارجريتا'],
      complaints: 0,
      compliments: 2
    },
    {
      id: 4,
      name: 'سارة أحمد',
      email: 'sara.ahmed@email.com',
      phone: '+966502468135',
      avatar: null,
      address: 'مكة المكرمة، حي العزيزية، شارع الحرم',
      joinDate: '2023-03-18',
      lastOrderDate: '2023-12-15',
      totalOrders: 75,
      totalSpent: 4200.00,
      averageOrderValue: 56.00,
      loyaltyPoints: 420,
      loyaltyTier: 'platinum',
      rating: 4.9,
      status: 'inactive',
      tags: ['vip', 'high-value'],
      notes: 'عميلة VIP، توقفت عن الطلب مؤخراً',
      lastOrderItems: ['برجر كلاسيك', 'سلطة قيصر', 'تشيز كيك'],
      favoriteItems: ['برجر كلاسيك', 'تشيز كيك', 'عصير طبيعي'],
      complaints: 0,
      compliments: 15
    },
    {
      id: 5,
      name: 'عبدالله الحربي',
      email: 'abdullah.harbi@email.com',
      phone: '+966508642975',
      avatar: null,
      address: 'الطائف، حي الشهداء، شارع الخالدية',
      joinDate: '2024-01-05',
      lastOrderDate: '2024-01-23',
      totalOrders: 8,
      totalSpent: 380.50,
      averageOrderValue: 47.56,
      loyaltyPoints: 38,
      loyaltyTier: 'bronze',
      rating: 4.2,
      status: 'active',
      tags: ['new'],
      notes: 'عميل جديد واعد',
      lastOrderItems: ['شوربة عدس', 'برجر كلاسيك'],
      favoriteItems: ['برجر كلاسيك'],
      complaints: 1,
      compliments: 1
    },
    {
      id: 6,
      name: 'نورا الغامدي',
      email: 'nora.ghamdi@email.com',
      phone: '+966503698741',
      avatar: null,
      address: 'أبها، حي المطار، شارع الملك عبدالعزيز',
      joinDate: '2023-08-12',
      lastOrderDate: '2024-01-22',
      totalOrders: 28,
      totalSpent: 1470.75,
      averageOrderValue: 52.53,
      loyaltyPoints: 147,
      loyaltyTier: 'silver',
      rating: 4.7,
      status: 'active',
      tags: ['regular', 'loyal'],
      notes: 'تطلب بانتظام كل أسبوع',
      lastOrderItems: ['سلطة قيصر', 'عصير طبيعي', 'تشيز كيك'],
      favoriteItems: ['سلطة قيصر', 'تشيز كيك'],
      complaints: 0,
      compliments: 6
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setCustomers(mockCustomers)
      setLoading(false)
    }, 1000)
  }, [])

  // فلترة وترتيب العملاء
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm)
    
    let matchesSegment = true
    if (selectedSegment === 'vip') {
      matchesSegment = customer.loyaltyTier === 'platinum' || customer.tags.includes('vip')
    } else if (selectedSegment === 'frequent') {
      matchesSegment = customer.totalOrders >= 20
    } else if (selectedSegment === 'new') {
      matchesSegment = customer.tags.includes('new') || customer.totalOrders < 10
    } else if (selectedSegment === 'inactive') {
      matchesSegment = customer.status === 'inactive'
    }
    
    let matchesTab = true
    if (activeTab === 'active') {
      matchesTab = customer.status === 'active'
    } else if (activeTab === 'inactive') {
      matchesTab = customer.status === 'inactive'
    } else if (activeTab === 'vip') {
      matchesTab = customer.loyaltyTier === 'platinum' || customer.tags.includes('vip')
    }
    
    return matchesSearch && matchesSegment && matchesTab
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'totalSpent':
        return b.totalSpent - a.totalSpent
      case 'totalOrders':
        return b.totalOrders - a.totalOrders
      case 'lastOrder':
        return new Date(b.lastOrderDate) - new Date(a.lastOrderDate)
      case 'joinDate':
        return new Date(b.joinDate) - new Date(a.joinDate)
      default:
        return new Date(b.lastOrderDate) - new Date(a.lastOrderDate)
    }
  })

  const getTierColor = (tier) => {
    const colors = {
      bronze: 'bg-amber-100 text-amber-800',
      silver: 'bg-gray-100 text-gray-800',
      gold: 'bg-yellow-100 text-yellow-800',
      platinum: 'bg-purple-100 text-purple-800'
    }
    return colors[tier] || 'bg-gray-100 text-gray-800'
  }

  const getTierIcon = (tier) => {
    if (tier === 'platinum') return <Crown className="w-4 h-4" />
    if (tier === 'gold') return <Star className="w-4 h-4" />
    return null
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA')
  }

  const formatCurrency = (amount) => {
    return `${amount.toFixed(2)} ر.س`
  }

  const getCustomerInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  // إحصائيات
  const stats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    vip: customers.filter(c => c.loyaltyTier === 'platinum' || c.tags.includes('vip')).length,
    newThisMonth: customers.filter(c => {
      const joinDate = new Date(c.joinDate)
      const now = new Date()
      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
    }).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
    averageOrderValue: customers.reduce((sum, c) => sum + c.averageOrderValue, 0) / customers.length
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <RestaurantSidebar 
        isCollapsed={sidebarCollapsed} 
        setIsCollapsed={setSidebarCollapsed} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <RestaurantHeader />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            
            {/* العنوان والإجراءات */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/restaurant')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  العودة إلى لوحة التحكم
                </Button>
                
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">إدارة العملاء</h1>
                  <p className="text-gray-600 mt-2">إدارة قاعدة عملاء المطعم وتتبع سلوكهم</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  تصدير
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  استيراد
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  تحديث
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  إضافة عميل
                </Button>
              </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">إجمالي العملاء</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">عملاء نشطون</p>
                      <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">عملاء VIP</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.vip}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Crown className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">عملاء جدد</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.newThisMonth}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">غير نشطين</p>
                      <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">متوسط الطلب</p>
                      <p className="text-xl font-bold text-orange-600">{formatCurrency(stats.averageOrderValue)}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* أدوات البحث والفلترة */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  
                  {/* البحث */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث بالاسم، البريد الإلكتروني، أو رقم الهاتف..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* فلتر الشريحة */}
                  <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="شريحة العملاء" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع العملاء</SelectItem>
                      <SelectItem value="vip">عملاء VIP</SelectItem>
                      <SelectItem value="frequent">عملاء دائمون</SelectItem>
                      <SelectItem value="new">عملاء جدد</SelectItem>
                      <SelectItem value="inactive">غير نشطين</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* ترتيب */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lastOrder">آخر طلب</SelectItem>
                      <SelectItem value="name">الاسم</SelectItem>
                      <SelectItem value="totalSpent">إجمالي الإنفاق</SelectItem>
                      <SelectItem value="totalOrders">عدد الطلبات</SelectItem>
                      <SelectItem value="joinDate">تاريخ الانضمام</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* التبويبات */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">جميع العملاء ({stats.total})</TabsTrigger>
                <TabsTrigger value="active">نشط ({stats.active})</TabsTrigger>
                <TabsTrigger value="inactive">غير نشط ({stats.inactive})</TabsTrigger>
                <TabsTrigger value="vip">VIP ({stats.vip})</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* عرض العملاء */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">جاري تحميل العملاء...</p>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">لا يوجد عملاء</h3>
                  <p className="text-gray-600 mb-6">لم يتم العثور على عملاء يطابقون الفلاتر المحددة</p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <UserPlus className="w-4 h-4 ml-2" />
                    إضافة عميل جديد
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCustomers.map(customer => (
                  <Card key={customer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={customer.avatar} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {getCustomerInitials(customer.name)}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                              {getTierIcon(customer.loyaltyTier)}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getTierColor(customer.loyaltyTier)}>
                                {customer.loyaltyTier === 'bronze' ? 'برونزي' :
                                 customer.loyaltyTier === 'silver' ? 'فضي' :
                                 customer.loyaltyTier === 'gold' ? 'ذهبي' : 'بلاتيني'}
                              </Badge>
                              {customer.status === 'active' ? (
                                <Badge className="bg-green-100 text-green-800">نشط</Badge>
                              ) : (
                                <Badge className="bg-red-100 text-red-800">غير نشط</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 ml-2" />
                              عرض التفاصيل
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 ml-2" />
                              تعديل البيانات
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="w-4 h-4 ml-2" />
                              اتصال
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 ml-2" />
                              إرسال رسالة
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Gift className="w-4 h-4 ml-2" />
                              إرسال عرض خاص
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 ml-2" />
                              حذف العميل
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      
                      {/* معلومات الاتصال */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{customer.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span className="truncate">{customer.address}</span>
                        </div>
                      </div>
                      
                      {/* إحصائيات العميل */}
                      <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                          <p className="text-lg font-semibold text-blue-600">{customer.totalOrders}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">إجمالي الإنفاق</p>
                          <p className="text-lg font-semibold text-green-600">{formatCurrency(customer.totalSpent)}</p>
                        </div>
                      </div>
                      
                      {/* تفاصيل إضافية */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">متوسط الطلب:</span>
                          <span className="font-medium">{formatCurrency(customer.averageOrderValue)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">نقاط الولاء:</span>
                          <span className="font-medium text-purple-600">{customer.loyaltyPoints} نقطة</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">التقييم:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{customer.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">آخر طلب:</span>
                          <span className="font-medium">{formatDate(customer.lastOrderDate)}</span>
                        </div>
                      </div>
                      
                      {/* الأصناف المفضلة */}
                      {customer.favoriteItems.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">الأصناف المفضلة:</p>
                          <div className="flex flex-wrap gap-1">
                            {customer.favoriteItems.slice(0, 2).map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <Heart className="w-3 h-3 ml-1 text-red-500" />
                                {item}
                              </Badge>
                            ))}
                            {customer.favoriteItems.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{customer.favoriteItems.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* الشكاوى والإطراءات */}
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4 text-red-500" />
                          <span>{customer.complaints} شكوى</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-green-500" />
                          <span>{customer.compliments} إطراء</span>
                        </div>
                      </div>
                      
                      {/* الملاحظات */}
                      {customer.notes && (
                        <div className="p-2 bg-blue-50 rounded text-xs text-blue-700">
                          {customer.notes}
                        </div>
                      )}
                      
                      {/* إجراءات سريعة */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 ml-1" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Phone className="w-4 h-4 ml-1" />
                          اتصال
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Gift className="w-4 h-4 ml-1" />
                          عرض
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default CustomersManagement