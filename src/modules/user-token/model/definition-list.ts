import { ModelDefinition } from '@nestjs/mongoose';
import { UserTokenDefinition } from './user-token.definition';

export const definitions: ModelDefinition[] = [UserTokenDefinition];
