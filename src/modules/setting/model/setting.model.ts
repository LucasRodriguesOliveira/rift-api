import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SimpleAuditableModel } from '../../../shared/model/simple-auditable.model';

@Schema({ timestamps: true })
export class Setting extends SimpleAuditableModel {}

export type SettingDocument = Setting & Document;

export const SettingSchema = SchemaFactory.createForClass(Setting);
