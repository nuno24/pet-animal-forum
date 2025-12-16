


export const register = async(data: {email: string, username: string, password: string}) => {
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
  if(!res.ok) {
    const err = await res.json()
    throw new Error(err.Error || "Register fail")
  }
  console.log(res)

  return res.json()

}


export const login = async (data: {email: string, password: string}) => {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })

    if(!res.ok) {
      const err = await res.json()
      throw new Error(err.Error || "Login fail")
    }

    console.log(res)

    return res.json()
}