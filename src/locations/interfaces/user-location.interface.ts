import { Document, Types } from 'mongoose';

export interface IDbUserLocationDoc extends Document {
  userId: Types.ObjectId;
  objectId: Types.ObjectId;
  lat: number;
  lng: number;
  alt: number;
  date: Date;
}
