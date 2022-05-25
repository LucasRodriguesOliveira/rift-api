import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { createMockList } from '../../shared/utils';
import { ListUserDto } from './dto/list-user.dto';
import { User, UserDocument } from './model/user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

jest.mock('mongoose');

describe(UserResolver.name, function () {
  let userResolver: UserResolver;
  let userService: UserService;
  let userModel: jest.Mocked<Model<UserDocument>>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    userResolver = moduleRef.get<UserResolver>(UserResolver);
    userService = moduleRef.get<UserService>(UserService);
    userModel = moduleRef.get<jest.Mocked<Model<UserDocument>>>(
      getModelToken(User.name),
    );
  });

  it('should be defined', () => {
    expect(userModel).toBeDefined();
    expect(userService).toBeDefined();
    expect(userResolver).toBeDefined();
  });

  describe('Create a new User', () => {
    const user: User = {
      name: 'Test User',
      email: 'user@test.com',
      password: 'test123',
      typeId: '1',
    };

    it('should create a new User', async () => {
      userModel.create.mockImplementationOnce(() => user);

      const result = await userResolver.create(user);

      expect(userModel.create).toHaveBeenCalled();
      expect(result.name).toBe(user.name);
      expect(result.email).toBe(user.email);
      expect(result.typeId).toBe(user.typeId);
    });
  });

  describe('Find a existing user', () => {
    const user: User = {
      name: 'Test User',
      email: 'user@test.com',
      password: 'test123',
      typeId: '1',
    };
    const idToSearch = '1';

    it('should find a user successfully', async () => {
      userModel.findById.mockResolvedValueOnce(user);

      const result = await userResolver.find(idToSearch);

      expect(userModel.findById).toHaveBeenCalled();
      expect(result).toBe(user);
    });
  });

  describe('Update a user', () => {
    const idToSearch = '1';
    const newName = 'new name';
    const user: User = {
      name: newName,
      email: 'user@test.com',
      password: 'test123',
      typeId: '1',
    };

    it('should update a user name', async () => {
      userModel.findById.mockResolvedValueOnce(user);

      const result = await userResolver.updateUserName(idToSearch, newName);

      expect(userModel.findById).toHaveBeenCalled();
      expect(result).toBe(user);
    });
  });

  describe('List all of the users', () => {
    const quantity = 10;
    const userList: User[] = createMockList<User>(
      quantity,
      (index: number) => ({
        name: `Test User #${index}`,
        email: 'user@test.com',
        password: 'test123',
        typeId: `${index}`,
      }),
    );
    const filter: ListUserDto = {
      name: 'test',
      typeId: '1',
    };

    it('should get all of the users', async () => {
      userModel.find.mockResolvedValueOnce(userList);

      const result = await userResolver.list(filter);

      expect(userModel.find).toHaveBeenCalled();
      expect(result).toBe(userList);
    });
  });

  describe('Deletes a user', () => {
    const idToSearch = '1';

    it('deletes successfully a user', async () => {
      userModel.find.mockResolvedValueOnce(null);

      const result = await userResolver.delete(idToSearch);

      expect(userModel.find).toHaveBeenCalled();
      expect(result).toBeTruthy();
    });
  });
});
