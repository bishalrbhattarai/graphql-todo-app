import { Injectable } from '@nestjs/common';
import { ITodo } from './interfaces/todo.interface';

@Injectable()
export class TodoRepository {
  private todos: ITodo[] = [];

  create(todo) {}
}
