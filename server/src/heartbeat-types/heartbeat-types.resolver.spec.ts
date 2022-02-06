import { Test, TestingModule } from '@nestjs/testing';
import { HeartbeatTypesResolver } from './heartbeat-types.resolver';
import { HeartbeatTypesService } from './heartbeat-types.service';

describe('HeartbeatTypesResolver', () => {
  let resolver: HeartbeatTypesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeartbeatTypesResolver, HeartbeatTypesService],
    }).compile();

    resolver = module.get<HeartbeatTypesResolver>(HeartbeatTypesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
