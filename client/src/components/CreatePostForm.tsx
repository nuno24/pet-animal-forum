
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
    <div className="flex justify-center items-center border p-4 m-4">
      <form
        className="flex flex-col items-center gap-3 w-full max-w-md"
        onSubmit={onSubmit}>

        <input 
          className="w-full"
          placeholder="Title" 
          value={title} 
          onChange={(e) => onTitleChange(e.target.value)}
          />
        <textarea
          className="w-full"
          placeholder="Content" 
          value={content} 
          onChange={(e) => onContentChange(e.target.value)}/>
        <button type="submit">Post</button>
      </form>
    </div>
  )
}

export default CreatePostForm