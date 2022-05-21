import { ModelDefinition } from '@nestjs/mongoose';
import { UserTokenTypeDefinition } from './user-token-type.definition';

export const definitions: ModelDefinition[] = [UserTokenTypeDefinition];
