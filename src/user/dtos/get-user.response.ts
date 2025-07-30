import { ObjectType } from '@nestjs/graphql';
import { GenericResponse } from 'src/common/dtos/generic-response.dto';
import { UserType } from '../user.entity';

@ObjectType()
export class GetUserResponse extends GenericResponse {
  user: UserType;
}
