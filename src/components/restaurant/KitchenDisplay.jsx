import { useState, useEffect } from 'react'
import { Clock, CheckCircle, AlertTriangle, User, Phone } from 'lucide-react'

const KitchenDisplay = () => {
  const [orders, setOrders] = useState([
    {
      id: '#1234',
      customer: 'أحمد محمد',
      phone: '0501234567',
      items: [
        { name: 'شاورما دجاج', quantity: 2, notes: 'بدون ثوم' },
        { name: 'كولا', quantity: 1, notes: '' },
        { name: 'بطاطس', quantity: 1, notes: 'مقرمشة' }
      ],
      orderTime: new Date(Date.now() - 5 * 60000),
      status: 'جديد',
      priority: 'عادي',
      estimatedTime: 15
    },
    {
      id: '#1235',
      customer: 'فاطمة علي',
      phone: '0507654321',
      items: [
        { name: 'برجر لحم', quantity: 1, notes: 'وسط' },
        { name: 'عصير برتقال', quantity: 1, notes: 'طازج' }
      ],
      orderTime: new Date(Date.now() - 8 * 60000),
      status: 'قيد التحضير',
      priority: 'عاجل',
      estimatedTime: 10
    }
  ])

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getElapsedTime = (orderTime) => {
    const diff = Math.floor((currentTime - orderTime) / 1000 / 60)
    return `${diff} دقيقة`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'جديد': return 'bg-blue-100 border-blue-300 text-blue-800'
      case 'قيد التحضير': return 'bg-orange-100 border-orange-300 text-orange-800'
      case 'جاهز': return 'bg-green-100 border-green-300 text-green-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getPriorityColor = (priority) => {
    return priority === 'عاجل' ? 'border-r-4 border-r-red-500' : 'border-r-4 border-r-gray-300'
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      {/* العنوان */}
      <div className="bg-white rounded-lg p-4 mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">شاشة المطبخ</h1>
        <p className="text-gray-600 mt-2">
          الوقت الحالي: {currentTime.toLocaleTimeString('ar-SA')}
        </p>
      </div>

      {/* الطلبات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div 
            key={order.id}
            className={`bg-white rounded-lg shadow-lg border-2 ${getPriorityColor(order.priority)}`}
          >
            {/* رأس البطاقة */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-1">
                <User className="w-4 h-4 ml-2" />
                <span>{order.customer}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <Phone className="w-4 h-4 ml-2" />
                <span>{order.phone}</span>
              </div>
              
              <div className="flex items-center text-orange-600">
                <Clock className="w-4 h-4 ml-2" />
                <span>مضى {getElapsedTime(order.orderTime)} / المقدر {order.estimatedTime} دقيقة</span>
              </div>
            </div>

            {/* الأصناف */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3">الأصناف:</h4>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        x{item.quantity}
                      </span>
                    </div>
                    {item.notes && (
                      <p className="text-sm text-orange-600 mt-1">
                        ملاحظة: {item.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* أزرار الحالة */}
            <div className="p-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-2">
                {order.status === 'جديد' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'قيد التحضير')}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    بدء التحضير
                  </button>
                )}
                
                {order.status === 'قيد التحضير' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'جاهز')}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    جاهز للتوصيل
                  </button>
                )}
                
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  تفاصيل
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* إحصائيات سريعة */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-600 text-white rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold">{orders.filter(o => o.status === 'جديد').length}</h3>
          <p>طلبات جديدة</p>
        </div>
        <div className="bg-orange-600 text-white rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold">{orders.filter(o => o.status === 'قيد التحضير').length}</h3>
          <p>قيد التحضير</p>
        </div>
        <div className="bg-green-600 text-white rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold">{orders.filter(o => o.status === 'جاهز').length}</h3>
          <p>جاهز للتوصيل</p>
        </div>
        <div className="bg-purple-600 text-white rounded-lg p-4 text-center">
          <h3 className="text-2xl font-bold">{orders.length}</h3>
          <p>إجمالي الطلبات</p>
        </div>
      </div>
    </div>
  )
}

export default KitchenDisplay
