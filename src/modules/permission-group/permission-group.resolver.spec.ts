import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { createMockList } from '../../shared/utils';
import { ListPermissionGroupDto } from './dto/list-permission-group.dto';
import {
  PermissionGroup,
  PermissionGroupDocument,
} from './model/permission-group.model';
import { PermissionGroupResolver } from './permission-group.resolver';
import { PermissionGroupService } from './permission-group.service';

jest.mock('mongoose');

describe(PermissionGroupService.name, function () {
  let permissionGroupResolver: PermissionGroupResolver;
  let permissionGroupService: PermissionGroupService;
  let permissionGroupModel: jest.Mocked<Model<PermissionGroupDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionGroupResolver,
        PermissionGroupService,
        {
          provide: getModelToken(PermissionGroup.name),
          useValue: Model,
        },
      ],
    }).compile();

    permissionGroupResolver = moduleRef.get<PermissionGroupResolver>(
      PermissionGroupResolver,
    );
    permissionGroupService = moduleRef.get<PermissionGroupService>(
      PermissionGroupService,
    );
    permissionGroupModel = moduleRef.get<
      jest.Mocked<Model<PermissionGroupDocument>>
    >(getModelToken(PermissionGroup.name));
  });

  it('should be defined', () => {
    expect(permissionGroupModel).toBeDefined();
    expect(permissionGroupService).toBeDefined();
    expect(permissionGroupResolver).toBeDefined();
  });

  describe('Create a new Permission Group', () => {
    const permissionGroup = {
      typeId: '1',
      permissionId: '1',
      moduleId: '1',
    };

    it('should create a new permission group successfully', async () => {
      permissionGroupModel.create.mockImplementationOnce(() => permissionGroup);

      const result = await permissionGroupResolver.create(permissionGroup);

      expect(permissionGroupModel.create).toHaveBeenCalled();
      expect(result).toBe(permissionGroup);
    });
  });

  describe('Find a existing Permission Group by a id', () => {
    const permissionGroup: PermissionGroup = {
      typeId: 'typeId test',
      permissionId: 'permissionId test',
      moduleId: 'moduleId test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };
    const idToSearch = '1';

    it('should return a permission group from a id', async () => {
      permissionGroupModel.findById.mockResolvedValueOnce(permissionGroup);

      const result = await permissionGroupResolver.find(idToSearch);

      expect(permissionGroupModel.findById).toHaveBeenCalled();
      expect(result).toBe(permissionGroup);
    });
  });

  describe('List all the permission groups with filters', () => {
    const permissionGroupListQuantity = 10;
    const permissionGroups: PermissionGroup[] = createMockList<PermissionGroup>(
      permissionGroupListQuantity,
      (index: number) => ({
        moduleId: `${index + 1}`,
        typeId: `${index * 2}`,
        permissionId: `${index}`,
        isActive: true,
        isExcluded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    const filters: ListPermissionGroupDto = {
      moduleId: '1',
      permissionId: '1',
      typeId: '1',
      options: {
        showInactive: true,
      },
    };

    it('should list all the permission groups sucessfully', async () => {
      permissionGroupModel.find.mockResolvedValueOnce(permissionGroups);

      const result = await permissionGroupResolver.list(filters);

      expect(permissionGroupModel.find).toHaveBeenCalled();
      expect(result).toHaveLength(permissionGroupListQuantity);
      expect(result).toBe(permissionGroups);
    });
  });

  describe('Update a Permission Group', () => {
    const id = '1';
    const newTypeId = '1';
    const newStatus = false;

    const permissionGroupNewRules: PermissionGroup = {
      typeId: newTypeId,
      moduleId: '1',
      permissionId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const permissionGroupNewStatus: PermissionGroup = {
      typeId: '1',
      moduleId: '1',
      permissionId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: newStatus,
      isExcluded: false,
    };

    it('should update a permission group rules filtered by id', async () => {
      permissionGroupModel.findById.mockResolvedValueOnce(
        permissionGroupNewRules,
      );

      const result = await permissionGroupResolver.updateRules(id, {
        typeId: newTypeId,
      });

      expect(permissionGroupModel.findById).toHaveBeenCalledWith<string[]>(id);
      expect(result).toBe(permissionGroupNewRules);
    });

    it('should update a permission group status filtered by id', async () => {
      permissionGroupModel.findById.mockResolvedValueOnce(
        permissionGroupNewStatus,
      );

      const result = await permissionGroupResolver.updateStatus(id, {
        isActive: newStatus,
      });

      expect(permissionGroupModel.findById).toHaveBeenCalledWith<string[]>(id);
      expect(result).toBe(permissionGroupNewStatus);
    });
  });

  describe('Deletes a existing permission group by its id', () => {
    const idToDelete = '1';

    it('should delete a permission group and return true', async () => {
      permissionGroupModel.findById.mockResolvedValueOnce({
        isExcluded: true,
      });

      const result = await permissionGroupResolver.delete(idToDelete);

      expect(permissionGroupModel.findById).toHaveBeenCalledWith<string[]>(
        idToDelete,
      );
      expect(result).toBeTruthy();
    });
  });
});
