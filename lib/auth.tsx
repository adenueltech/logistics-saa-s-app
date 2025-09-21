"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  company: string
  role: "admin" | "manager" | "driver"
  avatar?: string
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; error?: string }>
}

export interface SignupData {
  firstName: string
  lastName: string
  email: string
  company: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("fleetflow_token")
        if (token) {
          // In a real app, validate token with backend
          const userData = localStorage.getItem("fleetflow_user")
          if (userData) {
            setUser(JSON.parse(userData))
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("fleetflow_token")
        localStorage.removeItem("fleetflow_user")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)

      // Simulate API call - replace with real authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - replace with real API response
      const mockUser: User = {
        id: "1",
        email,
        firstName: "John",
        lastName: "Doe",
        company: "Demo Logistics",
        role: "admin",
        createdAt: new Date().toISOString(),
      }

      // Store auth data
      localStorage.setItem("fleetflow_token", "mock_jwt_token")
      localStorage.setItem("fleetflow_user", JSON.stringify(mockUser))

      setUser(mockUser)
      return { success: true }
    } catch (error) {
      return { success: false, error: "Invalid credentials" }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (userData: SignupData) => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        company: userData.company,
        role: "manager",
        createdAt: new Date().toISOString(),
      }

      // Store auth data
      localStorage.setItem("fleetflow_token", "mock_jwt_token")
      localStorage.setItem("fleetflow_user", JSON.stringify(newUser))

      setUser(newUser)
      return { success: true }
    } catch (error) {
      return { success: false, error: "Registration failed" }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("fleetflow_token")
    localStorage.removeItem("fleetflow_user")
    setUser(null)
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) return { success: false, error: "Not authenticated" }

      const updatedUser = { ...user, ...data }
      localStorage.setItem("fleetflow_user", JSON.stringify(updatedUser))
      setUser(updatedUser)

      return { success: true }
    } catch (error) {
      return { success: false, error: "Update failed" }
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
