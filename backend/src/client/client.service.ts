import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from 'src/entity/product.entity';
import { ProductDTO } from 'src/DTO/products/products.dto';
import { UpdateProductDTO } from 'src/DTO/products/updateProduct.dto';
import { AddProductDTO } from 'src/DTO/products/addProduct.dto';
import { Client } from 'src/entity/client.entity';
import { AddClientDTO } from 'src/DTO/client/addClientList.dto';
import { ClientDTO } from 'src/DTO/client/client.dto';
import { UpdateClientDTO } from 'src/DTO/client/updateClient.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  public async createOne(addClientRequest: AddClientDTO) {
    const client = new Client();
    client.name = addClientRequest.name;
    client.lastName = addClientRequest.lastName;
    client.birthdate = addClientRequest.birthdate;
    client.cuil = addClientRequest.cuil;
    client.city = addClientRequest.city;
    client.identification = addClientRequest.identification;
    client.phoneNumber = addClientRequest.phoneNumber;
    await this.clientRepository.save(client);

    const ClientDTO = this.entityToDTO(client);

    return ClientDTO;
  }

  public async getOne(id) {
    const client: Client = await this.clientRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!client) {
      throw new NotFoundException(` El producto no existe`);
    }

    const clientDTO: ClientDTO = this.entityToDTO(client);
    return clientDTO;
  }

  private entityToDTO(client: Client): ClientDTO {
    const clients = new ClientDTO();
    clients.id = client.id;
    clients.name = client.name;
    clients.lastName = client.lastName;
    clients.birthdate = client.birthdate;
    clients.city = client.city;
    clients.identification = client.identification;
    clients.phoneNumber = client.phoneNumber;
    clients.cuil = client.cuil;
    return clients;
  }

  public async getAll() {
    const client: Client[] = await this.clientRepository.find();

    const clientDTO: ClientDTO[] = client.map((x) => this.entityToDTO(x));

    return clientDTO;
  }

  public async updateOne(clientId: string, updateClientRequest: UpdateClientDTO) {

    const client: Client = await this.getOne(clientId);

    
    client.name = updateClientRequest.name;
    client.lastName = updateClientRequest.lastName;
    client.birthdate = updateClientRequest.birthdate;
    client.city = updateClientRequest.city;
    client.identification = updateClientRequest.identification;
    client.phoneNumber = updateClientRequest.phoneNumber;
    client.cuil = updateClientRequest.cuil;

    //actualizamos y guardamos la tarea
    await this.clientRepository.save(client);

    //Retornamos la tarea formato dto
    const clientDTO: ClientDTO = await this.entityToDTO(client);

    return clientDTO;
  }

  public async deleteOne(clientId: string) {
    //buscamos la tarea por id
    const client: Client = await this.getOne(clientId);

    //eliminamos la tarea por
    await this.clientRepository.remove(client);
  }
}
