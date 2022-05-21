import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { definitions } from './model/definition-list';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';

@Module({
  imports: [MongooseModule.forFeature(definitions)],
  providers: [PermissionService, PermissionResolver],
})
export class PermissionModule {}
