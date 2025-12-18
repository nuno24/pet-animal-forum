import { comparePassword, hashPassword } from '../lib/bcrypt'
import { signAccessToken, signRefreshToken } from '../lib/jwt'
import { prisma } from '../lib/prisma'


type RegisterUserData = {
  username: string
  email: string
  password: string
}

export async function registerUser(data: RegisterUserData) { 
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{email: data.email}, {username: data.username}] 
    }
  })

  if(existingUser){
    throw new Error("User already exists.")
  }

  const hashed: string = hashPassword(data.password)

  const user = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: hashed
    }
  })
  
  return user
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: {email}})

  if (!user){
    throw new Error("Invalid credentials.")
  }

  const validUser = comparePassword(password, user.password)
  if(!validUser){
    throw new Error("Incorrect password.")
  }

  const payload = {id: user.id, role: user.role}

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },

    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload)
  }

}