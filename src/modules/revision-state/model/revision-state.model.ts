import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SimpleAuditableModel } from '../../../shared/model/simple-auditable.model';

@Schema({ timestamps: true })
export class RevisionState extends SimpleAuditableModel {}

export type RevisionStateDocument = RevisionState & Document;

export const RevisionStateSchema = SchemaFactory.createForClass(RevisionState);
