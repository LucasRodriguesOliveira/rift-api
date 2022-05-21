import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Permission } from './model/permission.model';
import { PermissionService } from './permission.service';

@Resolver('Permission')
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Query('permission')
  public async findPermission(@Args('id') id: string): Promise<Permission> {
    return this.permissionService.find(id);
  }

  @Query('permissionList')
  public async listAllPermissions(
    @Args('showInactive') showInactive: boolean,
  ): Promise<Permission[]> {
    return this.permissionService.list(showInactive);
  }

  @Mutation('registerPermission')
  public async createPermission(
    @Args('description') description: string,
  ): Promise<Permission> {
    return this.permissionService.create(description);
  }

  @Mutation('updatePermissionDescription')
  public async updateDescription(
    @Args('id') id: string,
    @Args('description') description: string,
  ): Promise<Permission> {
    return this.permissionService.updateDescription(id, description);
  }

  @Mutation('updatePermissionStatus')
  public async updateStatus(
    @Args('id') id: string,
    @Args('isActive') isActive: boolean,
  ): Promise<Permission> {
    return this.permissionService.updateStatus(id, isActive);
  }

  @Mutation('removePermission')
  public async removePermission(@Args('id') id: string): Promise<boolean> {
    return this.permissionService.delete(id);
  }
}
