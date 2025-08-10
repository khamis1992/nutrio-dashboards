import { useState } from 'react'
import GymSidebar from '@/components/layout/GymSidebar'
import GymHeader from '@/components/layout/GymHeader'
import { 
  Settings, 
  Building2, 
  Clock, 
  CreditCard, 
  Users, 
  Shield, 
  Bell, 
  Database,
  Wifi,
  MapPin,
  Phone,
  Mail,
  Globe,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Calendar,
  DollarSign,
  Percent,
  Zap,
  Target
} from 'lucide-react'

const GymSettings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // حالة الإعدادات العامة
  const [generalSettings, setGeneralSettings] = useState({
    gymName: 'صالة فيتنس برو',
    gymEmail: 'info@fitnesspro.com',
    gymPhone: '+966501234567',
    gymAddress: 'شارع التحلية، الرياض، المملكة العربية السعودية',
    gymWebsite: 'www.fitnesspro.com',
    language: 'ar',
    timezone: 'Asia/Riyadh',
    currency: 'SAR'
  })

  // حالة إعدادات أوقات العمل
  const [workingHours, setWorkingHours] = useState({
    saturday: { open: '06:00', close: '23:00', enabled: true },
    sunday: { open: '06:00', close: '23:00', enabled: true },
    monday: { open: '06:00', close: '23:00', enabled: true },
    tuesday: { open: '06:00', close: '23:00', enabled: true },
    wednesday: { open: '06:00', close: '23:00', enabled: true },
    thursday: { open: '06:00', close: '23:00', enabled: true },
    friday: { open: '14:00', close: '23:00', enabled: true }
  })

  // حالة إعدادات العضوية
  const [membershipSettings, setMembershipSettings] = useState({
    defaultMembershipDuration: 30,
    allowFreezing: true,
    maxFreezeDays: 30,
    requireMedicalCertificate: true,
    allowRefunds: true,
    refundPolicy: 'خلال 7 أيام من التسجيل',
    autoRenewal: true,
    reminderDays: 7
  })

  // حالة إعدادات الدفع
  const [paymentSettings, setPaymentSettings] = useState({
    allowCash: true,
    allowCard: true,
    allowOnline: true,
    allowInstallments: true,
    taxRate: 15,
    lateFeeAmount: 50,
    lateFeeAfterDays: 5,
    discountPolicy: 'خصم 10% للطلاب',
    acceptedCards: ['visa', 'mastercard', 'mada']
  })

  // حالة إعدادات الإشعارات
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    membershipExpiry: true,
    paymentReminders: true,
    classReminders: true,
    newMemberWelcome: true,
    systemAlerts: true
  })

  // حالة إعدادات الأمان
  const [securitySettings, setSecuritySettings] = useState({
    requireStrongPassword: true,
    passwordExpiry: 90,
    twoFactorAuth: false,
    sessionTimeout: 30,
    loginAttempts: 5,
    blockDuration: 15,
    dataBackup: true,
    backupFrequency: 'daily'
  })

  const tabs = [
    { id: 'general', name: 'إعدادات عامة', icon: Settings },
    { id: 'hours', name: 'أوقات العمل', icon: Clock },
    { id: 'membership', name: 'العضوية', icon: Users },
    { id: 'payments', name: 'المدفوعات', icon: CreditCard },
    { id: 'notifications', name: 'الإشعارات', icon: Bell },
    { id: 'security', name: 'الأمان', icon: Shield }
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
    // إظهار رسالة نجاح
    alert('تم حفظ الإعدادات بنجاح')
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            اسم الصالة
          </label>
          <input
            type="text"
            value={generalSettings.gymName}
            onChange={(e) => setGeneralSettings({...generalSettings, gymName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            value={generalSettings.gymEmail}
            onChange={(e) => setGeneralSettings({...generalSettings, gymEmail: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            رقم الهاتف
          </label>
          <input
            type="tel"
            value={generalSettings.gymPhone}
            onChange={(e) => setGeneralSettings({...generalSettings, gymPhone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الموقع الإلكتروني
          </label>
          <input
            type="url"
            value={generalSettings.gymWebsite}
            onChange={(e) => setGeneralSettings({...generalSettings, gymWebsite: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          العنوان
        </label>
        <textarea
          value={generalSettings.gymAddress}
          onChange={(e) => setGeneralSettings({...generalSettings, gymAddress: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            اللغة
          </label>
          <select
            value={generalSettings.language}
            onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            المنطقة الزمنية
          </label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Asia/Riyadh">الرياض</option>
            <option value="Asia/Dubai">دبي</option>
            <option value="Asia/Qatar">الدوحة</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            العملة
          </label>
          <select
            value={generalSettings.currency}
            onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="SAR">ريال سعودي</option>
            <option value="AED">درهم إماراتي</option>
            <option value="QAR">ريال قطري</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderWorkingHours = () => (
    <div className="space-y-4">
      {Object.entries(workingHours).map(([day, hours]) => (
        <div key={day} className="flex items-center space-x-4 space-x-reverse p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={hours.enabled}
              onChange={(e) => setWorkingHours({
                ...workingHours,
                [day]: { ...hours, enabled: e.target.checked }
              })}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
          </div>
          
          <div className="w-20">
            <span className="font-medium text-gray-900">{dayNames[day]}</span>
          </div>

          {hours.enabled ? (
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
          ) : (
            <span className="text-red-500 text-sm">مغلق</span>
          )}
        </div>
      ))}
    </div>
  )

  const renderMembershipSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            مدة العضوية الافتراضية (بالأيام)
          </label>
          <input
            type="number"
            value={membershipSettings.defaultMembershipDuration}
            onChange={(e) => setMembershipSettings({...membershipSettings, defaultMembershipDuration: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            أيام التذكير بانتهاء العضوية
          </label>
          <input
            type="number"
            value={membershipSettings.reminderDays}
            onChange={(e) => setMembershipSettings({...membershipSettings, reminderDays: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={membershipSettings.allowFreezing}
            onChange={(e) => setMembershipSettings({...membershipSettings, allowFreezing: e.target.checked})}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label className="mr-2 text-sm font-medium text-gray-700">
            السماح بتجميد العضوية
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={membershipSettings.requireMedicalCertificate}
            onChange={(e) => setMembershipSettings({...membershipSettings, requireMedicalCertificate: e.target.checked})}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label className="mr-2 text-sm font-medium text-gray-700">
            طلب شهادة طبية للتسجيل
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={membershipSettings.autoRenewal}
            onChange={(e) => setMembershipSettings({...membershipSettings, autoRenewal: e.target.checked})}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label className="mr-2 text-sm font-medium text-gray-700">
            التجديد التلقائي للعضوية
          </label>
        </div>
      </div>
    </div>
  )

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            معدل الضريبة (%)
          </label>
          <input
            type="number"
            value={paymentSettings.taxRate}
            onChange={(e) => setPaymentSettings({...paymentSettings, taxRate: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            غرامة التأخير (ريال)
          </label>
          <input
            type="number"
            value={paymentSettings.lateFeeAmount}
            onChange={(e) => setPaymentSettings({...paymentSettings, lateFeeAmount: parseFloat(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">طرق الدفع المقبولة</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={paymentSettings.allowCash}
              onChange={(e) => setPaymentSettings({...paymentSettings, allowCash: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm font-medium text-gray-700">
              الدفع النقدي
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={paymentSettings.allowCard}
              onChange={(e) => setPaymentSettings({...paymentSettings, allowCard: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm font-medium text-gray-700">
              البطاقات البنكية
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={paymentSettings.allowOnline}
              onChange={(e) => setPaymentSettings({...paymentSettings, allowOnline: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm font-medium text-gray-700">
              الدفع الإلكتروني
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={paymentSettings.allowInstallments}
              onChange={(e) => setPaymentSettings({...paymentSettings, allowInstallments: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm font-medium text-gray-700">
              الدفع بالتقسيط
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">قنوات الإشعارات</h4>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.emailNotifications}
              onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm font-medium text-gray-700">
              إشعارات البريد الإلكتروني
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.smsNotifications}
              onChange={(e) => setNotificationSettings({...notificationSettings, smsNotifications: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm font-medium text-gray-700">
              الرسائل النصية
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.pushNotifications}
              onChange={(e) => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm font-medium text-gray-700">
              الإشعارات الفورية
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">أنواع الإشعارات</h4>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.membershipExpiry}
              onChange={(e) => setNotificationSettings({...notificationSettings, membershipExpiry: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm font-medium text-gray-700">
              انتهاء العضوية
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.paymentReminders}
              onChange={(e) => setNotificationSettings({...notificationSettings, paymentReminders: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm font-medium text-gray-700">
              تذكيرات الدفع
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={notificationSettings.classReminders}
              onChange={(e) => setNotificationSettings({...notificationSettings, classReminders: e.target.checked})}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm font-medium text-gray-700">
              تذكيرات الحصص
            </label>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            انتهاء كلمة المرور (بالأيام)
          </label>
          <input
            type="number"
            value={securitySettings.passwordExpiry}
            onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            انتهاء الجلسة (بالدقائق)
          </label>
          <input
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={securitySettings.requireStrongPassword}
            onChange={(e) => setSecuritySettings({...securitySettings, requireStrongPassword: e.target.checked})}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label className="mr-2 text-sm font-medium text-gray-700">
            طلب كلمة مرور قوية
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={securitySettings.twoFactorAuth}
            onChange={(e) => setSecuritySettings({...securitySettings, twoFactorAuth: e.target.checked})}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label className="mr-2 text-sm font-medium text-gray-700">
            المصادقة الثنائية
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={securitySettings.dataBackup}
            onChange={(e) => setSecuritySettings({...securitySettings, dataBackup: e.target.checked})}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label className="mr-2 text-sm font-medium text-gray-700">
            النسخ الاحتياطي التلقائي
          </label>
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'hours':
        return renderWorkingHours()
      case 'membership':
        return renderMembershipSettings()
      case 'payments':
        return renderPaymentSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'security':
        return renderSecuritySettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <GymSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <GymHeader title="إعدادات الصالة" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
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

            {/* أزرار الحفظ */}
            <div className="flex justify-end space-x-3 space-x-reverse">
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
                <span>{saving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GymSettings
