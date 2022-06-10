import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserTokenTypeService } from '../user-token-type/user-token-type.service';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UserToken } from './model/user-token.model';
import { UserTokenService } from './user-token.service';

@Resolver('UserToken')
export class UserTokenResolver {
  constructor(
    private readonly userTokenService: UserTokenService,
    private readonly userTokenTypeService: UserTokenTypeService,
  ) {}

  @Query('userToken')
  public async find(@Args('token') token: string): Promise<UserToken> {
    return this.userTokenService.find(token);
  }

  @Mutation('registerUserToken')
  public async create(
    @Args('data') { tokenTypeId, userId }: CreateUserTokenDto,
  ): Promise<UserToken> {
    const { duration } = await this.userTokenTypeService.find(tokenTypeId);

    return this.userTokenService.create(userId, tokenTypeId, duration);
  }
}
