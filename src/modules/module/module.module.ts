import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { definitions } from './model/definition-list';
import { ModuleResolver } from './module.resolver';
import { ModuleService } from './module.service';

@Module({
  imports: [MongooseModule.forFeature(definitions)],
  providers: [ModuleService, ModuleResolver],
})
export class ModuleModule {}
