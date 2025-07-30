import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { TodoStatusEnum } from '../enums/todo-status.enum';

@InputType()
export class CreateTodoDto {
  @Field()
  @IsString()
  title: string;

  @Field(() => TodoStatusEnum)
  @IsString()
  status: TodoStatusEnum;

  @Field()
  @IsNumber()
  userId: number;
}
