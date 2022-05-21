import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  UserTokenType,
  UserTokenTypeDocument,
} from './model/user-token-type.model';
import { UserTokenTypeResolver } from './user-token-type.resolver';
import { UserTokenTypeService } from './user-token-type.service';

jest.mock('mongoose');

describe(UserTokenTypeResolver.name, function () {
  let userTokenTypeResolver: UserTokenTypeResolver;
  let userTokenTypeService: UserTokenTypeService;
  let userTokenTypeModel: jest.Mocked<Model<UserTokenTypeDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserTokenTypeResolver,
        UserTokenTypeService,
        {
          provide: getModelToken(UserTokenType.name),
          useValue: Model,
        },
      ],
    }).compile();

    userTokenTypeResolver = moduleRef.get<UserTokenTypeResolver>(
      UserTokenTypeResolver,
    );
    userTokenTypeService =
      moduleRef.get<UserTokenTypeService>(UserTokenTypeService);
    userTokenTypeModel = moduleRef.get<
      jest.Mocked<Model<UserTokenTypeDocument>>
    >(getModelToken(UserTokenType.name));
  });

  it('should be defined', () => {
    expect(userTokenTypeModel).toBeDefined();
    expect(userTokenTypeService).toBeDefined();
    expect(userTokenTypeResolver).toBeDefined();
  });

  describe('Find By Id', function () {
    const userTokenTypeMockFindResult: UserTokenType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const idToSearch = '1';

    it('should return successfully a userTokenType', async () => {
      userTokenTypeModel.findById.mockResolvedValue(
        userTokenTypeMockFindResult,
      );

      const result = await userTokenTypeResolver.find(idToSearch);

      expect(userTokenTypeModel.findById).toHaveBeenCalled();
      expect(result).toBe(userTokenTypeMockFindResult);
    });
  });

  describe('Create new UserTokenType', function () {
    const userTokenTypeMockResult: UserTokenType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const descriptionToCreate = 'Test';

    it('should create successfully a userTokenType', async () => {
      userTokenTypeModel.create.mockImplementation(
        () => userTokenTypeMockResult,
      );

      const result = await userTokenTypeResolver.create(descriptionToCreate);

      expect(userTokenTypeModel.create).toHaveBeenCalled();
      expect(result).toBe(userTokenTypeMockResult);
    });
  });

  describe('List UserTokenTypes', function () {
    const userTokenTypeActiveList: UserTokenType[] = [
      {
        description: 'Test - 1',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isExcluded: false,
      },
      {
        description: 'Test - 3',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isExcluded: false,
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
      },
      {
        description: 'Test - 4',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: false,
        isExcluded: false,
      },
    ];

    it('should successfully get all active userTokenType', async () => {
      userTokenTypeModel.find.mockResolvedValueOnce(userTokenTypeActiveList);

      const result = await userTokenTypeResolver.list(false);

      expect(userTokenTypeModel.find).toHaveBeenCalled();
      expect(result).toBe(userTokenTypeActiveList);
    });

    it('should successfully get all userTokenType', async () => {
      userTokenTypeModel.find.mockResolvedValueOnce(userTokenTypeAllStatusList);

      const result = await userTokenTypeResolver.list(true);

      expect(userTokenTypeModel.find).toHaveBeenCalled();
      expect(result).toBe(userTokenTypeAllStatusList);
    });
  });

  describe('Update a existing user type', function () {
    const userTokenTypeMockResultDescriptionUpdated: UserTokenType = {
      description: 'Test - updated',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };
    const userTokenTypeMockResultStatusUpdated: UserTokenType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      isExcluded: false,
    };

    const idToUpdate = '1';
    const newDescription = 'Test - updated';
    const newStatus = false;

    it('should update successfully a userTokenType description and return the new userTokenType', async () => {
      userTokenTypeModel.findById.mockResolvedValueOnce(
        userTokenTypeMockResultDescriptionUpdated,
      );

      const result = await userTokenTypeResolver.updateDescription(
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

      const result = await userTokenTypeResolver.updateStatus(
        idToUpdate,
        newStatus,
      );

      expect(userTokenTypeModel.findById).toHaveBeenCalledWith<string[]>(
        idToUpdate,
      );
      expect(result).toBe(userTokenTypeMockResultStatusUpdated);
    });
  });

  describe('Deletes a existing userTokenType', function () {
    const idToDelete = '1';
    const findModuleResult = {
      isExcluded: true,
    };

    it('should delete successfully a userTokenType', async () => {
      userTokenTypeModel.findById.mockResolvedValueOnce(findModuleResult);

      const result = await userTokenTypeResolver.remove(idToDelete);

      expect(userTokenTypeModel.updateOne).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
  });
});
