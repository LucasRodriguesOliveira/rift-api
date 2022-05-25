import { ModelDefinition } from '@nestjs/mongoose';
import { UserDefinition } from './user.definition';

export const definitions: ModelDefinition[] = [UserDefinition];
