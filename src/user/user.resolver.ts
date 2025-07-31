import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserType } from './user.entity';
import { CreateUserResponse } from './dtos/create-user.response';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/creat-user.dto';
import { GetUsersResponse } from './dtos/get-users.response';
import { GetUserResponse } from './dtos/get-user.response';
import { DeleteUserResponse } from './dtos/delete-user.response';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => CreateUserResponse)
  createUser(@Args('input') input: CreateUserDto): CreateUserResponse {
    return this.userService.createUser(input);
  }

  @Query(() => GetUsersResponse)
  getUsers(): GetUsersResponse {
    return this.userService.getUsers();
  }

  @Query(() => GetUserResponse)
  getUser(@Args('id') id: number): GetUserResponse {
    return this.userService.getUser(id);
  }

  @Mutation(() => DeleteUserResponse)
  deleteUser(@Args('id', { type: () => Int }) id: number): DeleteUserResponse {
    return this.userService.deleteUser(id);
  }
}
