import {
    IsString,
    MinLength,
  } from 'class-validator'
export class AddProductDTO {
  @IsString()
  name:string
  
  @IsString()
  @MinLength(1)
  codebar:string;

  @IsString()
  brand:string

  @IsString()
  category:string

  @IsString()
  price:string
  
  @IsString()
  image:string

  @IsString()
  weight:string

  @IsString()
  unity:string
}
