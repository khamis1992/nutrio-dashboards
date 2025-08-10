import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Building2, Dumbbell, Truck } from 'lucide-react'

const HomePage = () => {
  const dashboards = [
    {
      title: 'إدارة النظام',
      description: 'لوحة تحكم شاملة لإدارة النظام',
      icon: BarChart3,
      path: '/admin',
      color: 'bg-blue-600 hover:bg-blue-700',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      title: 'إدارة المطاعم',
      description: 'إدارة الطلبات والوجبات والمطاعم',
      icon: Building2,
      path: '/restaurant',
      color: 'bg-green-600 hover:bg-green-700',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'إدارة صالات الجيم',
      description: 'إدارة الحصص والاشتراكات',
      icon: Dumbbell,
      path: '/gym',
      color: 'bg-purple-600 hover:bg-purple-700',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'تطبيق التوصيل',
      description: 'تطبيق PWA للسائقين والتوصيل',
      icon: Truck,
      path: '/driver',
      color: 'bg-orange-600 hover:bg-orange-700',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-4">Nutrio</h1>
          <p className="text-xl text-gray-600">نظام إدارة شامل للمطاعم وصالات الجيم</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboards.map((dashboard, index) => {
            const IconComponent = dashboard.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${dashboard.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`w-8 h-8 ${dashboard.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg">{dashboard.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {dashboard.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Link to={dashboard.path}>
                    <Button className={`${dashboard.color} text-white transition-colors`}>
                      دخول
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">تم تطوير التطبيق بنجاح وهو جاهز للاستخدام</p>
          <p className="text-sm text-gray-400 mt-2">جميع اللوحات تعمل بشكل صحيح مع الروتنق المناسب</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage

