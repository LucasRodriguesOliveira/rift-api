import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseModuleConfig } from 'src/config/mongoose/mongoose-module.config';

@Module({
  imports: [MongooseModule.forRootAsync(mongooseModuleConfig)],
})
export class MongodbModule {}
