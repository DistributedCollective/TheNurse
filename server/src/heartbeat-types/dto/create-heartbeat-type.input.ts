import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "src/base.dto";

export class CreateHeartbeatTypeInput extends BaseDTO{
  heartbeatTypeId?: string;

  @IsNotEmpty()
  code: string;

  name?: string;

  cronjob?: string;

  silenceErrorTime?: string;
}
