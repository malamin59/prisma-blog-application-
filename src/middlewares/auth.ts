import {auth as betterAuth} from '../lib/auth'
import  { NextFunction, Request, Response} from 'express'


export enum UserRole {
USER = "USER",
ADMIN  = "ADMIN"
}

declare global {
    namespace Express {
        interface Request{
            user?: {
      id: string;
      name : string;
      email: string;
      role: string;
      emailVerified : boolean
            }
        }
    }
}

const auth =(...roles : UserRole[] )=>{
return async (req : Request, res: Response, next: NextFunction) =>{
try {
    //    get user session 
const session =  await betterAuth.api.getSession({
    headers : req.headers as any
})
if(!session) {
    return res.send(401).json({
        success: false,
        message :"your are not authorize!!"
    })
}

if(!session.user.emailVerified) {
   return res.send(403).json({
        success: false,
        message :"email verification required! please verify your email"
    }) 
}

req.user = {
    id: session.user.id, 
    email : session.user.email,
    name : session.user.name,
    role : session.user.role as string ,
    emailVerified : session.user.emailVerified,
    
}



if(roles.length && ! roles.includes(req.user.role as UserRole)){
     return res.send(403).json({
        success: false,
        message :"Forbidden! you don't have permission to access this resources"
    }) 
}

next()
} catch (err) {
    next(err)
}


}


}


export default auth