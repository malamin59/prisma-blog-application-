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

// CREATE A GET API
const getAllPost  = async (payload : 
  { search?  : string | undefined
    tags? :string[] |undefined
  }) =>{
  const result = await prisma.post.findMany({
    where: {
    AND:[
      { OR:[
       { title : {
        contains :payload.search as string,
        mode: "insensitive"
      }},
      {content: {
        contains :payload.search as string,
        mode: "insensitive"
      }},
      {
        tags: {
          has: payload.search as string
        }
      }
    ],},


    {tags: {
      hasEvery : payload.tags as string[]
    }}

    
    ]
    }
  });
  return result
}


export const postService = {
    createPost,
    getAllPost
}