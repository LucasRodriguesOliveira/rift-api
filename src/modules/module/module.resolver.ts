import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Module } from './model/module.model';
import { ModuleService } from './module.service';

@Resolver('Module')
export class ModuleResolver {
  constructor(private readonly moduleService: ModuleService) {}

  @Query('module')
  public async findModule(@Args('id') id: string): Promise<Module> {
    return this.moduleService.find(id);
  }

  @Query('moduleList')
  public async listAllModules(
    @Args('showInactive') showInactive: boolean,
  ): Promise<Module[]> {
    return this.moduleService.list(showInactive);
  }

  @Mutation('registerModule')
  public async createModule(
    @Args('description') description: string,
  ): Promise<Module> {
    return this.moduleService.create(description);
  }

  @Mutation('updateModuleDescription')
  public async updateDescription(
    @Args('id') id: string,
    @Args('description') description: string,
  ): Promise<Module> {
    return this.moduleService.updateDescription(id, description);
  }

  @Mutation('updateModuleStatus')
  public async updateStatus(
    @Args('id') id: string,
    @Args('isActive') isActive: boolean,
  ): Promise<Module> {
    return this.moduleService.updateStatus(id, isActive);
  }

  @Mutation('removeModule')
  public async remove(@Args('id') id: string): Promise<boolean> {
    return this.moduleService.delete(id);
  }
}
