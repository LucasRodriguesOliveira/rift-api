import { ModelDefinition } from '@nestjs/mongoose';
import { RevisionState, RevisionStateSchema } from './revision-state.model';

export const RevisionStateDefinition: ModelDefinition = {
  name: RevisionState.name,
  schema: RevisionStateSchema,
};
