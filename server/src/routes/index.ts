import { Router } from "express";
import authRoutes from "../routes/auth.routes"
import postRoutes from "../routes/post.routes"

const router = Router()

router.use('/auth', authRoutes)
router.use('/posts', postRoutes)

export default router