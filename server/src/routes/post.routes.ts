import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { Request, Response } from "express"
import { createPost, getPosts, getPost, deletePost } from '../controllers/post.controller'

const router = Router()

router.post("/", requireAuth, createPost)
router.get("/", getPosts)
router.get("/:id", getPost) //requireAuth
router.delete("/:id", deletePost) //requireAuth

export default router