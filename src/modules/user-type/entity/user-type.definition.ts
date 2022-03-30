import { ModelDefinition } from '@nestjs/mongoose';
import { UserType, UserTypeSchema } from './user-type.entity';

export const UserTypeDefinition: ModelDefinition = {
  name: UserType.name,
  schema: UserTypeSchema,
};