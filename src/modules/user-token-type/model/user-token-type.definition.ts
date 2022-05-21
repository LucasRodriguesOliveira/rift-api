import { ModelDefinition } from '@nestjs/mongoose';
import { UserTokenType, UserTokenTypeSchema } from './user-token-type.model';

export const UserTokenTypeDefinition: ModelDefinition = {
  name: UserTokenType.name,
  schema: UserTokenTypeSchema,
};
