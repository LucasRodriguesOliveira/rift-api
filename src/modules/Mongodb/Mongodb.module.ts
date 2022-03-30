import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://rift_api:riftapi123@localhost/rift'),
  ],
})
export class MongodbModule {}
