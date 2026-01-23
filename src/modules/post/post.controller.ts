import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(req.body);

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
