import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoService } from './todo.service';
import { CreateUserResponse } from 'src/user/dtos/create-user.response';
import { CreateTodoResponse } from './dtos/create-todo.response';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => CreateTodoResponse)
  createTodo(@Args('input') input: CreateTodoDto){
    return this.todoService.createTodo(input);
  }
}
