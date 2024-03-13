import {
      IsString,
    } from 'class-validator';
  
  export class UserFindDTO{
    @IsString()
    email:string
    
    @IsString()
    password:string;
}