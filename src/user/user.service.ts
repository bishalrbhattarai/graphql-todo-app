import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/creat-user.dto';

@Injectable()
export class UserService {
  createUser(input: CreateUserDto) {}
}
