import { ModelDefinition } from '@nestjs/mongoose';
import { PermissionGroupDefinition } from './permission-group.definition';

export const definitions: ModelDefinition[] = [PermissionGroupDefinition];
