import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './model/permission.model';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  public async find(id: string): Promise<Permission> {
    return this.permissionModel.findById(id);
  }

  public async list(showInactive: boolean): Promise<Permission[]> {
    return this.permissionModel.find({
      isExcluded: false,
      ...(showInactive ? {} : { isActive: true }),
    });
  }

  public async create(description: string): Promise<Permission> {
    return this.permissionModel.create({ description });
  }

  public async updateDescription(
    id: string,
    description: string,
  ): Promise<Permission> {
    await this.permissionModel.updateOne(
      { _id: id },
      { $set: { description } },
    );

    return this.permissionModel.findById(id);
  }

  public async updateStatus(
    id: string,
    isActive: boolean,
  ): Promise<Permission> {
    await this.permissionModel.updateOne({ _id: id }, { $set: { isActive } });

    return this.permissionModel.findById(id);
  }

  public async delete(id: string): Promise<boolean> {
    await this.permissionModel.updateOne(
      { _id: id },
      { $set: { isExcluded: true } },
    );

    const { isExcluded } = await this.permissionModel.findById(id);

    return isExcluded;
  }
}
