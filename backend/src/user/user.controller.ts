import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';

import { UserService } from './user.service';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('/')
    async getAll(@Res() res){
        const user= await this.userService.getUsers()
        return res.status(HttpStatus.OK).json(user)
    }
    @Get('/:userID')
    async getById(@Res() res, @Param('userID') userID) {
        const users = await this.userService.getUser(userID)
        if (!users) throw new NotFoundException('user does not exist');
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('/create')
    async create(@Res() res, @Body() createUserDTO: UserDTO) {
        const createUser = await this.userService.createUsers(createUserDTO)
        return res.status(HttpStatus.OK).json({
            messeger: 'Created User',
            data:createUser
        })
    }

    @Put('/update')
    async update(@Res() res, @Body() updateUserDTO: UserDTO, @Query('userID') userID){
        const updateUser= await this.userService.updateUsers(userID,updateUserDTO)
        if (!updateUser) throw new NotFoundException('user does not exist');
        return res.status(HttpStatus.OK).json({ messeger:'Edited User',updateUser});
    }

    @Delete('/delete')
    async delete(@Res() res, @Query('userID') userID){
        const deleteUser= await this.userService.deleteUsers(userID);
        if (!deleteUser) throw new NotFoundException('user does not exist');
        return res.status(HttpStatus.OK).json({ messeger: 'Deleted User', deleteUser });

    }
}
