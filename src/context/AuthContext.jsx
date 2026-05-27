import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AuthContext = createContext(null)

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

const MAX_DEVICES = 3

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sss_user')
    return saved ? JSON.parse(saved) : null
  })
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('sss_sessions')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('sss_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('sss_user')
    }
  }, [user])

  useEffect(() => {
    localStorage.setItem('sss_sessions', JSON.stringify(sessions))
  }, [sessions])

  const login = useCallback((email, password) => {
    // Check admin emails
    const adminEmails = JSON.parse(localStorage.getItem('sss_admin_emails') || '[]')
    const adminEntry = adminEmails.find(e => e.email === email && e.verified)
    
    const role = adminEntry ? adminEntry.role : 'client'
    
    const newUser = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      role,
      loginTime: new Date().toISOString()
    }

    // Enforce 3-device limit
    const deviceId = `device_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const userSessions = sessions.filter(s => s.email === email)
    
    let updatedSessions = [...sessions]
    if (userSessions.length >= MAX_DEVICES) {
      // Remove oldest session
      const oldest = userSessions.sort((a, b) => new Date(a.loginTime) - new Date(b.loginTime))[0]
      updatedSessions = updatedSessions.filter(s => s.deviceId !== oldest.deviceId)
    }
    
    updatedSessions.push({ email, deviceId, loginTime: new Date().toISOString() })
    setSessions(updatedSessions)
    
    setUser({ ...newUser, deviceId })
    return { success: true, role }
  }, [sessions])

  const signup = useCallback((email, name) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      role: 'client',
      loginTime: new Date().toISOString()
    }
    // Store in registered users
    const registered = JSON.parse(localStorage.getItem('sss_registered') || '[]')
    if (registered.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' }
    }
    registered.push({ email, name, createdAt: new Date().toISOString() })
    localStorage.setItem('sss_registered', JSON.stringify(registered))
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    if (user?.deviceId) {
      setSessions(prev => prev.filter(s => s.deviceId !== user.deviceId))
    }
    setUser(null)
  }, [user])

  const isAdmin = user?.role === 'admin' || user?.role === 'manager'
  const isClient = user?.role === 'client'

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      isClient,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      sessions: sessions.filter(s => s.email === user?.email),
      maxDevices: MAX_DEVICES
    }}>
      {children}
    </AuthContext.Provider>
  )
}
