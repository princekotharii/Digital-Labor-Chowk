import { useEffect, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../api/client'
import { AuthContext } from './authContextValue'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('dlc-auth-user')
    if (!stored) {
      return null
    }

    try {
      return JSON.parse(stored)
    } catch {
      localStorage.removeItem('dlc-auth-user')
      return null
    }
  })

  const persistSession = (authUser, token) => {
    setUser(authUser)
    localStorage.setItem('dlc-auth-user', JSON.stringify(authUser))
    localStorage.setItem('dlc-auth-token', token)
  }

  const login = async ({ email, password }) => {
    try {
      const result = await loginUser({ email, password })
      persistSession(result.user, result.token)
      return { ok: true, user: result.user }
    } catch (error) {
      return { ok: false, message: error.message || 'Invalid email or password.' }
    }
  }

  const register = async ({ name, role, email, password }) => {
    try {
      const result = await registerUser({ name, role, email, password })
      persistSession(result.user, result.token)
      return { ok: true, user: result.user }
    } catch (error) {
      return { ok: false, message: error.message || 'Could not register.' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('dlc-auth-user')
    localStorage.removeItem('dlc-auth-token')
  }

  useEffect(() => {
    const token = localStorage.getItem('dlc-auth-token')

    if (!token) {
      return
    }

    getCurrentUser()
      .then((result) => {
        if (result?.user) {
          setUser(result.user)
          localStorage.setItem('dlc-auth-user', JSON.stringify(result.user))
        }
      })
      .catch(() => {
        setUser(null)
        localStorage.removeItem('dlc-auth-user')
        localStorage.removeItem('dlc-auth-token')
      })
  }, [])

  const value = { user, isAuthenticated: Boolean(user), login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
