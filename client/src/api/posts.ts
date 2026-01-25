export const getPosts = async() => {
  const res = await fetch("http://localhost:3000/posts/", {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  })
  if(!res.ok) {
    const err = await res.json()
    throw new Error(err.Error || "getPosts fail")
  }
  console.log(res)

  return res.json()
}

export const createPost = async (token: string,data: {title: string, content: string}) => {
    const res = await fetch("http://localhost:3000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    if(!res.ok) {
      const err = await res.json()
      throw new Error(err.Error || "createPost fail")
    }

    console.log(res)

    return res.json()
}

export const deletePost = async (id:string) => {
  const res = await fetch(`http://localhost:3000/posts/${id}`, {
    method: "DELETE"
  })

  if(!res.ok) {
    const err = await res.json()
    throw new Error(err.Error || "deletePost fail")
  }
}