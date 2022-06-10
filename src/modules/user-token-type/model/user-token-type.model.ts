import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SimpleAuditableModel } from '../../../shared/model/simple-auditable.model';

@Schema({ timestamps: true })
export class UserTokenType extends SimpleAuditableModel {
  @Prop({ required: true })
  duration: number;
}

export type UserTokenTypeDocument = UserTokenType & Document;

export const UserTokenTypeSchema = SchemaFactory.createForClass(UserTokenType);
