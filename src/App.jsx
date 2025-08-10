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
import RestaurantManagement from './components/admin/RestaurantManagement'
import GymManagement from './components/admin/GymManagement'
import DriversManagement from './components/admin/DriversManagement'
import OrdersOverview from './components/admin/OrdersOverview'
import PaymentsManagement from './components/admin/PaymentsManagement'
import NotificationsCenter from './components/admin/NotificationsCenter'
import SupportManagement from './components/admin/SupportManagement'
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
import NotFound from '@/components/NotFound'
import AdvancedAnalytics from './components/admin/AdvancedAnalytics'

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
              <Route path="/admin/restaurants" element={<RestaurantManagement />} />
              <Route path="/admin/gyms" element={<GymManagement />} />
              <Route path="/admin/drivers" element={<DriversManagement />} />
              <Route path="/admin/orders" element={<OrdersOverview />} />
              <Route path="/admin/payments" element={<PaymentsManagement />} />
              <Route path="/admin/notifications" element={<NotificationsCenter />} />
              <Route path="/admin/support" element={<SupportManagement />} />
              <Route path="/admin/advanced-analytics" element={<AdvancedAnalytics />} />
              <Route path="/admin/system-health" element={<SystemHealthDashboard />} />
              <Route path="/admin/analytics" element={<SystemAnalytics />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="/admin/notifications" element={<AdminNotifications />} />

              <Route path="/restaurant" element={<RestaurantDashboard />} />
              <Route path="/restaurant/orders" element={<RestaurantOrdersManagement />} />
              <Route path="/restaurant/kitchen" element={<KitchenDisplay />} />
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

