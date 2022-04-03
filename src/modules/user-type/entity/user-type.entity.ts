import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserType {
  @Prop()
  description: string;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isExcluded: boolean;
}

export type UserTypeDocument = UserType & Document;

export const UserTypeSchema = SchemaFactory.createForClass(UserType);
