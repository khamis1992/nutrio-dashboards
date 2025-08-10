import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
  Shield, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  ArrowRight,
  CheckCircle,
  XCircle
} from "lucide-react"
import AdminSidebar from "@/components/layout/AdminSidebar"
import AdminHeader from "@/components/layout/AdminHeader"
import { Button } from "@/components/ui/button"

const UserRoles = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  
  const roles = [
    {
      id: 1,
      name: "???? ??????",
      description: "??????? ????? ?? ??????",
      usersCount: 3,
      permissions: [
        "????? ??????????",
        "????? ???????",
        "????? ????? ?????", 
        "????? ???????",
        "????? ?????????",
        "??? ????????",
        "??????? ??????"
      ],
      color: "blue"
    },
    {
      id: 2,
      name: "???? ????",
      description: "????? ????? ????? ????????",
      usersCount: 156,
      permissions: [
        "????? ??????",
        "????? ???????",
        "????? ???????",
        "??? ????????"
      ],
      color: "green"
    },
    {
      id: 3,
      name: "???? ???? ???",
      description: "????? ????? ???? ????? ????????",
      usersCount: 89,
      permissions: [
        "????? ??????",
        "????? ???????",
        "????? ????????",
        "??? ????????"
      ],
      color: "purple"
    },
    {
      id: 4,
      name: "????",
      description: "????? ????? ???????",
      usersCount: 234,
      permissions: [
        "??? ???????",
        "????? ???? ???????",
        "??? ???????"
      ],
      color: "orange"
    },
    {
      id: 5,
      name: "????",
      description: "?????? ???? ????? ?????",
      usersCount: 12450,
      permissions: [
        "??? ???????",
        "????? ???????",
        "???? ?????",
        "????? ??????"
      ],
      color: "gray"
    }
  ]

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      green: "bg-green-100 text-green-800 border-green-200", 
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200"
    }
    return colorMap[color] || colorMap.gray
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
            title="????? ??????? ??????????" 
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
              <span className="text-gray-900">??????? ??????????</span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Shield className="w-6 h-6 ml-2 text-blue-600" />
                  ??????? ??????????
                </h2>
                <p className="text-gray-600 mt-1">
                  ????? ????? ?????????? ?????????? ???????? ??? ???
                </p>
              </div>
              
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4 ml-2" />
                ????? ??? ????
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {roles.map((role) => (
                <div 
                  key={role.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedRole(role)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {role.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {role.description}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getColorClasses(role.color)}`}>
                        {role.usersCount} ??????
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-3">?????????:</h4>
                    <div className="space-y-2">
                      {role.permissions.map((permission, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
                          {permission}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ???????? ????? */}
            <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">???????? ???????</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {roles.map((role) => (
                  <div key={role.id} className="text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${getColorClasses(role.color)}`}>
                      <Users className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{role.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{role.usersCount}</p>
                    <p className="text-xs text-gray-500">??????</p>
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

export default UserRoles
