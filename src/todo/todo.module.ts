import { forwardRef, Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoRepository } from './todo.repository';
import { UserModule } from 'src/user/user.module';
import { TodoResolver } from './todo.resolver';

@Module({
  imports: [ forwardRef(()=>UserModule)],
  providers: [TodoService, TodoRepository, TodoResolver],
  exports: [TodoService],
})
export class TodoModule {}
