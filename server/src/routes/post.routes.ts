import Router from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { Request, Response } from "express"
import { createPost, getPosts, deletePost } from '../controllers/post.controller'

const router = Router()

router.post("/", requireAuth, createPost)
router.get("/", getPosts)
router.get("/:id", getPosts)
router.post("/:id", deletePost)

export default router