import {
  Args,
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

@Resolver(() => TodoType)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => CreateTodoResponse)
  createTodo(@Args('input') input: CreateTodoDto): CreateTodoResponse {
    return this.todoService.createTodo(input);
  }

  // @Query(()=>[TodoType]) 
  getTodos(){
    this.todoService.getTodos()
  } 



  @ResolveField(() => UserType, { name: 'user' })
  user(@Parent() todo: TodoType) {
    return this.todoService.getTodoUserDetails(todo.userId);
  }
}
