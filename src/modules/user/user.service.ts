import { Model, FilterQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { ListUserDto } from './dto/list-user.dto';
import { createSearchFromDto } from '../../shared/utils';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await this.hashPassword(createUserDto.password);

    return this.userModel.create({
      ...createUserDto,
      password: passwordHash,
    });
  }

  public async find(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  public async list(listUserDto: ListUserDto): Promise<User[]> {
    const search: FilterQuery<UserDocument> = createSearchFromDto(listUserDto, [
      'options',
    ]);

    return this.userModel.find({
      ...search,
      name: new RegExp(search.name),
    });
  }

  public async updateName(id: string, newName: string): Promise<User> {
    await this.userModel.updateOne({ _id: id }, { $set: { name: newName } });

    return this.userModel.findById(id);
  }

  public async delete(id: string): Promise<boolean> {
    await this.userModel.deleteOne({ _id: id });

    const user = await this.userModel.findById(id);

    return !user;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt();

    return hash(password, salt);
  }
}
