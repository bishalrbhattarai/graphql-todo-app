import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class GenericResponse {
  @Field(() => String)
  message: string;
}
