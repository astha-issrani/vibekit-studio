import { createContext, useContext, useState} from 'react'
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '../lib/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  async function login(email, password) {
    setLoading(true)
    const data = await apiLogin(email, password)
    if (data.user) setUser(data.user)
    setLoading(false)
    return data
  }

  async function signup(email, password) {
    setLoading(true)
    const data = await apiSignup(email, password)
    if (data.user) setUser(data.user)
    setLoading(false)
    return data
  }

  async function logout() {
    await apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
