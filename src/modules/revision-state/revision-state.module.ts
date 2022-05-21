import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { definitions } from './model/definition-list';
import { RevisionStateResolver } from './revision-state.resolver';
import { RevisionStateService } from './revision-state.service';

@Module({
  imports: [MongooseModule.forFeature(definitions)],
  providers: [RevisionStateService, RevisionStateResolver],
})
export class RevisionStateModule {}
