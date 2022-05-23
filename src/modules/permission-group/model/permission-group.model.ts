import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuditableModel } from '../../../shared/model/auditable-model.model';

@Schema({ timestamps: true })
export class PermissionGroup extends AuditableModel {
  @Prop({ maxlength: 100, required: true })
  typeId: string;

  @Prop({ maxlength: 100, required: true })
  permissionId: string;

  @Prop({ maxlength: 100, required: true })
  moduleId: string;
}

export type PermissionGroupDocument = PermissionGroup & Document;

export const PermissionGroupSchema =
  SchemaFactory.createForClass(PermissionGroup);
