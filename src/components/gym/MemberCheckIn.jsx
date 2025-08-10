import { useState, useEffect } from 'react'
import { Search, User, Clock, Calendar, CheckCircle, AlertTriangle, Activity } from 'lucide-react'

const MemberCheckIn = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [recentCheckIns, setRecentCheckIns] = useState([
    {
      id: 1,
      name: 'أحمد محمد علي',
      membershipNumber: 'GYM001',
      checkInTime: new Date(Date.now() - 30 * 60000),
      membershipStatus: 'نشط',
      membershipExpiry: '2025-12-31',
      profileImage: null,
      planType: 'ذهبي',
      lastVisit: '2025-01-09'
    },
    {
      id: 2,
      name: 'فاطمة سارة',
      membershipNumber: 'GYM002',
      checkInTime: new Date(Date.now() - 45 * 60000),
      membershipStatus: 'نشط',
      membershipExpiry: '2025-11-15',
      profileImage: null,
      planType: 'فضي',
      lastVisit: '2025-01-08'
    },
    {
      id: 3,
      name: 'محمد عبدالله',
      membershipNumber: 'GYM003',
      checkInTime: new Date(Date.now() - 60 * 60000),
      membershipStatus: 'منتهي',
      membershipExpiry: '2025-01-05',
      profileImage: null,
      planType: 'برونزي',
      lastVisit: '2025-01-05'
    }
  ])
  
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCheckIn = () => {
    if (searchTerm.length < 3) return
    
    // محاكاة البحث عن العضو
    const newCheckIn = {
      id: Date.now(),
      name: 'عضو جديد',
      membershipNumber: searchTerm.toUpperCase(),
      checkInTime: new Date(),
      membershipStatus: 'نشط',
      membershipExpiry: '2025-12-31',
      profileImage: null,
      planType: 'ذهبي',
      lastVisit: currentTime.toISOString().split('T')[0]
    }
    
    setRecentCheckIns(prev => [newCheckIn, ...prev])
    setSearchTerm('')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'نشط': return 'text-green-600 bg-green-100'
      case 'منتهي': return 'text-red-600 bg-red-100'
      case 'مجمد': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'ذهبي': return 'text-yellow-600 bg-yellow-100'
      case 'فضي': return 'text-gray-600 bg-gray-100'
      case 'برونزي': return 'text-orange-600 bg-orange-100'
      default: return 'text-blue-600 bg-blue-100'
    }
  }

  const getTimeAgo = (time) => {
    const diff = Math.floor((currentTime - time) / 1000 / 60)
    if (diff < 1) return 'الآن'
    if (diff < 60) return `منذ ${diff} دقيقة`
    const hours = Math.floor(diff / 60)
    return `منذ ${hours} ساعة`
  }

  const todayCheckIns = recentCheckIns.filter(checkIn => 
    checkIn.checkInTime.toDateString() === currentTime.toDateString()
  ).length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* العنوان والوقت */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">نظام دخول الأعضاء</h1>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">
              {currentTime.toLocaleTimeString('ar-SA')}
            </p>
            <p className="text-gray-600">
              {currentTime.toLocaleDateString('ar-SA', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* نظام الدخول */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">تسجيل دخول عضو</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم العضوية أو اسم العضو
                </label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCheckIn()}
                    placeholder="ابحث برقم العضوية أو الاسم..."
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>
              
              <button
                onClick={handleCheckIn}
                disabled={searchTerm.length < 3}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium"
              >
                تسجيل الدخول
              </button>
            </div>

            {/* إحصائيات سريعة */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">إحصائيات اليوم</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">{todayCheckIns}</p>
                  <p className="text-sm text-blue-600">دخول اليوم</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {recentCheckIns.filter(c => c.membershipStatus === 'نشط').length}
                  </p>
                  <p className="text-sm text-green-600">أعضاء نشطين</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* آخر دخول الأعضاء */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">آخر دخول الأعضاء</h2>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {recentCheckIns.map((checkIn) => (
                <div key={checkIn.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-purple-600" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{checkIn.name}</h3>
                        <span className="text-sm text-gray-500">
                          {getTimeAgo(checkIn.checkInTime)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 space-x-reverse mt-1">
                        <span className="text-sm text-gray-600">
                          #{checkIn.membershipNumber}
                        </span>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(checkIn.membershipStatus)}`}>
                          {checkIn.membershipStatus}
                        </span>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(checkIn.planType)}`}>
                          {checkIn.planType}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-3 space-x-reverse mt-1 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 ml-1" />
                          ينتهي: {checkIn.membershipExpiry}
                        </div>
                        <div className="flex items-center">
                          <Activity className="w-3 h-3 ml-1" />
                          آخر زيارة: {checkIn.lastVisit}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {checkIn.membershipStatus === 'نشط' ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberCheckIn
