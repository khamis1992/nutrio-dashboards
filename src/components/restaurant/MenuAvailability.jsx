import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantSidebar from '../layout/RestaurantSidebar'
import RestaurantHeader from '../layout/RestaurantHeader'
import { 
  ArrowLeft,
  Search,
  Filter,
  ToggleLeft,
  ToggleRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Package,
  RefreshCw,
  Settings,
  Eye,
  Edit,
  ChefHat,
  Timer,
  Utensils
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
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

const MenuAvailability = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  // بيانات تجريبية
  const mockMenuItems = [
    {
      id: 1,
      name: 'برجر كلاسيك',
      nameEn: 'Classic Burger',
      category: 'main-courses',
      categoryName: 'الأطباق الرئيسية',
      price: 45.00,
      prepTime: 15,
      isAvailable: true,
      stockLevel: 25,
      lowStockThreshold: 5,
      image: '/images/burger.jpg',
      lastUpdated: '2024-01-25T10:30:00',
      autoDisable: true,
      scheduledUnavailable: false
    },
    {
      id: 2,
      name: 'سلطة القيصر',
      nameEn: 'Caesar Salad', 
      category: 'salads',
      categoryName: 'السلطات',
      price: 32.00,
      prepTime: 10,
      isAvailable: true,
      stockLevel: 15,
      lowStockThreshold: 3,
      image: '/images/salad.jpg',
      lastUpdated: '2024-01-25T09:15:00',
      autoDisable: false,
      scheduledUnavailable: false
    },
    {
      id: 3,
      name: 'بيتزا مارجريتا',
      nameEn: 'Margherita Pizza',
      category: 'pizzas',
      categoryName: 'البيتزا',
      price: 55.00,
      prepTime: 20,
      isAvailable: false,
      stockLevel: 2,
      lowStockThreshold: 5,
      image: '/images/pizza.jpg',
      lastUpdated: '2024-01-25T08:45:00',
      autoDisable: true,
      scheduledUnavailable: false,
      reason: 'مخزون منخفض'
    },
    {
      id: 4,
      name: 'عصير برتقال طازج',
      nameEn: 'Fresh Orange Juice',
      category: 'beverages',
      categoryName: 'المشروبات',
      price: 18.00,
      prepTime: 5,
      isAvailable: true,
      stockLevel: 50,
      lowStockThreshold: 10,
      image: '/images/juice.jpg',
      lastUpdated: '2024-01-25T11:00:00',
      autoDisable: false,
      scheduledUnavailable: false
    },
    {
      id: 5,
      name: 'تشيز كيك التوت',
      nameEn: 'Berry Cheesecake',
      category: 'desserts',
      categoryName: 'الحلويات',
      price: 28.00,
      prepTime: 8,
      isAvailable: false,
      stockLevel: 0,
      lowStockThreshold: 3,
      image: '/images/cheesecake.jpg',
      lastUpdated: '2024-01-25T07:30:00',
      autoDisable: true,
      scheduledUnavailable: true,
      reason: 'نفد المخزون'
    },
    {
      id: 6,
      name: 'شوربة العدس',
      nameEn: 'Lentil Soup',
      category: 'soups',
      categoryName: 'الشوربات',
      price: 22.00,
      prepTime: 12,
      isAvailable: true,
      stockLevel: 8,
      lowStockThreshold: 5,
      image: '/images/soup.jpg',
      lastUpdated: '2024-01-25T10:45:00',
      autoDisable: false,
      scheduledUnavailable: false
    }
  ]

  const mockCategories = [
    { id: 'main-courses', name: 'الأطباق الرئيسية' },
    { id: 'salads', name: 'السلطات' },
    { id: 'pizzas', name: 'البيتزا' },
    { id: 'beverages', name: 'المشروبات' },
    { id: 'desserts', name: 'الحلويات' },
    { id: 'soups', name: 'الشوربات' }
  ]

  useEffect(() => {
    setTimeout(() => {
      setMenuItems(mockMenuItems)
      setCategories(mockCategories)
      setLoading(false)
    }, 1000)
  }, [])

  // فلترة الأصناف
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    
    let matchesTab = true
    if (activeTab === 'available') {
      matchesTab = item.isAvailable
    } else if (activeTab === 'unavailable') {
      matchesTab = !item.isAvailable
    } else if (activeTab === 'low-stock') {
      matchesTab = item.stockLevel <= item.lowStockThreshold
    }
    
    return matchesSearch && matchesCategory && matchesTab
  })

  const toggleAvailability = (itemId) => {
    setMenuItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { 
              ...item, 
              isAvailable: !item.isAvailable,
              lastUpdated: new Date().toISOString()
            }
          : item
      )
    )
  }

  const bulkToggleAvailability = (available) => {
    setMenuItems(items => 
      items.map(item => ({ 
        ...item, 
        isAvailable: available,
        lastUpdated: new Date().toISOString()
      }))
    )
  }

  const bulkToggleCategory = (categoryId, available) => {
    setMenuItems(items => 
      items.map(item => 
        item.category === categoryId 
          ? { 
              ...item, 
              isAvailable: available,
              lastUpdated: new Date().toISOString()
            }
          : item
      )
    )
  }

  const getStatusBadge = (item) => {
    if (!item.isAvailable) {
      if (item.stockLevel === 0) {
        return <Badge className="bg-red-100 text-red-800">نفد المخزون</Badge>
      } else if (item.stockLevel <= item.lowStockThreshold) {
        return <Badge className="bg-orange-100 text-orange-800">مخزون منخفض</Badge>
      } else {
        return <Badge className="bg-gray-100 text-gray-800">غير متوفر</Badge>
      }
    }
    return <Badge className="bg-green-100 text-green-800">متوفر</Badge>
  }

  const getStockStatus = (item) => {
    if (item.stockLevel === 0) {
      return { color: 'text-red-600', icon: AlertTriangle, text: 'نفد' }
    } else if (item.stockLevel <= item.lowStockThreshold) {
      return { color: 'text-orange-600', icon: AlertTriangle, text: 'منخفض' }
    }
    return { color: 'text-green-600', icon: CheckCircle2, text: 'متوفر' }
  }

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // إحصائيات
  const stats = {
    total: menuItems.length,
    available: menuItems.filter(item => item.isAvailable).length,
    unavailable: menuItems.filter(item => !item.isAvailable).length,
    lowStock: menuItems.filter(item => item.stockLevel <= item.lowStockThreshold).length
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
                  onClick={() => navigate('/restaurant/menu')}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  العودة إلى القائمة
                </Button>
                
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">إدارة توفر الأصناف</h1>
                  <p className="text-gray-600 mt-2">تحديث حالة توفر الأصناف وإدارة المخزون</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => bulkToggleAvailability(false)}
                  className="text-red-600 hover:text-red-700"
                >
                  إيقاف الكل
                </Button>
                <Button
                  variant="outline"
                  onClick={() => bulkToggleAvailability(true)}
                  className="text-green-600 hover:text-green-700"
                >
                  تفعيل الكل
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  تحديث
                </Button>
              </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">إجمالي الأصناف</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ChefHat className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">أصناف متوفرة</p>
                      <p className="text-2xl font-bold text-green-600">{stats.available}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">أصناف غير متوفرة</p>
                      <p className="text-2xl font-bold text-red-600">{stats.unavailable}</p>
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
                      <p className="text-sm font-medium text-gray-600">مخزون منخفض</p>
                      <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-orange-600" />
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
                        placeholder="البحث في الأصناف..."
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
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">جميع الأصناف ({stats.total})</TabsTrigger>
                <TabsTrigger value="available">متوفر ({stats.available})</TabsTrigger>
                <TabsTrigger value="unavailable">غير متوفر ({stats.unavailable})</TabsTrigger>
                <TabsTrigger value="low-stock">مخزون منخفض ({stats.lowStock})</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* عرض الأصناف */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">جاري تحميل الأصناف...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد أصناف</h3>
                  <p className="text-gray-600 mb-6">لم يتم العثور على أصناف تطابق الفلاتر المحددة</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {categories.map(category => {
                  const categoryItems = filteredItems.filter(item => item.category === category.id)
                  if (categoryItems.length === 0) return null

                  return (
                    <Card key={category.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Utensils className="w-5 h-5" />
                            {category.name}
                          </CardTitle>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => bulkToggleCategory(category.id, false)}
                              className="text-red-600 hover:text-red-700"
                            >
                              إيقاف الفئة
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => bulkToggleCategory(category.id, true)}
                              className="text-green-600 hover:text-green-700"
                            >
                              تفعيل الفئة
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {categoryItems.map(item => {
                            const stockStatus = getStockStatus(item)
                            const StatusIcon = stockStatus.icon
                            
                            return (
                              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    {item.image ? (
                                      <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-lg"
                                      />
                                    ) : (
                                      <ChefHat className="w-8 h-8 text-gray-400" />
                                    )}
                                  </div>
                                  
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                                    <p className="text-sm text-gray-600">{item.nameEn}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                      <span className="text-sm font-medium text-green-600">
                                        {item.price.toFixed(2)} ر.س
                                      </span>
                                      <div className="flex items-center gap-1 text-sm text-gray-500">
                                        <Timer className="w-4 h-4" />
                                        {item.prepTime} دقيقة
                                      </div>
                                      <div className={`flex items-center gap-1 text-sm ${stockStatus.color}`}>
                                        <StatusIcon className="w-4 h-4" />
                                        المخزون: {item.stockLevel} ({stockStatus.text})
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                  {getStatusBadge(item)}
                                  
                                  <div className="flex items-center gap-2">
                                    <label className="text-sm text-gray-600">
                                      {item.isAvailable ? 'متوفر' : 'غير متوفر'}
                                    </label>
                                    <Switch
                                      checked={item.isAvailable}
                                      onCheckedChange={() => toggleAvailability(item.id)}
                                    />
                                  </div>
                                  
                                  <div className="text-xs text-gray-500">
                                    آخر تحديث: {formatTime(item.lastUpdated)}
                                  </div>
                                  
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <Settings className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
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

export default MenuAvailability