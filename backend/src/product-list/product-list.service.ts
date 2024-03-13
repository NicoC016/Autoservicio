import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductList } from 'src/entity/product-list.entity';
import { ProductListDTO } from 'src/DTO/list-products/productsList.dto';
import { AddProductListDTO } from 'src/DTO/list-products/addProductList.dto';
import { UpdateProductListDTO } from 'src/DTO/list-products/updateListProduct.dto';

@Injectable()
export class ProductListService {
  constructor(
    @InjectRepository(ProductList) private productsRepository: Repository<ProductList>,
  ) {}

  public async createOne(addProductsRequest: AddProductListDTO) {
    const product = new ProductList();
    product.name = addProductsRequest.name;
    product.codebar = addProductsRequest.codebar;
    product.brand = addProductsRequest.brand;
    product.category= addProductsRequest.category;
    product.price= addProductsRequest.price;
    product.quantity= addProductsRequest.quantity;
    await this.productsRepository.save(product);

    const productDTO = this.entityToDTO(product);

    return productDTO;
  }

  public async getOne(productCodebar) {
    const product: ProductList = await this.productsRepository.findOne({
      where: {
        codebar: productCodebar,
      },
    });
    if (!product) {
      throw new NotFoundException(` El producto no existe`);
    }

    const productDTO: ProductListDTO = this.entityToDTO(product);

    return productDTO;
  }

  private entityToDTO(product: ProductList): ProductListDTO {
    const products = new ProductListDTO();
    products.id = product.id
    products.name = product.name;
    products.codebar = product.codebar;
    products.brand = product.brand;
    products.category= product.category;
    products.price= product.price;
    products.quantity= product.quantity;
    return products;
  }

  public async getAll() {
    const product: ProductList[] = await this.productsRepository.find();

    const productDTO: ProductListDTO[] = product.map((x) => this.entityToDTO(x));

    return productDTO;
  }

  public async updateOne(noteId: string, updateProductsRequest: UpdateProductListDTO) {

    const product: ProductList = await this.getOne(noteId);

    
    product.name = updateProductsRequest.name;
    product.codebar = updateProductsRequest.codebar;
    product.brand = updateProductsRequest.brand;
    product.category = updateProductsRequest.category;
    product.price = updateProductsRequest.price;
    product.quantity= updateProductsRequest.quantity;

    //actualizamos y guardamos la tarea
    await this.productsRepository.save(product);

    //Retornamos la tarea formato dto
    const productDTO: ProductListDTO = await this.entityToDTO(product);

    return productDTO;
  }

  public async deleteOne(codebar: string) {
    //buscamos la tarea por id
    const product: ProductList = await this.getOne(codebar);
    //eliminamos la tarea por
    await this.productsRepository.remove(product);
  }
}
