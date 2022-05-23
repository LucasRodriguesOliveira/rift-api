import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { definitions } from './model/definition-list';
import { PermissionGroupResolver } from './permission-group.resolver';
import { PermissionGroupService } from './permission-group.service';

@Module({
  imports: [MongooseModule.forFeature(definitions)],
  providers: [PermissionGroupService, PermissionGroupResolver],
})
export class PermissionGroupModule {}
