import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from './todo.repository';
import { UserService } from 'src/user/user.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { IUser } from 'src/user/interfaces/user.interface';
import { UserErrorMessageResponse } from 'src/user/messages/error-message.response';
import { ITodo } from './interfaces/todo.interface';
import { TodoSuccessMessage } from './messages/todo-success.message';

@Injectable()
export class TodoService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly userService: UserService,
  ) {}

  createTodo(input: CreateTodoDto) {
    const user: IUser | null = this.userService.getUserById(input.userId);
    if (!user)
      throw new NotFoundException(UserErrorMessageResponse.UserNotFound);
    const createdTodo: ITodo = this.todoRepository.create(input);
    return {
      message: TodoSuccessMessage.CreatedTodo,
      todo: createdTodo,
    };
  }
}
