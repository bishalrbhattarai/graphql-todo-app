import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { UserService } from 'src/user/user.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserErrorMessageResponse } from 'src/user/messages/error-message.response';
import { ITodo } from './interfaces/todo.interface';
import { TodoSuccessMessage } from './messages/todo-success.message';
import { mapToTodoType, mapToTodoTypeArray } from './todo.mapper';
import { TodoType } from './todo.entity';
import { TodoErrorMessageResponse } from './messages/todo-error.message';
import { CreateTodoResponse } from './dtos/create-todo.response';
import { mapToUserType } from 'src/user/user.mapper';
import { UserType } from 'src/user/user.entity';
import { GetTodosResponse } from './dtos/get-todos.response';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly userService: UserService,
  ) {}

  getTodos(): GetTodosResponse {
    const todos: ITodo[] = this.todoRepository.findAll();
    const typedTodos: TodoType[] = mapToTodoTypeArray(todos);
    return {
      message: TodoSuccessMessage.TodoListFetched,
      items: typedTodos,
    };
  }

  getTodoUserDetails(id: number): UserType {
    const foundUser: IUser | null = this.userService.getUserById(id);
    if (!foundUser)
      throw new NotFoundException(UserErrorMessageResponse.UserNotFound);
    const result: UserType = mapToUserType(foundUser);
    return result;
  }

  createTodo(input: CreateTodoDto): CreateTodoResponse {
    const user: IUser | null = this.userService.getUserById(input.userId);
    if (!user)
      throw new NotFoundException(UserErrorMessageResponse.UserNotFound);
    const createdTodo: ITodo = this.todoRepository.create(input);
    if (!createdTodo)
      throw new InternalServerErrorException(
        TodoErrorMessageResponse.TodoNotCreated,
      );
    const mappedTodo: TodoType = mapToTodoType(createdTodo);
    return {
      message: TodoSuccessMessage.CreatedTodo,
      todo: mappedTodo,
    };
  }
}
