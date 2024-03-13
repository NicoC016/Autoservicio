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

import { SupplierService } from './suppliers.service';
import { AddSupplierDTO } from 'src/DTO/suppliers/addSupplier.dto';
import { UpdateSuppliersDTO } from 'src/DTO/suppliers/updateSupplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  public async getAll(@Res() res) {
      const resp = await this.supplierService.getAll()
      return res.status(HttpStatus.OK).json(resp);
  }

  @Get('/:id')
  public async getOne(@Res()res, @Param('id') id: string) {
    const resp = await this.supplierService.getOne(id);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Post()
  public async createOne(@Res() res, @Body() addSuppliersRequest: AddSupplierDTO) {
    const resp = await this.supplierService.createOne(addSuppliersRequest)
    return res.status(HttpStatus.OK).json({
      HttpStatus:'OK',
      message: 'Product Successfully Created',
      resp
    });
  }

  @Put('/:id')
  public async updateOne(
    @Param('id') id: string,
    @Body() updateSuppliersRequest: UpdateSuppliersDTO,
    @Res() res
  ) {
    const resp = await this.supplierService.updateOne(id, updateSuppliersRequest);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('id') id: string, @Res() res) {
   const noteDeleted =  await this.supplierService.deleteOne(id);
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      noteDeleted
  });
  }
}
