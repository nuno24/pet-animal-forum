
type Props = {
  title: string
  content: string
  onTitleChange: (value: string) => void
  onContentChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

const CreatePostForm = (
  {
    title,
    content, 
    onTitleChange,
    onContentChange,
    onSubmit
  }: Props
) => {


  return(
    <div>
      <form onSubmit={onSubmit}>
        <input placeholder="Title" value={title} onChange={(e) => onTitleChange(e.target.value)}/>
        <input placeholder="Content" value={content} onChange={(e) => onContentChange(e.target.value)}/>
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default CreatePostForm