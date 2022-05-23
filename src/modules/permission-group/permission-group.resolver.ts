import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { ListPermissionGroupDto } from './dto/list-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { PermissionGroup } from './model/permission-group.model';
import { PermissionGroupService } from './permission-group.service';

@Resolver('PermissionGroup')
export class PermissionGroupResolver {
  constructor(
    private readonly permissionGroupService: PermissionGroupService,
  ) {}

  @Query('permissionGroup')
  public async find(@Args('id') id: string): Promise<PermissionGroup> {
    return this.permissionGroupService.find(id);
  }

  @Query('permissionGroupList')
  public async list(
    @Args('filters') listPermissionGroupDto: ListPermissionGroupDto,
  ): Promise<PermissionGroup[]> {
    return this.permissionGroupService.list(listPermissionGroupDto);
  }

  @Mutation('registerPermissionGroup')
  public async create(
    @Args('dto') createPermissionGroupDto: CreatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    return this.permissionGroupService.create(createPermissionGroupDto);
  }

  @Mutation('updatePermissionGroupRules')
  public async updateRules(
    @Args('id') id: string,
    @Args('rules') updatePermissionGroupDto: UpdatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    return this.permissionGroupService.update(id, updatePermissionGroupDto);
  }

  @Mutation('updatePermissionGroupStatus')
  public async updateStatus(
    @Args('id') id: string,
    @Args('status') updatePermissionGroupDto: UpdatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    return this.permissionGroupService.update(id, updatePermissionGroupDto);
  }

  @Mutation('removePermissionGroup')
  public async delete(@Args('id') id: string): Promise<boolean> {
    return this.permissionGroupService.delete(id);
  }
}
