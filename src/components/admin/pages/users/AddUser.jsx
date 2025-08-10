import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Shield, 
  Save, 
  ArrowRight,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import AdminSidebar from "@/components/layout/AdminSidebar"
import AdminHeader from "@/components/layout/AdminHeader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const AddUser = () => {
  const navigate = useNavigate()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "customer",
    password: "",
    confirmPassword: "",
    permissions: [],
    isActive: true,
    sendWelcomeEmail: true
  })

  const roles = [
    { value: "customer", label: "????", description: "?????? ???? ????? ?????" },
    { value: "restaurant_owner", label: "???? ????", description: "????? ????? ?????" },
    { value: "gym_owner", label: "???? ???? ???", description: "????? ????? ???? ?????" },
    { value: "driver", label: "????", description: "????? ????? ???????" },
    { value: "admin", label: "????", description: "??????? ????? ?? ??????" }
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "????? ?????"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "?????? ?????????? ?????"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "?????? ?????????? ??? ????"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "??? ?????? ?????"
    }
    
    if (!formData.password) {
      newErrors.password = "???? ?????? ??????"
    } else if (formData.password.length < 8) {
      newErrors.password = "???? ?????? ??? ?? ???? 8 ???? ??? ?????"
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "???? ?????? ??? ???????"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newUser = {
        id: Date.now(),
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
        lastLogin: null,
        status: formData.isActive ? "???" : "????"
      }
      
      console.log("?? ????? ????????:", newUser)
      
      setSuccess(true)
      setTimeout(() => {
        navigate("/admin/users")
      }, 2000)
      
    } catch (error) {
      console.error("??? ?? ????? ????????:", error)
      setErrors({ submit: "??? ??? ????? ????? ????????" })
    } finally {
      setLoading(false)
    }
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
            title="????? ?????? ????" 
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
              <span className="text-gray-900">????? ?????? ????</span>
            </div>

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                  <span className="text-green-800 font-medium">
                    ?? ????? ???????? ?????! ???? ?????? ?????? ??????????...
                  </span>
                </div>
              </div>
            )}

            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 ml-2" />
                  <span className="text-red-800">{errors.submit}</span>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <User className="w-6 h-6 ml-2 text-blue-600" />
                  ?????? ???????? ??????
                </h2>
                <p className="text-gray-600 mt-1">
                  ?? ?????? ?????? ???????? ?????? ?? ????? ????????? ????????
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 ml-2 text-blue-600" />
                    ????????? ????????
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ????? ?????? *
                      </label>
                      <Input
                        placeholder="???? ????? ??????"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ?????? ?????????? *
                      </label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          type="email"
                          placeholder="???? ?????? ??????????"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className={`pr-10 ${errors.email ? "border-red-500" : ""}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ??? ?????? *
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="???? ??? ??????"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className={`pr-10 ${errors.phone ? "border-red-500" : ""}`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ????? *
                      </label>
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      >
                        {roles.map(role => (
                          <option key={role.value} value={role.value}>
                            {role.label} - {role.description}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Lock className="w-5 h-5 ml-2 text-blue-600" />
                    ???? ??????
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ???? ?????? *
                      </label>
                      <Input
                        type="password"
                        placeholder="???? ???? ??????"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className={errors.password ? "border-red-500" : ""}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                      )}
                      <p className="text-gray-500 text-sm mt-1">
                        ??? ?? ???? 8 ???? ??? ?????
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ????? ???? ?????? *
                      </label>
                      <Input
                        type="password"
                        placeholder="??? ????? ???? ??????"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className={errors.confirmPassword ? "border-red-500" : ""}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    ??????? ??????
                  </h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 mr-2">
                        ????? ?????? ?????
                      </span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.sendWelcomeEmail}
                        onChange={(e) => setFormData({...formData, sendWelcomeEmail: e.target.checked})}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 mr-2">
                        ????? ???? ????? ????????
                      </span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/users")}
                    disabled={loading}
                  >
                    ?????
                  </Button>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="min-w-[120px]"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2" />
                        ???? ???????...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 ml-2" />
                        ????? ????????
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUser
