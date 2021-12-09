import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import errorhandler from 'errorhandler';
import connect from './database/connector';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import http from "http"
import https from "https"
import authRouter from './routes/authRoute';
// import { createServer } from 'http';
// import IUser from './interfaces/userInterFace';
// import { createUser, login, logout } from './auth/user';
// import jwt from 'jsonwebtoken';
// import refreshAllTokens from './auth/allTokens';
// import refreshTokenSchema from './database/models/refreshTokenSchema';
const result= dotenv.config();
if (result.error) {
    throw result.error
}
  
console.log(result.parsed)
const app=express();

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(errorhandler())
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(morgan('dev'));
app.use(compression());
app.use(cors());
connect().then(async() => {
    console.log('Connected to database');
    const server= http.createServer(app);
    server.listen(80,()=>{
        console.log('server running on: '+80)
    });
    app.use("/auth",authRouter);
    app.get('*', function(req, res){
        res.status(404).send('Sorry, cant find that');
      });

})
.catch(err => {
    console.log(err);
})
