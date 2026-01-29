import express, { NextFunction, Request, Response, Router } from 'express'
import { postController } from './post.controller';
import auth, { UserRole } from '../../middlewares/auth';
const router  = express.Router();
router.post('/' ,
 auth(UserRole.USER),
postController.createPost) 

router.get('/' ,
 auth(UserRole.USER),
postController.getAllPost) 

export const postRouter  : Router = router 