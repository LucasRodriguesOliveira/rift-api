import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserTokenType } from './model/user-token-type.model';
import { UserTokenTypeDuration } from './user-token-type.enum';
import { UserTokenTypeService } from './user-token-type.service';

@Resolver('UserTokenType')
export class UserTokenTypeResolver {
  constructor(private readonly userTokenTypeService: UserTokenTypeService) {}

  @Query('userTokenType')
  public async find(@Args('id') id: string): Promise<UserTokenType> {
    return this.userTokenTypeService.find(id);
  }

  @Query('userTokenTypeList')
  public async list(
    @Args('showInactive') showInactive: boolean,
  ): Promise<UserTokenType[]> {
    return this.userTokenTypeService.list(showInactive);
  }

  @Mutation('registerUserTokenType')
  public async create(
    @Args('description') description: string,
    @Args('duration') duration: UserTokenTypeDuration,
  ): Promise<UserTokenType> {
    return this.userTokenTypeService.create({ description, duration });
  }

  @Mutation('updateUserTokenTypeDescription')
  public async updateDescription(
    @Args('id') id: string,
    @Args('description') description: string,
  ): Promise<UserTokenType> {
    return this.userTokenTypeService.updateDescription(id, description);
  }

  @Mutation('updateUserTokenTypeStatus')
  public async updateStatus(
    @Args('id') id: string,
    @Args('isActive') isActive: boolean,
  ): Promise<UserTokenType> {
    return this.userTokenTypeService.updateStatus(id, isActive);
  }

  @Mutation('updateUserTokenTypeDuration')
  public async updateDuration(
    @Args('id') id: string,
    @Args('duration') duration: UserTokenTypeDuration,
  ): Promise<UserTokenType> {
    return this.userTokenTypeService.updateDuration(id, duration);
  }

  @Mutation('removeUserTokenType')
  public async remove(@Args('id') id: string): Promise<boolean> {
    return this.userTokenTypeService.delete(id);
  }
}
