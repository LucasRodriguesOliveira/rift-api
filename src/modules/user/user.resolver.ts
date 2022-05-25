import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  public async find(@Args('id') id: string): Promise<User> {
    return this.userService.find(id);
  }

  @Query('userList')
  public async list(
    @Args('filters') listUserDto: ListUserDto,
  ): Promise<User[]> {
    return this.userService.list(listUserDto);
  }

  @Mutation('registerUser')
  public async create(
    @Args('data') createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Mutation('updateUserName')
  public async updateUserName(
    @Args('id') id: string,
    @Args('newName') newName: string,
  ): Promise<User> {
    return this.userService.updateName(id, newName);
  }

  @Mutation('removeUser')
  public async delete(@Args('id') id: string): Promise<boolean> {
    return this.userService.delete(id);
  }
}
