import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { HeartbeatTypesService } from './heartbeat-types.service';
import { CreateHeartbeatTypeInput } from './dto/create-heartbeat-type.input';
import { UpdateHeartbeatTypeInput } from './dto/update-heartbeat-type.input';

@Resolver('HeartbeatType')
export class HeartbeatTypesResolver {
  constructor(private readonly heartbeatTypesService: HeartbeatTypesService) {}

  @Mutation('createHeartbeatType')
  create(@Args('createHeartbeatTypeInput') createHeartbeatTypeInput: CreateHeartbeatTypeInput) {
    return this.heartbeatTypesService.create(createHeartbeatTypeInput);
  }

  @Query('heartbeatTypes')
  findAll() {
    return this.heartbeatTypesService.findAll();
  }

  @Query('heartbeatType')
  findOne(@Args('id') id: number) {
    return this.heartbeatTypesService.findOne(id);
  }

  @Mutation('updateHeartbeatType')
  update(@Args('updateHeartbeatTypeInput') updateHeartbeatTypeInput: UpdateHeartbeatTypeInput) {
    return this.heartbeatTypesService.update(updateHeartbeatTypeInput.id, updateHeartbeatTypeInput);
  }

  @Mutation('removeHeartbeatType')
  remove(@Args('id') id: number) {
    return this.heartbeatTypesService.remove(id);
  }
}
