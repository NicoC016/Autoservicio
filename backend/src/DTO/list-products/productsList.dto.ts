import {
    IsString,
    MinLength,
  } from 'class-validator';

export class ProductListDTO{
  @IsString()
  id:string;

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
  quantity:string
}