import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { definitions } from './model/definition-list';
import { SettingResolver } from './setting.resolver';
import { SettingService } from './setting.service';

@Module({
  imports: [MongooseModule.forFeature(definitions)],
  providers: [SettingService, SettingResolver],
})
export class SettingModule {}
