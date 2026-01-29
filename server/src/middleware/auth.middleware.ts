import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../lib/jwt";
import { Role } from "@prisma/client";

type JwtPayload = { 
  id: string,
  role: Role
}

export function requireAuth(req: Request, res: Response, next: NextFunction) { 
  const header = req.headers.authorization

  if(!header){ 
    return res.status(401).json({message: "Missing auth header."})
  }

  const [type, token] = header.split(" ")

  if(type !== "Bearer" || !token ) {
    return res.status(401).json({ message: "Invalid authorization format." });
  }

  try {
    const payload = verifyAccessToken(token) as JwtPayload
    req.user = payload

    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }


}