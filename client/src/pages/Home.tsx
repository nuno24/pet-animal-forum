import { useAuth } from "../context/AuthContext"
import { getPosts, deletePost } from "../api/posts"
import { useEffect, useState } from "react"
import PostList from "../components/posts/PostList"
import type { Post } from "../types/post"

export default function Home() {
  const {user, accessToken} = useAuth()
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState("")

  async function fetchAllPosts() {
    const data = await getPosts()
    setPosts(data as Post[])
    console.log(data)
  }

  useEffect(() => {
    (async () => {
      try{
        await fetchAllPosts()
      }catch(e){
        setError(e instanceof Error ? e.message : String(e))
      }
    })();
  }, [])

  async function handleDeletePost(postId: string) {
    if(!accessToken) {
      setError("You need to be logged in to create a post.")
      return
    }
    setError("")
    try {
      await deletePost(accessToken, postId)
      setPosts((prev) => prev.filter((post) => post.id !== postId))
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
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
          </div>
        </div>
      )
      }

      <div>
          <div>
            {error && <h2>{error}</h2>}

            {!error && (
              <PostList posts={posts} onDelete={handleDeletePost}/>
            )}
          </div>
      </div>


    </div>
  )
}