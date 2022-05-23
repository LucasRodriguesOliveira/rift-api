import { ListPermissionGroupOptions } from './list-permission-group-options.interface';

export class ListPermissionGroupDto {
  typeId?: string;
  permissionId?: string;
  moduleId?: string;
  options?: ListPermissionGroupOptions;
}
