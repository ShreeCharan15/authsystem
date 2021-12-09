import jwt from 'jsonwebtoken';
import refreshTokenSchema from '../database/models/refreshTokenSchema';


async function genRefreshToken(userId:String){
    try {
        const token=jwt.sign({uid:userId}, process.env.JWTREFRESHSECRETKEY, { expiresIn: '1h' });
        await refreshTokenSchema.create({token:token, userId:userId});
        console.log("Refresh token created");
        return token;
    } catch (error) {
        throw error;
    }
}


async function revokeRefreshToken(token:string) {
    try {
        await refreshTokenSchema.deleteOne({token:token});
        console.log("Refresh token revoked");
    } catch (error) {
        throw error;
    }
}

export  {genRefreshToken, revokeRefreshToken};