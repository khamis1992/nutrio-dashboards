import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

// Initial State
const initialState = {
  // User State
  user: null,
  isAuthenticated: false,
  userRole: null,
  
  // App State
  loading: false,
  error: null,
  
  // Dashboard Data
  stats: {
    admin: {
      totalUsers: 12847,
      activeRestaurants: 156,
      activeGyms: 89,
      activDrivers: 234,
      totalRevenue: 2450000,
      monthlyGrowth: 12
    },
    restaurant: {
      todayOrders: 45,
      pendingOrders: 8,
      todayRevenue: 3250,
      avgPreparationTime: 18,
      customerRating: 4.8,
      monthlyGrowth: 18
    },
    gym: {
      totalMembers: 342,
      activeMembers: 289,
      todayClasses: 12,
      monthlyRevenue: 45600,
      memberRetention: 87,
      monthlyGrowth: 15
    }
  },
  
  // Settings
  settings: {
    theme: 'light',
    language: 'ar',
    notifications: true,
    autoRefresh: true
  }
}

// Action Types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  UPDATE_STATS: 'UPDATE_STATS',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS'
}

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
      
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
      
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
      
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        userRole: action.payload.role,
        isAuthenticated: true
      }
      
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        userRole: null,
        isAuthenticated: false
      }
      
    case ActionTypes.UPDATE_STATS:
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.payload.type]: {
            ...state.stats[action.payload.type],
            ...action.payload.data
          }
        }
      }
      
    case ActionTypes.UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      }
      
    default:
      return state
  }
}

// Context
const AppContext = createContext()

// Hook to use context
export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Actions
  const setLoading = (loading) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: loading })
  }

  const setError = (error) => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: error })
  }

  const clearError = () => {
    dispatch({ type: ActionTypes.CLEAR_ERROR })
  }

  const setUser = (user, role) => {
    dispatch({ 
      type: ActionTypes.SET_USER, 
      payload: { user, role }
    })
  }

  const logout = () => {
    dispatch({ type: ActionTypes.LOGOUT })
  }

  const updateStats = (type, data) => {
    dispatch({ 
      type: ActionTypes.UPDATE_STATS, 
      payload: { type, data }
    })
  }

  const updateSettings = (settings) => {
    dispatch({ 
      type: ActionTypes.UPDATE_SETTINGS, 
      payload: settings
    })
  }

  // Simulate API calls
  const fetchStats = useCallback(async (dashboardType) => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate data update with some randomization
      const currentStats = state.stats[dashboardType]
      const updatedStats = {
        ...currentStats,
        // Add some random variation to simulate real-time updates
        ...(dashboardType === 'restaurant' && {
          todayOrders: currentStats.todayOrders + Math.floor(Math.random() * 5),
          pendingOrders: Math.max(0, currentStats.pendingOrders + Math.floor(Math.random() * 3) - 1)
        }),
        ...(dashboardType === 'gym' && {
          activeMembers: currentStats.activeMembers + Math.floor(Math.random() * 10) - 5
        })
      }
      
      updateStats(dashboardType, updatedStats)
    } catch {
      setError('فشل في تحميل البيانات')
    } finally {
      setLoading(false)
    }
  }, [state.stats, updateStats, setLoading, setError])

  // Auto-refresh data
  useEffect(() => {
    if (state.settings.autoRefresh) {
      const interval = setInterval(() => {
        // Refresh stats based on current dashboard
        if (state.userRole) {
          fetchStats(state.userRole)
        }
      }, 30000) // Refresh every 30 seconds

      return () => clearInterval(interval)
    }
  }, [state.settings.autoRefresh, state.userRole, fetchStats])

  const value = {
    // State
    ...state,
    
    // Actions
    setLoading,
    setError,
    clearError,
    setUser,
    logout,
    updateStats,
    updateSettings,
    fetchStats
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Auth Hook
export const useAuth = () => {
  const { user, isAuthenticated, userRole, setUser, logout } = useApp()
  
  const login = async (email, password, role) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      const userData = {
        id: 1,
        name: 'أحمد محمد',
        email,
        avatar: null
      }
      
      setUser(userData, role)
      return { success: true }
    } catch {
      return { success: false, error: 'فشل في تسجيل الدخول' }
    }
  }

  return {
    user,
    isAuthenticated,
    userRole,
    login,
    logout
  }
}

// Stats Hook
export const useStats = () => {
  const { stats, updateStats, fetchStats } = useApp()
  
  return {
    stats,
    updateStats,
    fetchStats,
    refreshStats: fetchStats
  }
}

