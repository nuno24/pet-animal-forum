import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const {user, logout} = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout
    navigate("/login")
  }

  return(
    <div>
      <h1>Home</h1>
      <h2>User: {user.username}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Role: {user.role}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}