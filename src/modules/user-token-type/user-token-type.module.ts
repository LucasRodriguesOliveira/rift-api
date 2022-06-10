import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { definitions } from './model/definition-list';
import { UserTokenTypeResolver } from './user-token-type.resolver';
import { UserTokenTypeService } from './user-token-type.service';

@Module({
  imports: [MongooseModule.forFeature(definitions)],
  providers: [UserTokenTypeService, UserTokenTypeResolver],
  exports: [UserTokenTypeService],
})
export class UserTokenTypeModule {}
