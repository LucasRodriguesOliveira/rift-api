import { ModelDefinition } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './permission.model';

export const PermissionDefinition: ModelDefinition = {
  name: Permission.name,
  schema: PermissionSchema,
};
