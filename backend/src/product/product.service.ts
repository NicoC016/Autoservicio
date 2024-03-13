import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from 'src/entity/product.entity';
import { ProductDTO } from 'src/DTO/products/products.dto';
import { UpdateProductDTO } from 'src/DTO/products/updateProduct.dto';
import { AddProductDTO } from 'src/DTO/products/addProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  public async createOne(addProductsRequest: AddProductDTO) {
    const product = new Product();
    product.name = addProductsRequest.name;
    product.codebar = addProductsRequest.codebar;
    product.brand = addProductsRequest.brand;
    product.category= addProductsRequest.category;
    product.price= addProductsRequest.price;
    product.image= addProductsRequest.image;
    product.weight= addProductsRequest.weight;
    product.unity= addProductsRequest.unity;
    await this.productsRepository.save(product);

    const productDTO = this.entityToDTO(product);

    return productDTO;
  }

  public async getOne(productCodebar) {
    const product: Product = await this.productsRepository.findOne({
      where: {
        codebar: productCodebar,
      },
    });
    if (!product) {
      throw new NotFoundException(` El producto no existe`);
    }

    const productDTO: ProductDTO = this.entityToDTO(product);
    return productDTO;
  }

  private entityToDTO(product: Product): ProductDTO {
    const products = new ProductDTO();
    products.id = product.id;
    products.name = product.name;
    products.codebar = product.codebar;
    products.brand = product.brand;
    products.category= product.category;
    products.price= product.price;
    products.image= product.image;
    products.weight= product.weight;
    products.unity= product.unity;
    return products;
  }

  public async getAll() {
    const product: Product[] = await this.productsRepository.find();

    const productDTO: ProductDTO[] = product.map((x) => this.entityToDTO(x));

    return productDTO;
  }

  public async updateOne(noteId: string, updateProductsRequest: UpdateProductDTO) {

    const product: Product = await this.getOne(noteId);

    
    product.name = updateProductsRequest.name;
    product.codebar = updateProductsRequest.codebar;
    product.brand = updateProductsRequest.brand;
    product.category = updateProductsRequest.category;
    product.price = updateProductsRequest.price;
    product.image = updateProductsRequest.image;
    product.weight= updateProductsRequest.weight;
    product.unity= updateProductsRequest.unity;

    //actualizamos y guardamos la tarea
    await this.productsRepository.save(product);

    //Retornamos la tarea formato dto
    const productDTO: ProductDTO = await this.entityToDTO(product);

    return productDTO;
  }

  public async deleteOne(noteId: string) {
    //buscamos la tarea por id
    const product: Product = await this.getOne(noteId);

    //eliminamos la tarea por
    await this.productsRepository.remove(product);
  }
}
