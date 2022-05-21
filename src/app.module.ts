import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env/env.config';
import { GQLModule } from './modules/graphql/graphql.module';
import { ModuleModule } from './modules/module/module.module';
import { MongodbModule } from './modules/mongoose/mongoose.module';
import { PermissionModule } from './modules/permission/permission.module';
import { UserTypeModule } from './modules/user-type/user-type.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    GQLModule,
    MongodbModule,
    UserTypeModule,
    ModuleModule,
    PermissionModule,
  ],
})
export class AppModule {}
