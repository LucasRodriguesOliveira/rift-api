import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  RevisionState,
  RevisionStateDocument,
} from './model/revision-state.model';
import { RevisionStateResolver } from './revision-state.resolver';
import { RevisionStateService } from './revision-state.service';

jest.mock('mongoose');

describe(RevisionState.name, function () {
  let revisionStateResolver: RevisionStateResolver;
  let revisionStateService: RevisionStateService;
  let revisionStateModel: jest.Mocked<Model<RevisionStateDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RevisionStateResolver,
        RevisionStateService,
        {
          provide: getModelToken(RevisionState.name),
          useValue: Model,
        },
      ],
    }).compile();

    revisionStateResolver = moduleRef.get<RevisionStateResolver>(
      RevisionStateResolver,
    );
    revisionStateService =
      moduleRef.get<RevisionStateService>(RevisionStateService);
    revisionStateModel = moduleRef.get<
      jest.Mocked<Model<RevisionStateDocument>>
    >(getModelToken(RevisionState.name));
  });

  it('should be defined', () => {
    expect(revisionStateModel).toBeDefined();
    expect(revisionStateService).toBeDefined();
    expect(revisionStateResolver).toBeDefined();
  });

  describe('Find By Id', function () {
    const revisionStateMockFindResult: RevisionState = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const idToSearch = '1';

    it('should return successfully a revisionState', async () => {
      revisionStateModel.findById.mockResolvedValue(
        revisionStateMockFindResult,
      );

      const result = await revisionStateResolver.find(idToSearch);

      expect(revisionStateModel.findById).toHaveBeenCalled();
      expect(result).toBe(revisionStateMockFindResult);
    });
  });

  describe('Create new RevisionState', function () {
    const revisionStateMockResult: RevisionState = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };

    const descriptionToCreate = 'Test';

    it('should create successfully a revisionState', async () => {
      revisionStateModel.create.mockImplementation(
        () => revisionStateMockResult,
      );

      const result = await revisionStateResolver.create(descriptionToCreate);

      expect(revisionStateModel.create).toHaveBeenCalled();
      expect(result).toBe(revisionStateMockResult);
    });
  });

  describe('List RevisionStates', function () {
    const revisionStateActiveList: RevisionState[] = [
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
    const revisionStateAllStatusList: RevisionState[] = [
      ...revisionStateActiveList,
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

    it('should successfully get all active revisionState', async () => {
      revisionStateModel.find.mockResolvedValueOnce(revisionStateActiveList);

      const result = await revisionStateResolver.list(false);

      expect(revisionStateModel.find).toHaveBeenCalled();
      expect(result).toBe(revisionStateActiveList);
    });

    it('should successfully get all revisionState', async () => {
      revisionStateModel.find.mockResolvedValueOnce(revisionStateAllStatusList);

      const result = await revisionStateResolver.list(true);

      expect(revisionStateModel.find).toHaveBeenCalled();
      expect(result).toBe(revisionStateAllStatusList);
    });
  });

  describe('Update a existing revision state', function () {
    const revisionStateMockResultDescriptionUpdated: RevisionState = {
      description: 'Test - updated',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      isExcluded: false,
    };
    const revisionStateMockResultStatusUpdated: RevisionState = {
      description: 'Test',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: false,
      isExcluded: false,
    };

    const idToUpdate = '1';
    const newDescription = 'Test - updated';
    const newStatus = false;

    it('should update successfully a revisionState description and return the new revisionState', async () => {
      revisionStateModel.findById.mockResolvedValueOnce(
        revisionStateMockResultDescriptionUpdated,
      );

      const result = await revisionStateResolver.updateDescription(
        idToUpdate,
        newDescription,
      );

      expect(revisionStateModel.findById).toHaveBeenCalledWith<string[]>(
        idToUpdate,
      );
      expect(result).toBe(revisionStateMockResultDescriptionUpdated);
    });

    it('should update successfully a revisionState status and return the new revisionState', async () => {
      revisionStateModel.findById.mockResolvedValueOnce(
        revisionStateMockResultStatusUpdated,
      );

      const result = await revisionStateResolver.updateStatus(
        idToUpdate,
        newStatus,
      );

      expect(revisionStateModel.findById).toHaveBeenCalledWith<string[]>(
        idToUpdate,
      );
      expect(result).toBe(revisionStateMockResultStatusUpdated);
    });
  });

  describe('Deletes a existing revisionState', function () {
    const idToDelete = '1';
    const findModuleResult = {
      isExcluded: true,
    };

    it('should delete successfully a revisionState', async () => {
      revisionStateModel.findById.mockResolvedValueOnce(findModuleResult);

      const result = await revisionStateResolver.remove(idToDelete);

      expect(revisionStateModel.updateOne).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
  });
});
