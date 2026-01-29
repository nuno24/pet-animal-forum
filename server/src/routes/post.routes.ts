import { Router } from "express"
import { requireAuth } from "../middleware/auth.middleware"
import { Request, Response } from "express"
import { createPost, getPosts, getPost, deletePost, updatePost } from '../controllers/post.controller'

const router = Router()

router.post("/", requireAuth, createPost)
router.get("/", getPosts)
router.get("/:id", getPost) //requireAuth // getPostById
router.delete("/:id", requireAuth, deletePost)
router.put("/:id", requireAuth, updatePost)

export default router