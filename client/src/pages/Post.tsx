import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deletePost, getPost } from "../api/posts"
import type { Post } from "../types/post"
import { useAuth } from "../context/AuthContext"



function Post() {
  const {user, accessToken} = useAuth()
  const [post, setPost] = useState<Post>()
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const params = useParams()

  useEffect(() => {
    async function fetchPostById(){
      if(!params.id) {
        setError("Params id not found")
        return
      }

      try {
        const res = await getPost(params.id)
        setPost(res)
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
      }
    }
    fetchPostById()
  }, [])

    async function handleDeletePost(postId: string) {
      if(!accessToken) {
        setError("You need to be logged in to create a post.")
        return
      }
      setError("")
      try {
        await deletePost(accessToken, postId)
        navigate('/')
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e))
      }
    }

  return (
    <div>
      {!error ? (
        <div>
          <h1>{post?.title}</h1>
          <p>{post?.content}</p>
          <button
            disabled={!post?.id}
            onClick={() => post?.id && handleDeletePost(post.id)}
          >
            Delete
          </button>
        </div>
      ) :(
        <div>{error}</div>
      )}
    </div>
  )
}

export default Post
