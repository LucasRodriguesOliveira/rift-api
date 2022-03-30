import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserTypeModule } from './modules/user-type/user-type.module';

@Module({
  imports: [UserTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
