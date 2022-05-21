import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './model/permission.model';
import { PermissionService } from './permission.service';

jest.mock('mongoose');

describe(PermissionService.name, function () {
  let permissionService: PermissionService;
  let permissionModel: jest.Mocked<Model<PermissionDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: getModelToken(Permission.name),
          useValue: Model,
        },
      ],
    }).compile();

    permissionService = moduleRef.get<PermissionService>(PermissionService);
    permissionModel = moduleRef.get<jest.Mocked<Model<PermissionDocument>>>(
      getModelToken(Permission.name),
    );
  });

  it('should be defined', () => {
    expect(permissionModel).toBeDefined();
    expect(permissionService).toBeDefined();
  });

  describe('Find By Id', function () {
    const permissionMockFindResult: Permission = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const idToSearch = '1';

    it('should return successfully a permission', async () => {
      permissionModel.findById.mockResolvedValue(permissionMockFindResult);

      const result = await permissionService.find(idToSearch);

      expect(permissionModel.findById).toHaveBeenCalled();
      expect(result).toBe(permissionMockFindResult);
    });
  });

  describe('Create new Permission', function () {
    const permissionMockResult: Permission = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const descriptionToCreate = 'Test';

    it('should create successfully a permission', async () => {
      permissionModel.create.mockImplementation(() => permissionMockResult);

      const result = await permissionService.create(descriptionToCreate);

      expect(permissionModel.create).toHaveBeenCalled();
      expect(result).toBe(permissionMockResult);
    });
  });

  describe('List Permissions', function () {
    const permissionActiveList: Permission[] = [
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
    const permissionAllStatusList: Permission[] = [
      ...permissionActiveList,
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

    it('should successfully get all active permission', async () => {
      permissionModel.find.mockResolvedValueOnce(permissionActiveList);

      const result = await permissionService.list(false);

      expect(permissionModel.find).toHaveBeenCalled();
      expect(result).toBe(permissionActiveList);
    });

    it('should successfully get all permissions', async () => {
      permissionModel.find.mockResolvedValueOnce(permissionAllStatusList);

      const result = await permissionService.list(true);

      expect(permissionModel.find).toHaveBeenCalled();
      expect(result).toBe(permissionAllStatusList);
    });
  });

  describe('Update a existing Permission', function () {
    const permissionMockResultDescriptionUpdated: Permission = {
      description: 'Test - updated',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };
    const permissionMockResultStatusUpdated: Permission = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      isExcluded: false,
    };

    const idToUpdate = '1';
    const newDescription = 'Test - updated';
    const newStatus = false;

    it('should update successfully a permission description and return the new permission', async () => {
      permissionModel.findById.mockResolvedValueOnce(
        permissionMockResultDescriptionUpdated,
      );

      const result = await permissionService.updateDescription(
        idToUpdate,
        newDescription,
      );

      expect(permissionModel.findById).toHaveBeenCalledWith<string[]>(
        idToUpdate,
      );
      expect(result).toBe(permissionMockResultDescriptionUpdated);
    });

    it('should update successfully a permission status and return the new permission', async () => {
      permissionModel.findById.mockResolvedValueOnce(
        permissionMockResultStatusUpdated,
      );

      const result = await permissionService.updateStatus(
        idToUpdate,
        newStatus,
      );

      expect(permissionModel.findById).toHaveBeenCalledWith<string[]>(
        idToUpdate,
      );
      expect(result).toBe(permissionMockResultStatusUpdated);
    });
  });

  describe('Deletes a existing permission', function () {
    const idToDelete = '1';
    const findPermissionResult = {
      isExcluded: true,
    };

    it('should delete successfully a permission', async () => {
      permissionModel.findById.mockResolvedValueOnce(findPermissionResult);

      const result = await permissionService.delete(idToDelete);

      expect(permissionModel.updateOne).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
  });
});
