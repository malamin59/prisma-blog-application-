import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const user= req.user 
    if(!user){
      return  res.status(400).json({
         error: "Unauthorize!"
      })
    }
    console.log(req.user)
    const result = await postService.createPost(req.body, user.id as string);

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error: any) {
    console.error("Create post error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE A GET APT ( APPLICATION PROGRAMMING INTERFACE) FOR GET THE ALL DATA 
const getAllPost  = async(req: Request , res: Response) =>{
try {
  const {search} = req.query
  const searchString = typeof search === 'string' ? search : undefined
  const tags = req.query.tags ? (req.query.tags as string).split(',') : [];
  const isFeature = req.query.isFeature ? req.query.isFeature === 'true' : false
  console.log( "isFeature value is here",{isFeature})
  const result = await postService.getAllPost({search: searchString, tags , isFeature});
  console.log("search value :" , search)
  res.status(200).json(result)


} catch (e) {
  res.status(400).json({
    error:"Something went wrong",
    details: e
  })
} 

}

export const postController = {
  createPost,
  getAllPost
};
