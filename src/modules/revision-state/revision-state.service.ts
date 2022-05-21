import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  RevisionState,
  RevisionStateDocument,
} from './model/revision-state.model';

@Injectable()
export class RevisionStateService {
  constructor(
    @InjectModel(RevisionState.name)
    private readonly revisionStateModel: Model<RevisionStateDocument>,
  ) {}

  public async create(description: string): Promise<RevisionState> {
    return this.revisionStateModel.create({ description });
  }

  public async find(id: string): Promise<RevisionState> {
    return this.revisionStateModel.findById(id);
  }

  public async list(showInactive: boolean): Promise<RevisionState[]> {
    return this.revisionStateModel.find({
      isExcluded: false,
      ...(showInactive ? {} : { isActive: true }),
    });
  }

  public async updateDescription(
    id: string,
    description: string,
  ): Promise<RevisionState> {
    await this.revisionStateModel.updateOne(
      { _id: id },
      { $set: { description } },
    );

    return this.revisionStateModel.findById(id);
  }

  public async updateStatus(
    id: string,
    isActive: boolean,
  ): Promise<RevisionState> {
    await this.revisionStateModel.updateOne(
      { _id: id },
      { $set: { isActive } },
    );

    return this.revisionStateModel.findById(id);
  }

  public async delete(id: string): Promise<boolean> {
    await this.revisionStateModel.updateOne(
      { _id: id },
      { $set: { isExcluded: true } },
    );

    const { isExcluded } = await this.revisionStateModel.findById(id);

    return isExcluded;
  }
}
