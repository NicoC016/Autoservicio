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

import { AddEmployeeDTO } from 'src/DTO/employee/addEmployeed.dto';
import { UpdateEmployeeDTO } from 'src/DTO/employee/updateEmployee.dto';
import { EmployeeService } from './employeed.service';

@Controller('employee')
export class EmployeedController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  public async getAll(@Res() res) {
      const resp = await this.employeeService.getAll()
      return res.status(HttpStatus.OK).json(resp);
  }

  @Get('/:id')
  public async getOne(@Res()res, @Param('id') id: string) {
    const resp = await this.employeeService.getOne(id);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Post()
  public async createOne(@Res() res, @Body() addEmployeeRequest: AddEmployeeDTO) {
    const resp = await this.employeeService.createOne(addEmployeeRequest)
    return res.status(HttpStatus.OK).json({
      HttpStatus:'OK',
      message: 'Product Successfully Created',
      resp
    });
  }

  @Put('/:id')
  public async updateOne(
    @Param('id') id: string,
    @Body() updateEmployeeRequest: UpdateEmployeeDTO,
    @Res() res
  ) {
    const resp = await this.employeeService.updateOne(id, updateEmployeeRequest);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('id') id: string, @Res() res) {
   const employeedDeleted =  await this.employeeService.deleteOne(id);
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      employeedDeleted
  });
  }
}
