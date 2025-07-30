import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private static users = [];
}
