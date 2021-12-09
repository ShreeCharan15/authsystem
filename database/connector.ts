import Mongoose from 'mongoose';
const connect=()=>{    
    const server='localhost:27017';
    const database='authsystem';
    return Mongoose.connect(`mongodb://${server}/${database}`)
}

export default connect;