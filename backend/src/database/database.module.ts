
import { Module } from '@nestjs/common';
import {  TypeOrmModule } from "@nestjs/typeorm";
import { join } from 'path';

@Module({
  imports:[TypeOrmModule.forRoot(
    {
      type: "sqlite",
      database: "database.sqlite",
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
      logging: true,
      migrations: [join(__dirname, `/*.ts`)],})]
    }
  )

export class DatabaseModule {}