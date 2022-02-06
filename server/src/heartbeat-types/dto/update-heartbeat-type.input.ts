import { CreateHeartbeatTypeInput } from './create-heartbeat-type.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateHeartbeatTypeInput extends PartialType(CreateHeartbeatTypeInput) {
  id: number;
}
