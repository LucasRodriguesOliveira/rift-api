import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env/env.config';
import { GQLModule } from './modules/graphql/graphql.module';
import { ModuleModule } from './modules/module/module.module';
import { MongodbModule } from './modules/mongoose/mongoose.module';
import { PermissionGroupModule } from './modules/permission-group/permission-group.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RevisionStateModule } from './modules/revision-state/revision-state.module';
import { UserTokenTypeModule } from './modules/user-token-type/user-token-type.module';
import { UserTypeModule } from './modules/user-type/user-type.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    GQLModule,
    MongodbModule,
    UserTypeModule,
    ModuleModule,
    PermissionModule,
    UserTokenTypeModule,
    RevisionStateModule,
    PermissionGroupModule,
    UserModule,
  ],
})
export class AppModule {}
