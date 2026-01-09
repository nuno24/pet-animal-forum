import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { getPosts, createPost } from "../api/posts"
import { useEffect, useState } from "react"
import CreatePostForm from "../components/CreatePostForm"

export default function Home() {
  const {user, accessToken, logout} = useAuth()
  const [posts, setPosts] = useState([])
  const [error, setError] = useState("")

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const navigate = useNavigate()

  async function fetchAllPosts() {
    const data = await getPosts()
    setPosts(data)
    console.log(data)
  }
  useEffect(() => {
    (async () => {
      try{
      await fetchAllPosts()
    }catch(e){
      setError(e)
    }
    })();
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if(!accessToken) {
      setError("You need to be logged in to create a post.")
      return
    }
    setError("")

    try {
      const res = await createPost(accessToken, {title, content})
      setTitle("")
      setContent("")
      await fetchAllPosts()
      console.log(res)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return(
    <div>
      <h1>Home</h1>
      {(!user) ? (
        <h2>No user</h2>
      ) : (
        <div>
          <div>
            <h2>User: {user.username}</h2>
            <h2>Email: {user.email}</h2>
            <h2>Role: {user.role}</h2>
            <h2>ID: {user.id}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>

        <CreatePostForm 
          title={title}
          content={content}
          onTitleChange={setTitle}
          onContentChange={setContent}
          onSubmit={handleSubmit}
        />
        </div>
      )
      }

      <div>
        {error && <h2>{error}</h2>}

        {!error && posts.length === 0 ? (
          <h2>No posts.</h2>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <small>{post.content}</small>
              </li>
            ))}
          </ul>
        )
      }
      </div>


    </div>
  )
}