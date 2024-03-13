import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entity/user.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthService],
  imports:[TypeOrmModule.forFeature([User])]
})
export class UserModule {}
