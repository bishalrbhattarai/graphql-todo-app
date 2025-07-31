import { Field, InputType, Int } from '@nestjs/graphql';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdateTodoDto {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field(() => TodoStatusEnum, { nullable: true })
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status?: TodoStatusEnum;

  @Field(() => String, { nullable: true })
  @IsOptional()
  title?: string;
}
