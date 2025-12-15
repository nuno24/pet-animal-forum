import { Request, Response } from "express"
import { loginUser, registerUser } from "../services/auth.services"

export async function register( req: Request, res: Response) {
  try{
  const {email, username, password} = req.body

  if (!email || !username || !password) {
    return res.status(400).json({
      error: "Email, username and password are required",
    });
  }

  console.log(req.body)

  const user = await registerUser({email, username, password})

  res.status(201).json({
    id: user.id,
    email: user.email,
    username: user.username,
  })

  }catch (err: any) {
    if (err.message === "User already exists.") {
      return res.status(409).json({ message: err.message })
    }

    console.error(err)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const {email, password} = req.body
    console.log(req.body)

    if(!email || !password) {
      return res.status(400).json({
        error: "Email, username and password are required",
      });
    }

    const {user, token} = await loginUser(email, password)

    res.status(201).json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (err:any) {
    if(err.message === "Incorrect password."){
      return res.status(409).json({ message: err.message })
    }
    
    console.error(err)
    res.status(500).json({ message: "Internal server error" })
  }


}