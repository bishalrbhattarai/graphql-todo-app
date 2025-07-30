import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';

@Module({
  providers: [TodoService, TodoRepository],
})
export class TodoModule {}
