import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User} from './interfaces/user.interface';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel:Model<User>){}

    async getUsers():Promise<User[]>{
        return await this.userModel.find();
    }
    async getUser(userID): Promise<User> {
        return await this.userModel.findById(userID);
    }
    async createUsers(createUserDTO:UserDTO): Promise<User> {
        const User = new this.userModel(createUserDTO)
        return await User.save();
    }
    async updateUsers(userID: string, updateUserDTO:UserDTO): Promise<User> {
        const update = await this.userModel.findByIdAndUpdate(userID, updateUserDTO,{new:true});
        return update;
    }
    async deleteUsers(userID): Promise<User> {
        return await this.userModel.findByIdAndDelete(userID);
      
    }
}
