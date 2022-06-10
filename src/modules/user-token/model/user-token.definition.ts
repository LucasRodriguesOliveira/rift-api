import { ModelDefinition } from '@nestjs/mongoose';
import { UserToken, UserTokenSchema } from './user-token.model';

export const UserTokenDefinition: ModelDefinition = {
  name: UserToken.name,
  schema: UserTokenSchema,
};
