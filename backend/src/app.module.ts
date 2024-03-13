import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { ProductListModule } from './product-list/product-list.module';
import { ClientModule } from './client/client.module';
import { SupplierModule } from './suppliers/supplier.module';
import { EmployeeModule } from './employee/employee.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ProductModule,
    DatabaseModule,
    ProductListModule,
    ClientModule,
    SupplierModule,
    EmployeeModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
