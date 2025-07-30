import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AppResolver } from './app.resolver';
import { CommonModule } from './common/common.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [UserModule, GraphqlModule, CommonModule, TodoModule],
  providers:[AppResolver]
})
export class AppModule {}
