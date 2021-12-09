import jwt from 'jsonwebtoken';
import userSchema from '../database/models/userSchema';

async function genNormalAccessToken(userId:string){
    const data=await userSchema.findById(userId);
    if(!data){
        throw new Error('User not found');
    }
    console.log(data.profile);
    return jwt.sign(data.toJSON(), process.env.JWTSECRETKEY, { expiresIn: '1h' });
}

async function genShortAccessToken(userId:string){
    const data=await userSchema.findById(userId);
    if(!data){
        throw new Error('User not found');
    }
    return jwt.sign(data.profile, process.env.JWTSECRETKEY, { expiresIn: 900 });
}

export { genNormalAccessToken,genShortAccessToken };