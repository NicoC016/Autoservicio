import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Client } from 'src/entity/client.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports:[TypeOrmModule.forFeature([Client])]
})
export class ClientModule {}
