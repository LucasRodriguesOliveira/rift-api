import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module, ModuleDocument } from './model/module.model';

@Injectable()
export class ModuleService {
  constructor(
    @InjectModel(Module.name)
    private readonly moduleModel: Model<ModuleDocument>,
  ) {}

  async create(description: string): Promise<Module> {
    return this.moduleModel.create({ description });
  }

  async find(id: string): Promise<Module> {
    return this.moduleModel.findById(id);
  }

  async list(showInactive: boolean): Promise<Module[]> {
    return this.moduleModel.find({
      isExcluded: false,
      ...(showInactive ? {} : { isActive: true }),
    });
  }

  async updateDescription(id: string, description: string): Promise<Module> {
    await this.moduleModel.updateOne({ _id: id }, { $set: { description } });

    return this.moduleModel.findById(id);
  }

  async updateStatus(id: string, isActive: boolean): Promise<Module> {
    await this.moduleModel.updateOne({ _id: id }, { $set: { isActive } });

    return this.moduleModel.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    await this.moduleModel.updateOne(
      { _id: id },
      { $set: { isExcluded: true } },
    );

    const { isExcluded } = await this.moduleModel.findById(id);

    return isExcluded;
  }
}
