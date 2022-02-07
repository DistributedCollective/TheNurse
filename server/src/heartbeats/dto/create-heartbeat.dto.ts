import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from '../../base.dto';

export class CreateHeartbeatDto extends BaseDTO{
  heartbeatId?: string;

  @IsNotEmpty()
  heartbeatCode: string;

  ip?: string;
  payload?: object;
}
