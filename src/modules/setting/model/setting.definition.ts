import { ModelDefinition } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './setting.model';

export const SettingDefinition: ModelDefinition = {
  name: Setting.name,
  schema: SettingSchema,
};
