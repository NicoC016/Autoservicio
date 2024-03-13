import {
    IsString,
    MinLength,
  } from 'class-validator'
export class AddSupplierDTO {
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
