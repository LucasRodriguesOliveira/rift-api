import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserToken {
  @Prop({ required: true, maxlength: 100 })
  token: string;

  @Prop({ required: true, maxlength: 100 })
  tokenTypeId: string;

  @Prop({ required: true, maxlength: 100 })
  userId: string;

  @Prop({ required: true, maxlength: 100 })
  expiresAt: Date;
}

export type UserTokenDocument = UserToken & Document;

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);
