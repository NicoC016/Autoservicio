import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { AddProductDTO } from 'src/DTO/products/addProduct.dto';
import { UpdateProductDTO } from 'src/DTO/products/updateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getAll(@Res() res) {
      const resp = await this.productService.getAll()
      return res.status(HttpStatus.OK).json(resp);
  }

  @Get('/:codebar')
  public async getOne(@Res()res, @Param('codebar') codebar: string) {
    const resp = await this.productService.getOne(codebar);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Post()
  public async createOne(@Res() res, @Body() addProductRequest: AddProductDTO) {
    const resp = await this.productService.createOne(addProductRequest)
    return res.status(HttpStatus.OK).json({
      HttpStatus:'OK',
      message: 'Product Successfully Created',
      resp
    });
  }

  @Put('/:codebar')
  public async updateOne(
    @Param('codebar') codebar: string,
    @Body() updateProductRequest: UpdateProductDTO,
    @Res() res
  ) {
    const resp = await this.productService.updateOne(codebar, updateProductRequest);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Delete('/:codebar')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('codebar') codebar: string, @Res() res) {
   const noteDeleted =  await this.productService.deleteOne(codebar);
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      noteDeleted
  });
  }
}
