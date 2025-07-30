import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { UserModule } from 'src/user/user.module';
import { TodoResolver } from './todo.resolver';

@Module({
  imports:[UserModule],
  providers: [TodoService, TodoRepository,TodoResolver],
})
export class TodoModule {}
