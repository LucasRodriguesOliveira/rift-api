import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class UserType {
  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  isActive: boolean;

  @Prop()
  isExcluded: boolean;
}

export type UserTypeDocument = UserType & Document;

export const UserTypeSchema = SchemaFactory.createForClass(UserType);
