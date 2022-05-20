import { Prop } from '@nestjs/mongoose';
import { AuditableModelInterface } from './auditable-model.interface';

export abstract class AuditableModel implements AuditableModelInterface {
  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop({ default: new Date() })
  updatedAt: Date;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isExcluded: boolean;
}
