import type { Post } from "../../types/post"

type PostItemProps = {
  post: Post
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <li>
      <h2>{post.title}</h2>
      <small>{post.content}</small>
    </li>
  )
}
