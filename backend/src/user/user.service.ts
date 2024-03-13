import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserDTO } from 'src/DTO/user/user.dto';
import { AddUserDTO } from 'src/DTO/user/addUser.dto';
import { UpdateUserDTO } from 'src/DTO/user/updateUser.dto';
import {AuthenticateOptions} from 'passport'
import { UserFindDTO } from 'src/DTO/user/user.login';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async createOne(addUserRequest: AddUserDTO) {
    const user = new User();
    user.email = addUserRequest.email;
    user.password = addUserRequest.password;
    user.role = addUserRequest.role;
    user.isActive = addUserRequest.isActive;
    await this.userRepository.save(user);

    const userDTO = this.entityToDTO(user);

    return userDTO;
  }

  public async getOne(email) {
    const user: User = await this.userRepository.findOne({
      where: {
        id: email,
      },
    });
    if (!user) {
      throw new NotFoundException(` El Usuario no existe`);
    }

    const userDTO: UserDTO = this.entityToDTO(user);
    return userDTO;
  }

  async findOne(userInput: UserFindDTO): Promise<User> {
    let users:UserDTO[] = await this.getAll();
    let userFind =  users.find(user => user.email === userInput.email);
    console.log(userFind, userInput)
    return userFind;
  }

  private entityToDTO(user: User): UserDTO {
    const userNew = new User();
    userNew.email = user.email;
    userNew.password = user.password;
    userNew.role = user.role;
    userNew.isActive = user.isActive;
    return userNew;
  }

  public async getAll() {
    const user: User[] = await this.userRepository.find();

    const userDTO: UserDTO[] = user.map((x) => this.entityToDTO(x));

    return userDTO;
  }

  public async updateOne(userId: string, updateUserRequest: UpdateUserDTO) {

    const user: User = await this.getOne(userId);;
    user.email = updateUserRequest.email;
    user.password = updateUserRequest.password;
    user.role = updateUserRequest.role;
    user.isActive = updateUserRequest.isActive;

    //actualizamos y guardamos la tarea
    await this.userRepository.save(user);

    //Retornamos la tarea formato dto
    const userDTO: UserDTO = await this.entityToDTO(user);

    return userDTO;
  }

  public async deleteOne(userId: string) {
    //buscamos la tarea por id
    const user: User = await this.getOne(userId);

    //eliminamos la tarea por
    await this.userRepository.remove(user);
  }
}
