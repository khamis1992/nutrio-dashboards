import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantSidebar from '../layout/RestaurantSidebar'
import RestaurantHeader from '../layout/RestaurantHeader'
import { 
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ArrowLeft,
  Package,
  ImageIcon,
  Upload,
  Search,
  MoreVertical,
  Eye,
  Grid,
  List,
  SortAsc,
  SortDesc,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

const MenuCategories = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [viewMode, setViewMode] = useState('grid')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  
  // حالة النموذج
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    image: null,
    sortOrder: 0,
    isActive: true
  })
  const [errors, setErrors] = useState({})
  const [imagePreview, setImagePreview] = useState(null)

  // بيانات تجريبية للفئات
  const mockCategories = [
    {
      id: 1,
      name: 'الأطباق الرئيسية',
      nameEn: 'Main Courses',
      description: 'مجموعة متنوعة من الأطباق الرئيسية اللذيذة',
      descriptionEn: 'A variety of delicious main courses',
      image: '/images/main-courses.jpg',
      itemsCount: 15,
      sortOrder: 1,
      isActive: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'المقبلات',
      nameEn: 'Appetizers',
      description: 'مقبلات شهية لبداية مثالية للوجبة',
      descriptionEn: 'Delicious appetizers for a perfect meal start',
      image: '/images/appetizers.jpg',
      itemsCount: 8,
      sortOrder: 2,
      isActive: true,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-12'
    },
    {
      id: 3,
      name: 'البيتزا',
      nameEn: 'Pizzas',
      description: 'بيتزا طازجة بأشهى النكهات',
      descriptionEn: 'Fresh pizzas with the most delicious flavors',
      image: '/images/pizzas.jpg',
      itemsCount: 12,
      sortOrder: 3,
      isActive: true,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-18'
    },
    {
      id: 4,
      name: 'السلطات',
      nameEn: 'Salads',
      description: 'سلطات طازجة وصحية',
      descriptionEn: 'Fresh and healthy salads',
      image: '/images/salads.jpg',
      itemsCount: 6,
      sortOrder: 4,
      isActive: true,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-20'
    },
    {
      id: 5,
      name: 'المشروبات',
      nameEn: 'Beverages',
      description: 'مشروبات منعشة وعصائر طبيعية',
      descriptionEn: 'Refreshing drinks and natural juices',
      image: '/images/beverages.jpg',
      itemsCount: 20,
      sortOrder: 5,
      isActive: true,
      createdAt: '2024-01-07',
      updatedAt: '2024-01-14'
    },
    {
      id: 6,
      name: 'الحلويات',
      nameEn: 'Desserts',
      description: 'حلويات لذيذة لختام مثالي',
      descriptionEn: 'Delicious desserts for a perfect ending',
      image: '/images/desserts.jpg',
      itemsCount: 10,
      sortOrder: 6,
      isActive: false,
      createdAt: '2024-01-03',
      updatedAt: '2024-01-16'
    }
  ]

  useEffect(() => {
    // محاكاة تحميل البيانات
    setTimeout(() => {
      setCategories(mockCategories)
      setLoading(false)
    }, 1000)
  }, [])

  // فلترة وترتيب الفئات
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  }).sort((a, b) => {
    let aVal, bVal
    switch (sortBy) {
      case 'name':
        aVal = a.name
        bVal = b.name
        break
      case 'items':
        aVal = a.itemsCount
        bVal = b.itemsCount
        break
      case 'order':
        aVal = a.sortOrder
        bVal = b.sortOrder
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // إزالة الخطأ عند تعديل الحقل
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors(prev => ({
          ...prev,
          image: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت'
        }))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setFormData(prev => ({
          ...prev,
          image: file
        }))
        setErrors(prev => ({
          ...prev,
          image: null
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'اسم الفئة مطلوب'
    }

    if (!formData.nameEn.trim()) {
      newErrors.nameEn = 'الاسم بالإنجليزية مطلوب'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف الفئة مطلوب'
    }

    if (isNaN(formData.sortOrder) || formData.sortOrder < 0) {
      newErrors.sortOrder = 'ترتيب صحيح مطلوب'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const openAddDialog = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      nameEn: '',
      description: '',
      descriptionEn: '',
      image: null,
      sortOrder: categories.length + 1,
      isActive: true
    })
    setImagePreview(null)
    setErrors({})
    setIsDialogOpen(true)
  }

  const openEditDialog = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      nameEn: category.nameEn,
      description: category.description,
      descriptionEn: category.descriptionEn || '',
      image: null,
      sortOrder: category.sortOrder,
      isActive: category.isActive
    })
    setImagePreview(category.image)
    setErrors({})
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // محاكاة حفظ البيانات
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (editingCategory) {
        // تحديث الفئة
        setCategories(prev => prev.map(cat => 
          cat.id === editingCategory.id 
            ? { 
                ...cat, 
                ...formData, 
                image: imagePreview,
                updatedAt: new Date().toISOString().split('T')[0] 
              }
            : cat
        ))
      } else {
        // إضافة فئة جديدة
        const newCategory = {
          id: Date.now(),
          ...formData,
          image: imagePreview,
          itemsCount: 0,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        }
        setCategories(prev => [...prev, newCategory])
      }
      
      setIsDialogOpen(false)
      
    } catch (error) {
      console.error('خطأ في حفظ الفئة:', error)
      setErrors({ submit: 'حدث خطأ في حفظ الفئة. يرجى المحاولة مرة أخرى.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCategory = (categoryId) => {
    if (confirm('هل أنت متأكد من حذف هذه الفئة؟ سيتم حذف جميع الأصناف المرتبطة بها.')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId))
    }
  }

  const toggleCategoryStatus = (categoryId) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? { ...cat, isActive: !cat.isActive }
        : cat
    ))
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
                  <h1 className="text-3xl font-bold text-gray-900">إدارة فئات القائمة</h1>
                  <p className="text-gray-600 mt-2">تنظيم وإدارة فئات الأصناف</p>
                </div>
              </div>
              
              <Button 
                onClick={openAddDialog}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة فئة جديدة
              </Button>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">إجمالي الفئات</p>
                      <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
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
                      <p className="text-sm font-medium text-gray-600">فئات نشطة</p>
                      <p className="text-2xl font-bold text-green-600">
                        {categories.filter(cat => cat.isActive).length}
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
                      <p className="text-sm font-medium text-gray-600">فئات غير نشطة</p>
                      <p className="text-2xl font-bold text-red-600">
                        {categories.filter(cat => !cat.isActive).length}
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
                      <p className="text-sm font-medium text-gray-600">إجمالي الأصناف</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {categories.reduce((sum, cat) => sum + cat.itemsCount, 0)}
                      </p>
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
                        placeholder="البحث في الفئات..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* ترتيب */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">الاسم</SelectItem>
                      <SelectItem value="items">عدد الأصناف</SelectItem>
                      <SelectItem value="order">ترتيب العرض</SelectItem>
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

            {/* عرض الفئات */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">جاري تحميل الفئات...</p>
              </div>
            ) : filteredCategories.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد فئات</h3>
                  <p className="text-gray-600 mb-6">لم يتم العثور على فئات تطابق البحث المحدد</p>
                  <Button 
                    onClick={openAddDialog}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة فئة جديدة
                  </Button>
                </CardContent>
              </Card>
            ) : viewMode === 'grid' ? (
              /* عرض الشبكة */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.map(category => (
                  <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        {category.image ? (
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-12 h-12 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="absolute top-2 right-2">
                        <Badge 
                          variant={category.isActive ? "default" : "secondary"}
                          className={category.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {category.isActive ? 'نشط' : 'غير نشط'}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 truncate flex-1">{category.name}</h3>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          #{category.sortOrder}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
                      
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant="outline" className="text-xs">
                          {category.itemsCount} صنف
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {category.createdAt}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleCategoryStatus(category.id)}
                          className={category.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
                        >
                          {category.isActive ? 'إلغاء تفعيل' : 'تفعيل'}
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(category)}>
                              <Edit className="w-4 h-4 ml-2" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 ml-2" />
                              عرض الأصناف
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDeleteCategory(category.id)}
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
                            الفئة
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            عدد الأصناف
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الترتيب
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الحالة
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            تاريخ الإنشاء
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            الإجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCategories.map(category => (
                          <tr key={category.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center ml-3">
                                  {category.image ? (
                                    <img 
                                      src={category.image} 
                                      alt={category.name}
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <Package className="w-6 h-6 text-gray-400" />
                                  )}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                  <div className="text-sm text-gray-500">{category.nameEn}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline">{category.itemsCount} صنف</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">#{category.sortOrder}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge 
                                variant={category.isActive ? "default" : "secondary"}
                                className={category.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                              >
                                {category.isActive ? 'نشط' : 'غير نشط'}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-900">{category.createdAt}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleCategoryStatus(category.id)}
                                  className={category.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"}
                                >
                                  {category.isActive ? 'إلغاء تفعيل' : 'تفعيل'}
                                </Button>
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => openEditDialog(category)}>
                                      <Edit className="w-4 h-4 ml-2" />
                                      تعديل
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Eye className="w-4 h-4 ml-2" />
                                      عرض الأصناف
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem 
                                      className="text-red-600"
                                      onClick={() => handleDeleteCategory(category.id)}
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

            {/* نافذة إضافة/تعديل الفئة */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? 'تعديل الفئة' : 'إضافة فئة جديدة'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCategory ? 'تعديل بيانات الفئة الحالية' : 'إضافة فئة جديدة لتصنيف الأصناف'}
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* الأسماء */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">اسم الفئة (عربي) *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="مثل: الأطباق الرئيسية"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nameEn">اسم الفئة (إنجليزي) *</Label>
                      <Input
                        id="nameEn"
                        value={formData.nameEn}
                        onChange={(e) => handleInputChange('nameEn', e.target.value)}
                        placeholder="e.g: Main Courses"
                        className={errors.nameEn ? 'border-red-500' : ''}
                      />
                      {errors.nameEn && (
                        <p className="text-sm text-red-600">{errors.nameEn}</p>
                      )}
                    </div>
                  </div>

                  {/* الوصف */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">الوصف (عربي) *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="وصف مختصر للفئة..."
                        rows={3}
                        className={errors.description ? 'border-red-500' : ''}
                      />
                      {errors.description && (
                        <p className="text-sm text-red-600">{errors.description}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="descriptionEn">الوصف (إنجليزي)</Label>
                      <Textarea
                        id="descriptionEn"
                        value={formData.descriptionEn}
                        onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                        placeholder="Brief description..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* الترتيب والحالة */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sortOrder">ترتيب العرض</Label>
                      <Input
                        id="sortOrder"
                        type="number"
                        min="0"
                        value={formData.sortOrder}
                        onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value))}
                        placeholder="1"
                        className={errors.sortOrder ? 'border-red-500' : ''}
                      />
                      {errors.sortOrder && (
                        <p className="text-sm text-red-600">{errors.sortOrder}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>حالة الفئة</Label>
                      <Select 
                        value={formData.isActive.toString()} 
                        onValueChange={(value) => handleInputChange('isActive', value === 'true')}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">نشط</SelectItem>
                          <SelectItem value="false">غير نشط</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* رفع الصورة */}
                  <div className="space-y-4">
                    <Label>صورة الفئة</Label>
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="معاينة الصورة"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview(null)
                            setFormData(prev => ({ ...prev, image: null }))
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">اختر صورة للفئة</p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="category-image-upload"
                        />
                        <Label htmlFor="category-image-upload">
                          <Button type="button" variant="outline" className="cursor-pointer">
                            <Upload className="w-4 h-4 ml-2" />
                            رفع صورة
                          </Button>
                        </Label>
                      </div>
                    )}
                    
                    {errors.image && (
                      <p className="text-sm text-red-600">{errors.image}</p>
                    )}
                  </div>

                  {/* رسائل الخطأ العامة */}
                  {errors.submit && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{errors.submit}</p>
                    </div>
                  )}
                </form>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    إلغاء
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 ml-2" />
                        {editingCategory ? 'تحديث الفئة' : 'إضافة الفئة'}
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  )
}

export default MenuCategories