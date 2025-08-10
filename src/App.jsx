import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import providers
import { AppProvider } from './context/AppContext'
import { NotificationProvider } from './components/ui/notifications'

// Import components
import HomePage from './components/HomePage'
import AdminDashboard from './components/admin/AdminDashboard'
import UserManagement from './components/admin/UserManagement'
import RestaurantDashboard from './components/restaurant/RestaurantDashboard'
import GymDashboard from './components/gym/GymDashboard'
import DriverApp from './components/driver/DriverApp'
import SystemHealthDashboard from '@/components/admin/SystemHealthDashboard'
import SystemAnalytics from '@/components/admin/SystemAnalytics'
import AdminSettings from '@/components/admin/AdminSettings'
import AdminProfile from '@/components/admin/AdminProfile'
import AdminNotifications from '@/components/admin/AdminNotifications'
import RestaurantSettings from '@/components/restaurant/RestaurantSettings'
import RestaurantProfile from '@/components/restaurant/RestaurantProfile'
import RestaurantNotifications from '@/components/restaurant/RestaurantNotifications'
import KitchenDisplay from '@/components/restaurant/KitchenDisplay'
import RestaurantOrdersManagement from '@/components/restaurant/RestaurantOrdersManagement'
import GymSettings from '@/components/gym/GymSettings'
import GymProfile from '@/components/gym/GymProfile'
import GymNotifications from '@/components/gym/GymNotifications'
import MemberCheckIn from '@/components/gym/MemberCheckIn'
import MembersManagement from '@/components/gym/MembersManagement'
import MemberDetails from '@/components/gym/MemberDetails'
import ClassesManagement from '@/components/gym/ClassesManagement'
import MenuManagement from '@/components/restaurant/MenuManagement'
import AddMenuItem from '@/components/restaurant/AddMenuItem'
import MenuCategories from '@/components/restaurant/MenuCategories'
import NotFound from '@/components/NotFound'

function App() {
  return (
    <AppProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/system-health" element={<SystemHealthDashboard />} />
              <Route path="/admin/analytics" element={<SystemAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/notifications" element={<AdminNotifications />} />

              <Route path="/restaurant" element={<RestaurantDashboard />} />
              <Route path="/restaurant/orders" element={<RestaurantOrdersManagement />} />
              <Route path="/restaurant/kitchen" element={<KitchenDisplay />} />
              <Route path="/restaurant/menu" element={<MenuManagement />} />
              <Route path="/restaurant/menu/add" element={<AddMenuItem />} />
              <Route path="/restaurant/menu/categories" element={<MenuCategories />} />
              <Route path="/restaurant/settings" element={<RestaurantSettings />} />
              <Route path="/restaurant/profile" element={<RestaurantProfile />} />
              <Route path="/restaurant/notifications" element={<RestaurantNotifications />} />

              <Route path="/gym" element={<GymDashboard />} />
              <Route path="/gym/members" element={<MembersManagement />} />
              <Route path="/gym/members/:memberId" element={<MemberDetails />} />
              <Route path="/gym/classes" element={<ClassesManagement />} />
              <Route path="/gym/checkin" element={<MemberCheckIn />} />
              <Route path="/gym/settings" element={<GymSettings />} />
              <Route path="/gym/profile" element={<GymProfile />} />
              <Route path="/gym/notifications" element={<GymNotifications />} />

              <Route path="/driver" element={<DriverApp />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AppProvider>
  )
}

export default App

