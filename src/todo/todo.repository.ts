import { Injectable } from '@nestjs/common';
import { ITodo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Injectable()
export class TodoRepository {
  private todos: ITodo[] = [];

  deleteByUserId(userId: number) {
    const foundTodos = this.todos.filter((todo) => todo.userId === userId);
    if (foundTodos.length === 0) return null;
    this.todos = this.todos.filter((todo) => todo.userId !== userId);
    return foundTodos;
  }

  findById(id: number): ITodo | null {
    return this.todos.find((todo) => todo.id === id) || null;
  }
  deleteById(id: number): ITodo | null {
    const foundTodo = this.findById(id);
    if (!foundTodo) return null;
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return foundTodo;
  }

  findAll(search?: string, userId?: number): ITodo[] {
    return this.todos.filter((todo) => {
      const matchesTitle = search
        ? todo.title.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesUserId = userId ? todo.userId === userId : true;
      return matchesTitle && matchesUserId;
    });
  }

  updateTodo(input: UpdateTodoDto) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === input.id);
    if (todoIndex === -1) {
      return null;
    }

    const updatedTodo: ITodo = {
      ...this.todos[todoIndex],
      title:
        input.title !== undefined ? input.title : this.todos[todoIndex].title,
      status:
        input.status !== undefined
          ? input.status
          : this.todos[todoIndex].status,
    };

    this.todos[todoIndex] = updatedTodo;
    return updatedTodo;
  }

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
