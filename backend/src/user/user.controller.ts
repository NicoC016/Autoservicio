import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AddUserDTO } from 'src/DTO/user/addUser.dto';
import { UpdateUserDTO } from 'src/DTO/user/updateUser.dto';
import { UserFindDTO } from 'src/DTO/user/user.login';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, public authSvc:AuthService) {}

  @Get()
  public async getAll(@Res() res) {
    const resp = await this.userService.getAll();
    return res.status(HttpStatus.OK).json(resp);
  }

  @Get('/:id')
  public async getOne(@Res()res, @Param('id') id: string) {
    const resp = await this.userService.getOne(id);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Post()
  public async createOne(@Res() res, @Body() addUserRequest: AddUserDTO) {
    const resp = await this.userService.createOne(addUserRequest)
    return res.status(HttpStatus.OK).json({
      HttpStatus:'OK',
      message: 'User Successfully Created',
      resp
    });
  }

  @Post('/login')
  public async findUser(@Res() res, @Body() addUserRequest: UserFindDTO) {
    const resp = await this.authSvc.validateUser(addUserRequest.email, addUserRequest.password);
    console.log(resp)
    if(resp === null){
      return res.status(HttpStatus.NOT_FOUND).json({
        HttpStatus:'Error',
        message: 'Usuario no existente'
      });
    }
    return res.status(HttpStatus.OK).json({
      HttpStatus:'OK',
      message: 'User login OK',
      resp
    });
  }

  @Put('/:id')
  public async updateOne(
    @Param('id') id: string,
    @Body() updateUserRequest: UpdateUserDTO,
    @Res() res
  ) {
    const resp = await this.userService.updateOne(id, updateUserRequest);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('id') id: string, @Res() res) {
   const noteDeleted =  await this.userService.deleteOne(id);
    return res.status(HttpStatus.OK).json({
      message: 'User Deleted Successfully',
      noteDeleted
  });
  }
}
