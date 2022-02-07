import { Injectable, Logger, Dependencies } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { HeartbeatTypesService } from 'src/heartbeat-types/heartbeat-types.service';
import { CreateHeartbeatDto } from './dto/create-heartbeat.dto';
import { UpdateHeartbeatDto } from './dto/update-heartbeat.dto';

@Dependencies(HeartbeatTypesService)
@Injectable()
export class HeartbeatsService {
  private readonly logger = new Logger(HeartbeatsService.name);
  @InjectKnex() private readonly knex: Knex;

  private hbTypes: HeartbeatTypesService;

  constructor(hbTypes: HeartbeatTypesService) {
    this.hbTypes = hbTypes;
  }
  async create(createHeartbeatDto: CreateHeartbeatDto): Promise<string> {
    const [heartBeatType] = await this.hbTypes.findOrCreateByCode(
      createHeartbeatDto.heartbeatCode
    );
    const [heartbeat] = await this.knex('heartbeats')
      .insert({
        heartbeat_code: createHeartbeatDto.heartbeatCode,
        ip: createHeartbeatDto.ip,
        payload: createHeartbeatDto.payload || {},
      })
      .returning('*');

    return heartbeat.heartbeatId;
  }

  findAll() {
    return `This action returns all heartbeats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} heartbeat`;
  }

  update(id: number, updateHeartbeatDto: UpdateHeartbeatDto) {
    return `This action updates a #${id} heartbeat`;
  }

  remove(id: number) {
    return `This action removes a #${id} heartbeat`;
  }
}
