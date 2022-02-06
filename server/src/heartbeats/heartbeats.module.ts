import { Module } from '@nestjs/common';
import { HeartbeatsService } from './heartbeats.service';
import { HeartbeatsController } from './heartbeats.controller';
import { HeartbeatTypesModule } from 'src/heartbeat-types/heartbeat-types.module';


@Module({
  imports: [HeartbeatTypesModule],
  controllers: [HeartbeatsController],
  providers: [HeartbeatsService]
})
export class HeartbeatsModule {}
