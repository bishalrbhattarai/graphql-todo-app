import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { TodoStatusEnum } from './enums/todo-status.enum';
import { UserType } from 'src/user/user.entity';

@ObjectType()
export class TodoType {
  @Field(() => Int)
  @Expose()
  id: number;

  @Field()
  @Expose()
  title: string;

  @Field(() => TodoStatusEnum)
  @Expose()
  status: TodoStatusEnum;

  @Field(() => Int)
  @Expose()
  userId: number;

  @Field(() => UserType)
  @Expose()
  user: UserType;
}
