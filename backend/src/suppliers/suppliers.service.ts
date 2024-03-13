import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Supplier } from 'src/entity/suppliers.entity';
import { AddSupplierDTO } from 'src/DTO/suppliers/addSupplier.dto';
import { SuppliersDTO } from 'src/DTO/suppliers/supplier.dto';
import { UpdateSuppliersDTO } from 'src/DTO/suppliers/updateSupplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier) private supplierRepository: Repository<Supplier>,
  ) {}

  public async createOne(addSupplierRequest: AddSupplierDTO) {
    const supplier = new Supplier();
    supplier.name = addSupplierRequest.name;
    supplier.categoryAfip = addSupplierRequest.categoryAfip;
    supplier.categoryProducts = addSupplierRequest.categoryProducts;
    supplier.city = addSupplierRequest.city;
    supplier.cuit= addSupplierRequest.cuit;
    supplier.phoneNumber= addSupplierRequest.phoneNumber;
    await this.supplierRepository.save(supplier);

    const supplierDTO = this.entityToDTO(supplier);

    return supplierDTO;
  }

  public async getOne(id) {
    const supplier: Supplier = await this.supplierRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!supplier) {
      throw new NotFoundException(` El supplier no existe`);
    }

    const supplierDTO: SuppliersDTO = this.entityToDTO(supplier);
    return supplierDTO;
  }

  private entityToDTO(product: Supplier): SuppliersDTO {
    const suppliers = new SuppliersDTO();
    suppliers.id = product.id;
    suppliers.name = product.name;
    suppliers.categoryAfip = product.categoryAfip;
    suppliers.categoryProducts = product.categoryProducts;
    suppliers.city = product.city;
    suppliers.cuit= product.cuit;
    suppliers.phoneNumber= product.phoneNumber;
    return suppliers;
  }

  public async getAll() {
    const suppliers: Supplier[] = await this.supplierRepository.find();

    const suppliersDTO: SuppliersDTO[] = suppliers.map((x) => this.entityToDTO(x));

    return suppliersDTO;
  }

  public async updateOne(supplierId: string, updateSuppliersRequest: UpdateSuppliersDTO) {

    const suppliers: Supplier = await this.getOne(supplierId);

    
    suppliers.name = updateSuppliersRequest.name;
    suppliers.cuit = updateSuppliersRequest.cuit;
    suppliers.categoryAfip = updateSuppliersRequest.categoryAfip;
    suppliers.city = updateSuppliersRequest.city;
    suppliers.phoneNumber = updateSuppliersRequest.phoneNumber;

    //actualizamos y guardamos la tarea
    await this.supplierRepository.save(suppliers);

    //Retornamos la tarea formato dto
    const suppliersDTO: SuppliersDTO = await this.entityToDTO(suppliers);

    return suppliersDTO;
  }

  public async deleteOne(noteId: string) {
    //buscamos la tarea por id
    const suppliers: Supplier = await this.getOne(noteId);

    //eliminamos la tarea por
    await this.supplierRepository.remove(suppliers);
  }
}
