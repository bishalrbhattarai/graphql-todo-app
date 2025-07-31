import { plainToInstance } from 'class-transformer';
import { ITodo } from './interfaces/todo.interface';
import { TodoType } from './todo.entity';

export const mapToTodoType = (todo: ITodo): TodoType => {
  return plainToInstance(TodoType, todo, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  });
};

export const mapToTodoTypeArray = (todos: ITodo[]): TodoType[] => {
  return todos.map(mapToTodoType);
};