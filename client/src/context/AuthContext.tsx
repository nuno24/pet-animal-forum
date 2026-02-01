import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string
  email: string
  username: string
  role: "ADMIN" | "MOD" | "USER"
}

type AuthContextType = {
  user: User | null
  accessToken: string | null
  loginContext: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)

  useEffect(() => {
    fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      credentials: "include",
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.accessToken) {
          setUser(data.user)
          setAccessToken(data.accessToken)
        }
      })
  }, [])

  function loginContext(token: string, user: User) {
    setAccessToken(token)
    setUser(user)
  }

  async function logout() {
    await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    })
    setAccessToken(null)
    setUser(null)
  }

  return(
    <AuthContext.Provider value={{user, accessToken, loginContext, logout}}>
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