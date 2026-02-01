import { Link } from "react-router-dom"
import type { Post } from "../../types/post"
import { useAuth } from "../../context/AuthContext"


type PostItemProps = {
  post: Post
  onDelete: (postId: string) => void
}

export default function PostItem({ post, onDelete }: PostItemProps) {
  const { user } = useAuth()

  const canDelete = !!user && (user.role === "ADMIN" || user.role === "MOD" || user.id === post.authorId)

  return (
    <Link to={`/post/${post.id}`} className="no-underline">
      <div className="rounded-sm border bg-neutral-700 p-1 m-4 hover:bg-neutral-600">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <small className="text-lg">{post.content}</small>
        <p>{post.id}</p>
        {canDelete && 
          <button onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onDelete(post.id)}}
            >
              Delete
          </button>
        }
      </div>
    </Link>
  )
}
