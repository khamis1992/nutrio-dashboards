import { useState } from 'react'
import GymSidebar from '@/components/layout/GymSidebar'
import GymHeader from '@/components/layout/GymHeader'
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  Star,
  Users,
  Camera,
  Save,
  RefreshCw,
  Edit3,
  Upload,
  X,
  Plus,
  Trash2,
  Calendar,
  Award,
  Target,
  Heart,
  Shield,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Facebook,
  Instagram,
  Twitter,
  Youtube
} from 'lucide-react'

const GymProfile = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [saving, setSaving] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // حالة المعلومات الأساسية
  const [basicInfo, setBasicInfo] = useState({
    name: 'صالة فيتنس برو',
    description: 'أفضل صالة رياضية في المدينة مع أحدث المعدات ومدربين محترفين',
    address: 'شارع التحلية، الرياض، المملكة العربية السعودية',
    phone: '+966501234567',
    email: 'info@fitnesspro.com',
    website: 'www.fitnesspro.com',
    establishedYear: 2015,
    capacity: 200,
    area: '800',
    logo: '/api/placeholder/150/150',
    coverImage: '/api/placeholder/800/300'
  })

  // معلومات التواصل الاجتماعي
  const [socialMedia, setSocialMedia] = useState({
    facebook: 'https://facebook.com/fitnesspro',
    instagram: 'https://instagram.com/fitnesspro',
    twitter: 'https://twitter.com/fitnesspro',
    youtube: 'https://youtube.com/fitnesspro'
  })

  // الخدمات والمرافق
  const [facilities, setFacilities] = useState([
    { id: 1, name: 'أجهزة القلب والأوعية الدموية', available: true },
    { id: 2, name: 'أوزان حرة', available: true },
    { id: 3, name: 'آلات الوزن', available: true },
    { id: 4, name: 'استوديو الرقص', available: true },
    { id: 5, name: 'ساونا', available: true },
    { id: 6, name: 'جاكوزي', available: false },
    { id: 7, name: 'مسبح', available: false },
    { id: 8, name: 'ملعب اسكواش', available: true },
    { id: 9, name: 'كافيتيريا', available: true },
    { id: 10, name: 'موقف سيارات', available: true }
  ])

  // ساعات العمل
  const [workingHours, setWorkingHours] = useState({
    saturday: { open: '06:00', close: '23:00', closed: false },
    sunday: { open: '06:00', close: '23:00', closed: false },
    monday: { open: '06:00', close: '23:00', closed: false },
    tuesday: { open: '06:00', close: '23:00', closed: false },
    wednesday: { open: '06:00', close: '23:00', closed: false },
    thursday: { open: '06:00', close: '23:00', closed: false },
    friday: { open: '14:00', close: '23:00', closed: false }
  })

  // الشهادات والإنجازات
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'أفضل صالة رياضية 2023', organization: 'جمعية اللياقة البدنية', year: 2023 },
    { id: 2, title: 'شهادة الجودة ISO 9001', organization: 'منظمة المعايير الدولية', year: 2022 },
    { id: 3, title: 'جائزة الخدمة المتميزة', organization: 'غرفة التجارة', year: 2021 }
  ])

  // فريق الإدارة
  const [managementTeam, setManagementTeam] = useState([
    { 
      id: 1, 
      name: 'محمد أحمد', 
      position: 'المدير العام',
      experience: '10 سنوات',
      qualifications: 'ماجستير إدارة رياضية',
      image: '/api/placeholder/100/100'
    },
    { 
      id: 2, 
      name: 'سارة محمد', 
      position: 'مديرة التدريب',
      experience: '8 سنوات',
      qualifications: 'بكالوريوس علوم رياضة',
      image: '/api/placeholder/100/100'
    }
  ])

  // معرض الصور
  const [gallery, setGallery] = useState([
    { id: 1, url: '/api/placeholder/300/200', title: 'صالة الأوزان الحرة', type: 'facility' },
    { id: 2, url: '/api/placeholder/300/200', title: 'استوديو الرقص', type: 'facility' },
    { id: 3, url: '/api/placeholder/300/200', title: 'منطقة القلب والأوعية', type: 'facility' },
    { id: 4, url: '/api/placeholder/300/200', title: 'فعالية يوم الصحة', type: 'event' },
    { id: 5, url: '/api/placeholder/300/200', title: 'مسابقة كمال الأجسام', type: 'event' },
    { id: 6, url: '/api/placeholder/300/200', title: 'منطقة الاستقبال', type: 'facility' }
  ])

  const tabs = [
    { id: 'basic', name: 'المعلومات الأساسية', icon: Building2 },
    { id: 'facilities', name: 'المرافق والخدمات', icon: Target },
    { id: 'hours', name: 'ساعات العمل', icon: Clock },
    { id: 'team', name: 'فريق الإدارة', icon: Users },
    { id: 'achievements', name: 'الشهادات والإنجازات', icon: Award },
    { id: 'gallery', name: 'معرض الصور', icon: ImageIcon },
    { id: 'social', name: 'التواصل الاجتماعي', icon: Heart }
  ]

  const dayNames = {
    saturday: 'السبت',
    sunday: 'الأحد', 
    monday: 'الاثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة'
  }

  const handleSave = async () => {
    setSaving(true)
    // محاكاة حفظ البيانات
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSaving(false)
    setIsEditing(false)
    alert('تم حفظ معلومات الملف الشخصي بنجاح')
  }

  const handleImageUpload = (type, id = null) => {
    // محاكاة رفع الصورة
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        // في التطبيق الحقيقي، سيتم رفع الصورة إلى الخادم
        const url = URL.createObjectURL(file)
        
        if (type === 'logo') {
          setBasicInfo(prev => ({ ...prev, logo: url }))
        } else if (type === 'cover') {
          setBasicInfo(prev => ({ ...prev, coverImage: url }))
        } else if (type === 'gallery') {
          const newImage = {
            id: gallery.length + 1,
            url,
            title: 'صورة جديدة',
            type: 'facility'
          }
          setGallery(prev => [...prev, newImage])
        }
      }
    }
    input.click()
  }

  const renderBasicInfo = () => (
    <div className="space-y-6">
      {/* صورة الغلاف والشعار */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg overflow-hidden">
          <img 
            src={basicInfo.coverImage} 
            alt="غلاف الصالة"
            className="w-full h-full object-cover"
          />
          {isEditing && (
            <button
              onClick={() => handleImageUpload('cover')}
              className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
            >
              <Camera className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* الشعار */}
        <div className="absolute -bottom-16 right-6">
          <div className="relative">
            <img 
              src={basicInfo.logo} 
              alt="شعار الصالة"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            {isEditing && (
              <button
                onClick={() => handleImageUpload('logo')}
                className="absolute bottom-0 left-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700"
              >
                <Camera className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* المعلومات الأساسية */}
      <div className="pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم الصالة
            </label>
            <input
              type="text"
              value={basicInfo.name}
              onChange={(e) => setBasicInfo({...basicInfo, name: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              سنة التأسيس
            </label>
            <input
              type="number"
              value={basicInfo.establishedYear}
              onChange={(e) => setBasicInfo({...basicInfo, establishedYear: parseInt(e.target.value)})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم الهاتف
            </label>
            <input
              type="tel"
              value={basicInfo.phone}
              onChange={(e) => setBasicInfo({...basicInfo, phone: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={basicInfo.email}
              onChange={(e) => setBasicInfo({...basicInfo, email: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الموقع الإلكتروني
            </label>
            <input
              type="url"
              value={basicInfo.website}
              onChange={(e) => setBasicInfo({...basicInfo, website: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              السعة القصوى
            </label>
            <input
              type="number"
              value={basicInfo.capacity}
              onChange={(e) => setBasicInfo({...basicInfo, capacity: parseInt(e.target.value)})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            العنوان
          </label>
          <textarea
            value={basicInfo.address}
            onChange={(e) => setBasicInfo({...basicInfo, address: e.target.value})}
            disabled={!isEditing}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            وصف الصالة
          </label>
          <textarea
            value={basicInfo.description}
            onChange={(e) => setBasicInfo({...basicInfo, description: e.target.value})}
            disabled={!isEditing}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
          />
        </div>
      </div>
    </div>
  )

  const renderFacilities = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">المرافق والخدمات المتاحة</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facilities.map((facility) => (
          <div key={facility.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <span className="font-medium text-gray-900">{facility.name}</span>
            {isEditing ? (
              <input
                type="checkbox"
                checked={facility.available}
                onChange={(e) => setFacilities(prev =>
                  prev.map(f => f.id === facility.id ? {...f, available: e.target.checked} : f)
                )}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
            ) : (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                facility.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {facility.available ? 'متاح' : 'غير متاح'}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderWorkingHours = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">ساعات العمل</h3>
      {Object.entries(workingHours).map(([day, hours]) => (
        <div key={day} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <span className="font-medium text-gray-900 w-20">{dayNames[day]}</span>
          
          {isEditing ? (
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={!hours.closed}
                  onChange={(e) => setWorkingHours({
                    ...workingHours,
                    [day]: { ...hours, closed: !e.target.checked }
                  })}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded ml-2"
                />
                <span className="text-sm text-gray-600">مفتوح</span>
              </div>
              
              {!hours.closed && (
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-sm text-gray-600">من</span>
                  <input
                    type="time"
                    value={hours.open}
                    onChange={(e) => setWorkingHours({
                      ...workingHours,
                      [day]: { ...hours, open: e.target.value }
                    })}
                    className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                  />
                  <span className="text-sm text-gray-600">إلى</span>
                  <input
                    type="time"
                    value={hours.close}
                    onChange={(e) => setWorkingHours({
                      ...workingHours,
                      [day]: { ...hours, close: e.target.value }
                    })}
                    className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              )}
            </div>
          ) : (
            <span className={`text-sm ${hours.closed ? 'text-red-600' : 'text-green-600'}`}>
              {hours.closed ? 'مغلق' : `${hours.open} - ${hours.close}`}
            </span>
          )}
        </div>
      ))}
    </div>
  )

  const renderManagementTeam = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">فريق الإدارة</h3>
        {isEditing && (
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2 space-x-reverse">
            <Plus className="h-4 w-4" />
            <span>إضافة عضو</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {managementTeam.map((member) => (
          <div key={member.id} className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center space-x-4 space-x-reverse mb-4">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                <p className="text-purple-600 text-sm">{member.position}</p>
              </div>
              {isEditing && (
                <button className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">الخبرة:</span> {member.experience}</p>
              <p><span className="font-medium">المؤهلات:</span> {member.qualifications}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">الشهادات والإنجازات</h3>
        {isEditing && (
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2 space-x-reverse">
            <Plus className="h-4 w-4" />
            <span>إضافة إنجاز</span>
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Award className="h-8 w-8 text-yellow-500" />
              <div>
                <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.organization} - {achievement.year}</p>
              </div>
            </div>
            {isEditing && (
              <button className="text-red-500 hover:text-red-700">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderGallery = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">معرض الصور</h3>
        {isEditing && (
          <button 
            onClick={() => handleImageUpload('gallery')}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2 space-x-reverse"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة صورة</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {gallery.map((image) => (
          <div key={image.id} className="relative group">
            <img 
              src={image.url} 
              alt={image.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all duration-200 flex items-center justify-center">
              {isEditing && (
                <button className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
              <p className="text-sm font-medium">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSocialMedia = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">حسابات التواصل الاجتماعي</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <Facebook className="h-6 w-6 text-blue-600" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <input
              type="url"
              value={socialMedia.facebook}
              onChange={(e) => setSocialMedia({...socialMedia, facebook: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
              placeholder="https://facebook.com/yourpage"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          <Instagram className="h-6 w-6 text-pink-600" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              type="url"
              value={socialMedia.instagram}
              onChange={(e) => setSocialMedia({...socialMedia, instagram: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
              placeholder="https://instagram.com/yourpage"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          <Twitter className="h-6 w-6 text-blue-400" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <input
              type="url"
              value={socialMedia.twitter}
              onChange={(e) => setSocialMedia({...socialMedia, twitter: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
              placeholder="https://twitter.com/yourpage"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3 space-x-reverse">
          <Youtube className="h-6 w-6 text-red-600" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              YouTube
            </label>
            <input
              type="url"
              value={socialMedia.youtube}
              onChange={(e) => setSocialMedia({...socialMedia, youtube: e.target.value})}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:bg-gray-50"
              placeholder="https://youtube.com/yourchannel"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return renderBasicInfo()
      case 'facilities':
        return renderFacilities()
      case 'hours':
        return renderWorkingHours()
      case 'team':
        return renderManagementTeam()
      case 'achievements':
        return renderAchievements()
      case 'gallery':
        return renderGallery()
      case 'social':
        return renderSocialMedia()
      default:
        return renderBasicInfo()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <GymSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <GymHeader title="الملف الشخصي للصالة" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
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

            {/* أزرار التحكم */}
            <div className="flex justify-end space-x-3 space-x-reverse">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center space-x-2 space-x-reverse"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>تحرير الملف</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 flex items-center space-x-2 space-x-reverse"
                  >
                    {saving ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>{saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GymProfile
