import { Test, TestingModule } from '@nestjs/testing';
import { DbStoringService } from './db-storing.service';

describe('StoringService', () => {
  let service: DbStoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbStoringService],
    }).compile();

    service = module.get<DbStoringService>(DbStoringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
