import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Post from './pages/Post'
import CreatePost from './pages/CreatePost'

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/create-post' element={<CreatePost />}/>
        <Route path='/post/:id' element={<Post />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
