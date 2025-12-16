import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string
  email: string
  username: string
  role: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  loginContext: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if(storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  function loginContext(token: string, user: User) {
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))
    setToken(token)
    setUser(user)
  }

  function logout() {
    localStorage.clear()
    setToken(null)
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{user, token, loginContext, logout}}>
      {children}
    </AuthContext.Provider>
  )

}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if(!ctx) {
    throw new Error("useAuth must be inside AuthProvider")
  }
  return ctx
}