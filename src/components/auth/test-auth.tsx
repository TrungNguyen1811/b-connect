import { createContext, useEffect, useState } from 'react'
import { User } from '../../types'

export type LoginProps = {
  user: User
  token: string
}
export interface AuthContextType {
  user: User | null
  login: (data: LoginProps) => void
  logout: () => void
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = ({ user, token }: LoginProps) => {
    setUser(user)

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const authContextValue: AuthContextType = {
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>
}
