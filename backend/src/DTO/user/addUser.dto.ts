import {
  IsBoolean,
  IsString,
  } from 'class-validator'
export class AddUserDTO {
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
