import { Post } from "../../../generated/prisma/client";
import { PostWhereInput } from "../../../generated/prisma/models";
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
const getAllPost  = async ({
  search, 
  tags,
  isFeature
} : 
  { search  : string | undefined,
    tags :string[] | [],
    isFeature :boolean
  }) =>{
    const andConditions:PostWhereInput[] = [];
    if(search){
   andConditions.push({ OR:[
       { title : {
        contains :search,
        mode: "insensitive"
      }},
      {content: {
        contains :search,
        mode: "insensitive"
      }},
      {
        tags: {
          has:search
        }
      }
    ],},)
    }

      if (tags.length > 0) {
  andConditions.push({tags:
           {
      hasEvery : tags as string[]
    }
  }
)
}

if(typeof isFeature === 'boolean') {
    andConditions.push({
      isFeature
    })
}
     
  const result = await prisma.post.findMany({
    where: {
    AND: andConditions
    }
  });
  return result
}


export const postService = {
    createPost,
    getAllPost
}