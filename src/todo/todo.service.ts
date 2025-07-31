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
import { GetTodoResponse } from './dtos/get-todo.response';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { UpdateTodoResponse } from './dtos/update-todo.respnse';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly userService: UserService,
  ) {}

  updateTodo(input: UpdateTodoDto): UpdateTodoResponse {
    console.log(input);
    const todoUpdated: ITodo | null = this.todoRepository.updateTodo(input);
    if (!todoUpdated)
      throw new InternalServerErrorException(
        TodoErrorMessageResponse.TodoNotUpdated,
      );

    const mappedTodo: TodoType = mapToTodoType(todoUpdated);
    console.log(mappedTodo);

    return {
      message: TodoSuccessMessage.TodoUpdated,
      todo: mappedTodo,
    };
  }

  getTodo(id: number): GetTodoResponse {
    const foundTodo: ITodo | null = this.todoRepository.findById(id);
    if (!foundTodo)
      throw new NotFoundException(TodoErrorMessageResponse.TodoNotFound);
    const mappedTodo: TodoType = mapToTodoType(foundTodo);
    return {
      message: TodoSuccessMessage.TodoFetched,
      todo: mappedTodo,
    };
  }

  getTodos(search?: string, userId?: number): GetTodosResponse {
    const todos: ITodo[] = this.todoRepository.findAll(search, userId);
    const typedTodos: TodoType[] = mapToTodoTypeArray(todos);
    return {
      message: TodoSuccessMessage.TodoListFetched,
      items: typedTodos,
      total: typedTodos.length,
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
