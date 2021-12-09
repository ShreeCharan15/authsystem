import mongoose,{Schema,PassportLocalSchema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import IUser from '../../interfaces/userInterFace';
interface IUserDocument extends IUser, mongoose.Document{
    password: string,
}

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:1,
        maxlength:255,
    },
    emailVerified:{
        type:Boolean,
        default:false,
    },
    ip:[String],
    googleId:{
        type:String,
        required:false,
        unique:true,
        trim:true,
        default:null,
    },

    profile:{
        name:{
            type:String,
            required:true,
            trim:true,
            minlength:1,
            maxlength:255,
        },
        pic:{
            type:String,
            required:false,
            trim:true,
            default:null,
        },
        bio:{
            type:String,
            required:false,
            trim:true,
            default:null,
        },

    }

});

UserSchema.plugin(passportLocalMongoose,{usernameField:'email'});
export default mongoose.model<IUserDocument>('User',UserSchema as PassportLocalSchema);