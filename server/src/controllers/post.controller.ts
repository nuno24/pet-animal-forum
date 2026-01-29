import { Request, Response } from "express"
import * as postService from "../services/post.service"

export async function createPost(req: Request, res:Response) {
  const { title, content } = req.body
  
  if(!title || !content ) {
    return res.status(400).json({ message: "Missing fields. "})
  }
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const post = await postService.createPost(title, content, req.user!.id)

  res.status(200).json(post)
}

export async function getPosts(req: Request, res:Response) {
  const posts = await postService.getAllPosts()
  res.json(posts)
}

export async function getPost(req: Request, res:Response) {
  const post = await postService.getPostById(req.params.id)
  res.json(post)
}

export async function deletePost(req: Request, res: Response) {
  if(!req.user) return res.status(401).json({message: "Unauthorized"})

  const post = await postService.getPostById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const isOwner = post.authorId === req.user.id
  const isAdmin = req.user.role === "ADMIN"
  const isMod = req.user.role === "MOD"

  if(!isOwner && !isAdmin && !isMod) {
    return res.status(403).json({message: "Forbidden"})
  }

  await postService.deletePost(post.id);
  res.status(204).send();
}

export async function updatePost(req: Request, res: Response) {
  if(!req.user) return res.status(401).json({message: "Unauthorized"})

  const {title, content} = req.body
  if(!title || !content) {
    return res.status(400).json({message: "Fields are missing."})
  }
  
  const post = await postService.getPostById(req.params.id)
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const isOwner = post.authorId === req.user.id
  const isAdmin = req.user.role === "ADMIN"

  if(!isOwner && !isAdmin) {
    return res.status(403).json({message: "Forbidden"})
  }

  const updatedPost = await postService.updatePost(post.id, title, content)
  res.status(200).json(updatedPost)

}