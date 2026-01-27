import { Post } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (data : Omit<Post, 'id' |  'createAt' | 
  'updateAt' | 'authorId' >, useId: string ) =>{
const result = await prisma.post.create({
  data :{
    ...data,
    authorId : useId
  }
})
return result
}

export const postService = {
    createPost
}