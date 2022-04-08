import { join } from 'path';

interface GraphQlDefinitions {
  path: string;
}

export interface GraphQLConfig {
  debug: boolean;
  playground: boolean;
  typePaths: string[];
  definitions: GraphQlDefinitions;
}

export const graphqlLoadEnv = (): { graphql: GraphQLConfig } => {
  const { NODE_ENV } = process.env;

  return {
    graphql: {
      debug: false,
      playground: NODE_ENV === 'development',
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    },
  };
};
