import { plainToInstance } from 'class-transformer';
import { UserType } from './user.entity';
import { IUser } from './interfaces/user.interface';

export const mapToUserType = (user: IUser): UserType => {
  return plainToInstance(UserType, user, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  });
};

export const mapToUserTypeArray = (users: IUser[]): UserType[] => {
  return users.map(mapToUserType);
};
