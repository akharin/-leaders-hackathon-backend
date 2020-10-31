import { Test, TestingModule } from '@nestjs/testing';
import { RedisStoringService } from './redis-storing.service';

describe('RedisStoringService', () => {
  let service: RedisStoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisStoringService],
    }).compile();

    service = module.get<RedisStoringService>(RedisStoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
