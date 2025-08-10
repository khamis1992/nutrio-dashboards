import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantSidebar from '../layout/RestaurantSidebar'
import RestaurantHeader from '../layout/RestaurantHeader'
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  Clock,
  DollarSign,
  Package,
  ImageIcon,
  MoreVertical,
  ToggleLeft,
  ToggleRight,
  ChefHat,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload,
  Grid,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const MenuManagement = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const [menuItems, setMenuItems] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  // بيانات تجريبية للأصناف
  const mockMenuItems = [
    {
      id: 1,
      name: 'برجر كلاسيك',
      nameEn: 'Classic Burger',
      description: 'برجر لحم بقري مشوي مع الخضار الطازجة والصوص الخاص',
      price: 45.00,
      category: 'main-courses',
      categoryName: 'الأطباق الرئيسية',
      image: '/images/burger-classic.jpg',
      isAvailable: true,
      prepTime: 15,
      calories: 650,
      ingredients: ['لحم بقري', 'خس', 'طماطم', 'بصل', 'جبنة شيدر'],
      allergens: ['غلوتين', 'ألبان'],
      rating: 4.5,
      sales: 120,
      status: 'active',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: 'سلطة القيصر',
      nameEn: 'Caesar Salad',
      description: 'سلطة خضراء طازجة مع الدجاج المشوي وصوص القيصر',
      price: 32.00,
      category: 'salads',
      categoryName: 'السلطات',
      image: '/images/caesar-salad.jpg',
      isAvailable: true,
      prepTime: 10,
      calories: 320,
      ingredients: ['خس روماني', 'دجاج مشوي', 'جبنة بارميزان', 'خبز محمص'],
      allergens: ['غلوتين', 'ألبان', 'بيض'],
      rating: 4.3,
      sales: 85,
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: 3,
      name: 'بيتزا مارجريتا',
      nameEn: 'Margherita Pizza',
      description: 'بيتزا كلاسيكية بالطماطم والموزاريلا والريحان الطازج',
      price: 55.00,
      category: 'pizzas',
      categoryName: 'البيتزا',
      image: '/images/margherita-pizza.jpg',
      isAvailable: false,
      prepTime: 20,
      calories: 800,
      ingredients: ['عجينة البيتزا', 'صلصة الطماطم', 'موزاريلا', 'ريحان'],
      allergens: ['غلوتين', 'ألبان'],
      rating: 4.7,
      sales: 95,
      status: 'inactive',
      createdAt: '2024-01-05',
      updatedAt: '2024-01-19'
    },
    {
      id: 4,
      name: 'عصير طبيعي مشكل',
      nameEn: 'Fresh Mixed Juice',
      description: 'مزيج من الفواكه الطبيعية الطازجة',
      price: 18.00,
      category: 'beverages',
      categoryName: 'المشروبات',
      image: '/images/mixed-juice.jpg',
      isAvailable: true,
      prepTime: 5,
      calories: 120,
      ingredients: ['برتقال', 'تفاح', 'جزر', 'زنجبيل'],
      allergens: [],
      rating: 4.2,
      sales: 200,
      status: 'active',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-21'
    },
    {
      id: 5,
      name: 'تشيز كيك التوت',
      nameEn: 'Berry Cheesecake',
      description: 'تشيز كيك كريمي بطبقة التوت الطازج',
      price: 28.00,
      category: 'desserts',
      categoryName: 'الحلويات',
      image: '/images/berry-cheesecake.jpg',
      isAvailable: true,
      prepTime: 8,
      calories: 450,
      ingredients: ['جبنة كريمية', 'توت طازج', 'بسكويت', 'كريمة'],
      allergens: ['ألبان', 'بيض', 'غلوتين'],
      rating: 4.8,
      sales: 65,
      status: 'active',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-16'
    },
    {
      id: 6,
      name: 'شوربة العدس',
      nameEn: 'Lentil Soup',
      description: 'شوربة عدس تقليدية مع الخضار والتوابل',
      price: 22.00,
      category: 'soups',
      categoryName: 'الشوربات',
      image: '/images/lentil-soup.jpg',
      isAvailable: true,
      prepTime: 12,
      calories: 180,
      ingredients: ['عدس أحمر', 'جزر', 'بصل', 'كركم', 'كمون'],
      allergens: [],
      rating: 4.4,
      sales: 40,
      status: 'active',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-20'
    }
  ]

  const mockCategories = [
    { id: 'main-courses', name: 'الأطباق الرئيسية', nameEn: 'Main Courses', itemsCount: 15 },
    { id: 'salads', name: 'السلطات', nameEn: 'Salads', itemsCount: 8 },
    { id: 'pizzas', name: 'البيتزا', nameEn: 'Pizzas', itemsCount: 12 },
    { id: 'beverages', name: 'المشروبات', nameEn: 'Beverages', itemsCount: 20 },
    { id: 'desserts', name: 'الحلويات', nameEn: 'Desserts', itemsCount: 10 },
    { id: 'soups', name: 'الشوربات', nameEn: 'Soups', itemsCount: 6 }
  ]

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setMenuItems(mockMenuItems)
      setCategories(mockCategories)
      setLoading(false)
    }, 1000)
  }, [])

  // فلترة وترتيب الأصناف
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'available' && item.isAvailable) ||
                         (selectedStatus === 'unavailable' && !item.isAvailable) ||
                         (selectedStatus === 'active' && item.status === 'active') ||
                         (selectedStatus === 'inactive' && item.status === 'inactive')
    
    return matchesSearch && matchesCategory && matchesStatus
  }).sort((a, b) => {
    let aVal, bVal
    switch (sortBy) {
      case 'name':
        aVal = a.name
        bVal = b.name
        break
      case 'price':
        aVal = a.price
        bVal = b.price
        break
      case 'rating':
        aVal = a.rating
        bVal = b.rating
        break
      case 'sales':
        aVal = a.sales
        bVal = b.sales
        break
      case 'created':
        aVal = new Date(a.createdAt)
        bVal = new Date(b.createdAt)
        break
      default:
        aVal = a.name
        bVal = b.name
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  const toggleAvailability = (itemId) => {
    setMenuItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, isAvailable: !item.isAvailable }
          : item
      )
    )
  }

  const handleDeleteItem = (itemId) => {
    if (confirm('هل أنت متأكد من حذف هذا الصنف؟')) {
      setMenuItems(items => items.filter(item => item.id !== itemId))
    }
  }

  const formatPrice = (price) => {
    return `${price.toFixed(2)} ر.س`
  }

  const getStatusBadge = (item) => {
    if (!item.isAvailable) {
      return <Badge variant="secondary" className="bg-red-100 text-red-800">غير متوفر</Badge>
    }
    if (item.status === 'active') {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">نشط</Badge>
    }
    return <Badge variant="secondary" className="bg-gray-100 text-gray-800">غير نشط</Badge>
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
            
            {/* العنوان والإجراءات السريعة */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">إدارة القائمة</h1>
                <p className="text-gray-600 mt-2">إدارة وتنظيم أصناف المطعم</p>
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
                <Button 
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  onClick={() => navigate('/restaurant/menu/add')}
                >
                  <Plus className="w-4 h-4" />
                  إضافة صنف جديد
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
                      <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
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
                      <p className="text-2xl font-bold text-green-600">
                        {menuItems.filter(item => item.isAvailable).length}
                      </p>
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
                      <p className="text-sm font-medium text-gray-600">أصناف غير متوفرة</p>
                      <p className="text-2xl font-bold text-red-600">
                        {menuItems.filter(item => !item.isAvailable).length}
                      </p>
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
                      <p className="text-sm font-medium text-gray-600">الفئات</p>
                      <p className="text-2xl font-bold text-purple-600">{categories.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-purple-600" />
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

                  {/* فلتر الحالة */}
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="available">متوفر</SelectItem>
                      <SelectItem value="unavailable">غير متوفر</SelectItem>
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="inactive">غير نشط</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* ترتيب */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">الاسم</SelectItem>
                      <SelectItem value="price">السعر</SelectItem>
                      <SelectItem value="rating">التقييم</SelectItem>
                      <SelectItem value="sales">المبيعات</SelectItem>
                      <SelectItem value="created">تاريخ الإنشاء</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* اتجاه الترتيب */}
                  <Button
                    variant="outline"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="w-full lg:w-auto"
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </Button>

                  {/* نمط العرض */}
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                  <p className="text-gray-600 mb-6">لم يتم العثور على أصناف تطابق البحث أو الفلاتر المحددة</p>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => navigate('/restaurant/menu/add')}
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة صنف جديد
                  </Button>
                </CardContent>
              </Card>
            ) : viewMode === 'grid' ? (
              /* عرض الشبكة */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map(item => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="absolute top-2 right-2">
                        {getStatusBadge(item)}
                      </div>
                      
                      <div className="absolute top-2 left-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAvailability(item.id)}
                          className="bg-white/80 hover:bg-white"
                        >
                          {item.isAvailable ? 
                            <ToggleRight className="w-4 h-4 text-green-600" /> : 
                            <ToggleLeft className="w-4 h-4 text-gray-400" />
                          }
                        </Button>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 truncate flex-1">{item.name}</h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm text-gray-600">{item.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                      
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-green-600">{formatPrice(item.price)}</span>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 ml-1" />
                          {item.prepTime} دقيقة
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          {item.sales} مبيعة
                        </span>
                        
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
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* عرض القائمة */
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الصنف
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الفئة
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            السعر
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            التقييم
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            المبيعات
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الحالة
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الإجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredItems.map(item => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center ml-3">
                                  {item.image ? (
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <ImageIcon className="w-6 h-6 text-gray-400" />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline">{item.categoryName}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-green-600">
                                {formatPrice(item.price)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
                                <span className="text-sm text-gray-900">{item.rating}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">{item.sales}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(item)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleAvailability(item.id)}
                                >
                                  {item.isAvailable ? 
                                    <ToggleRight className="w-4 h-4 text-green-600" /> : 
                                    <ToggleLeft className="w-4 h-4 text-gray-400" />
                                  }
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
                                      تعديل
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      className="text-red-600"
                                      onClick={() => handleDeleteItem(item.id)}
                                    >
                                      <Trash2 className="w-4 h-4 ml-2" />
                                      حذف
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MenuManagement