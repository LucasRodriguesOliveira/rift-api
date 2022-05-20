import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SimpleAuditableModel } from '../../../shared/model/simple-auditable.model';

@Schema({ timestamps: true })
export class Module extends SimpleAuditableModel {}

export type ModuleDocument = Module & Document;

export const ModuleSchema = SchemaFactory.createForClass(Module);
