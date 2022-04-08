import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType, UserTypeDocument } from './entity/user-type.entity';

@Injectable()
export class UserTypeService {
  constructor(
    @InjectModel(UserType.name)
    private readonly userTypeModel: Model<UserTypeDocument>,
  ) {}

  async create(description: string): Promise<UserType> {
    const userType = new this.userTypeModel({ description });

    return userType.save();
  }

  async find(id: string): Promise<UserType> {
    return this.userTypeModel.findById(id);
  }

  async list(): Promise<UserType[]> {
    return this.userTypeModel.find({});
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
    const { modifiedCount } = await this.userTypeModel.updateOne(
      { _id: id },
      { $set: { isExcluded: true } },
    );

    return !!modifiedCount;
  }
}
