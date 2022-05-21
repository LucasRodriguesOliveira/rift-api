import { ModelDefinition } from '@nestjs/mongoose';
import { PermissionDefinition } from './permission.definition';

export const definitions: ModelDefinition[] = [PermissionDefinition];
