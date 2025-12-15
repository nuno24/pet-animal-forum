import bcrypt from "bcryptjs"
import { BlockList } from "node:net"

const saltRounds = 10 

export const hashPassword = (password : string): string => {
  return bcrypt.hashSync(password, saltRounds)
}

export const comparePassword = (password : string, hashedPassword : string): boolean => {
  return bcrypt.compareSync(password, hashedPassword) 
}