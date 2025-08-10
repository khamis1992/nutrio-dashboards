import React, { useState, useEffect } from 'react'
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Timer, 
  User, 
  Phone,
  MapPin,
  ChefHat,
  Flame,
  Play,
  Pause,
  Check
} from 'lucide-react'
import { useToast } from '../ui/notifications'

const KitchenDisplaySystem = () => {
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  
  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customerName: 'أحمد محمد',
      phone: '0501234567',
      orderTime: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      estimatedTime: 15,
      status: 'preparing',
      priority: 'normal',
      items: [
        { name: 'برجر دجاج', quantity: 2, cookTime: 8, status: 'cooking' },
        { name: 'بطاطس مقلية', quantity: 2, cookTime: 5, status: 'ready' },
        { name: 'كولا', quantity: 2, cookTime: 0, status: 'ready' }
      ],
      notes: 'بدون مايونيز',
      deliveryType: 'delivery',
      address: 'حي النخيل، شارع الملك فهد'
    },
    {
      id: 'ORD-002',
      customerName: 'فاطمة أحمد',
      phone: '0507654321',
      orderTime: new Date(Date.now() - 12 * 60000), // 12 minutes ago
      estimatedTime: 20,
      status: 'preparing',
      priority: 'urgent',
      items: [
        { name: 'بيتزا مارجريتا', quantity: 1, cookTime: 15, status: 'cooking' },
        { name: 'سلطة خضراء', quantity: 1, cookTime: 3, status: 'ready' }
      ],
      notes: 'إضافة جبن إضافي',
      deliveryType: 'pickup',
      address: null
    },
    {
      id: 'ORD-003',
      customerName: 'محمد علي',
      phone: '0509876543',
      orderTime: new Date(Date.now() - 2 * 60000), // 2 minutes ago
      estimatedTime: 12,
      status: 'new',
      priority: 'normal',
      items: [
        { name: 'شاورما دجاج', quantity: 3, cookTime: 6, status: 'pending' },
        { name: 'حمص', quantity: 1, cookTime: 2, status: 'pending' }
      ],
      notes: 'حار جداً',
      deliveryType: 'delivery',
      address: 'حي الملز، شارع التحلية'
    }
  ])

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getElapsedTime = (orderTime) => {
    const elapsed = Math.floor((currentTime - orderTime) / 60000)
    return elapsed
  }

  const getPriorityColor = (priority, elapsedTime, estimatedTime) => {
    if (priority === 'urgent' || elapsedTime > estimatedTime) {
      return 'border-red-500 bg-red-50'
    }
    if (elapsedTime > estimatedTime * 0.8) {
      return 'border-yellow-500 bg-yellow-50'
    }
    return 'border-green-500 bg-green-50'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'preparing': return 'bg-yellow-100 text-yellow-800'
      case 'ready': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getItemStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-gray-200 text-gray-700'
      case 'cooking': return 'bg-orange-200 text-orange-800'
      case 'ready': return 'bg-green-200 text-green-800'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  const startOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'preparing', startTime: new Date() }
        : order
    ))
    toast.success('تم بدء تحضير الطلب')
  }

  const completeItem = (orderId, itemIndex) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? {
            ...order,
            items: order.items.map((item, index) => 
              index === itemIndex 
                ? { ...item, status: 'ready' }
                : item
            )
          }
        : order
    ))
  }

  const completeOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'ready', completedTime: new Date() }
        : order
    ))
    toast.success('تم إنجاز الطلب وهو جاهز للتسليم')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4 space-x-reverse">
          <ChefHat className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold">شاشة المطبخ</h1>
        </div>
        <div className="text-right">
          <p className="text-2xl font-mono">{currentTime.toLocaleTimeString('ar-SA')}</p>
          <p className="text-gray-400">{currentTime.toLocaleDateString('ar-SA')}</p>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => {
          const elapsedTime = getElapsedTime(order.orderTime)
          const isOverdue = elapsedTime > order.estimatedTime
          
          return (
            <div 
              key={order.id}
              className={`bg-white text-gray-900 rounded-lg border-4 ${getPriorityColor(order.priority, elapsedTime, order.estimatedTime)} shadow-lg`}
            >
              {/* Order Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{order.id}</h3>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    {isOverdue && <AlertTriangle className="w-5 h-5 text-red-500" />}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status === 'new' && 'جديد'}
                      {order.status === 'preparing' && 'قيد التحضير'}
                      {order.status === 'ready' && 'جاهز'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <User className="w-4 h-4" />
                    <span>{order.customerName}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Clock className="w-4 h-4" />
                    <span className={isOverdue ? 'text-red-600 font-bold' : ''}>
                      {elapsedTime} دقيقة
                    </span>
                  </div>
                </div>

                {order.deliveryType === 'delivery' && (
                  <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{order.address}</span>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="p-4 space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600">×{item.quantity}</span>
                      </div>
                      {item.cookTime > 0 && (
                        <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 mt-1">
                          <Timer className="w-3 h-3" />
                          <span>{item.cookTime} دقيقة</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getItemStatusColor(item.status)}`}>
                        {item.status === 'pending' && 'معلق'}
                        {item.status === 'cooking' && 'يطبخ'}
                        {item.status === 'ready' && 'جاهز'}
                      </span>
                      {item.status !== 'ready' && (
                        <button
                          onClick={() => completeItem(order.id, index)}
                          className="p-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {order.notes && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>ملاحظات:</strong> {order.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Order Actions */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2 space-x-reverse">
                  {order.status === 'new' && (
                    <button
                      onClick={() => startOrder(order.id)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Play className="w-4 h-4 ml-2" />
                      بدء التحضير
                    </button>
                  )}
                  
                  {order.status === 'preparing' && order.items.every(item => item.status === 'ready') && (
                    <button
                      onClick={() => completeOrder(order.id)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 ml-2" />
                      الطلب جاهز
                    </button>
                  )}
                  
                  <div className="flex items-center justify-center px-3 py-2 bg-gray-100 rounded-lg">
                    <Timer className="w-4 h-4 text-gray-600 ml-1" />
                    <span className="text-sm font-medium text-gray-700">
                      {order.estimatedTime} دقيقة
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">لا توجد طلبات</h3>
          <p className="text-gray-500">جميع الطلبات مكتملة أو لا توجد طلبات جديدة</p>
        </div>
      )}
    </div>
  )
}

export default KitchenDisplaySystem

