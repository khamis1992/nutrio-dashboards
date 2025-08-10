import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
  UserX, 
  AlertTriangle, 
  Unlock, 
  Eye, 
  ArrowRight,
  Calendar,
  Clock
} from "lucide-react"
import AdminSidebar from "@/components/layout/AdminSidebar"
import AdminHeader from "@/components/layout/AdminHeader"
import { Button } from "@/components/ui/button"

const BlockedUsers = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  const blockedUsers = [
    {
      id: 1,
      name: "???? ???? ?????",
      email: "ahmed@example.com",
      phone: "0501234567",
      role: "customer",
      blockReason: "?????? ???? ?????????",
      blockedBy: "???? ??????",
      blockDate: "2025-01-10",
      blockDuration: "30 ???",
      remainingDays: 15,
      violations: 3
    },
    {
      id: 2,
      name: "????? ???? ????",
      email: "fatma@example.com", 
      phone: "0507654321",
      role: "restaurant_owner",
      blockReason: "??? ???????? ??????? ??????",
      blockedBy: "???? ??????",
      blockDate: "2025-01-12",
      blockDuration: "7 ????",
      remainingDays: 2,
      violations: 1
    },
    {
      id: 3,
      name: "???? ??????? ????????",
      email: "mohammed@example.com",
      phone: "0509876543",
      role: "driver",
      blockReason: "????? ????? ?? ???????",
      blockedBy: "???? ??????",
      blockDate: "2025-01-08",
      blockDuration: "14 ???",
      remainingDays: 8,
      violations: 5
    }
  ]

  const getRemainingDaysColor = (days) => {
    if (days <= 3) return "text-red-600 bg-red-100"
    if (days <= 7) return "text-orange-600 bg-orange-100"
    return "text-blue-600 bg-blue-100"
  }

  const getViolationsColor = (count) => {
    if (count >= 5) return "text-red-600 bg-red-100"
    if (count >= 3) return "text-orange-600 bg-orange-100"
    return "text-yellow-600 bg-yellow-100"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <AdminSidebar 
          collapsed={sidebarCollapsed} 
          setCollapsed={setSidebarCollapsed} 
        />
        
        <div className="flex-1">
          <AdminHeader 
            title="?????????? ?????????" 
            onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
          
          <div className="p-6">
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <span 
                className="cursor-pointer hover:text-blue-600"
                onClick={() => navigate("/admin")}
              >
                ???? ??????
              </span>
              <ArrowRight className="w-4 h-4 mx-2" />
              <span 
                className="cursor-pointer hover:text-blue-600"
                onClick={() => navigate("/admin/users")}
              >
                ??????????
              </span>
              <ArrowRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900">?????????? ?????????</span>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <UserX className="w-6 h-6 ml-2 text-red-600" />
                ?????????? ?????????
              </h2>
              <p className="text-gray-600 mt-1">
                ????? ?????????? ????????? ???? ????? ?????
              </p>
            </div>

            {/* ???????? ????? */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <UserX className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm text-gray-600">?????? ?????????</p>
                    <p className="text-2xl font-bold text-gray-900">{blockedUsers.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm text-gray-600">?????? ????? ??????</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {blockedUsers.filter(user => user.remainingDays <= 3).length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm text-gray-600">????? ??? ?????</p>
                    <p className="text-2xl font-bold text-gray-900">17 ???</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Unlock className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="mr-4">
                    <p className="text-sm text-gray-600">?? ????? ?????</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ????? ?????????? ????????? */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  ????? ?????????? ????????? ({blockedUsers.length})
                </h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {blockedUsers.map((user) => (
                  <div key={user.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <UserX className="w-6 h-6 text-red-600" />
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-sm text-gray-500">{user.phone}</p>
                        </div>
                      </div>
                      
                      <div className="text-left">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getViolationsColor(user.violations)}`}>
                          {user.violations} ???????
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">??? ?????:</p>
                        <p className="text-sm text-gray-600">{user.blockReason}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700">?? ????? ??????:</p>
                        <p className="text-sm text-gray-600">{user.blockedBy}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700">????? ?????:</p>
                        <p className="text-sm text-gray-600">{user.blockDate}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div>
                          <p className="text-sm font-medium text-gray-700">??? ?????:</p>
                          <p className="text-sm text-gray-600">{user.blockDuration}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium text-gray-700">?????? ????????:</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRemainingDaysColor(user.remainingDays)}`}>
                            <Clock className="w-3 h-3 ml-1" />
                            {user.remainingDays} ???
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 ml-1" />
                          ??? ????????
                        </Button>
                        
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Unlock className="w-4 h-4 ml-1" />
                          ????? ?????
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockedUsers
