import { ModelDefinition } from '@nestjs/mongoose';
import {
  PermissionGroup,
  PermissionGroupSchema,
} from './permission-group.model';

export const PermissionGroupDefinition: ModelDefinition = {
  name: PermissionGroup.name,
  schema: PermissionGroupSchema,
};
