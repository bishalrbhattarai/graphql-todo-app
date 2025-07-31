import { Field, ObjectType } from '@nestjs/graphql';
import { GenericResponse } from 'src/common/dtos/generic-response.dto';
import { TodoType } from '../todo.entity';

@ObjectType()
export class GetTodoResponse extends GenericResponse {
  @Field(() => TodoType)
  todo: TodoType;
}
