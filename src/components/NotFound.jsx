import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">الصفحة غير موجودة</h1>
        <p className="text-gray-600 mb-6">الصفحة التي تبحث عنها غير متوفرة.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">العودة إلى الصفحة الرئيسية</Link>
      </div>
    </div>
  )
}

export default NotFound
