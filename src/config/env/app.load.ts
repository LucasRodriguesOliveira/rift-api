export interface AppConfig {
  port: number;
}

export const appLoadEnv = (): { app: AppConfig } => ({
  app: {
    port: parseInt(process.env.PORT, 10),
  },
});
