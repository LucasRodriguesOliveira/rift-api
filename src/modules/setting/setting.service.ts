import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Setting, SettingDocument } from './model/setting.model';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name)
    private readonly settingModel: Model<SettingDocument>,
  ) {}

  public async create(description: string): Promise<Setting> {
    return this.settingModel.create({ description });
  }

  public async find(id: string): Promise<Setting> {
    return this.settingModel.findById(id);
  }

  public async list(showInactive: boolean): Promise<Setting[]> {
    return this.settingModel.find({
      isExcluded: false,
      ...(showInactive ? {} : { isActive: true }),
    });
  }

  public async updateDescription(
    id: string,
    description: string,
  ): Promise<Setting> {
    await this.settingModel.updateOne({ _id: id }, { $set: { description } });

    return this.settingModel.findById(id);
  }

  public async updateStatus(id: string, isActive: boolean): Promise<Setting> {
    await this.settingModel.updateOne({ _id: id }, { $set: { isActive } });

    return this.settingModel.findById(id);
  }

  public async delete(id: string): Promise<boolean> {
    await this.settingModel.updateOne(
      { _id: id },
      { $set: { isExcluded: true } },
    );

    const { isExcluded } = await this.settingModel.findById(id);

    return isExcluded;
  }
}
