import { useState } from "react"
import { register } from "../api/auth"
import { useNavigate } from "react-router-dom"


export default function Register() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    
    try {
      const res = await register({email, username, password})
      console.log(res)
      navigate("/login")
    } catch (err) {
      setError(err.message)
    }
  }

  
  return(
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        <input placeholder="email" onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}