import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose } from 'class-transformer';

@ObjectType()
export class UserType {
  @Field(() => Int)
  @Expose()
  id: number;

  @Field(() => String)
  @Expose()
  username: string;
}
