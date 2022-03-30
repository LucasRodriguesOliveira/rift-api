import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { definitions } from './definition-list';

@Module({
  imports: [
    MongooseModule.forFeature(definitions)
  ]
})
export class UserTypeModule {}
