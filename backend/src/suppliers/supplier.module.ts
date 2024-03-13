import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SupplierService } from './suppliers.service';
import { SupplierController } from './suppliers.controller';
import { Supplier } from 'src/entity/suppliers.entity';

@Module({
  controllers: [SupplierController],
  providers: [SupplierService],
  imports:[TypeOrmModule.forFeature([Supplier])]
})
export class SupplierModule {}
