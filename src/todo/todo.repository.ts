import { Injectable } from '@nestjs/common';
import { ITodo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Injectable()
export class TodoRepository {
  private todos: ITodo[] = [];

  create(todo: CreateTodoDto): ITodo {
    const newTodo: ITodo = {
      id: this.todos.length + 1,
      title: todo.title,
      status: todo.status,
      userId: todo.userId,
    };
    this.todos.push(newTodo);
    return newTodo;
  }
}
