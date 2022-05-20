import { Prop } from '@nestjs/mongoose';
import { AuditableModelInterface } from './auditable-model.interface';
import { DescriptionModelInterface } from './descrition-model.interface';

export abstract class SimpleAuditableModel
  implements DescriptionModelInterface, AuditableModelInterface
{
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
