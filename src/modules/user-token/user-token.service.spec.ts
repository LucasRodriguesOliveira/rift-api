import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserTokenTypeDuration } from '../user-token-type/user-token-type.enum';
import { UserToken, UserTokenDocument } from './model/user-token.model';
import { UserTokenService } from './user-token.service';

jest.mock('mongoose');

describe(UserTokenService.name, function () {
  let userTokenService: UserTokenService;
  let userTokenModel: jest.Mocked<Model<UserTokenDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserTokenService,
        {
          provide: getModelToken(UserToken.name),
          useValue: Model,
        },
      ],
    }).compile();

    userTokenService = moduleRef.get<UserTokenService>(UserTokenService);
    userTokenModel = moduleRef.get<jest.Mocked<Model<UserTokenDocument>>>(
      getModelToken(UserToken.name),
    );
  });

  it('should be defined', () => {
    expect(userTokenModel).toBeDefined();
    expect(userTokenService).toBeDefined();
  });

  describe('Creates a new User Token', () => {
    const userToken: UserToken = {
      token: 'token',
      expiresAt: new Date(),
      tokenTypeId: '1',
      userId: '1',
    };

    const userId = '1';
    const tokenTypeId = '1';
    const duration = UserTokenTypeDuration.FORTNIGHT;

    beforeEach(() => {
      userToken.expiresAt.setDate(userToken.expiresAt.getDate() + duration);
    });

    it('should create a new user token', async () => {
      userTokenModel.create.mockImplementationOnce(() => userToken);

      const result = await userTokenService.create(
        userId,
        tokenTypeId,
        duration,
      );

      expect(userTokenModel.create).toHaveBeenCalled();
      expect(result).toBe(userToken);
    });
  });

  describe('Finds a existing User Token', () => {
    const tokenToSearch = 'token';
    const userToken: UserToken = {
      token: tokenToSearch,
      expiresAt: new Date(),
      tokenTypeId: '1',
      userId: '1',
    };

    it('should returns a user token', async () => {
      userTokenModel.find.mockResolvedValueOnce([userToken]);

      const result = await userTokenService.find(tokenToSearch);

      expect(userTokenModel.find).toHaveBeenCalled();
      expect(result).toBe(userToken);
    });
  });
});
