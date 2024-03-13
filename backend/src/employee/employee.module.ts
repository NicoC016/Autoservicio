import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmployeedController } from './employee.controller';
import { EmployeeService } from './employeed.service';
import { Employee } from 'src/entity/employee.entity';

@Module({
  controllers: [EmployeedController],
  providers: [EmployeeService],
  imports:[TypeOrmModule.forFeature([Employee])]
})
export class EmployeeModule {}
