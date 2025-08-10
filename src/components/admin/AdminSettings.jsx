import { useState } from 'react'
import AdminSidebar from '@/components/layout/AdminSidebar'
import AdminHeader from '@/components/layout/AdminHeader'
import { 
  Settings, Save, Shield, Database, Mail, Bell, Globe, Users, 
  CreditCard, Server, Key, Lock, Eye, EyeOff, RefreshCw, 
  AlertTriangle, CheckCircle, Info, X, Upload, Download, 
  MessageSquare, Smartphone, Calendar, MapPin, DollarSign
} from 'lucide-react'

const AdminSettings = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // إعدادات النظام العامة
  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'Nutrio',
    platformDescription: 'منصة متكاملة لإدارة المطاعم والصالات الرياضية وخدمات التوصيل',
    timezone: 'Asia/Riyadh',
    language: 'ar',
    currency: 'SAR',
    maintenanceMode: false,
    registrationEnabled: true,
    multiLanguage: true,
    logo: null,
    favicon: null
  })

  // إعدادات الأمان
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordMinLength: 8,
    passwordComplexity: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipWhitelist: '',
    sslEnabled: true,
    dataEncryption: true,
    auditLogging: true,
    backupFrequency: 'daily'
  })

  // إعدادات قاعدة البيانات
  const [databaseSettings, setDatabaseSettings] = useState({
    host: 'localhost',
    port: 5432,
    database: 'nutrio_db',
    username: 'admin',
    password: '••••••••',
    maxConnections: 100,
    connectionTimeout: 30,
    backupEnabled: true,
    backupTime: '02:00',
    retentionDays: 30
  })

  // إعدادات البريد الإلكتروني
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'admin@nutrio.com',
    smtpPassword: '••••••••',
    smtpSecurity: 'TLS',
    fromName: 'Nutrio Platform',
    fromEmail: 'noreply@nutrio.com',
    dailyLimit: 1000,
    testMode: false
  })

  // إعدادات الإشعارات
  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: true,
    webhookUrl: '',
    fcmServerKey: '',
    apnsEnabled: false,
    notificationSound: true,
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '07:00'
    }
  })

  // إعدادات المدفوعات
  const [paymentSettings, setPaymentSettings] = useState({
    stripePubKey: '',
    stripeSecretKey: '••••••••',
    paypalClientId: '',
    paypalSecret: '••••••••',
    applePay: false,
    googlePay: false,
    localPayment: true,
    commissionRate: 2.5,
    minPayout: 100,
    autoPayouts: true
  })

  const tabs = [
    { id: 'general', name: 'عام', icon: Settings },
    { id: 'security', name: 'الأمان', icon: Shield },
    { id: 'database', name: 'قاعدة البيانات', icon: Database },
    { id: 'email', name: 'البريد الإلكتروني', icon: Mail },
    { id: 'notifications', name: 'الإشعارات', icon: Bell },
    { id: 'payments', name: 'المدفوعات', icon: CreditCard },
    { id: 'integrations', name: 'التكاملات', icon: Globe }
  ]

  const handleSave = async () => {
    setSaving(true)
    // محاكاة حفظ الإعدادات
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSaving(false)
    alert('تم حفظ الإعدادات بنجاح')
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم المنصة
          </label>
          <input
            type="text"
            value={generalSettings.platformName}
            onChange={(e) => setGeneralSettings({...generalSettings, platformName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            المنطقة الزمنية
          </label>
          <select
            value={generalSettings.timezone}
            onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Asia/Riyadh">الرياض (GMT+3)</option>
            <option value="Asia/Dubai">دبي (GMT+4)</option>
            <option value="Europe/London">لندن (GMT+0)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اللغة الافتراضية
          </label>
          <select
            value={generalSettings.language}
            onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ar">العربية</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            العملة
          </label>
          <select
            value={generalSettings.currency}
            onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="SAR">ريال سعودي (SAR)</option>
            <option value="AED">درهم إماراتي (AED)</option>
            <option value="USD">دولار أمريكي (USD)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          وصف المنصة
        </label>
        <textarea
          value={generalSettings.platformDescription}
          onChange={(e) => setGeneralSettings({...generalSettings, platformDescription: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">وضع الصيانة</h4>
            <p className="text-sm text-gray-600">تعطيل الوصول لجميع المستخدمين</p>
          </div>
          <button
            onClick={() => setGeneralSettings({...generalSettings, maintenanceMode: !generalSettings.maintenanceMode})}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              generalSettings.maintenanceMode ? 'bg-red-600' : 'bg-gray-300'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              generalSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">التسجيل الجديد</h4>
            <p className="text-sm text-gray-600">السماح بتسجيل أعضاء جدد</p>
          </div>
          <button
            onClick={() => setGeneralSettings({...generalSettings, registrationEnabled: !generalSettings.registrationEnabled})}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              generalSettings.registrationEnabled ? 'bg-green-600' : 'bg-gray-300'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              generalSettings.registrationEnabled ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الحد الأدنى لطول كلمة المرور
          </label>
          <input
            type="number"
            value={securitySettings.passwordMinLength}
            onChange={(e) => setSecuritySettings({...securitySettings, passwordMinLength: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            مهلة انتهاء الجلسة (دقيقة)
          </label>
          <input
            type="number"
            value={securitySettings.sessionTimeout}
            onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الحد الأقصى لمحاولات تسجيل الدخول
          </label>
          <input
            type="number"
            value={securitySettings.maxLoginAttempts}
            onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            تكرار النسخ الاحتياطي
          </label>
          <select
            value={securitySettings.backupFrequency}
            onChange={(e) => setSecuritySettings({...securitySettings, backupFrequency: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="hourly">كل ساعة</option>
            <option value="daily">يومياً</option>
            <option value="weekly">أسبوعياً</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          قائمة IP المسموحة (سطر واحد لكل IP)
        </label>
        <textarea
          value={securitySettings.ipWhitelist}
          onChange={(e) => setSecuritySettings({...securitySettings, ipWhitelist: e.target.value})}
          rows={4}
          placeholder="192.168.1.1&#10;10.0.0.0/8"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { key: 'twoFactorAuth', name: 'المصادقة الثنائية', desc: 'إجبار المصادقة الثنائية لجميع المستخدمين' },
          { key: 'passwordComplexity', name: 'تعقيد كلمة المرور', desc: 'يجب أن تحتوي على أحرف وأرقام ورموز' },
          { key: 'sslEnabled', name: 'تشفير SSL', desc: 'تشفير جميع البيانات المنقولة' },
          { key: 'dataEncryption', name: 'تشفير البيانات', desc: 'تشفير البيانات الحساسة في قاعدة البيانات' },
          { key: 'auditLogging', name: 'سجل المراجعة', desc: 'تسجيل جميع العمليات الحساسة' }
        ].map((setting) => (
          <div key={setting.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">{setting.name}</h4>
              <p className="text-sm text-gray-600">{setting.desc}</p>
            </div>
            <button
              onClick={() => setSecuritySettings({...securitySettings, [setting.key]: !securitySettings[setting.key]})}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                securitySettings[setting.key] ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                securitySettings[setting.key] ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            خادم SMTP
          </label>
          <input
            type="text"
            value={emailSettings.smtpHost}
            onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            منفذ SMTP
          </label>
          <input
            type="number"
            value={emailSettings.smtpPort}
            onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم المستخدم
          </label>
          <input
            type="email"
            value={emailSettings.smtpUsername}
            onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            كلمة المرور
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={emailSettings.smtpPassword}
              onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 left-0 pl-3 flex items-center"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نوع الأمان
          </label>
          <select
            value={emailSettings.smtpSecurity}
            onChange={(e) => setEmailSettings({...emailSettings, smtpSecurity: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="TLS">TLS</option>
            <option value="SSL">SSL</option>
            <option value="none">بدون تشفير</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الحد اليومي للرسائل
          </label>
          <input
            type="number"
            value={emailSettings.dailyLimit}
            onChange={(e) => setEmailSettings({...emailSettings, dailyLimit: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم المرسل
          </label>
          <input
            type="text"
            value={emailSettings.fromName}
            onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            البريد الإلكتروني للمرسل
          </label>
          <input
            type="email"
            value={emailSettings.fromEmail}
            onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h4 className="font-medium text-gray-900">وضع الاختبار</h4>
          <p className="text-sm text-gray-600">عدم إرسال الرسائل الفعلية (للتطوير فقط)</p>
        </div>
        <button
          onClick={() => setEmailSettings({...emailSettings, testMode: !emailSettings.testMode})}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            emailSettings.testMode ? 'bg-yellow-600' : 'bg-gray-300'
          }`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            emailSettings.testMode ? 'translate-x-6' : 'translate-x-1'
          }`} />
        </button>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'security':
        return renderSecuritySettings()
      case 'email':
        return renderEmailSettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <AdminHeader title="إعدادات النظام" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* التبويبات */}
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
                            ? 'border-blue-500 text-blue-600'
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

              {/* زر الحفظ */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2 space-x-reverse"
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
    </div>
  )
}

export default AdminSettings
