import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDbWorkShiftDoc } from '../../interfaces/work-shift.interface';
import { differenceInMilliseconds } from 'date-fns';

@Injectable()
export class WorkShiftsService {
  private static finishBreak(shiftBreak: IDbWorkShiftDoc['breaks'][0]) {
    shiftBreak.end = new Date();
    shiftBreak.duration = differenceInMilliseconds(
      shiftBreak.end,
      shiftBreak.start,
    );
  }

  constructor(
    @InjectModel('WorkShift') private workShiftModel: Model<IDbWorkShiftDoc>,
  ) {}

  async start(userId: string, objectId: string) {
    const shift = await this.getLastShift(userId, objectId);
    if (shift) {
      return shift;
    }
    return this.workShiftModel.create({
      userId,
      objectId,
      start: new Date(),
    });
  }

  async finish(userId: string, objectId: string) {
    const shift = await this.getLastShift(userId, objectId);
    if (shift) {
      shift.end = new Date();
      if (shift.breaks?.length) {
        const lastBreak = shift.breaks[shift.breaks.length - 1];
        if (!lastBreak.end) {
          WorkShiftsService.finishBreak(lastBreak);
        }

        shift.duration =
          differenceInMilliseconds(shift.end, shift.start) -
          shift.breaks.reduce((sum, item) => sum + (item.duration || 0), 0);
      }
      await shift.save();
      return shift;
    }
    throw new BadRequestException();
  }

  async pause(userId: string, objectId: string) {
    const shift = await this.getLastShift(userId, objectId);
    if (shift) {
      if (shift.breaks?.length) {
        const lastBreak = shift.breaks[shift.breaks.length - 1];
        if (!lastBreak.end) {
          return shift;
        }
      }
      shift.breaks.push({ start: new Date() });
      await shift.save();
      return shift;
    }
    throw new BadRequestException();
  }

  async resume(userId: string, objectId: string) {
    const shift = await this.getLastShift(userId, objectId);
    if (shift) {
      if (shift.breaks?.length) {
        const lastBreak = shift.breaks[shift.breaks.length - 1];
        if (!lastBreak.end) {
          WorkShiftsService.finishBreak(lastBreak);
        }
      }
      await shift.save();
      return shift;
    }
    throw new BadRequestException();
  }

  private getLastShift(userId: string, objectId: string) {
    return this.workShiftModel
      .findOne({
        userId,
        objectId,
        end: { $exists: false },
      })
      .sort({ start: -1 })
      .exec();
  }
}
