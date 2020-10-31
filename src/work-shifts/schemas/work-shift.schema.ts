import { Schema, Types } from 'mongoose';
import { IDbWorkShiftDoc } from '../interfaces/work-shift.interface';

export const WorkShiftSchema = new Schema<IDbWorkShiftDoc>({
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: 'User',
  },
  objectId: {
    type: Types.ObjectId,
    required: true,
    ref: 'Object',
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
  },
  duration: {
    type: Number,
  },
  breaks: [
    {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
      },
      duration: {
        type: Number,
      },
    },
  ],
});
