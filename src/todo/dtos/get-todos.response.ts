import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GenericResponse } from 'src/common/dtos/generic-response.dto';
import { TodoType } from '../todo.entity';

@ObjectType()
export class GetTodosResponse extends GenericResponse {
  @Field(() => [TodoType])
  items: TodoType[];
  @Field(() => Int)
  total: number;
}
