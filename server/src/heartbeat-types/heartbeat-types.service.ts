import { Injectable, Logger } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateHeartbeatTypeInput } from './dto/create-heartbeat-type.input';
import { UpdateHeartbeatTypeInput } from './dto/update-heartbeat-type.input';

@Injectable()
export class HeartbeatTypesService {
    private readonly logger = new Logger(HeartbeatTypesService.name);
    @InjectKnex() private readonly knex: Knex;

    async findOrCreateByCode(heartBeatCode: string, trx?) {
        trx = trx || this.knex;
        const result = await trx('heartbeat_types')
            .insert({
                code: heartBeatCode,
                name: heartBeatCode,
            })
            .onConflict('code')
            .ignore()
            .returning('*');
        return result;
    }

    create(createHeartbeatTypeInput: CreateHeartbeatTypeInput) {
        return 'This action adds a new heartbeatType';
    }

    findAll() {
        return 'This action returns all heartbeatTypes';
    }

    findOne(id: number) {
        return `This action returns a #${id} heartbeatType`;
    }

    update(id: number, updateHeartbeatTypeInput: UpdateHeartbeatTypeInput) {
        return `This action updates a #${id} heartbeatType`;
    }

    remove(id: number) {
        return `This action removes a #${id} heartbeatType`;
    }
}
