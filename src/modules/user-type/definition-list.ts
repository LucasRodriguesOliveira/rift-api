import { ModelDefinition } from '@nestjs/mongoose';
import { UserTypeDefinition } from './entity/user-type.definition';

export const definitions: ModelDefinition[] = [
  UserTypeDefinition
];