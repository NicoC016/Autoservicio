import {
  IsBoolean,
    IsString,
    MinLength,
  } from 'class-validator';

export class UserDTO{
  @IsString()
  id:string
  @IsString()
  email:string
  
  @IsString()
  password:string;

  @IsString()
  role:string;

  @IsBoolean()
  isActive:boolean;

}