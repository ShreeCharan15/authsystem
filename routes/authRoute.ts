import express,{Router,Request,Response,NextFunction} from 'express';
import customCors from '../cors';
import passport from 'passport';
import IUser from '../interfaces/userInterFace';
import { createUser } from '../auth/user';
const authRouter:Router = express.Router();

authRouter.route('/create')
// .options(
//     (customCors as any),(req,res)=>{res.sendStatus=(code:200)}
// )

.post(customCors,async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const body=req.body;
        const us: IUser = {
                email: body.email,
                emailVerified:false,
                profile: {
                    name: body.name,
                }
            }
        if(body.googleId){
            us.googleId=body.googleId;
        }
        if(body.pic){
            us.profile.pic=body.pic;
        }
        if(body.bio){
            us.profile.bio=body.bio;
        }
        const details=await createUser(us,body.password);
        res.status(200).json(details);
    } catch (error) {
        const st=error.status||500;
        const message=error.message||'We could not create your account';
        res.status(st).json({error:message});
        console.log(error);
    }
        
})

export default authRouter;