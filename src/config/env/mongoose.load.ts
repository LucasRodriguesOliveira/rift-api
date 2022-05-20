export interface MongooseConfig {
  host: string;
  port: string;
  user: string;
  pass: string;
  name: string;
}

export const mongooseLoadEnv = (): { database: MongooseConfig } => {
  const {
    MONGODB_HOST: host,
    MONGODB_PORT: port,
    MONGODB_USERNAME: user,
    MONGODB_PASSWORD: pass,
    MONGODB_DATABASENAME: name,
  } = process.env;

  return {
    database: {
      host,
      port,
      user,
      pass,
      name,
    },
  };
};
