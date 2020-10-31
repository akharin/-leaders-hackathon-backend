import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkShiftSchema } from './schemas/work-shift.schema';
import { WorkShiftsService } from './services/work-shifts/work-shifts.service';
import { WorkShiftsController } from './controller/work-shifts/work-shifts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'WorkShift', schema: WorkShiftSchema }]),
  ],
  providers: [WorkShiftsService],
  controllers: [WorkShiftsController],
})
export class WorkShiftsModule {}
