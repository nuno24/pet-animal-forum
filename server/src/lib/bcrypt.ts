import bcrypt from "bcryptjs"

const saltRounds = 10 

export const hashPassword = (password : string): string => {
  return bcrypt.hashSync(password, saltRounds)
}

export const comparePassword = (password : string, hashedPassword : string) => {
  bcrypt.compareSync(password, hashedPassword) 
}