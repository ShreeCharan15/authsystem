import cors,{CorsOptions} from 'cors';
import { Request } from 'express';

const whitelist=['http://localhost:3000','http://localhost:5000','http://localhost:4000'];


const customCors=(req:Request,callback: (arg0: any, arg1: CorsOptions) => void)=>{
    const corsOptions: CorsOptions={};
    if(whitelist.indexOf(req.header('Origin'))!==-1){
        corsOptions.origin=true;
    }else{
        corsOptions.origin=false;
    }
    callback(null,corsOptions);
} 
const cc= cors(customCors);
export default cc;