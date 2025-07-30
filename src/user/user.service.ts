import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/creat-user.dto';
import { UserRepository } from './user.repository';
import { UserType } from './user.entity';
import { IUser } from './interfaces/user.interface';
import { mapToUserType } from './user.mapper';
import { CreateUserResponse } from './dtos/create-user.response';
import { UserSuccessMessageResponse } from './messages/sucess-message.response';
import { GetUsersResponse } from './dtos/get-users.response';
import { GetUserResponse } from './dtos/get-user.response';
import { UserErrorMessageResponse } from './messages/error-message.response';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers(): GetUsersResponse {
    const users: IUser[] = this.userRepository.findAll();
    const userTypes: UserType[] = users.map(mapToUserType);
    const response: GetUsersResponse = {
      message: UserSuccessMessageResponse.UsersFetched,
      items: userTypes,
      total: userTypes.length,
    };
    return response;
  }

  getUser(id: number): GetUserResponse {
    const user: IUser | null = this.userRepository.findById(id);
    if (!user)
      throw new NotFoundException(UserErrorMessageResponse.UserNotFound);
    const userType: UserType = mapToUserType(user);
    const response: GetUserResponse = {
      message: UserSuccessMessageResponse.UserFetched,
      user: userType,
    };
    return response;
  }

  createUser(input: CreateUserDto): CreateUserResponse {
    console.log(input);
    const createdUser: IUser = this.userRepository.create(input.username);
    const userType: UserType = mapToUserType(createdUser);
    console.log(userType);
    const response: CreateUserResponse = {
      message: UserSuccessMessageResponse.UserCreated,
      user: userType,
    };
    return response;
  }
}
