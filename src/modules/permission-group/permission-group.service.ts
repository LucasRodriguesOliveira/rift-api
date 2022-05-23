import { Model, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PermissionGroup,
  PermissionGroupDocument,
} from './model/permission-group.model';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { ListPermissionGroupDto } from './dto/list-permission-group.dto';
import { createSearchFromDto } from '../../shared/utils';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';

@Injectable()
export class PermissionGroupService {
  constructor(
    @InjectModel(PermissionGroup.name)
    private readonly permissionGroupModel: Model<PermissionGroupDocument>,
  ) {}

  public async create(
    createPermissionGroupDto: CreatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    return this.permissionGroupModel.create(createPermissionGroupDto);
  }

  public async find(id: string): Promise<PermissionGroup> {
    return this.permissionGroupModel.findById(id);
  }

  public async list(
    listPermissionGroupDto: ListPermissionGroupDto,
  ): Promise<PermissionGroup[]> {
    const { options } = listPermissionGroupDto;
    const search: FilterQuery<PermissionGroupDocument> = {
      isExcluded: false,
      ...createSearchFromDto<ListPermissionGroupDto>(listPermissionGroupDto, [
        'options',
      ]),

      ...(options.showInactive ? {} : { isActive: true }),
    };

    return this.permissionGroupModel.find(search);
  }

  public async update(
    id: string,
    updatePermissionGroupDto: UpdatePermissionGroupDto,
  ): Promise<PermissionGroup> {
    await this.permissionGroupModel.updateOne(
      { _id: id },
      updatePermissionGroupDto,
    );

    return this.permissionGroupModel.findById(id);
  }

  public async delete(id: string) {
    await this.permissionGroupModel.updateOne(
      { _id: id },
      { isExcluded: true },
    );

    const { isExcluded } = await this.permissionGroupModel.findById(id);

    return isExcluded;
  }
}
