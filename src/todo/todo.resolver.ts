import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoService } from './todo.service';
import { CreateTodoResponse } from './dtos/create-todo.response';
import { TodoType } from './todo.entity';
import { UserType } from 'src/user/user.entity';
import { GetTodosResponse } from './dtos/get-todos.response';
import { GetTodoResponse } from './dtos/get-todo.response';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { UpdateTodoResponse } from './dtos/update-todo.respnse';
import { DeleteTodoResponse } from './dtos/delete-todo.response';

@Resolver(() => TodoType)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => CreateTodoResponse)
  createTodo(@Args('input') input: CreateTodoDto): CreateTodoResponse {
    return this.todoService.createTodo(input);
  }

  @Mutation(() => DeleteTodoResponse)
  deleteTodo(
    @Args('id', { type: () => Int }) id: number
  ):DeleteTodoResponse{
    return this.todoService.deleteTodo(id);
  }


  @Query(() => GetTodosResponse)
  getTodos(
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('userId', { type: () => Int, nullable: true }) userId?: number,
  ): GetTodosResponse {
    return this.todoService.getTodos(search, userId);
  }

  @Query(() => GetTodoResponse)
  getTodo(@Args('id', { type: () => Int }) id: number): GetTodoResponse {
    return this.todoService.getTodo(id);
  }

  @ResolveField(() => UserType, { name: 'user' })
  user(@Parent() todo: TodoType) {
    return this.todoService.getTodoUserDetails(todo.userId);
  }

  @Mutation(() => UpdateTodoResponse)
  updateTodo(@Args('input') input: UpdateTodoDto):UpdateTodoResponse {
    return this.todoService.updateTodo(input);
  }
}
