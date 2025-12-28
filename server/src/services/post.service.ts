import { prisma } from '../lib/prisma'


export async function createPost( title: string, content: string, userId:string) {
  return prisma.post.create({
    data:{
      title,
      content,
      authorId: userId
    }
  })
}


export async function getAllPosts() {
  return prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          username: true
        }
      }
    },
    orderBy:{ createdAt: "desc"}
  })
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          username: true
        }
      }
    }
  })
}

export async function deletePost(id: string) {
  return prisma.post.delete({
    where: { id }
  })
}