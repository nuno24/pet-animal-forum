import type { Post } from "../../types/post"
import PostItem from "./PostItem"

type PostListProps = {
  posts: Post[]
  emptyText?: string
  onDelete: (postId: string) => void | Promise<void>
}

export default function PostList({ posts, onDelete, emptyText = "No posts." }: PostListProps) {
  if (posts.length === 0) return <h2>{emptyText}</h2>

  return (
    <ul>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={onDelete}/>
      ))}
    </ul>
  )
}
