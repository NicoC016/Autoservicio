import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductListService } from './product-list.service';
import { ProductList } from 'src/entity/product-list.entity';
import { ProductListController } from './product-list.controller';

@Module({
  controllers: [ProductListController],
  providers: [ProductListService],
  imports:[TypeOrmModule.forFeature([ProductList])]
})
export class ProductListModule {}
