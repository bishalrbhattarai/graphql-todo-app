import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  username: string;
}
