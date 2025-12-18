import Router from "express"
import { login, refresh, register, logout } from "../controllers/auth.controller"
import { requireAuth } from "../middleware/auth.middleware"
import { Request, Response } from "express"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/refresh", refresh)
router.post("/logout", logout)
router.get("/what", requireAuth, (req: Request, res: Response) => {
  res.json({
    message:"Authenticated",
    user: req.user
  })
})

export default router