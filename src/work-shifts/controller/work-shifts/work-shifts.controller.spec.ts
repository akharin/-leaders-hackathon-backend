import { Test, TestingModule } from '@nestjs/testing';
import { WorkShiftsController } from './work-shifts.controller';

describe('WorkShiftsController', () => {
  let controller: WorkShiftsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkShiftsController],
    }).compile();

    controller = module.get<WorkShiftsController>(WorkShiftsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
