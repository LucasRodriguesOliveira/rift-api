import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './entity/user-type.entity';
import { UserTypeService } from './user-type.service';

@Resolver('UserType')
export class UserTypeResolver {
  constructor(private readonly userTypeService: UserTypeService) {}

  @Query('userType')
  async findUserType(@Args('id') id: string): Promise<UserType> {
    return this.userTypeService.find(id);
  }

  @Query('userTypeList')
  async getUserTypeList(): Promise<UserType[]> {
    return this.userTypeService.list();
  }
}
