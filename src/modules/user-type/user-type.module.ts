import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { definitions } from './entity/definition-list';
import { UserTypeResolver } from './user-type.resolver';
import { UserTypeService } from './user-type.service';

@Module({
  imports: [MongooseModule.forFeature(definitions)],
  providers: [UserTypeService, UserTypeResolver],
})
export class UserTypeModule {}
