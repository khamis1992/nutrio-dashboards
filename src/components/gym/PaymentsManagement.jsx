import { useState } from 'react'
import GymSidebar from '@/components/layout/GymSidebar'
import GymHeader from '@/components/layout/GymHeader'
import { 
  CreditCard, DollarSign, Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye,
  Calendar, Users, TrendingUp, CheckCircle, X, Save, RefreshCw, Download,
  AlertCircle, Clock, Receipt, Banknote, Smartphone, Target
} from 'lucide-react'

const PaymentsManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('transactions')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)

  // المعاملات المالية
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-001',
      memberId: 101,
      memberName: 'أحمد محمد',
      type: 'membership',
      description: 'اشتراك شهري - خطة بريميوم',
      amount: 350,
      status: 'completed',
      paymentMethod: 'card',
      date: '2024-01-28',
      dueDate: '2024-02-28',
      invoice: 'INV-001',
      transactionFee: 10.5
    },
    {
      id: 'TXN-002',
      memberId: 102,
      memberName: 'سارة أحمد',
      type: 'personal_training',
      description: 'جلسة تدريب شخصي - المدرب أحمد',
      amount: 150,
      status: 'pending',
      paymentMethod: 'cash',
      date: '2024-01-28',
      dueDate: '2024-01-28',
      invoice: 'INV-002',
      transactionFee: 0
    },
    {
      id: 'TXN-003',
      memberId: 103,
      memberName: 'محمد علي',
      type: 'supplement',
      description: 'بروتين مصل اللبن - 2.5 كجم',
      amount: 245,
      status: 'completed',
      paymentMethod: 'online',
      date: '2024-01-27',
      dueDate: '2024-01-27',
      invoice: 'INV-003',
      transactionFee: 7.35
    }
  ])

  // خطط الدفع والاشتراكات
  const [membershipPlans, setMembershipPlans] = useState([
    {
      id: 1,
      name: 'الخطة الأساسية',
      duration: 1,
      price: 200,
      features: ['استخدام جميع المعدات', 'خزانة شخصية', 'دخول أوقات الذروة'],
      activeMembers: 45,
      revenue: 9000
    },
    {
      id: 2,
      name: 'الخطة المتقدمة', 
      duration: 1,
      price: 350,
      features: ['جميع مميزات الخطة الأساسية', '3 جلسات تدريب شخصي', 'برنامج غذائي'],
      activeMembers: 32,
      revenue: 11200
    }
  ])

  const tabs = [
    { id: 'transactions', name: 'المعاملات', icon: CreditCard },
    { id: 'plans', name: 'خطط العضوية', icon: Target },
    { id: 'invoices', name: 'الفواتير', icon: Receipt },
    { id: 'analytics', name: 'التحليلات', icon: TrendingUp }
  ]

  const paymentMethods = {
    cash: { name: 'نقدي', icon: Banknote, color: 'green' },
    card: { name: 'بطاقة', icon: CreditCard, color: 'blue' },
    online: { name: 'إلكتروني', icon: Smartphone, color: 'purple' }
  }

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800'
  }

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">المعاملات المالية</h3>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center space-x-2 space-x-reverse">
              <Plus className="h-4 w-4" />
              <span>معاملة جديدة</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">رقم المعاملة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">العضو</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">النوع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">المبلغ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">طريقة الدفع</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">الحالة</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">التاريخ</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">إجراءات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                    <div className="text-sm text-gray-500">{transaction.invoice}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.memberName}</div>
                    <div className="text-sm text-gray-500">ID: {transaction.memberId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-semibold text-gray-900">{transaction.amount} ر.س</div>
                    {transaction.transactionFee > 0 && (
                      <div className="text-xs text-gray-500">رسوم: {transaction.transactionFee} ر.س</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {React.createElement(paymentMethods[transaction.paymentMethod].icon, {
                        className: `h-4 w-4 mr-2 text-${paymentMethods[transaction.paymentMethod].color}-600`
                      })}
                      <span className="text-sm text-gray-900">{paymentMethods[transaction.paymentMethod].name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[transaction.status]}`}>
                      {transaction.status === 'completed' ? 'مكتمل' : 
                       transaction.status === 'pending' ? 'معلق' : 
                       transaction.status === 'failed' ? 'فاشل' : 'مسترد'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2 space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Receipt className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderMembershipPlans = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {membershipPlans.map(plan => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="text-2xl font-bold text-purple-600">{plan.price} ر.س / شهر</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-blue-600">{plan.activeMembers}</div>
                <div className="text-xs text-gray-600">عضو نشط</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg font-semibold text-green-600">{plan.revenue}</div>
                <div className="text-xs text-gray-600">ر.س شهرياً</div>
              </div>
            </div>

            <div className="flex space-x-2 space-x-reverse">
              <button className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                تحرير الخطة
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">إجمالي الإيرادات</p>
              <p className="text-2xl font-bold text-gray-900">
                {transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)} ر.س
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">معاملات مكتملة</p>
              <p className="text-2xl font-bold text-gray-900">
                {transactions.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">معاملات معلقة</p>
              <p className="text-2xl font-bold text-gray-900">
                {transactions.filter(t => t.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600">خطط العضوية</p>
              <p className="text-2xl font-bold text-gray-900">{membershipPlans.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">أداء طرق الدفع</h3>
        <div className="space-y-4">
          {Object.entries(paymentMethods).map(([key, method]) => {
            const count = transactions.filter(t => t.paymentMethod === key).length
            const revenue = transactions.filter(t => t.paymentMethod === key && t.status === 'completed')
              .reduce((sum, t) => sum + t.amount, 0)
            
            return (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  {React.createElement(method.icon, {
                    className: `h-6 w-6 mr-3 text-${method.color}-600`
                  })}
                  <div>
                    <div className="font-medium text-gray-900">{method.name}</div>
                    <div className="text-sm text-gray-600">{count} معاملة</div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-lg font-semibold text-gray-900">{revenue} ر.س</div>
                  <div className="text-sm text-gray-600">إجمالي الإيرادات</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'transactions':
        return renderTransactions()
      case 'plans':
        return renderMembershipPlans()
      case 'analytics':
        return renderAnalytics()
      default:
        return renderTransactions()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <GymSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="flex-1">
          <GymHeader title="إدارة المدفوعات" onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
          
          <div className="p-6">
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

              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsManagement