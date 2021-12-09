import mongoose from 'mongoose';

interface IRefreshToken {
    token: string,
    userId: string
}

export default IRefreshToken;