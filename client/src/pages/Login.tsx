import { useState } from "react"
import { login } from "../api/auth"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const {loginContext} = useAuth()
  const navigate = useNavigate()


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    
    try {
      const res = await login({email, password})
      loginContext(res.accessToken, res.user)
      console.log(res)
      navigate("/")
    } catch (err) {
      setError(err.message)
    }
  }

  
  return(
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}