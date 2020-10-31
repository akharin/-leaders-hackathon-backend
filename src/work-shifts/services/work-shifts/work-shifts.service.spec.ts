import { Test, TestingModule } from '@nestjs/testing';
import { WorkShiftsService } from './work-shifts.service';

describe('WorkShiftsService', () => {
  let service: WorkShiftsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkShiftsService],
    }).compile();

    service = module.get<WorkShiftsService>(WorkShiftsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
