import { registerEnumType } from '@nestjs/graphql';

export enum TodoStatusEnum {
  PENDING = 'PENDING',
  DONE = 'DONE',
}

registerEnumType(TodoStatusEnum, {
  name: 'TodoStatusEnum',
  description: 'The status of a todo item',
});
