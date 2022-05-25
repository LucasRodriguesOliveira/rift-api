import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ maxlength: 100, required: true })
  name: string;

  @Prop({ maxlength: 100, required: true })
  typeId: string;

  @Prop({ maxlength: 100, required: true })
  email: string;

  @Prop({ maxlength: 100, required: true })
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
