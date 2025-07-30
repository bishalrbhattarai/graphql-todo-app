import { TodoStatusEnum } from '../enums/todo-status.enum';

export interface ITodo {
  id: number;
  title: string;
  status: TodoStatusEnum;
  userId: number;
}
