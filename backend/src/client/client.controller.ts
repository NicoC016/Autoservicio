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
import { ClientService } from './client.service';
import { AddClientDTO } from 'src/DTO/client/addClientList.dto';
import { UpdateClientDTO } from 'src/DTO/client/updateClient.dto';


@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  public async getAll(@Res() res) {
      const resp = await this.clientService.getAll()
      return res.status(HttpStatus.OK).json(resp);
  }

  @Get('/:id')
  public async getOne(@Res()res, @Param('id') id: string) {
    const resp = await this.clientService.getOne(id);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Post()
  public async createOne(@Res() res, @Body() addClientRequest: AddClientDTO) {
    const resp = await this.clientService.createOne(addClientRequest)
    return res.status(HttpStatus.OK).json({
      HttpStatus:'OK',
      message: 'Product Successfully Created',
      resp
    });
  }

  @Put('/:id')
  public async updateOne(
    @Param('id') id: string,
    @Body() updateClientRequest: UpdateClientDTO,
    @Res() res
  ) {
    const resp = await this.clientService.updateOne(id, updateClientRequest);
    return res.status(HttpStatus.OK).json(resp);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('id') id: string, @Res() res) {
   const noteDeleted =  await this.clientService.deleteOne(id);
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      noteDeleted
  });
  }
}
