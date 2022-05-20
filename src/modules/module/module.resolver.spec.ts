import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { Module, ModuleDocument } from './model/module.model';
import { ModuleResolver } from './module.resolver';
import { ModuleService } from './module.service';

jest.mock('mongoose');

describe(ModuleResolver.name, function () {
  let moduleResolver: ModuleResolver;
  let moduleService: ModuleService;
  let moduleModel: jest.Mocked<Model<ModuleDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        ModuleResolver,
        ModuleService,
        {
          provide: getModelToken(Module.name),
          useValue: Model,
        },
      ],
    }).compile();

    moduleResolver = moduleRef.get<ModuleResolver>(ModuleResolver);
    moduleService = moduleRef.get<ModuleService>(ModuleService);
    moduleModel = moduleRef.get<jest.Mocked<Model<ModuleDocument>>>(
      getModelToken(Module.name),
    );
  });

  it('should be defined', () => {
    expect(moduleModel).toBeDefined();
    expect(moduleService).toBeDefined();
    expect(moduleResolver).toBeDefined();
  });

  describe('Find By Id', function () {
    const moduleMockFindResult: Module = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const idToSearch = '1';

    it('should return successfully a module', async () => {
      moduleModel.findById.mockResolvedValue(moduleMockFindResult);

      const result = await moduleResolver.findModule(idToSearch);

      expect(moduleModel.findById).toHaveBeenCalled();
      expect(result).toBe(moduleMockFindResult);
    });
  });

  describe('Create new User Type', function () {
    const moduleMockResult: Module = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const descriptionToCreate = 'Test';

    it('should create successfully a module', async () => {
      moduleModel.create.mockImplementation(() => moduleMockResult);

      const result = await moduleResolver.createModule(descriptionToCreate);

      expect(moduleModel.create).toHaveBeenCalled();
      expect(result).toBe(moduleMockResult);
    });
  });

  describe('List User Types', function () {
    const moduleActiveList: Module[] = [
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
    const moduleAllStatusList: Module[] = [
      ...moduleActiveList,
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

    it('should successfully get all active module', async () => {
      moduleModel.find.mockResolvedValueOnce(moduleActiveList);

      const result = await moduleResolver.listAllModules(false);

      expect(moduleModel.find).toHaveBeenCalled();
      expect(result).toBe(moduleActiveList);
    });

    it('should successfully get all module', async () => {
      moduleModel.find.mockResolvedValueOnce(moduleAllStatusList);

      const result = await moduleResolver.listAllModules(true);

      expect(moduleModel.find).toHaveBeenCalled();
      expect(result).toBe(moduleAllStatusList);
    });
  });

  describe('Update a existing user type', function () {
    const moduleMockResultDescriptionUpdated: Module = {
      description: 'Test - updated',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };
    const moduleMockResultStatusUpdated: Module = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      isExcluded: false,
    };

    const idToUpdate = '1';
    const newDescription = 'Test - updated';
    const newStatus = false;

    it('should update successfully a module description and return the new module', async () => {
      moduleModel.findById.mockResolvedValueOnce(
        moduleMockResultDescriptionUpdated,
      );

      const result = await moduleResolver.updateDescription(
        idToUpdate,
        newDescription,
      );

      expect(moduleModel.findById).toHaveBeenCalledWith<string[]>(idToUpdate);
      expect(result).toBe(moduleMockResultDescriptionUpdated);
    });

    it('should update successfully a module status and return the new module', async () => {
      moduleModel.findById.mockResolvedValueOnce(moduleMockResultStatusUpdated);

      const result = await moduleResolver.updateStatus(idToUpdate, newStatus);

      expect(moduleModel.findById).toHaveBeenCalledWith<string[]>(idToUpdate);
      expect(result).toBe(moduleMockResultStatusUpdated);
    });
  });

  describe('Deletes a existing module', function () {
    const idToDelete = '1';
    const findModuleResult = {
      isExcluded: true,
    };

    it('should delete successfully a module', async () => {
      moduleModel.findById.mockResolvedValueOnce(findModuleResult);

      const result = await moduleResolver.remove(idToDelete);

      expect(moduleModel.updateOne).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
  });
});
