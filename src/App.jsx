import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Import providers
import { AppProvider } from './context/AppContext'
import { NotificationProvider } from './components/ui/notifications'

// Import components
import HomePage from './components/HomePage'
import AdminDashboard from './components/admin/AdminDashboard'
import RestaurantDashboard from './components/restaurant/RestaurantDashboard'
import GymDashboard from './components/gym/GymDashboard'
import DriverApp from './components/driver/DriverApp'

function App() {
  return (
    <AppProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/restaurant" element={<RestaurantDashboard />} />
              <Route path="/gym" element={<GymDashboard />} />
              <Route path="/driver" element={<DriverApp />} />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AppProvider>
  )
}

export default App

