import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserType, UserTypeDocument } from './model/user-type.model';
import { UserTypeResolver } from './user-type.resolver';
import { UserTypeService } from './user-type.service';

jest.mock('mongoose');

describe(UserTypeResolver.name, function () {
  let userTypeResolver: UserTypeResolver;
  let userTypeService: UserTypeService;
  let userTypeModel: jest.Mocked<Model<UserTypeDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserTypeResolver,
        UserTypeService,
        {
          provide: getModelToken(UserType.name),
          useValue: Model,
        },
      ],
    }).compile();

    userTypeResolver = moduleRef.get<UserTypeResolver>(UserTypeResolver);
    userTypeService = moduleRef.get<UserTypeService>(UserTypeService);
    userTypeModel = moduleRef.get<jest.Mocked<Model<UserTypeDocument>>>(
      getModelToken(UserType.name),
    );
  });

  it('should be defined', () => {
    expect(userTypeModel).toBeDefined();
    expect(userTypeService).toBeDefined();
    expect(userTypeResolver).toBeDefined();
  });

  describe('Find By Id', function () {
    const userTypeMockFindResult: UserType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const idToSearch = '1';

    it('should return successfully a userType', async () => {
      userTypeModel.findById.mockResolvedValue(userTypeMockFindResult);

      const result = await userTypeResolver.findUserType(idToSearch);

      expect(userTypeModel.findById).toHaveBeenCalled();
      expect(result).toBe(userTypeMockFindResult);
    });
  });

  describe('Create new User Type', function () {
    const userTypeMockResult: UserType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const descriptionToCreate = 'Test';

    it('should create successfully a userType', async () => {
      userTypeModel.create.mockImplementation(() => userTypeMockResult);

      const result = await userTypeResolver.create(descriptionToCreate);

      expect(userTypeModel.create).toHaveBeenCalled();
      expect(result).toBe(userTypeMockResult);
    });
  });

  describe('List User Types', function () {
    const userTypeActiveList: UserType[] = [
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
    const userTypeAllStatusList: UserType[] = [
      ...userTypeActiveList,
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

    it('should successfully get all active userType', async () => {
      userTypeModel.find.mockResolvedValueOnce(userTypeActiveList);

      const result = await userTypeResolver.getUserTypeList(false);

      expect(userTypeModel.find).toHaveBeenCalled();
      expect(result).toBe(userTypeActiveList);
    });

    it('should successfully get all userType', async () => {
      userTypeModel.find.mockResolvedValueOnce(userTypeAllStatusList);

      const result = await userTypeResolver.getUserTypeList(true);

      expect(userTypeModel.find).toHaveBeenCalled();
      expect(result).toBe(userTypeAllStatusList);
    });
  });

  describe('Update a existing user type', function () {
    const userTypeMockResultDescriptionUpdated: UserType = {
      description: 'Test - updated',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };
    const userTypeMockResultStatusUpdated: UserType = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      isExcluded: false,
    };

    const idToUpdate = '1';
    const newDescription = 'Test - updated';
    const newStatus = false;

    it('should update successfully a userType description and return the new userType', async () => {
      userTypeModel.findById.mockResolvedValueOnce(
        userTypeMockResultDescriptionUpdated,
      );

      const result = await userTypeResolver.updateDescription(
        idToUpdate,
        newDescription,
      );

      expect(userTypeModel.findById).toHaveBeenCalledWith<string[]>(idToUpdate);
      expect(result).toBe(userTypeMockResultDescriptionUpdated);
    });

    it('should update successfully a userType status and return the new userType', async () => {
      userTypeModel.findById.mockResolvedValueOnce(
        userTypeMockResultStatusUpdated,
      );

      const result = await userTypeResolver.updateIsActive(
        idToUpdate,
        newStatus,
      );

      expect(userTypeModel.findById).toHaveBeenCalledWith<string[]>(idToUpdate);
      expect(result).toBe(userTypeMockResultStatusUpdated);
    });
  });

  describe('Deletes a existing usetType', function () {
    const idToDelete = '1';
    const findUserTypeResult = {
      isExcluded: true,
    };

    it('should delete successfully a userType', async () => {
      userTypeModel.findById.mockResolvedValueOnce(findUserTypeResult);

      const result = await userTypeResolver.delete(idToDelete);

      expect(userTypeModel.updateOne).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
  });
});
