import mongoose from 'mongoose';
interface IUser {
    email: string,
    emailVerified?: boolean,
    googleId?: string,
    profile:{
        name: string,
        pic?: string,
        bio?: string,
    },
    ip?:[string],
}
export default IUser;