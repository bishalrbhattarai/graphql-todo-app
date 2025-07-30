import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '../user.entity';
import { GenericResponse } from 'src/common/dtos/generic-response.dto';

@ObjectType()
export class DeleteUserResponse extends GenericResponse {
  @Field(() => UserType)
  user: UserType;
}
