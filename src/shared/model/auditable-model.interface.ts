export interface AuditableModelInterface {
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isExcluded: boolean;
}
