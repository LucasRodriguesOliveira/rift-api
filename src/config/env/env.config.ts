import { ConfigModuleOptions } from '@nestjs/config';
import { appLoadEnv } from './app.load';
import { graphqlLoadEnv } from './graphql.load';
import { mongooseLoadEnv } from './mongoose.load';

export const envConfig: ConfigModuleOptions = {
  isGlobal: true,
  load: [appLoadEnv, mongooseLoadEnv, graphqlLoadEnv],
};
