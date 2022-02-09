import { Module } from '@nestjs/common';
import { HeartbeatsService } from './heartbeats.service';
import { HeartbeatsController } from './heartbeats.controller';
import { HeartbeatTypesModule } from 'src/heartbeat-types/heartbeat-types.module';
import { NotifierService } from 'src/notifier/notifier.service';


@Module({
  imports: [HeartbeatTypesModule],
  controllers: [HeartbeatsController],
  providers: [HeartbeatsService, NotifierService]
})
export class HeartbeatsModule {}
