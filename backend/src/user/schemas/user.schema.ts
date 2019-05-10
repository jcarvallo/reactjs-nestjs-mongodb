import { Schema} from 'mongoose';

export const UserSchema= new Schema({
     firstname: String,
     lastname: String,
     email: String,
     birthdate: String,
     createdAt: {type:Date,default:Date.now}

})