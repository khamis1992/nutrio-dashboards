import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantSidebar from '../layout/RestaurantSidebar'
import RestaurantHeader from '../layout/RestaurantHeader'
import { 
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Percent,
  Gift,
  Tag,
  Clock,
  Users,
  TrendingUp,
  Star,
  Copy,
  Share,
  Settings,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  MoreVertical
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

const MenuOffers = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  
  // حالة النموذج
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingOffer, setEditingOffer] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'percentage',
    value: '',
    minOrder: '',
    maxDiscount: '',
    code: '',
    startDate: '',
    endDate: '',
    maxUses: '',
    currentUses: 0,
    applicableItems: [],
    isActive: true
  })
  const [errors, setErrors] = useState({})

  // بيانات تجريبية للعروض
  const mockOffers = [
    {
      id: 1,
      title: 'خصم 20% على الأطباق الرئيسية',
      description: 'احصل على خصم 20% على جميع الأطباق الرئيسية',
      type: 'percentage',
      value: 20,
      minOrder: 50,
      maxDiscount: 30,
      code: 'MAIN20',
      startDate: '2024-01-20',
      endDate: '2024-02-20',
      maxUses: 100,
      currentUses: 45,
      applicableItems: ['main-courses'],
      isActive: true,
      createdAt: '2024-01-20',
      status: 'active'
    },
    {
      id: 2,
      title: 'وجبة مجانية عند الطلب بـ 100 ريال',
      description: 'احصل على وجبة مجانية عند الطلب بقيمة 100 ريال أو أكثر',
      type: 'free_item',
      value: 0,
      minOrder: 100,
      maxDiscount: 0,
      code: 'FREE100',
      startDate: '2024-01-15',
      endDate: '2024-01-30',
      maxUses: 50,
      currentUses: 28,
      applicableItems: ['desserts'],
      isActive: true,
      createdAt: '2024-01-15',
      status: 'active'
    },
    {
      id: 3,
      title: 'خصم 15 ريال على الطلبات',
      description: 'خصم ثابت 15 ريال على أي طلب',
      type: 'fixed_amount',
      value: 15,
      minOrder: 60,
      maxDiscount: 15,
      code: 'SAVE15',
      startDate: '2024-01-10',
      endDate: '2024-01-25',
      maxUses: 200,
      currentUses: 180,
      applicableItems: [],
      isActive: false,
      createdAt: '2024-01-10',
      status: 'expired'
    },
    {
      id: 4,
      title: 'عرض البيتزا المزدوجة',
      description: 'اطلب بيتزا واحصل على الثانية بنصف السعر',
      type: 'buy_one_get_discount',
      value: 50,
      minOrder: 0,
      maxDiscount: 0,
      code: 'PIZZA50',
      startDate: '2024-01-25',
      endDate: '2024-02-25',
      maxUses: 75,
      currentUses: 12,
      applicableItems: ['pizzas'],
      isActive: true,
      createdAt: '2024-01-25',
      status: 'active'
    },
    {
      id: 5,
      title: 'خصم نهاية الأسبوع 25%',
      description: 'خصم خاص لنهاية الأسبوع على جميع العناصر',
      type: 'percentage',
      value: 25,
      minOrder: 80,
      maxDiscount: 50,
      code: 'WEEKEND25',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      maxUses: 300,
      currentUses: 0,
      applicableItems: [],
      isActive: false,
      createdAt: '2024-01-22',
      status: 'scheduled'
    }
  ]

  useEffect(() => {
    setTimeout(() => {
      setOffers(mockOffers)
      setLoading(false)
    }, 1000)
  }, [])

  // فلترة العروض
  const filteredOffers = offers.filter(offer => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         offer.code.toLowerCase().includes(searchTerm.toLowerCase())
    
    let matchesTab = true
    if (activeTab === 'active') {
      matchesTab = offer.isActive && offer.status === 'active'
    } else if (activeTab === 'inactive') {
      matchesTab = !offer.isActive
    } else if (activeTab === 'expired') {
      matchesTab = offer.status === 'expired'
    } else if (activeTab === 'scheduled') {
      matchesTab = offer.status === 'scheduled'
    }
    
    return matchesSearch && matchesTab
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }))
    }
  }

  const generateCode = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    setFormData(prev => ({ ...prev, code: randomCode }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'عنوان العرض مطلوب'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف العرض مطلوب'
    }

    if (!formData.value || isNaN(formData.value) || parseFloat(formData.value) <= 0) {
      newErrors.value = 'قيمة صحيحة مطلوبة'
    }

    if (!formData.code.trim()) {
      newErrors.code = 'كود العرض مطلوب'
    }

    if (!formData.startDate) {
      newErrors.startDate = 'تاريخ البداية مطلوب'
    }

    if (!formData.endDate) {
      newErrors.endDate = 'تاريخ النهاية مطلوب'
    }

    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'تاريخ النهاية يجب أن يكون بعد تاريخ البداية'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const openAddDialog = () => {
    setEditingOffer(null)
    setFormData({
      title: '',
      description: '',
      type: 'percentage',
      value: '',
      minOrder: '',
      maxDiscount: '',
      code: '',
      startDate: '',
      endDate: '',
      maxUses: '',
      currentUses: 0,
      applicableItems: [],
      isActive: true
    })
    setErrors({})
    setIsDialogOpen(true)
  }

  const openEditDialog = (offer) => {
    setEditingOffer(offer)
    setFormData({
      title: offer.title,
      description: offer.description,
      type: offer.type,
      value: offer.value.toString(),
      minOrder: offer.minOrder.toString(),
      maxDiscount: offer.maxDiscount.toString(),
      code: offer.code,
      startDate: offer.startDate,
      endDate: offer.endDate,
      maxUses: offer.maxUses.toString(),
      currentUses: offer.currentUses,
      applicableItems: offer.applicableItems,
      isActive: offer.isActive
    })
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
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (editingOffer) {
        setOffers(prev => prev.map(offer => 
          offer.id === editingOffer.id 
            ? { 
                ...offer, 
                ...formData,
                value: parseFloat(formData.value),
                minOrder: parseFloat(formData.minOrder) || 0,
                maxDiscount: parseFloat(formData.maxDiscount) || 0,
                maxUses: parseInt(formData.maxUses) || 0
              }
            : offer
        ))
      } else {
        const newOffer = {
          id: Date.now(),
          ...formData,
          value: parseFloat(formData.value),
          minOrder: parseFloat(formData.minOrder) || 0,
          maxDiscount: parseFloat(formData.maxDiscount) || 0,
          maxUses: parseInt(formData.maxUses) || 0,
          createdAt: new Date().toISOString().split('T')[0],
          status: 'active'
        }
        setOffers(prev => [...prev, newOffer])
      }
      
      setIsDialogOpen(false)
      
    } catch (error) {
      console.error('خطأ في حفظ العرض:', error)
      setErrors({ submit: 'حدث خطأ في حفظ العرض. يرجى المحاولة مرة أخرى.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleOfferStatus = (offerId) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, isActive: !offer.isActive }
        : offer
    ))
  }

  const deleteOffer = (offerId) => {
    if (confirm('هل أنت متأكد من حذف هذا العرض؟')) {
      setOffers(prev => prev.filter(offer => offer.id !== offerId))
    }
  }

  const duplicateOffer = (offer) => {
    const newOffer = {
      ...offer,
      id: Date.now(),
      title: offer.title + ' (نسخة)',
      code: offer.code + '_COPY',
      currentUses: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setOffers(prev => [...prev, newOffer])
  }

  const getOfferTypeLabel = (type) => {
    const types = {
      percentage: 'خصم نسبي',
      fixed_amount: 'خصم ثابت',
      free_item: 'منتج مجاني',
      buy_one_get_discount: 'اشتري واحد واحصل على خصم'
    }
    return types[type] || type
  }

  const getStatusBadge = (offer) => {
    if (offer.status === 'expired') {
      return <Badge className="bg-red-100 text-red-800">منتهي</Badge>
    } else if (offer.status === 'scheduled') {
      return <Badge className="bg-blue-100 text-blue-800">مجدول</Badge>
    } else if (!offer.isActive) {
      return <Badge className="bg-gray-100 text-gray-800">متوقف</Badge>
    }
    return <Badge className="bg-green-100 text-green-800">نشط</Badge>
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-SA')
  }

  // إحصائيات
  const stats = {
    total: offers.length,
    active: offers.filter(offer => offer.isActive && offer.status === 'active').length,
    inactive: offers.filter(offer => !offer.isActive).length,
    expired: offers.filter(offer => offer.status === 'expired').length,
    scheduled: offers.filter(offer => offer.status === 'scheduled').length
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
                  <h1 className="text-3xl font-bold text-gray-900">إدارة العروض والخصومات</h1>
                  <p className="text-gray-600 mt-2">إنشاء وإدارة العروض الترويجية للمطعم</p>
                </div>
              </div>
              
              <Button 
                onClick={openAddDialog}
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة عرض جديد
              </Button>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">إجمالي العروض</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Gift className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">عروض نشطة</p>
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
                      <p className="text-sm font-medium text-gray-600">عروض متوقفة</p>
                      <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Pause className="w-6 h-6 text-gray-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">عروض منتهية</p>
                      <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
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
                      <p className="text-sm font-medium text-gray-600">عروض مجدولة</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* البحث والتبويبات */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="البحث في العروض..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* التبويبات */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">جميع العروض ({stats.total})</TabsTrigger>
                <TabsTrigger value="active">نشط ({stats.active})</TabsTrigger>
                <TabsTrigger value="inactive">متوقف ({stats.inactive})</TabsTrigger>
                <TabsTrigger value="expired">منتهي ({stats.expired})</TabsTrigger>
                <TabsTrigger value="scheduled">مجدول ({stats.scheduled})</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* عرض العروض */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 mt-4">جاري تحميل العروض...</p>
              </div>
            ) : filteredOffers.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد عروض</h3>
                  <p className="text-gray-600 mb-6">لم يتم العثور على عروض تطابق الفلاتر المحددة</p>
                  <Button 
                    onClick={openAddDialog}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة عرض جديد
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffers.map(offer => (
                  <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{offer.title}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusBadge(offer)}
                            <Badge variant="outline" className="text-xs">
                              {getOfferTypeLabel(offer.type)}
                            </Badge>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(offer)}>
                              <Edit className="w-4 h-4 ml-2" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => duplicateOffer(offer)}>
                              <Copy className="w-4 h-4 ml-2" />
                              نسخ
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="w-4 h-4 ml-2" />
                              مشاركة
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleOfferStatus(offer.id)}>
                              {offer.isActive ? <Pause className="w-4 h-4 ml-2" /> : <Play className="w-4 h-4 ml-2" />}
                              {offer.isActive ? 'إيقاف' : 'تفعيل'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => deleteOffer(offer.id)}
                            >
                              <Trash2 className="w-4 h-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">{offer.description}</p>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-gray-500" />
                          <span className="font-mono text-sm font-semibold">{offer.code}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">القيمة:</span>
                          <span className="font-semibold">
                            {offer.type === 'percentage' ? `${offer.value}%` : 
                             offer.type === 'fixed_amount' ? `${offer.value} ر.س` :
                             offer.type === 'free_item' ? 'منتج مجاني' :
                             `${offer.value}% خصم`}
                          </span>
                        </div>
                        
                        {offer.minOrder > 0 && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">الحد الأدنى:</span>
                            <span>{offer.minOrder} ر.س</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">صالح حتى:</span>
                          <span>{formatDate(offer.endDate)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">الاستخدام:</span>
                          <span>{offer.currentUses} / {offer.maxUses || '∞'}</span>
                        </div>
                      </div>
                      
                      {offer.maxUses > 0 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>نسبة الاستخدام</span>
                            <span>{Math.round((offer.currentUses / offer.maxUses) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((offer.currentUses / offer.maxUses) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-4 h-4 ml-1" />
                          عرض
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <TrendingUp className="w-4 h-4 ml-1" />
                          إحصائيات
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* نافذة إضافة/تعديل العرض */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingOffer ? 'تعديل العرض' : 'إضافة عرض جديد'}
                  </DialogTitle>
                  <DialogDescription>
                    {editingOffer ? 'تعديل بيانات العرض الحالي' : 'إنشاء عرض ترويجي جديد'}
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* العنوان والوصف */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">عنوان العرض *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="مثل: خصم 20% على الأطباق الرئيسية"
                        className={errors.title ? 'border-red-500' : ''}
                      />
                      {errors.title && (
                        <p className="text-sm text-red-600">{errors.title}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">وصف العرض *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="وصف تفصيلي للعرض..."
                        rows={3}
                        className={errors.description ? 'border-red-500' : ''}
                      />
                      {errors.description && (
                        <p className="text-sm text-red-600">{errors.description}</p>
                      )}
                    </div>
                  </div>

                  {/* نوع العرض والقيمة */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>نوع العرض</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">خصم نسبي (%)</SelectItem>
                          <SelectItem value="fixed_amount">خصم ثابت (ر.س)</SelectItem>
                          <SelectItem value="free_item">منتج مجاني</SelectItem>
                          <SelectItem value="buy_one_get_discount">اشتري واحد واحصل على خصم</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="value">
                        {formData.type === 'percentage' ? 'نسبة الخصم (%)' :
                         formData.type === 'fixed_amount' ? 'مبلغ الخصم (ر.س)' :
                         formData.type === 'buy_one_get_discount' ? 'نسبة خصم المنتج الثاني (%)' :
                         'القيمة'} *
                      </Label>
                      <Input
                        id="value"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.value}
                        onChange={(e) => handleInputChange('value', e.target.value)}
                        placeholder="0"
                        className={errors.value ? 'border-red-500' : ''}
                        disabled={formData.type === 'free_item'}
                      />
                      {errors.value && (
                        <p className="text-sm text-red-600">{errors.value}</p>
                      )}
                    </div>
                  </div>

                  {/* الشروط */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minOrder">الحد الأدنى للطلب (ر.س)</Label>
                      <Input
                        id="minOrder"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.minOrder}
                        onChange={(e) => handleInputChange('minOrder', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maxDiscount">الحد الأقصى للخصم (ر.س)</Label>
                      <Input
                        id="maxDiscount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={formData.maxDiscount}
                        onChange={(e) => handleInputChange('maxDiscount', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* الكود */}
                  <div className="space-y-2">
                    <Label htmlFor="code">كود العرض *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="code"
                        value={formData.code}
                        onChange={(e) => handleInputChange('code', e.target.value.toUpperCase())}
                        placeholder="OFFER2024"
                        className={`flex-1 ${errors.code ? 'border-red-500' : ''}`}
                      />
                      <Button type="button" variant="outline" onClick={generateCode}>
                        توليد
                      </Button>
                    </div>
                    {errors.code && (
                      <p className="text-sm text-red-600">{errors.code}</p>
                    )}
                  </div>

                  {/* التواريخ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">تاريخ البداية *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className={errors.startDate ? 'border-red-500' : ''}
                      />
                      {errors.startDate && (
                        <p className="text-sm text-red-600">{errors.startDate}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endDate">تاريخ النهاية *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange('endDate', e.target.value)}
                        className={errors.endDate ? 'border-red-500' : ''}
                      />
                      {errors.endDate && (
                        <p className="text-sm text-red-600">{errors.endDate}</p>
                      )}
                    </div>
                  </div>

                  {/* عدد الاستخدامات */}
                  <div className="space-y-2">
                    <Label htmlFor="maxUses">الحد الأقصى للاستخدامات (اتركه فارغاً للاستخدام المفتوح)</Label>
                    <Input
                      id="maxUses"
                      type="number"
                      min="1"
                      value={formData.maxUses}
                      onChange={(e) => handleInputChange('maxUses', e.target.value)}
                      placeholder="100"
                    />
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
                        <Gift className="w-4 h-4 ml-2" />
                        {editingOffer ? 'تحديث العرض' : 'إضافة العرض'}
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

export default MenuOffers