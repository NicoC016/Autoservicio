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
import { AddProductListDTO } from 'src/DTO/list-products/addProductList.dto';
import { UpdateProductListDTO } from 'src/DTO/list-products/updateListProduct.dto';
import { ProductListService } from './product-list.service';

@Controller('productList')
export class ProductListController {
  constructor(private readonly productService: ProductListService) {}

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
  public async createOne(@Res() res, @Body() addProductRequest: AddProductListDTO) {
    const resp = await this.productService.createOne(addProductRequest)
    return res.status(HttpStatus.OK).json({
      HttpStatus:'OK',
      message: 'Product Successfully added',
      resp
    });
  }

  @Put('/:codebar')
  public async updateOne(
    @Param('codebar') codebar: string,
    @Body() updateProductRequest: UpdateProductListDTO,
    @Res() res
  ) {
    const resp = await this.productService.updateOne(codebar, updateProductRequest);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Delete('/:codebar')
  // @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(
    @Param('codebar') codebar: string, 
    @Res() res
  ) {
   const noteDeleted =  await this.productService.deleteOne(codebar);
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      noteDeleted
  });
  }
}
