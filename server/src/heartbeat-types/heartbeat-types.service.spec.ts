import { Test, TestingModule } from '@nestjs/testing';
import { HeartbeatTypesService } from './heartbeat-types.service';

describe('HeartbeatTypesService', () => {
  let service: HeartbeatTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeartbeatTypesService],
    }).compile();

    service = module.get<HeartbeatTypesService>(HeartbeatTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
