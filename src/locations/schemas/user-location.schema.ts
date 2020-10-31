import { Schema, Types } from 'mongoose';
import { IDbUserLocationDoc } from '../interfaces/user-location.interface';

export const UserLocationSchema = new Schema<IDbUserLocationDoc>({
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
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  alt: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});
