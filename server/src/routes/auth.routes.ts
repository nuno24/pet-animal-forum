import Router from "express"
import { login, register } from "../controllers/auth.controller"
import { requireAuth } from "../middleware/auth.middleware"
import { Request, Response } from "express"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/what", requireAuth, (req: Request, res: Response) => {
  res.json({
    message:"Authenticated",
    user: req.user
  })
})

export default router