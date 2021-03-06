import { Injectable, Logger, Dependencies } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { HeartbeatTypesService } from 'src/heartbeat-types/heartbeat-types.service';
import { CreateHeartbeatDto } from './dto/create-heartbeat.dto';
import { UpdateHeartbeatDto } from './dto/update-heartbeat.dto';
import { NotifierService } from '../notifier/notifier.service';

@Dependencies(HeartbeatTypesService, NotifierService)
@Injectable()
export class HeartbeatsService {
    private readonly logger = new Logger(HeartbeatsService.name);
    @InjectKnex() private readonly knex: Knex;

    private hbTypes: HeartbeatTypesService;
    private notifier: NotifierService;

    constructor(hbTypes: HeartbeatTypesService, notifier: NotifierService) {
        this.hbTypes = hbTypes;
        this.notifier = notifier;
    }
    async create(createHeartbeatDto: CreateHeartbeatDto): Promise<string> {
        const heartbeatId = await this.knex.transaction(async (trx) => {
            const [heartBeatType] = await this.hbTypes.findOrCreateByCode(
                createHeartbeatDto.heartbeatCode,
                trx
            );
            const [heartbeat] = await trx('heartbeats')
                .insert({
                    heartbeat_code: createHeartbeatDto.heartbeatCode,
                    ip: createHeartbeatDto.ip,
                    payload: createHeartbeatDto.payload || {},
                    runner_uuid: createHeartbeatDto.runnerUuid,
                })
                .returning('*');

            await trx.commit();
            return heartbeat.heartbeatId;
        });

        return heartbeatId;
    }

    async findAll(first: number = 100, skip: number = 0) {
        return await this.knex('heartbeats')
            .select('*')
            .orderBy('created_at', 'desc')
            .limit(first)
            .offset(skip);
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

    async deadServices() {
        const res = await this.knex.raw(
            'select hbt.*, NOW() as now, extract(epoch from now() - hbt.updated_at) as seconds_from_last_heartbit from heartbeat_types hbt where extract(epoch from now() - hbt.updated_at) > hbt.silence_error_time'
        );
        for (const r of res?.rows) {
            await this.notifier.sendTelegramMessage(
                `Didn't get the ${r.code} notification for ${r.seconds_from_last_heartbit} seconds (the last received one was at ${r.updated_at}) and we should've got it at least once every ${r.silence_error_time} seconds`
            );
        }
        return res?.rows;
    }

    async shouldRestart(runId, code): Promise<any> {
        await this.cleanupOldHeartbeats();
        const res = {
            shouldRestart: true,
            timeSinceLastHeartbeat: -1,
        };
        const lastHeartBeats = await this.knex('heartbeats')
            .innerJoin(
                'heartbeat_types',
                'heartbeats.heartbeat_code',
                'heartbeat_types.code'
            )
            .select(
                'heartbeats.created_at',
                'heartbeat_types.silence_error_time'
            )
            .where({
                runner_uuid: runId,
                heartbeat_code: code,
            })
            .orderBy('created_at', 'desc')
            .limit(1);
        if (lastHeartBeats.length === 0) {
            await this.notifier.sendTelegramMessage(
                `[THENURSE] Couldn't find the heartbeats type record for code ${code}.`
            );
            return res;
        }
        const lastHeartBeat = lastHeartBeats[0];

        res.timeSinceLastHeartbeat =
            (new Date().valueOf() -
                new Date(lastHeartBeat.created_at).valueOf()) /
            1000;

        //
        res.shouldRestart = !(
            res.timeSinceLastHeartbeat < lastHeartBeat.silence_error_time
        );

        return res;
    }

    async cleanupOldHeartbeats(): Promise<void>{
      const since = new Date( Date.now() - 24 * 60 * 60 * 1000);
      const res = await this.knex('heartbeats').where('created_at', '<', since.toISOString()).delete();
    }
}
