import { Link } from "react-router-dom"
import type { Post } from "../../types/post"


type PostItemProps = {
  post: Post
  onDelete: (postId: string) => void
}

export default function PostItem({ post, onDelete }: PostItemProps) {

  return (
    <Link to={`/post/${post.id}`} className="no-underline">
      <div className="rounded-sm border bg-neutral-700 p-1 m-4 hover:bg-neutral-600">
        <h2 className="text-2xl font-bold">{post.title}</h2>
        <small className="text-lg">{post.content}</small>
        <p>{post.id}</p>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
    </Link>
  )
}
