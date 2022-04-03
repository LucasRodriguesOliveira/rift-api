import { join } from 'path';

interface GraphQlDefinitions {
  path: string;
}

export interface GraphQLConfig {
  debug: boolean;
  playground: boolean;
  typePaths: string[];
  outputAs: string;
  definitions: GraphQlDefinitions;
}

export const graphqlLoadEnv = (): { graphql: GraphQLConfig } => {
  const { NODE_ENV } = process.env;

  return {
    graphql: {
      debug: false,
      playground: NODE_ENV === 'development',
      typePaths: ['./**/*.graphql'],
      outputAs: 'class',
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    },
  };
};
