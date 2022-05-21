import { ModelDefinition } from '@nestjs/mongoose';
import { RevisionStateDefinition } from './revision-state.definition';

export const definitions: ModelDefinition[] = [RevisionStateDefinition];
