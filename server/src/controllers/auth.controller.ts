import { Request, Response } from "express"
import { registerUser } from "../services/auth.services"

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