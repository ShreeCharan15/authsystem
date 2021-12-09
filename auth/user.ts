import UserSchema from "../database/models/userSchema";
import IUser from "../interfaces/userInterFace";
import passport from "passport";
import { genRefreshToken, revokeRefreshToken } from "./refreshToken";
import refreshTokenSchema from "../database/models/refreshTokenSchema";
import { genNormalAccessToken } from "./accessToken";
async function createUser(userData:IUser,password:string){
    try {
        const user=await UserSchema.register(new UserSchema({...userData}),password)
        console.log("User"+user._id+" Created");
        const ref=await genRefreshToken(user._id);
        const at=await genNormalAccessToken(user._id);
        return {user:getDetails(user),refreshToken:ref,accessToken:at};
    } catch (error) {
        console.log(error.name);
        if(error.name==="MissingUsernameError" || error.name==="MissingPasswordError" || error.name==="ValidationError")
        throw ({status:400,message:"Invalid data"});
        else if (error.name==="UserExistsError")
        throw ({status:409,message:"User already exists"});
        throw error;
    }
}

async function login(email:string){
    try {
        const u=await UserSchema.findOne({email:email});
        genRefreshToken(u._id);
    } catch (error) {
        throw error;
    }
    
}

async function logout(email:string){
    try {
        const u=await UserSchema.findOne({email:email});
        const r=await refreshTokenSchema.findOne({userId:u._id});
        revokeRefreshToken(r.token);
    } catch (error) {
        throw error;
    }
}


function getDetails(user:any){
    console.log(user);
    return {...user.profile,email:user.email,id:user._id,emailVerified:user.emailVerified};
}
export {createUser,login,logout}; 