import { ModelDefinition } from '@nestjs/mongoose';
import { SettingDefinition } from './setting.definition';

export const definitions: ModelDefinition[] = [SettingDefinition];
