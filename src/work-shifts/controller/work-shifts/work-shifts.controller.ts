import { Controller, Get, Query } from '@nestjs/common';
import { WorkShiftsService } from '../../services/work-shifts/work-shifts.service';

@Controller('work-shifts')
export class WorkShiftsController {
  constructor(private readonly shiftsService: WorkShiftsService) {}

  @Get('start')
  start(@Query() data) {
    return this.shiftsService.start(data.userId, data.objectId);
  }

  @Get('finish')
  finish(@Query() data) {
    return this.shiftsService.finish(data.userId, data.objectId);
  }

  @Get('pause')
  pause(@Query() data) {
    return this.shiftsService.pause(data.userId, data.objectId);
  }

  @Get('resume')
  resume(@Query() data) {
    return this.shiftsService.resume(data.userId, data.objectId);
  }
}
