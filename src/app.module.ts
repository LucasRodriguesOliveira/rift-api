import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { envConfig } from './config/env/env.config';
import { GQLModule } from './modules/graphql/graphql.module';
import { MongodbModule } from './modules/mongoose/mongoose.module';
import { UserTypeModule } from './modules/user-type/user-type.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    GQLModule,
    MongodbModule,
    UserTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
