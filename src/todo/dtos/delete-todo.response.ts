import { Field, ObjectType } from '@nestjs/graphql';
import { TodoType } from '../todo.entity';
import { GenericResponse } from 'src/common/dtos/generic-response.dto';

@ObjectType()
export class DeleteTodoResponse extends GenericResponse {
  @Field(() => TodoType)
  todo: TodoType;
}
