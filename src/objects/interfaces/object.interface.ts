import { Document } from 'mongoose';

export interface IDbObjectDoc extends Document {
  name: string;
  polygon: [{
    lat: number;
    lng: number;
    alt: number;
  }]
}
