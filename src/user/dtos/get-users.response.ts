import { Field, ObjectType } from '@nestjs/graphql';
import { GenericResponse } from 'src/common/dtos/generic-response.dto';
import { UserType } from '../user.entity';

@ObjectType()
export class GetUsersResponse extends GenericResponse {
  @Field(() => [UserType])
  items: UserType[];

  @Field()
  total: number;
}
