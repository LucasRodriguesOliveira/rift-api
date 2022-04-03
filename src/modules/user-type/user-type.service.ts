import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserTypeDto } from './dto/createUserType.dto';
import { UserType, UserTypeDocument } from './entity/user-type.entity';

@Injectable()
export class UserTypeService {
  constructor(
    @InjectModel(UserType.name)
    private readonly userTypeModel: Model<UserTypeDocument>,
  ) {}

  async create(createUserTypeDto: CreateUserTypeDto): Promise<UserType> {
    const userType = new this.userTypeModel(createUserTypeDto);

    return userType.save();
  }

  async find(id: string): Promise<UserType> {
    return this.userTypeModel.findById(id);
  }

  async list(): Promise<UserType[]> {
    return this.userTypeModel.find({});
  }
}
