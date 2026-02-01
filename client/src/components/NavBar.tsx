import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function NavBar() {
  const {user, logout} = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate("/")
  }

  return(
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-900/80 backdrop-blur">
      <div className="mx-auto flex items-center justify-between p-2">
        <Link to='/' className="text-lg font-bold">PET FORUM</Link>
        {!user ? (
          <div className="flex items-center gap-2">
            <Link to='/login'>LOGIN</Link>
            <Link to='/register'>REGISTER</Link>
          </div>
        ):(
          <div className="flex items-center gap-3">
            <Link to='/create-post'>Create</Link>
            <span className="text-xl text-neutral-200">{user.username}</span>
            <button onClick={handleLogout}>LOGOUT</button>
          </div>
        )}
      </div>
    </nav>
  )
}