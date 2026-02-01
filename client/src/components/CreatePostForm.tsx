
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
    <div className="flex flex-col justify-center items-center p-4 m-4">
      <div className="justify-start">
        <h1>Create Post</h1>
      </div>
      <form
        className="flex flex-col items-center gap-3 w-full "
        onSubmit={onSubmit}>

        <input 
          className="w-full border rounded-xs m-4 p-4 max-w-4xl"
          placeholder="Title" 
          value={title} 
          onChange={(e) => onTitleChange(e.target.value)}
          />
        <textarea
          className="w-full border rounded-xs m-4 p-4 max-w-4xl"
          placeholder="Content" 
          value={content} 
          onChange={(e) => onContentChange(e.target.value)}
          />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default CreatePostForm