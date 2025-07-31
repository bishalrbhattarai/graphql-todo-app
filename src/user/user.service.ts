import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { DeleteUserResponse } from './dtos/delete-user.response';
import { TodoService } from 'src/todo/todo.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => TodoService))
    private readonly todoService: TodoService,
  ) {}

  deleteUser(id: number): DeleteUserResponse {
    const deletedUser = this.userRepository.deleteById(id);
    if (!deletedUser)
      throw new NotFoundException(UserErrorMessageResponse.UserNotFound);

    this.todoService.deleteTodoByUserId(id);
    const userType: UserType = mapToUserType(deletedUser);
    const response: DeleteUserResponse = {
      message: UserSuccessMessageResponse.UserDeleted,
      user: userType,
    };
    return response;
  }

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

  getUserById(id: number): IUser | null {
    return this.userRepository.findById(id);
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
