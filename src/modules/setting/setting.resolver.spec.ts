import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Setting, SettingDocument } from './model/setting.model';
import { SettingResolver } from './setting.resolver';
import { SettingService } from './setting.service';

jest.mock('mongoose');

describe(SettingResolver.name, function () {
  let settingResolver: SettingResolver;
  let settingService: SettingService;
  let settingModel: jest.Mocked<Model<SettingDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        SettingResolver,
        SettingService,
        {
          provide: getModelToken(Setting.name),
          useValue: Model,
        },
      ],
    }).compile();

    settingResolver = moduleRef.get<SettingResolver>(SettingResolver);
    settingService = moduleRef.get<SettingService>(SettingService);
    settingModel = moduleRef.get<jest.Mocked<Model<SettingDocument>>>(
      getModelToken(Setting.name),
    );
  });

  it('should be defined', () => {
    expect(settingModel).toBeDefined();
    expect(settingService).toBeDefined();
    expect(settingResolver).toBeDefined();
  });

  describe('Find By Id', function () {
    const settingMockFindResult: Setting = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const idToSearch = '1';

    it('should return successfully a setting', async () => {
      settingModel.findById.mockResolvedValue(settingMockFindResult);

      const result = await settingResolver.find(idToSearch);

      expect(settingModel.findById).toHaveBeenCalled();
      expect(result).toBe(settingMockFindResult);
    });
  });

  describe('Create new Setting', function () {
    const settingMockResult: Setting = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const descriptionToCreate = 'Test';

    it('should create successfully a setting', async () => {
      settingModel.create.mockImplementation(() => settingMockResult);

      const result = await settingResolver.create(descriptionToCreate);

      expect(settingModel.create).toHaveBeenCalled();
      expect(result).toBe(settingMockResult);
    });
  });

  describe('List Settings', function () {
    const settingActiveList: Setting[] = [
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
    const settingAllStatusList: Setting[] = [
      ...settingActiveList,
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

    it('should successfully get all active setting', async () => {
      settingModel.find.mockResolvedValueOnce(settingActiveList);

      const result = await settingResolver.list(false);

      expect(settingModel.find).toHaveBeenCalled();
      expect(result).toBe(settingActiveList);
    });

    it('should successfully get all setting', async () => {
      settingModel.find.mockResolvedValueOnce(settingAllStatusList);

      const result = await settingResolver.list(true);

      expect(settingModel.find).toHaveBeenCalled();
      expect(result).toBe(settingAllStatusList);
    });
  });

  describe('Update a existing setting', function () {
    const settingMockResultDescriptionUpdated: Setting = {
      description: 'Test - updated',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };
    const settingMockResultStatusUpdated: Setting = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      isExcluded: false,
    };

    const idToUpdate = '1';
    const newDescription = 'Test - updated';
    const newStatus = false;

    it('should update successfully a setting description and return the new setting', async () => {
      settingModel.findById.mockResolvedValueOnce(
        settingMockResultDescriptionUpdated,
      );

      const result = await settingResolver.updateDescription(
        idToUpdate,
        newDescription,
      );

      expect(settingModel.findById).toHaveBeenCalledWith<string[]>(idToUpdate);
      expect(result).toBe(settingMockResultDescriptionUpdated);
    });

    it('should update successfully a setting status and return the new setting', async () => {
      settingModel.findById.mockResolvedValueOnce(
        settingMockResultStatusUpdated,
      );

      const result = await settingResolver.updateStatus(idToUpdate, newStatus);

      expect(settingModel.findById).toHaveBeenCalledWith<string[]>(idToUpdate);
      expect(result).toBe(settingMockResultStatusUpdated);
    });
  });

  describe('Deletes a existing setting', function () {
    const idToDelete = '1';
    const findModuleResult = {
      isExcluded: true,
    };

    it('should delete successfully a setting', async () => {
      settingModel.findById.mockResolvedValueOnce(findModuleResult);

      const result = await settingResolver.remove(idToDelete);

      expect(settingModel.updateOne).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
  });
});
