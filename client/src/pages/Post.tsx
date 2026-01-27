import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deletePost, getPost, updatePost } from "../api/posts"
import type { Post } from "../types/post"
import { useAuth } from "../context/AuthContext"
import { validateHeaderValue } from "http"
import { access } from "fs"



function Post() {
  const {user, accessToken} = useAuth()

  const [post, setPost] = useState<Post>()
  const [error, setError] = useState("")

  const [isUpdating, setIsUpdating] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [ediContent, setEditContent] = useState("")

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
  },[])

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

  function handleStartEdit() {
    if(!post) return
    setEditTitle(post.title)
    setEditContent(post.content)
    setIsUpdating(true)
  }

  function handleCancelEdit() {
    setIsUpdating(false)
    setError("")
  }

  async function handleSubmitUpdate(e: React.FormEvent) {
    e.preventDefault()

    if(!accessToken){
      setError("No user is Logged in")
      return
    }

    if(!post) {
      return
    }

    try {
      const updated = await updatePost(accessToken, post.id, {
        title: editTitle,
        content: ediContent
      })
      console.log(updated)
      setPost(updated)
      setIsUpdating(false)
    } catch (e) {
      setError(e instanceof Error ? e.message: String(e))
    }
  }

  if(error) return <div>{error}</div>
  if(!post) return <div>Loading...</div>

  return (
    <div>
      {!isUpdating ? (
        <div>
          <h1>{post?.title}</h1>
          <p>{post?.content}</p>
          <button
            disabled={!accessToken}
            onClick={() => post?.id && handleDeletePost(post.id)}
          >
            Delete
          </button>
          <button onClick={handleStartEdit}>Edit</button>
        </div>
      ) :(
        <form onSubmit={handleSubmitUpdate}>
          <input 
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={ediContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelEdit}>Cancel</button>
        </form>
      )}
    </div>
  )
}

export default Post
