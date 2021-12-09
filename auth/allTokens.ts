import jwt from 'jsonwebtoken';
import refreshTokenSchema from '../database/models/refreshTokenSchema';
import JwtPayload from '../interfaces/jwtInterface';
import { genNormalAccessToken } from './accessToken';
import { genRefreshToken } from './refreshToken';
async function refreshAllTokens(refreshToken:string) {
    try {
        const decoded=jwt.verify(refreshToken,process.env.JWTREFRESHSECRETKEY) as JwtPayload
        if(decoded) {
            console.log(decoded.userId);
            const refreshData=await refreshTokenSchema.findOneAndDelete({token:refreshToken}) 
            if(refreshData) {
                console.log(refreshData);
                const ref=await genRefreshToken(decoded.userId)
                const accessToken=await genNormalAccessToken(decoded.userId)
                return {refreshToken:ref,accessToken:accessToken};    
            }
            else{
                throw new Error('Refresh token does not exist');
            } 
        } 
        else {
            throw new Error('Invalid Refresh Token');
        }
    }catch (error) {
        throw(error);
    }
}

export default refreshAllTokens;