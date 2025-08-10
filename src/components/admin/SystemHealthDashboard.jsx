import React, { useState } from 'react'
import { 
  Server, 
  Database, 
  Wifi, 
  Cpu, 
  HardDrive, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from 'lucide-react'
import { LoadingSpinner } from '../ui/loading'
import { useToast } from '../ui/notifications'

const SystemHealthDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const { toast } = useToast()

  // Mock system health data
  const [systemHealth, setSystemHealth] = useState({
    servers: [
      {
        name: 'خادم التطبيق الرئيسي',
        status: 'healthy',
        cpu: 45,
        memory: 62,
        disk: 78,
        uptime: '15 يوم، 7 ساعات'
      },
      {
        name: 'خادم قاعدة البيانات',
        status: 'healthy',
        cpu: 32,
        memory: 58,
        disk: 45,
        uptime: '15 يوم، 7 ساعات'
      },
      {
        name: 'خادم الملفات',
        status: 'warning',
        cpu: 78,
        memory: 85,
        disk: 92,
        uptime: '12 يوم، 3 ساعات'
      }
    ],
    apis: [
      { name: 'User API', status: 'healthy', responseTime: 120, uptime: 99.9 },
      { name: 'Restaurant API', status: 'healthy', responseTime: 95, uptime: 99.8 },
      { name: 'Gym API', status: 'healthy', responseTime: 110, uptime: 99.7 },
      { name: 'Driver API', status: 'warning', responseTime: 250, uptime: 98.5 }
    ],
    database: {
      status: 'healthy',
      connections: 45,
      maxConnections: 100,
      queryTime: 15,
      size: '2.4 GB'
    }
  })

  const refreshData = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update with some random variations
      setSystemHealth(prev => ({
        ...prev,
        servers: prev.servers.map(server => ({
          ...server,
          cpu: Math.max(10, Math.min(90, server.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(20, Math.min(95, server.memory + (Math.random() - 0.5) * 8))
        }))
      }))
      
      setLastUpdated(new Date())
      toast.success('تم تحديث بيانات النظام بنجاح')
    } catch {
      toast.error('فشل في تحديث بيانات النظام')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'error': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />
      case 'warning': return <AlertTriangle className="w-4 h-4" />
      case 'error': return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const getUsageColor = (usage) => {
    if (usage >= 90) return 'bg-red-500'
    if (usage >= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">مراقبة صحة النظام</h2>
        <div className="flex items-center space-x-4 space-x-reverse">
          <span className="text-sm text-gray-500">
            آخر تحديث: {lastUpdated.toLocaleTimeString('ar-SA')}
          </span>
          <button
            onClick={refreshData}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <LoadingSpinner size="sm" className="ml-2" />
            ) : (
              <RefreshCw className="w-4 h-4 ml-2" />
            )}
            تحديث
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">الخوادم النشطة</p>
              <p className="text-2xl font-bold text-green-600">3/3</p>
            </div>
            <Server className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">APIs المتاحة</p>
              <p className="text-2xl font-bold text-green-600">4/4</p>
            </div>
            <Wifi className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">قاعدة البيانات</p>
              <p className="text-2xl font-bold text-green-600">سليمة</p>
            </div>
            <Database className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">متوسط الاستجابة</p>
              <p className="text-2xl font-bold text-blue-600">144ms</p>
            </div>
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Servers Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">حالة الخوادم</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {systemHealth.servers.map((server, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`p-2 rounded-full ${getStatusColor(server.status)}`}>
                    {getStatusIcon(server.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{server.name}</h4>
                    <p className="text-sm text-gray-500">وقت التشغيل: {server.uptime}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 space-x-reverse">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">المعالج</p>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.cpu)}`}
                          style={{ width: `${server.cpu}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{server.cpu}%</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">الذاكرة</p>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.memory)}`}
                          style={{ width: `${server.memory}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{server.memory}%</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-500">التخزين</p>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${getUsageColor(server.disk)}`}
                          style={{ width: `${server.disk}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{server.disk}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* API Status */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">حالة APIs</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {systemHealth.apis.map((api, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className={`p-2 rounded-full ${getStatusColor(api.status)}`}>
                    {getStatusIcon(api.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{api.name}</h4>
                    <p className="text-sm text-gray-500">وقت الاستجابة: {api.responseTime}ms</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{api.uptime}%</p>
                  <p className="text-xs text-gray-500">وقت التشغيل</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SystemHealthDashboard

