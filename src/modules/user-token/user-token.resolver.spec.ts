import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  UserTokenType,
  UserTokenTypeDocument,
} from '../user-token-type/model/user-token-type.model';
import { UserTokenTypeDuration } from '../user-token-type/user-token-type.enum';
import { UserTokenTypeService } from '../user-token-type/user-token-type.service';
import { CreateUserTokenDto } from './dto/create-user-token.dto';
import { UserToken, UserTokenDocument } from './model/user-token.model';
import { UserTokenResolver } from './user-token.resolver';
import { UserTokenService } from './user-token.service';

jest.mock('mongoose');

describe(UserTokenResolver.name, function () {
  let userTokenResolver: UserTokenResolver;
  let userTokenService: UserTokenService;
  let userTokenTypeService: UserTokenTypeService;
  let userTokenTypeModel: jest.Mocked<Model<UserTokenTypeDocument>>;
  let userTokenModel: jest.Mocked<Model<UserTokenDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserTokenResolver,
        UserTokenService,
        UserTokenTypeService,
        {
          provide: getModelToken(UserToken.name),
          useValue: Model,
        },
        {
          provide: getModelToken(UserTokenType.name),
          useValue: Model,
        },
      ],
    }).compile();

    userTokenResolver = moduleRef.get<UserTokenResolver>(UserTokenResolver);
    userTokenService = moduleRef.get<UserTokenService>(UserTokenService);
    userTokenTypeService =
      moduleRef.get<UserTokenTypeService>(UserTokenTypeService);
    userTokenModel = moduleRef.get<jest.Mocked<Model<UserTokenDocument>>>(
      getModelToken(UserToken.name),
    );
    userTokenTypeModel = moduleRef.get<
      jest.Mocked<Model<UserTokenTypeDocument>>
    >(getModelToken(UserTokenType.name));
  });

  it('should be defined', () => {
    expect(userTokenModel).toBeDefined();
    expect(userTokenTypeModel).toBeDefined();
    expect(userTokenTypeService).toBeDefined();
    expect(userTokenService).toBeDefined();
    expect(userTokenResolver).toBeDefined();
  });

  describe('Creates a new User Token', () => {
    const userId = '1';
    const tokenTypeId = '1';
    const duration = UserTokenTypeDuration.FORTNIGHT;
    const userToken: UserToken = {
      token: 'token',
      expiresAt: new Date(),
      tokenTypeId: '1',
      userId: '1',
    };
    const userTokenType: UserTokenType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
      duration,
    };

    const createUserTokenDto: CreateUserTokenDto = {
      userId,
      tokenTypeId,
    };

    beforeEach(() => {
      userToken.expiresAt.setDate(userToken.expiresAt.getDate() + duration);
    });

    it('should create a new user token', async () => {
      userTokenModel.create.mockImplementationOnce(() => userToken);
      userTokenTypeModel.findById.mockResolvedValueOnce(userTokenType);

      const result = await userTokenResolver.create(createUserTokenDto);

      expect(userTokenTypeModel.findById).toHaveBeenCalled();
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

      const result = await userTokenResolver.find(tokenToSearch);

      expect(userTokenModel.find).toHaveBeenCalled();
      expect(result).toBe(userToken);
    });
  });
});
