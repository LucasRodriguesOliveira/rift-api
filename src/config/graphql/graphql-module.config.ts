import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { GqlModuleAsyncOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLConfig } from '../env/graphql.load';

export const graphQLAsyncOptions: GqlModuleAsyncOptions<
  ApolloDriverConfig,
  GqlOptionsFactory<ApolloDriverConfig>
> = {
  driver: ApolloDriver,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const {
      debug,
      definitions: { path },
      playground,
      typePaths,
    } = configService.get<GraphQLConfig>('graphql');

    return { debug, playground, typePaths, definitions: { path } };
  },
};
