import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodoService } from './todo.service';
import { CreateTodoResponse } from './dtos/create-todo.response';
import { TodoType } from './todo.entity';

@Resolver(()=>TodoType)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => CreateTodoResponse)
  createTodo(@Args('input') input: CreateTodoDto){
    return this.todoService.createTodo(input);
  }

  @Resolver(() => UserType,{name:"user"})

}
