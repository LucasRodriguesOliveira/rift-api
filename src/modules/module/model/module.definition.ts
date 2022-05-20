import { ModelDefinition } from '@nestjs/mongoose';
import { Module, ModuleSchema } from './module.model';

export const ModuleDefinition: ModelDefinition = {
  name: Module.name,
  schema: ModuleSchema,
};
