import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTokenTypeModule } from '../user-token-type/user-token-type.module';
import { definitions } from './model/definition-list';
import { UserTokenResolver } from './user-token.resolver';
import { UserTokenService } from './user-token.service';

@Module({
  imports: [MongooseModule.forFeature(definitions), UserTokenTypeModule],
  providers: [UserTokenService, UserTokenResolver],
})
export class UserTokenModule {}
