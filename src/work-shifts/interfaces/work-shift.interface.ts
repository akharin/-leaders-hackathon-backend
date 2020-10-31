import { Document, Types } from 'mongoose';

export interface IDbWorkShiftDoc extends Document {
  userId: Types.ObjectId;
  objectId: Types.ObjectId;
  start: Date;
  end?: Date;
  duration?: number;
  breaks?: [{
    start: Date;
    end?: Date;
    duration?: number;
  }]
}
