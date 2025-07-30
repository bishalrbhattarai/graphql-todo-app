import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserType } from './user.entity';
import { CreateUserResponse } from './dtos/create-user.response';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/creat-user.dto';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => CreateUserResponse)
  createUser(@Args('input') input: CreateUserDto) {
    return this.userService.createUser(input);
  }
}
