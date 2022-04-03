import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { MongooseConfig } from '../env/mongoose.load';

export const mongooseModuleConfig: MongooseModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const { user, pass, host, port, name } =
      configService.get<MongooseConfig>('database');

    return {
      uri: `mongodb://${user}:${pass}@${host}:${port}/${name}`,
    };
  },
};
