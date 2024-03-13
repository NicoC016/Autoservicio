import {
    IsString,
    MinLength,
  } from 'class-validator';

export class EmployeeDTO{
  @IsString()
  id:string

  @IsString()
  name:string
  
  @IsString()
  @MinLength(1)
  lastName:string;

  @IsString()
  identification:string;

  @IsString()
  birthdate:string;

  @IsString()
  city:string;

  @IsString()
  phoneNumber:string;
}