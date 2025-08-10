import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const DashboardHeader = ({ title, color = 'text-blue-600' }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className={`text-2xl font-bold ${color}`}>Nutrio</h1>
            <span className="mx-4 text-gray-500">|</span>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" className={`${color} hover:${color.replace('text-', 'bg-').replace('-600', '-50')}`}>
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader

