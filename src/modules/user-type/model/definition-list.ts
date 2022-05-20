import { ModelDefinition } from '@nestjs/mongoose';
import { UserTypeDefinition } from './user-type.definition';

export const definitions: ModelDefinition[] = [UserTypeDefinition];
