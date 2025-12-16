import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";
import { Payload } from "@prisma/client/runtime/client";

type JwtPayload = { 
  id: string,
  role: "ADMIN" | "MOD" | "USER"
}

export function requireAuth(req: Request, res: Response, next: NextFunction) { 
  const header = req.headers.authorization

  if(!header){ 
    return res.status(401).json({error: "Missing auth header."})
  }

  const [type, token] = header.split(" ")

  if(type !== "Bearer" || !token ) {
    return res.status(401).json({ error: "Invalid authorization format." });
  }

  try {
    const payload = verifyToken(token) as JwtPayload
    req.user = payload

    next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }


}