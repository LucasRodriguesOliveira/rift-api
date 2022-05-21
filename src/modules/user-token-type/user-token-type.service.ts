import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserTokenType,
  UserTokenTypeDocument,
} from './model/user-token-type.model';

@Injectable()
export class UserTokenTypeService {
  constructor(
    @InjectModel(UserTokenType.name)
    private readonly userTokenTypeModel: Model<UserTokenTypeDocument>,
  ) {}

  public async create(description: string): Promise<UserTokenType> {
    return this.userTokenTypeModel.create({ description });
  }

  public async find(id: string): Promise<UserTokenType> {
    return this.userTokenTypeModel.findById(id);
  }

  public async list(showInactive: boolean): Promise<UserTokenType[]> {
    return this.userTokenTypeModel.find({
      isExcluded: false,
      ...(showInactive ? {} : { isActive: true }),
    });
  }

  public async updateDescription(
    id: string,
    description: string,
  ): Promise<UserTokenType> {
    await this.userTokenTypeModel.updateOne(
      { _id: id },
      { $set: { description } },
    );

    return this.userTokenTypeModel.findById(id);
  }

  public async updateStatus(
    id: string,
    isActive: boolean,
  ): Promise<UserTokenType> {
    await this.userTokenTypeModel.updateOne(
      { _id: id },
      { $set: { isActive } },
    );

    return this.userTokenTypeModel.findById(id);
  }

  public async delete(id: string): Promise<boolean> {
    await this.userTokenTypeModel.updateOne(
      { _id: id },
      { $set: { isExcluded: true } },
    );

    const { isExcluded } = await this.userTokenTypeModel.findById(id);

    return isExcluded;
  }
}
