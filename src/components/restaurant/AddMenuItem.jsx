import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantSidebar from '../layout/RestaurantSidebar'
import RestaurantHeader from '../layout/RestaurantHeader'
import { 
  Upload,
  ImageIcon,
  Save,
  ArrowLeft,
  Plus,
  X,
  Clock,
  DollarSign,
  Star,
  Package,
  AlertTriangle,
  CheckCircle,
  Utensils,
  Flame
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

const AddMenuItem = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // بيانات النموذج
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    price: '',
    category: '',
    isAvailable: true,
    prepTime: '',
    calories: '',
    ingredients: [],
    allergens: [],
    images: [],
    status: 'active'
  })
  
  const [errors, setErrors] = useState({})
  const [newIngredient, setNewIngredient] = useState('')
  const [imagePreview, setImagePreview] = useState(null)

  // بيانات تجريبية للفئات
  const categories = [
    { id: 'main-courses', name: 'الأطباق الرئيسية', nameEn: 'Main Courses' },
    { id: 'salads', name: 'السلطات', nameEn: 'Salads' },
    { id: 'pizzas', name: 'البيتزا', nameEn: 'Pizzas' },
    { id: 'beverages', name: 'المشروبات', nameEn: 'Beverages' },
    { id: 'desserts', name: 'الحلويات', nameEn: 'Desserts' },
    { id: 'soups', name: 'الشوربات', nameEn: 'Soups' },
    { id: 'appetizers', name: 'المقبلات', nameEn: 'Appetizers' },
    { id: 'sandwiches', name: 'الساندويتشات', nameEn: 'Sandwiches' }
  ]

  // قائمة مسببات الحساسية الشائعة
  const commonAllergens = [
    'غلوتين',
    'ألبان',
    'بيض',
    'مكسرات',
    'فول سوداني',
    'سمسم',
    'صويا',
    'سمك',
    'قشريات',
    'كبريت'
  ]

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
          images: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت'
        }))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setFormData(prev => ({
          ...prev,
          images: [file]
        }))
        setErrors(prev => ({
          ...prev,
          images: null
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addIngredient = () => {
    if (newIngredient.trim() && !formData.ingredients.includes(newIngredient.trim())) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()]
      }))
      setNewIngredient('')
    }
  }

  const removeIngredient = (ingredient) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(item => item !== ingredient)
    }))
  }

  const toggleAllergen = (allergen) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(item => item !== allergen)
        : [...prev.allergens, allergen]
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'اسم الصنف مطلوب'
    }

    if (!formData.nameEn.trim()) {
      newErrors.nameEn = 'الاسم بالإنجليزية مطلوب'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف الصنف مطلوب'
    }

    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'سعر صحيح مطلوب'
    }

    if (!formData.category) {
      newErrors.category = 'اختيار فئة مطلوب'
    }

    if (!formData.prepTime || isNaN(formData.prepTime) || parseInt(formData.prepTime) <= 0) {
      newErrors.prepTime = 'وقت تحضير صحيح مطلوب'
    }

    if (formData.calories && (isNaN(formData.calories) || parseInt(formData.calories) < 0)) {
      newErrors.calories = 'عدد السعرات يجب أن يكون رقم صحيح'
    }

    if (formData.ingredients.length === 0) {
      newErrors.ingredients = 'يجب إضافة مكون واحد على الأقل'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // محاكاة حفظ البيانات
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // في التطبيق الحقيقي، سيتم إرسال البيانات إلى API
      console.log('بيانات الصنف الجديد:', formData)
      
      // الانتقال إلى صفحة القائمة مع رسالة نجاح
      navigate('/restaurant/menu', { 
        state: { message: 'تم إضافة الصنف بنجاح!' }
      })
      
    } catch (error) {
      console.error('خطأ في حفظ الصنف:', error)
      setErrors({ submit: 'حدث خطأ في حفظ الصنف. يرجى المحاولة مرة أخرى.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      nameEn: '',
      description: '',
      descriptionEn: '',
      price: '',
      category: '',
      isAvailable: true,
      prepTime: '',
      calories: '',
      ingredients: [],
      allergens: [],
      images: [],
      status: 'active'
    })
    setErrors({})
    setImagePreview(null)
    setNewIngredient('')
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
          <div className="max-w-4xl mx-auto">
            
            {/* العنوان والتنقل */}
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
                  <h1 className="text-3xl font-bold text-gray-900">إضافة صنف جديد</h1>
                  <p className="text-gray-600 mt-2">إضافة صنف جديد إلى قائمة المطعم</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  إعادة تعيين
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      حفظ الصنف
                    </>
                  )}
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* معلومات أساسية */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="w-5 h-5" />
                    المعلومات الأساسية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* الاسم */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">اسم الصنف (عربي) *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="مثل: برجر كلاسيك"
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nameEn">اسم الصنف (إنجليزي) *</Label>
                      <Input
                        id="nameEn"
                        value={formData.nameEn}
                        onChange={(e) => handleInputChange('nameEn', e.target.value)}
                        placeholder="e.g: Classic Burger"
                        className={errors.nameEn ? 'border-red-500' : ''}
                      />
                      {errors.nameEn && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.nameEn}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* الوصف */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="description">الوصف (عربي) *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="وصف مفصل للصنف..."
                        rows={4}
                        className={errors.description ? 'border-red-500' : ''}
                      />
                      {errors.description && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="descriptionEn">الوصف (إنجليزي)</Label>
                      <Textarea
                        id="descriptionEn"
                        value={formData.descriptionEn}
                        onChange={(e) => handleInputChange('descriptionEn', e.target.value)}
                        placeholder="Detailed description..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* السعر والفئة */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price">السعر (ر.س) *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) => handleInputChange('price', e.target.value)}
                          placeholder="0.00"
                          className={`pl-10 ${errors.price ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.price && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.price}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">الفئة *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.category}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="prepTime">وقت التحضير (دقيقة) *</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="prepTime"
                          type="number"
                          min="1"
                          value={formData.prepTime}
                          onChange={(e) => handleInputChange('prepTime', e.target.value)}
                          placeholder="15"
                          className={`pl-10 ${errors.prepTime ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.prepTime && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.prepTime}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* السعرات الحرارية والحالة */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="calories">السعرات الحرارية (اختياري)</Label>
                      <div className="relative">
                        <Flame className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="calories"
                          type="number"
                          min="0"
                          value={formData.calories}
                          onChange={(e) => handleInputChange('calories', e.target.value)}
                          placeholder="0"
                          className={`pl-10 ${errors.calories ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.calories && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" />
                          {errors.calories}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>متوفر للطلب</Label>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Switch
                          checked={formData.isAvailable}
                          onCheckedChange={(checked) => handleInputChange('isAvailable', checked)}
                        />
                        <Label className="text-sm">
                          {formData.isAvailable ? 'متوفر' : 'غير متوفر'}
                        </Label>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>حالة الصنف</Label>
                      <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">نشط</SelectItem>
                          <SelectItem value="inactive">غير نشط</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* رفع الصور */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5" />
                    صورة الصنف
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {imagePreview ? (
                      <div className="relative">
                        <img 
                          src={imagePreview} 
                          alt="معاينة الصورة"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setImagePreview(null)
                            setFormData(prev => ({ ...prev, images: [] }))
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                        <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">اختر صورة للصنف</p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Label htmlFor="image-upload">
                          <Button type="button" variant="outline" className="cursor-pointer">
                            <Upload className="w-4 h-4 ml-2" />
                            رفع صورة
                          </Button>
                        </Label>
                      </div>
                    )}
                    
                    {errors.images && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.images}
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-500">
                      الحد الأقصى لحجم الصورة: 5 ميجابايت. الصيغ المدعومة: JPG, PNG, GIF
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* المكونات */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    المكونات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                        placeholder="أضف مكون..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                      />
                      <Button
                        type="button"
                        onClick={addIngredient}
                        disabled={!newIngredient.trim()}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {formData.ingredients.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.ingredients.map((ingredient, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1 py-1 px-3"
                          >
                            {ingredient}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 hover:bg-transparent"
                              onClick={() => removeIngredient(ingredient)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {errors.ingredients && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        {errors.ingredients}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* مسببات الحساسية */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    مسببات الحساسية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {commonAllergens.map(allergen => (
                      <div key={allergen} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={allergen}
                          checked={formData.allergens.includes(allergen)}
                          onCheckedChange={() => toggleAllergen(allergen)}
                        />
                        <Label htmlFor={allergen} className="text-sm">
                          {allergen}
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  {formData.allergens.length > 0 && (
                    <div className="mt-4">
                      <Label className="text-sm font-medium">مسببات الحساسية المحددة:</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.allergens.map(allergen => (
                          <Badge key={allergen} variant="destructive">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* رسائل الخطأ العامة */}
              {errors.submit && (
                <Card className="border-red-200 bg-red-50">
                  <CardContent className="p-4">
                    <p className="text-red-600 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      {errors.submit}
                    </p>
                  </CardContent>
                </Card>
              )}

            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AddMenuItem