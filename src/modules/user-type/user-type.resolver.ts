import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './model/user-type.model';
import { UserTypeService } from './user-type.service';

@Resolver('UserType')
export class UserTypeResolver {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Query('userType')
  async findUserType(@Args('id') id: string): Promise<UserType> {
    return this.userTypeService.find(id);
  }

  @Query('userTypeList')
  async getUserTypeList(
    @Args('showInactive') showInactive: boolean,
  ): Promise<UserType[]> {
    return this.userTypeService.list(showInactive);
  }

  @Mutation('registerUserType')
  async create(@Args('description') description: string): Promise<UserType> {
    return this.userTypeService.create(description);
  }

  @Mutation('updateUserTypeDescription')
  async updateDescription(
    @Args('id') id: string,
    @Args('description') description: string,
  ): Promise<UserType> {
    return this.userTypeService.updateDescription(id, description);
  }

  @Mutation('updateUserTypeIsActive')
  async updateIsActive(
    @Args('id') id: string,
    @Args('isActive') isActive: boolean,
  ): Promise<UserType> {
    return this.userTypeService.updateIsActive(id, isActive);
  }

  @Mutation('removeUserType')
  async delete(@Args('id') id: string): Promise<boolean> {
    return this.userTypeService.delete(id);
  }
}
