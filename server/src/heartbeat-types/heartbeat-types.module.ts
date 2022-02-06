import { Module } from '@nestjs/common';
import { HeartbeatTypesService } from './heartbeat-types.service';
import { HeartbeatTypesResolver } from './heartbeat-types.resolver';

@Module({
  providers: [HeartbeatTypesResolver, HeartbeatTypesService],
  exports: [HeartbeatTypesService],
})
export class HeartbeatTypesModule {}
