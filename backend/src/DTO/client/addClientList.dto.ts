import {
    IsString,
    MinLength,
  } from 'class-validator'
export class AddClientDTO {
  @IsString()
  name:string
  
  @IsString()
  @MinLength(1)
  lastName:string;

  @IsString()
  identification:string

  @IsString()
  cuil:string

  @IsString()
  birthdate:string

  @IsString()
  city:string

  @IsString()
  phoneNumber:string

}
