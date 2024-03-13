import {
    IsString,
    MinLength,
  } from 'class-validator';

export class SuppliersDTO{
  @IsString()
  id:string
  @IsString()
  name:string
  
  @IsString()
  categoryAfip:string;

  @IsString()
  categoryProducts:string;

  @IsString()
  city:string;

  @IsString()
  cuit:string;

  @IsString()
  phoneNumber:string;
}