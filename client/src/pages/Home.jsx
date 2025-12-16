import { useAuth } from "../context/AuthContext"

export default function Home() {
  const {user, logout} = useAuth()

  return(
    <div>
      <h1>Home</h1>
      <h2>User: {user.username}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Role: {user.role}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  )
}