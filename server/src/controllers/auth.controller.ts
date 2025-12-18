import { Request, Response } from "express"
import { loginUser, registerUser } from "../services/auth.services"
import { signAccessToken, verifyRefreshToken } from "../lib/jwt";
import { prisma } from '../lib/prisma'



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
    const {email, password} = req.body ?? {}
    //console.log("Headers", req.headers)
    console.log("Body", req.body)

    if(!email || !password) {
      return res.status(400).json({
        error: "Email, username and password are required",
      });
    }

    const {user, accessToken, refreshToken} = await loginUser(email, password)

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true for prod
      path: "/auth/refresh",
    })

    res.json({user, accessToken})

  } catch (err:any) {
    if(err.message === "Incorrect password."){
      return res.status(409).json({ message: err.message })
    }
    
    console.error(err)
    res.status(500).json({ message: "Internal server error" })
  }
}

export async function refresh(req: Request, res: Response) {
  const token = req.cookies.refreshToken

  if(!token) {
    return res.sendStatus(401) //redo
  }

  try {
    const payload = verifyRefreshToken(token) as {id: string, role: string}

    const user = await prisma.user.findUnique({
      where: { id: payload.id},
      select: { id: true, email: true, username: true, role: true}
    })

    if(!user) {
      return res.sendStatus(401)
    }

    const newAccessToken = signAccessToken({
      id: payload.id,
      role: payload.role
    })

    res.json({ accessToken: newAccessToken, user})

  } catch (error) {
    res.sendStatus(403) //redo
  }

}

export function logout(req: Request, res: Response) { 
  res.clearCookie("refreshToken", {path: '/auth/refresh'})

  return res.status(200).json({ message: "Logged out" })

}