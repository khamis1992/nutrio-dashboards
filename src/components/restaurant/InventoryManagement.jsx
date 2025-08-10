import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantSidebar from '../layout/RestaurantSidebar'
import RestaurantHeader from '../layout/RestaurantHeader'
import { 
  ArrowLeft,
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Eye,
  MoreVertical,
  Calendar,
  Truck,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
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

const InventoryManagement = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('all')
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)

  // بيانات تجريبية للمخزون
  const mockInventory = [
    {
      id: 1,
      name: 'لحم بقري مفروم',
      nameEn: 'Ground Beef',
      category: 'meat',
      categoryName: 'اللحوم',
      currentStock: 25.5,
      minStockLevel: 10,
      maxStockLevel: 50,
      unit: 'كيلو',
      costPerUnit: 45.00,
      totalValue: 1147.50,
      supplier: 'مجزرة الطازج',
      lastOrderDate: '2024-01-20',
      expiryDate: '2024-01-30',
      location: 'الثلاجة الرئيسية',
      barcode: '1234567890123',
      status: 'in_stock'
    },
    {
      id: 2,
      name: 'طماطم طازجة',
      nameEn: 'Fresh Tomatoes',
      category: 'vegetables',
      categoryName: 'الخضروات',
      currentStock: 3.2,
      minStockLevel: 5,
      maxStockLevel: 20,
      unit: 'كيلو',
      costPerUnit: 8.50,
      totalValue: 27.20,
      supplier: 'مزرعة الخضار',
      lastOrderDate: '2024-01-23',
      expiryDate: '2024-01-28',
      location: 'ثلاجة الخضار',
      barcode: '2345678901234',
      status: 'low_stock'
    },
    {
      id: 3,
      name: 'دقيق أبيض',
      nameEn: 'White Flour',
      category: 'grains',
      categoryName: 'الحبوب',
      currentStock: 42,
      minStockLevel: 15,
      maxStockLevel: 60,
      unit: 'كيلو',
      costPerUnit: 3.25,
      totalValue: 136.50,
      supplier: 'مطاحن الدقيق',
      lastOrderDate: '2024-01-15',
      expiryDate: '2024-06-15',
      location: 'المخزن الجاف',
      barcode: '3456789012345',
      status: 'in_stock'
    },
    {
      id: 4,
      name: 'زيت نباتي',
      nameEn: 'Vegetable Oil',
      category: 'oils',
      categoryName: 'الزيوت',
      currentStock: 0,
      minStockLevel: 3,
      maxStockLevel: 12,
      unit: 'لتر',
      costPerUnit: 15.75,
      totalValue: 0,
      supplier: 'شركة الزيوت',
      lastOrderDate: '2024-01-10',
      expiryDate: null,
      location: 'المخزن الجاف',
      barcode: '4567890123456',
      status: 'out_of_stock'
    },
    {
      id: 5,
      name: 'جبن موزاريلا',
      nameEn: 'Mozzarella Cheese',
      category: 'dairy',
      categoryName: 'مشتقات الألبان',
      currentStock: 8.5,
      minStockLevel: 5,
      maxStockLevel: 25,
      unit: 'كيلو',
      costPerUnit: 28.00,
      totalValue: 238.00,
      supplier: 'مصنع الألبان',
      lastOrderDate: '2024-01-22',
      expiryDate: '2024-02-05',
      location: 'ثلاجة الألبان',
      barcode: '5678901234567',
      status: 'in_stock'
    },
    {
      id: 6,
      name: 'أرز بسمتي',
      nameEn: 'Basmati Rice',
      category: 'grains',
      categoryName: 'الحبوب',
      currentStock: 18,
      minStockLevel: 10,
      maxStockLevel: 40,
      unit: 'كيلو',
      costPerUnit: 12.50,
      totalValue: 225.00,
      supplier: 'تاجر الأرز',
      lastOrderDate: '2024-01-18',
      expiryDate: '2024-12-31',
      location: 'المخزن الجاف',
      barcode: '6789012345678',
      status: 'in_stock'
    }
  ]

  const categories = [
    { id: 'meat', name: 'اللحوم' },
    { id: 'vegetables', name: 'الخضروات' },
    { id: 'dairy', name: 'مشتقات الألبان' },
    { id: 'grains', name: 'الحبوب' },
    { id: 'oils', name: 'الزيوت' },
    { id: 'spices', name: 'البهارات' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setInventory(mockInventory)
      setLoading(false)
    }, 1000)
  }, [])

  // فلترة المخزون
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.includes(searchTerm)
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    
    let matchesTab = true
    if (activeTab === 'in_stock') {
      matchesTab = item.status === 'in_stock'
    } else if (activeTab === 'low_stock') {
      matchesTab = item.status === 'low_stock'
    } else if (activeTab === 'out_of_stock') {
      matchesTab = item.status === 'out_of_stock'
    } else if (activeTab === 'expiring_soon') {
      const today = new Date()
      const expiryDate = new Date(item.expiryDate)
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
      matchesTab = item.expiryDate && daysUntilExpiry <= 7 && daysUntilExpiry >= 0
    }
    
    return matchesSearch && matchesCategory && matchesTab
  })

  const getStatusBadge = (item) => {
    if (item.status === 'out_of_stock') {
      return <Badge className="bg-red-100 text-red-800">نفد المخزون</Badge>
    } else if (item.status === 'low_stock') {
      return <Badge className="bg-orange-100 text-orange-800">مخزون منخفض</Badge>
    }
    return <Badge className="bg-green-100 text-green-800">متوفر</Badge>
  }

  const getStockPercentage = (item) => {
    return Math.min((item.currentStock / item.maxStockLevel) * 100, 100)
  }

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return null
    
    const today = new Date()
    const expiry = new Date(expiryDate)
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
    
    if (daysUntilExpiry < 0) {
      return { text: 'منتهي الصلاحية', color: 'text-red-600', badge: 'bg-red-100 text-red-800' }
    } else if (daysUntilExpiry <= 3) {
      return { text: `${daysUntilExpiry} أيام`, color: 'text-red-600', badge: 'bg-red-100 text-red-800' }
    } else if (daysUntilExpiry <= 7) {
      return { text: `${daysUntilExpiry} أيام`, color: 'text-orange-600', badge: 'bg-orange-100 text-orange-800' }
    }
    return { text: `${daysUntilExpiry} يوم`, color: 'text-green-600', badge: 'bg-green-100 text-green-800' }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'غير محدد'
    return new Date(dateString).toLocaleDateString('ar-SA')
  }

  const formatCurrency = (amount) => {
    return `${amount.toFixed(2)} ر.س`
  }

  // إحصائيات
  const stats = {
    total: inventory.length,
    inStock: inventory.filter(item => item.status === 'in_stock').length,
    lowStock: inventory.filter(item => item.status === 'low_stock').length,
    outOfStock: inventory.filter(item => item.status === 'out_of_stock').length,
    expiringSoon: inventory.filter(item => {
      if (!item.expiryDate) return false
      const today = new Date()
      const expiryDate = new Date(item.expiryDate)
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24))
      return daysUntilExpiry <= 7 && daysUntilExpiry >= 0
    }).length,
    totalValue: inventory.reduce((sum, item) => sum + item.totalValue, 0)
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
                  <h1 className="text-3xl font-bold text-gray-900">إدارة المخزون</h1>
                  <p className="text-gray-600 mt-2">إدارة المواد الخام وتتبع مستويات المخزون</p>
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
                <Button 
                  onClick={() => navigate('/restaurant/inventory/add')}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  إضافة مادة
                </Button>
              </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">إجمالي المواد</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">متوفر</p>
                      <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
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
                      <p className="text-sm font-medium text-gray-600">مخزون منخفض</p>
                      <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">نفد المخزون</p>
                      <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
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
                      <p className="text-sm font-medium text-gray-600">ينتهي قريباً</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.expiringSoon}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">قيمة المخزون</p>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(stats.totalValue)}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-green-600" />
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
                        placeholder="البحث بالاسم أو الباركود..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* فلتر الفئة */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الفئات</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* التبويبات */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">جميع المواد ({stats.total})</TabsTrigger>
                <TabsTrigger value="in_stock">متوفر ({stats.inStock})</TabsTrigger>
                <TabsTrigger value="low_stock">منخفض ({stats.lowStock})</TabsTrigger>
                <TabsTrigger value="out_of_stock">نفد ({stats.outOfStock})</TabsTrigger>
                <TabsTrigger value="expiring_soon">ينتهي قريباً ({stats.expiringSoon})</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* عرض المخزون */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">جاري تحميل المخزون...</p>
              </div>
            ) : filteredInventory.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد مواد</h3>
                  <p className="text-gray-600 mb-6">لم يتم العثور على مواد تطابق الفلاتر المحددة</p>
                  <Button 
                    onClick={() => navigate('/restaurant/inventory/add')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مادة جديدة
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredInventory.map(item => {
                  const expiryStatus = getExpiryStatus(item.expiryDate)
                  const stockPercentage = getStockPercentage(item)
                  
                  return (
                    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          
                          {/* معلومات المنتج */}
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                {getStatusBadge(item)}
                                {expiryStatus && (
                                  <Badge className={expiryStatus.badge}>
                                    <Clock className="w-3 h-3 ml-1" />
                                    {expiryStatus.text}
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-600">المخزون الحالي:</span>
                                  <p className="font-medium">{item.currentStock} {item.unit}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">الحد الأدنى:</span>
                                  <p className="font-medium">{item.minStockLevel} {item.unit}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">التكلفة/الوحدة:</span>
                                  <p className="font-medium">{formatCurrency(item.costPerUnit)}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">القيمة الإجمالية:</span>
                                  <p className="font-medium text-green-600">{formatCurrency(item.totalValue)}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">المورد:</span>
                                  <p className="font-medium">{item.supplier}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">الموقع:</span>
                                  <p className="font-medium">{item.location}</p>
                                </div>
                              </div>
                              
                              {/* شريط المخزون */}
                              <div className="mt-3">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                  <span>مستوى المخزون</span>
                                  <span>{Math.round(stockPercentage)}%</span>
                                </div>
                                <Progress 
                                  value={stockPercentage} 
                                  className="h-2"
                                  // يمكن تخصيص الألوان حسب المستوى
                                />
                              </div>
                            </div>
                          </div>
                          
                          {/* الإجراءات */}
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Truck className="w-4 h-4" />
                            </Button>
                            
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
                                  <Truck className="w-4 h-4 ml-2" />
                                  طلب توريد
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <BarChart3 className="w-4 h-4 ml-2" />
                                  تقرير الاستهلاك
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 ml-2" />
                                  حذف المادة
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default InventoryManagement