import { hashPassword } from '../lib/bcrypt'
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