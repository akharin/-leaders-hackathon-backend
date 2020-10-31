import { Schema } from 'mongoose';
import { IDbObjectDoc } from '../interfaces/object.interface';

export const ObjectSchema = new Schema<IDbObjectDoc>({
  name: {
    type: String,
    required: true
  },
  polygon: {
    type: [{
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      },
      alt: {
        type: Number,
        required: true
      },
    }],
    required: true
  },
});
