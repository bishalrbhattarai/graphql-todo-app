import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GraphqlModule } from './graphql/graphql.module';
import { AppResolver } from './app.resolver';
import { CommonModule } from './common/common.module';

@Module({
  imports: [UserModule, GraphqlModule, CommonModule],
  providers:[AppResolver]
})
export class AppModule {}
