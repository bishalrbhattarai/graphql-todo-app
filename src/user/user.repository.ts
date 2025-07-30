import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserRepository {
  private users: Array<IUser> = [];
  private length: number = 0;

  findAll(): Array<IUser> {
    return this.users;
  }

  findById(id: number): IUser | null {
    return this.users.find((user) => user.id === id) || null;
  }

  create(username: string): IUser {
    const newUser: IUser = { id: ++this.length, username };
    this.users.push(newUser);
    return newUser;
  }
}
