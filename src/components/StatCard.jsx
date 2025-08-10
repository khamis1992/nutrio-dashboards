import { Card, CardContent } from '@/components/ui/card'

const StatCard = ({ title, value, icon: IconElement, color = 'bg-blue-500' }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className={`w-8 h-8 ${color} rounded-md flex items-center justify-center`}>
              <IconElement className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="mr-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">{value}</dd>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard

