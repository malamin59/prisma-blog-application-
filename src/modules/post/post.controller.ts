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

export const postController = {
  createPost,
};
