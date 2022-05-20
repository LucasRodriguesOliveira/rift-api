import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { graphQLAsyncOptions } from 'src/config/graphql/graphql-module.config';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>(graphQLAsyncOptions),
  ],
})
export class GQLModule {}
