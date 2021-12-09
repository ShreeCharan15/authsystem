import mongoose,{Schema} from "mongoose"
import IRefreshToken from "../../interfaces/refreshTokenInterface";

interface IRefreshTokenDocument extends IRefreshToken, mongoose.Document{}

const refreshTokenSchema = new Schema({
    token:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    userId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    }
});

// refreshTokenSchema.pre<IRefreshToken>("save", function(next) {
//     const user = this;
//     // user.password and user.username exists here.
//     next();
// })

export default mongoose.model<IRefreshTokenDocument>("RefreshToken",refreshTokenSchema);