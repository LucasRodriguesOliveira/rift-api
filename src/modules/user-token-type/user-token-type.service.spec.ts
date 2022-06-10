import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateUserTokenTypeDto } from './dto/create-user-token-type.dto';
import {
  UserTokenType,
  UserTokenTypeDocument,
} from './model/user-token-type.model';
import { UserTokenTypeDuration } from './user-token-type.enum';
import { UserTokenTypeService } from './user-token-type.service';

jest.mock('mongoose');

describe(UserTokenTypeService.name, function () {
  let userTokenTypeService: UserTokenTypeService;
  let userTokenTypeModel: jest.Mocked<Model<UserTokenTypeDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserTokenTypeService,
        {
          provide: getModelToken(UserTokenType.name),
          useValue: Model,
        },
      ],
    }).compile();

    userTokenTypeService =
      moduleRef.get<UserTokenTypeService>(UserTokenTypeService);
    userTokenTypeModel = moduleRef.get<
      jest.Mocked<Model<UserTokenTypeDocument>>
    >(getModelToken(UserTokenType.name));
  });

  it('should be defined', () => {
    expect(userTokenTypeModel).toBeDefined();
    expect(userTokenTypeService).toBeDefined();
  });

  describe('Find By Id', function () {
    const userTokenTypeMockFindResult: UserTokenType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
      duration: UserTokenTypeDuration.ONE_DAY,
    };

    const idToSearch = '1';

    it('should return successfully a userTokenType', async () => {
      userTokenTypeModel.findById.mockResolvedValue(
        userTokenTypeMockFindResult,
      );

      const result = await userTokenTypeService.find(idToSearch);

      expect(userTokenTypeModel.findById).toHaveBeenCalled();
      expect(result).toBe(userTokenTypeMockFindResult);
    });
  });

  describe('Create new User Type', function () {
    const userTokenTypeMockResult: UserTokenType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
      duration: UserTokenTypeDuration.ONE_DAY,
    };

    const createUserTokenTypeDto: CreateUserTokenTypeDto = {
      description: 'new descripton',
      duration: UserTokenTypeDuration.FIVE_DAYS,
    };

    it('should create successfully a userTokenType', async () => {
      userTokenTypeModel.create.mockImplementation(
        () => userTokenTypeMockResult,
      );

      const result = await userTokenTypeService.create(createUserTokenTypeDto);

      expect(userTokenTypeModel.create).toHaveBeenCalled();
      expect(result).toBe(userTokenTypeMockResult);
    });
  });

  describe('List User Token Types', function () {
    const userTokenTypeActiveList: UserTokenType[] = [
      {
        description: 'Test - 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isExcluded: false,
        duration: UserTokenTypeDuration.ONE_DAY,
      },
      {
        description: 'Test - 3',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isExcluded: false,
        duration: UserTokenTypeDuration.ONE_DAY,
      },
    ];
    const userTokenTypeAllStatusList: UserTokenType[] = [
      ...userTokenTypeActiveList,
      {
        description: 'Test - 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: false,
        isExcluded: false,
        duration: UserTokenTypeDuration.ONE_DAY,
      },
      {
        description: 'Test - 4',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: false,
        isExcluded: false,
        duration: UserTokenTypeDuration.ONE_DAY,
      },
    ];

    it('should successfully get all active userTokenType', async () => {
      userTokenTypeModel.find.mockResolvedValueOnce(userTokenTypeActiveList);

      const result = await userTokenTypeService.list(false);

      expect(userTokenTypeModel.find).toHaveBeenCalled();
      expect(result).toBe(userTokenTypeActiveList);
    });

    it('should successfully get all userTokenType', async () => {
      userTokenTypeModel.find.mockResolvedValueOnce(userTokenTypeAllStatusList);

      const result = await userTokenTypeService.list(true);

      expect(userTokenTypeModel.find).toHaveBeenCalled();
      expect(result).toBe(userTokenTypeAllStatusList);
    });
  });

  describe('Update a existing user token type', function () {
    const userTokenTypeMockResultDescriptionUpdated: UserTokenType = {
      description: 'Test - updated',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
      duration: UserTokenTypeDuration.ONE_DAY,
    };
    const userTokenTypeMockResultStatusUpdated: UserTokenType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      isExcluded: false,
      duration: UserTokenTypeDuration.ONE_DAY,
    };
    const userTokenTypeMockResultDurationUpdated: UserTokenType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      isExcluded: false,
      duration: UserTokenTypeDuration.FORTNIGHT,
    };

    const idToUpdate = '1';
    const newDescription = 'Test - updated';
    const newStatus = false;
    const newDuration = UserTokenTypeDuration.FORTNIGHT;

    it('should update successfully a userTokenType description and return the new userTokenType', async () => {
      userTokenTypeModel.findById.mockResolvedValueOnce(
        userTokenTypeMockResultDescriptionUpdated,
      );

      const result = await userTokenTypeService.updateDescription(
        idToUpdate,
        newDescription,
      );

      expect(userTokenTypeModel.findById).toHaveBeenCalledWith<string[]>(
        idToUpdate,
      );
      expect(result).toBe(userTokenTypeMockResultDescriptionUpdated);
    });

    it('should update successfully a userTokenType status and return the new userTokenType', async () => {
      userTokenTypeModel.findById.mockResolvedValueOnce(
        userTokenTypeMockResultStatusUpdated,
      );

      const result = await userTokenTypeService.updateStatus(
        idToUpdate,
        newStatus,
      );

      expect(userTokenTypeModel.findById).toHaveBeenCalledWith<string[]>(
        idToUpdate,
      );
      expect(result).toBe(userTokenTypeMockResultStatusUpdated);
    });

    it('should update successfully a userTokenType duration and return the new userTokenType', async () => {
      userTokenTypeModel.findById.mockResolvedValueOnce(
        userTokenTypeMockResultDurationUpdated,
      );

      const result = await userTokenTypeService.updateDuration(
        idToUpdate,
        newDuration,
      );

      expect(userTokenTypeModel.findById).toHaveBeenCalledWith<string[]>(
        idToUpdate,
      );
      expect(result).toBe(userTokenTypeMockResultDurationUpdated);
    });
  });

  describe('Deletes a existing userTokenType', function () {
    const idToDelete = '1';
    const findUserTokenTypeResult = {
      isExcluded: true,
    };

    it('should delete successfully a userTokenType', async () => {
      userTokenTypeModel.findById.mockResolvedValueOnce(
        findUserTokenTypeResult,
      );

      const result = await userTokenTypeService.delete(idToDelete);

      expect(userTokenTypeModel.updateOne).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
  });
});
