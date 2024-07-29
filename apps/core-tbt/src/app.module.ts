import { Module } from '@nestjs/common';
import { CoreInfrastructureModule } from '@app/core-infrastructure';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user';

@Module({
  imports: [CoreInfrastructureModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
