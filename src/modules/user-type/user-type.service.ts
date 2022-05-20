import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType, UserTypeDocument } from './model/user-type.model';

@Injectable()
export class UserTypeService {
  constructor(
    @InjectModel(UserType.name)
    private readonly userTypeModel: Model<UserTypeDocument>,
  ) {}

  async create(description: string): Promise<UserType> {
    return this.userTypeModel.create({ description });
  }

  async find(id: string): Promise<UserType> {
    return this.userTypeModel.findById(id);
  }

  async list(showInactive: boolean): Promise<UserType[]> {
    return this.userTypeModel.find({
      isExcluded: false,
      ...(showInactive ? {} : { isActive: true }),
    });
  }

  async updateDescription(id: string, description: string): Promise<UserType> {
    await this.userTypeModel.updateOne({ _id: id }, { $set: { description } });

    return this.userTypeModel.findById(id);
  }

  async updateIsActive(id: string, isActive: boolean): Promise<UserType> {
    await this.userTypeModel.updateOne({ _id: id }, { $set: { isActive } });

    return this.userTypeModel.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    await this.userTypeModel.updateOne(
      { _id: id },
      { $set: { isExcluded: true } },
    );

    const { isExcluded } = await this.userTypeModel.findById(id, 'isExcluded');

    return isExcluded;
  }
}
