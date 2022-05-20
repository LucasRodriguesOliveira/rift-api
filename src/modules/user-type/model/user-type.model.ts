import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SimpleAuditableModel } from '../../../shared/model/simple-auditable.model';

@Schema({ timestamps: true })
export class UserType extends SimpleAuditableModel {}

export type UserTypeDocument = UserType & Document;

export const UserTypeSchema = SchemaFactory.createForClass(UserType);
