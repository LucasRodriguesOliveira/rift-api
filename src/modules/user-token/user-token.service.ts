import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserToken, UserTokenDocument } from './model/user-token.model';
import { UserTokenTypeDuration } from '../user-token-type/user-token-type.enum';

@Injectable()
export class UserTokenService {
  constructor(
    @InjectModel(UserToken.name)
    private readonly userTokenModel: Model<UserTokenDocument>,
  ) {}

  private createExpireDate(duration: UserTokenTypeDuration): Date {
    const expireDate = new Date();
    switch (duration) {
      case UserTokenTypeDuration.ONE_MONTH:
        expireDate.setMonth(expireDate.getMonth() + 1);
      default:
        expireDate.setDate(expireDate.getDate() + duration);
    }

    return expireDate;
  }

  public async create(
    userId: string,
    tokenTypeId: string,
    duration: number,
  ): Promise<UserToken> {
    return this.userTokenModel.create({
      userId,
      tokenTypeId: tokenTypeId,
      expiresAt: this.createExpireDate(duration),
    });
  }

  public async find(token: string): Promise<UserToken> {
    const [userToken] = await this.userTokenModel.find({ token });

    return userToken;
  }
}
