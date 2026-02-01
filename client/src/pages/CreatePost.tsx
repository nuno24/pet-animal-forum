import React, { useState } from 'react'
import CreatePostForm from '../components/CreatePostForm'
import { createPost, getPosts } from '../api/posts'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function CreatePost() {
  const {user, accessToken, logout} = useAuth()
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if(!accessToken) {
      setError("You need to be logged in to create a post.")
      return
    }
    setError("")

    try {
      const res = await createPost(accessToken, {title, content})
      setTitle("")
      setContent("")
      console.log(res)
      navigate('/')
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    }
  }

  return (
    <div className='items-center justify-items-normal justify-between'>
      <h1>Create Post</h1>
      <CreatePostForm 
        title={title}
        content={content}
        onTitleChange={setTitle}
        onContentChange={setContent}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default CreatePost
